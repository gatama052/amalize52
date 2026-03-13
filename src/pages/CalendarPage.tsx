import SEOHead from '@/components/SEOHead';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { useMonthlyPrayer } from '@/hooks/usePrayerTimes';
import { ISLAMIC_DATES, NATIONAL_DATES, HIJRI_MONTHS } from '@/data/important-dates';

const DAY_NAMES = ['Aha', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTH_NAMES = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export default function CalendarPage() {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { location: loc } = useUserLocation();
  const { data: monthlyData, loading } = useMonthlyPrayer(loc?.latitude, loc?.longitude, year, month + 1);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const hijriMap: Record<number, { day: string; month: number; year: string }> = {};
  monthlyData.forEach((d) => {
    const gDay = parseInt(d.date.gregorian.day);
    hijriMap[gDay] = { day: d.date.hijri.day, month: d.date.hijri.month.number, year: d.date.hijri.year };
  });

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const getEvent = (day: number) => {
    const gKey = `${month + 1}-${day}`;
    const natEvent = NATIONAL_DATES[gKey];
    const h = hijriMap[day];
    if (h) {
      const hKey = `${h.month}-${h.day}`;
      const islamEvent = ISLAMIC_DATES[hKey];
      if (islamEvent) return islamEvent;
    }
    return natEvent || null;
  };

  const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isFriday = (day: number) => new Date(year, month, day).getDay() === 5;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prev} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground">{MONTH_NAMES[month]}</h2>
          <p className="text-xs text-muted-foreground">{year}</p>
        </div>
        <button onClick={next} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* Day names */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {DAY_NAMES.map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const event = getEvent(day);
          const h = hijriMap[day];
          const today_ = isToday(day);
          const friday = isFriday(day);
          return (
            <button
              key={i}
              onClick={() => navigate(`/calendar/${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
              className={`relative flex flex-col items-center rounded-lg p-1.5 text-xs transition-colors hover:bg-secondary ${
                today_ ? 'bg-accent text-accent-foreground font-bold' :
                friday ? 'text-accent' :
                event ? 'bg-accent/10' : 'text-foreground'
              }`}
            >
              <span className="text-sm">{day}</span>
              {h && <span className="text-[9px] text-muted-foreground">{h.day}</span>}
              {event && (
                <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Events list */}
      {loading ? (
        <p className="mt-4 text-center text-sm text-muted-foreground">Memuat data hijriah...</p>
      ) : (
        <div className="mt-4 space-y-2">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1)
            .filter((d) => getEvent(d))
            .map((d) => {
              const event = getEvent(d)!;
              const h = hijriMap[d];
              return (
                <div key={d} className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-sm">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                    event.type === 'islamic' ? 'bg-accent/20 text-accent' : 'bg-secondary text-foreground'
                  }`}>
                    {d}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.name}</p>
                    {h && <p className="text-xs text-muted-foreground">{h.day} {HIJRI_MONTHS[h.month]} {h.year} H</p>}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
