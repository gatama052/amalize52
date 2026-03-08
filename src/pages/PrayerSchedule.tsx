import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { usePrayerTimes, useMonthlyPrayer } from '@/hooks/usePrayerTimes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Compass } from 'lucide-react';

const ALL_PRAYERS = [
  { key: 'Imsak', label: 'Imsak', optional: true },
  { key: 'Fajr', label: 'Subuh', optional: false },
  { key: 'Sunrise', label: 'Terbit', optional: true },
  { key: 'Dhuha', label: 'Dhuha', optional: true },
  { key: 'Dhuhr', label: 'Dzuhur', optional: false },
  { key: 'Asr', label: 'Ashar', optional: false },
  { key: 'Maghrib', label: 'Maghrib', optional: false },
  { key: 'Isha', label: 'Isya', optional: false },
];

function addMinutes(timeStr: string, mins: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const nm = ((total % 1440) + 1440) % 1440 % 60;
  return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
}

export default function PrayerSchedule() {
  const today = new Date();
  const navigate = useNavigate();
  const { location: loc } = useUserLocation();
  const { timings, hijri, loading } = usePrayerTimes(loc?.latitude, loc?.longitude);
  const [showMonthly, setShowMonthly] = useState(false);
  const { data: monthData, loading: monthLoading } = useMonthlyPrayer(
    loc?.latitude, loc?.longitude, today.getFullYear(), today.getMonth() + 1
  );
  const [showSettings, setShowSettings] = useState(false);
  const [corrections, setCorrections] = useLocalStorage<Record<string, number>>('prayer_corrections', {});
  const [hiddenPrayers, setHiddenPrayers] = useLocalStorage<string[]>('prayer_hidden', []);

  const toggleHidden = (key: string) => {
    setHiddenPrayers(hiddenPrayers.includes(key) ? hiddenPrayers.filter(k => k !== key) : [...hiddenPrayers, key]);
  };

  const adjustCorrection = (key: string, delta: number) => {
    const current = corrections[key] || 0;
    setCorrections({ ...corrections, [key]: current + delta });
  };

  const visiblePrayers = ALL_PRAYERS.filter(p => !hiddenPrayers.includes(p.key));

  const getAdjustedTime = (key: string, rawTime?: string): string => {
    if (!rawTime) return '--:--';
    const time = rawTime.substring(0, 5);
    const corr = corrections[key] || 0;
    if (corr === 0) return time;
    return addMinutes(time, corr);
  };

  const getDhuhaTime = (): string => {
    if (!timings?.Sunrise) return '--:--';
    return addMinutes(timings.Sunrise.substring(0, 5), 15 + (corrections['Dhuha'] || 0));
  };

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Jadwal Sholat</h2>
        <div className="flex items-center gap-2">
          {/* Qibla icon only */}
          <button
            onClick={() => navigate('/qibla')}
            className="rounded-full bg-secondary p-2 text-muted-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Arah Kiblat"
          >
            <Compass size={18} />
          </button>
          {/* 3-dot settings */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            {showSettings && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
                <div className="absolute right-0 top-10 z-50 w-72 rounded-xl bg-card p-4 shadow-lg border border-border space-y-4 max-h-[70vh] overflow-y-auto">
                  <p className="text-xs font-semibold text-foreground">Koreksi Waktu (menit)</p>
                  <p className="text-[10px] leading-snug text-muted-foreground mt-1 mb-1">
                    Koreksi waktu digunakan untuk menyesuaikan jadwal sholat agar lebih akurat sesuai kondisi lokasi Anda atau mengikuti jadwal masjid setempat.
                  </p>
                  <p className="text-[10px] leading-snug text-muted-foreground mb-2">
                    Contoh: Jika Maghrib berbeda 2 menit dari masjid, tambahkan +2. Jika lebih cepat, kurangi menitnya.
                  </p>
                  {ALL_PRAYERS.map(p => (
                    <div key={p.key} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{p.label}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => adjustCorrection(p.key, -1)} className="rounded bg-secondary px-2 py-0.5 text-sm font-bold text-foreground">−</button>
                        <span className="text-xs font-mono text-foreground min-w-[2rem] text-center">{corrections[p.key] || 0}</span>
                        <button onClick={() => adjustCorrection(p.key, 1)} className="rounded bg-secondary px-2 py-0.5 text-sm font-bold text-foreground">+</button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold text-foreground mb-2">Tampilkan / Sembunyikan</p>
                    {ALL_PRAYERS.filter(p => p.optional).map(p => (
                      <label key={p.key} className="flex items-center justify-between py-1">
                        <span className="text-sm text-foreground">{p.label}</span>
                        <input
                          type="checkbox"
                          checked={!hiddenPrayers.includes(p.key)}
                          onChange={() => toggleHidden(p.key)}
                          className="h-4 w-4 accent-accent"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {loc && <p className="text-xs text-muted-foreground flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {loc.city}
      </p>}

      {/* Today */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-accent">Hari Ini</h3>
        {loading ? (
          <p className="text-sm text-muted-foreground">Memuat...</p>
        ) : timings ? (
          <div className="space-y-2">
            {visiblePrayers.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
                <span className="font-mono text-sm text-foreground">
                  {key === 'Dhuha' ? getDhuhaTime() : getAdjustedTime(key, timings[key])}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Gagal memuat</p>
        )}
      </div>

      {/* Monthly toggle */}
      <button
        onClick={() => setShowMonthly(!showMonthly)}
        className="w-full rounded-xl bg-card p-3 text-center text-sm font-medium text-accent shadow-sm hover:bg-secondary transition-colors"
      >
        {showMonthly ? 'Sembunyikan' : 'Lihat'} Jadwal Bulan Ini
      </button>

      {/* Monthly */}
      {showMonthly && (
        <div className="rounded-xl bg-card shadow-sm overflow-hidden">
          {monthLoading ? (
            <p className="p-4 text-sm text-muted-foreground">Memuat jadwal bulanan...</p>
          ) : (
            <div className="overflow-x-auto scroll-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-2 py-2 text-left text-muted-foreground font-medium">Tgl</th>
                    {visiblePrayers.map(({ label }) => (
                      <th key={label} className="px-2 py-2 text-center text-muted-foreground font-medium">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthData.map((day, i) => {
                    const isToday = parseInt(day.date.gregorian.day) === today.getDate();
                    return (
                      <tr key={i} className={`border-b border-border ${isToday ? 'bg-accent/10' : ''}`}>
                        <td className={`px-2 py-2 font-medium ${isToday ? 'text-accent' : 'text-foreground'}`}>
                          {day.date.gregorian.day}
                        </td>
                        {visiblePrayers.map(({ key }) => (
                          <td key={key} className="px-2 py-2 text-center font-mono text-muted-foreground">
                            {key === 'Dhuha'
                              ? (day.timings.Sunrise ? addMinutes(day.timings.Sunrise.substring(0, 5), 15 + (corrections['Dhuha'] || 0)) : '--:--')
                              : getAdjustedTime(key, day.timings[key])}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}