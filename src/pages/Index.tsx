import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '@/hooks/useLocation';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HIJRI_MONTHS } from '@/data/important-dates';
import { getGoldenMotivation } from '@/data/golden-motivations';
import { getMotivation } from '@/data/motivations';

import type { CalendarEvent } from '@/pages/DailyDetail';

const PRAYER_NAMES: Record<string, string> = {
  Imsak: 'Imsak',
  Fajr: 'Subuh',
  Sunrise: 'Terbit',
  Dhuha: 'Dhuha',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
};

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const ALL_DISPLAY_KEYS = ['Imsak', 'Fajr', 'Sunrise', 'Dhuha', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
}

function addMinutes(timeStr: string, mins: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const nm = ((total % 1440) + 1440) % 1440 % 60;
  return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
}

// Removed old getAIReminder - now using getMotivation from motivations.ts

export default function Home() {
  const navigate = useNavigate();
  const { location: loc, loading: locLoading } = useLocation();
  const { timings, hijri, loading: prayerLoading } = usePrayerTimes(loc?.latitude, loc?.longitude);
  const [countdown, setCountdown] = useState('--:--:--');
  const [nextPrayer, setNextPrayer] = useState('');
  const [hiddenPrayers] = useLocalStorage<string[]>('prayer_hidden', []);
  const [corrections] = useLocalStorage<Record<string, number>>('prayer_corrections', {});
  
  const isRamadan = hijri?.month.number === 9;
  const goldenMotivation = useMemo(() => {
    return getGoldenMotivation(new Date(), hijri?.month.number, hijri ? parseInt(hijri.day) : undefined);
  }, [hijri]);
  const motivation = useMemo(() => {
    const prayerData = timings ? {
      Fajr: timings.Fajr,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha,
    } : undefined;
    return getMotivation(new Date(), prayerData, hijri?.month.number, hijri ? parseInt(hijri.day) : undefined);
  }, [timings, hijri]);
  const today = new Date();
  const [upcomingEvents, setUpcomingEvents] = useState<(CalendarEvent & { countdownStr: string })[]>([]);

  const visibleKeys = ALL_DISPLAY_KEYS.filter(k => !hiddenPrayers.includes(k));

  const getAdjustedTime = (key: string): string | null => {
    if (!timings) return null;
    if (key === 'Dhuha') {
      if (!timings.Sunrise) return null;
      return addMinutes(timings.Sunrise.substring(0, 5), 15 + (corrections['Dhuha'] || 0));
    }
    const raw = timings[key];
    if (!raw) return null;
    const time = raw.substring(0, 5);
    const corr = corrections[key] || 0;
    return corr === 0 ? time : addMinutes(time, corr);
  };

  useEffect(() => {
    if (!timings) return;
    const interval = setInterval(() => {
      const now = new Date();
      let found = false;
      for (const key of PRAYER_KEYS) {
        const adjusted = getAdjustedTime(key);
        if (!adjusted) continue;
        const { h, m } = parseTime(adjusted);
        const target = new Date(now);
        target.setHours(h, m, 0, 0);
        if (target > now) {
          const diff = target.getTime() - now.getTime();
          const hrs = Math.floor(diff / 3600000);
          const mins = Math.floor((diff % 3600000) / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setNextPrayer(PRAYER_NAMES[key]);
          setCountdown(
            `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
          );
          found = true;
          return;
        }
      }
      if (!found) {
        const imsakTime = getAdjustedTime('Imsak') || getAdjustedTime('Fajr');
        if (imsakTime) {
          const { h, m } = parseTime(imsakTime);
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(h, m, 0, 0);
          const diff = tomorrow.getTime() - now.getTime();
          const hrs = Math.floor(diff / 3600000);
          const mins = Math.floor((diff % 3600000) / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setNextPrayer('Imsak');
          setCountdown(
            `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
          );
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timings, corrections]);

  // Upcoming events with countdown
  useEffect(() => {
    const updateEvents = () => {
      let events: CalendarEvent[] = [];
      try {
        const stored = localStorage.getItem('deenflow_events');
        if (stored) events = JSON.parse(stored);
      } catch { return; }

      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      const upcoming = events
        .filter((ev) => {
          if (ev.date < todayStr) return false;
          if (ev.date === todayStr) {
            const [h, m] = ev.time.split(':').map(Number);
            const evTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
            return evTime > now;
          }
          return true;
        })
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
        .slice(0, 5)
        .map((ev) => {
          const [y, mo, d] = ev.date.split('-').map(Number);
          const [h, m] = ev.time.split(':').map(Number);
          const evTime = new Date(y, mo - 1, d, h, m, 0);
          const diff = evTime.getTime() - now.getTime();
          let countdownStr = '';
          if (diff > 0) {
            const days = Math.floor(diff / 86400000);
            const hrs = Math.floor((diff % 86400000) / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            if (days > 0) countdownStr = `${days}h ${hrs}j ${mins}m`;
            else countdownStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
          } else {
            countdownStr = 'Sekarang';
          }
          return { ...ev, countdownStr };
        });

      setUpcomingEvents(upcoming);
    };

    updateEvents();
    const interval = setInterval(updateEvents, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="space-y-4 animate-fade-in">
      {/* Date & Location */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">
          {today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace('Minggu', 'Ahad')}
        </p>
        {hijri && (
          <p className="mt-1 text-sm font-semibold text-accent">
            {hijri.day} {HIJRI_MONTHS[hijri.month.number]} {hijri.year} H
          </p>
        )}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{locLoading ? 'Mendeteksi lokasi...' : loc?.city}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="rounded-xl prayer-gradient p-5 text-center">
        <p className="text-xs uppercase tracking-wider text-white/80">Menuju {nextPrayer || '...'}</p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-widest text-white">{countdown}</p>
      </div>

      {/* Kolom Emas - Golden Motivation */}
      <div className="rounded-xl p-4 shadow-sm gold-gradient text-accent-foreground">
        <p className="text-sm font-bold flex items-center gap-2 mb-1">
          {goldenMotivation.motivation.icon} {goldenMotivation.title || 'Motivasi Harian'}
        </p>
        <p className="text-xs leading-relaxed">
          {goldenMotivation.motivation.text}
        </p>
      </div>

      {/* Prayer Times */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Jadwal Sholat Hari Ini</h2>
        {prayerLoading ? (
          <p className="text-sm text-muted-foreground">Memuat jadwal...</p>
        ) : timings ? (
          <div className="space-y-2">
            {visibleKeys.map((key) => {
              const displayTime = getAdjustedTime(key);
              if (!displayTime) return null;
              const isNext = PRAYER_NAMES[key] === nextPrayer;
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                    isNext ? 'bg-accent/15 text-accent font-semibold' : 'text-foreground'
                  }`}
                >
                  <span className="text-sm">{PRAYER_NAMES[key]}</span>
                  <span className="font-mono text-sm">{displayTime}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Gagal memuat jadwal sholat</p>
        )}
      </div>

      {/* Motivasi */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">{motivation.icon}</span>
          <p className="text-sm text-muted-foreground italic leading-relaxed">"{motivation.text}"</p>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-foreground">📅 Acara Mendatang</h2>
          <div className="space-y-2">
            {upcomingEvents.map((ev) => {
              const isToday_ = ev.date === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              return (
                <button
                  key={ev.id}
                  onClick={() => navigate(`/calendar/${ev.date}`)}
                  className="flex w-full items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5 text-left transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {isToday_ ? 'Hari ini' : new Date(ev.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }).replace('Min', 'Aha')} • {ev.time}
                      {ev.location ? ` • ${ev.location}` : ''}
                    </p>
                  </div>
                  <div className="ml-2 shrink-0 rounded-md bg-accent/15 px-2 py-1">
                    <span className="font-mono text-xs font-semibold text-accent">{ev.countdownStr}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
