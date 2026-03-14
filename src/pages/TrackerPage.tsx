import SEOHead from '@/components/SEOHead';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import TrackerCelebration from '@/components/TrackerCelebration';

const WAJIB_ITEMS = [
  { id: 'subuh', label: 'Sholat Subuh' },
  { id: 'dzuhur', label: 'Sholat Dzuhur' },
  { id: 'ashar', label: 'Sholat Ashar' },
  { id: 'maghrib', label: 'Sholat Maghrib' },
  { id: 'isya', label: 'Sholat Isya' },
];

const AVAILABLE_OPTIONAL = [
  { id: 'tilawah', label: 'Tilawah Al-Quran' },
  { id: 'tahajud', label: 'Sholat Tahajud' },
  { id: 'rawatib', label: 'Sunnah Rawatib' },
  { id: 'dhuha', label: 'Sholat Dhuha' },
  { id: 'dzikir_pagi', label: 'Dzikir Pagi' },
  { id: 'dzikir_petang', label: 'Dzikir Petang' },
  { id: 'sedekah', label: 'Sedekah' },
];

const RAMADAN_WAJIB = [
  { id: 'puasa', label: 'Puasa Ramadhan' },
];

const RAMADAN_OPTIONAL = [
  { id: 'tarawih', label: 'Sholat Tarawih' },
  { id: 'khataman', label: 'Khataman (Baca Al-Quran per Juz)' },
  { id: 'itikaf', label: "I'tikaf" },
];

interface CustomItem {
  id: string;
  label: string;
}

function dateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
}

const DAY_SHORT = ['Aha', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function TrackerPage() {
  const today = new Date();
  const isFriday = today.getDay() === 5;
  const todayStr = dateStr(today);
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>(`tracker_${todayStr}`, {});
  const [enabledOptional, setEnabledOptional] = useLocalStorage<string[]>('amalize_enabled_optional', []);
  const [customItems, setCustomItems] = useLocalStorage<CustomItem[]>('deenflow_custom_ibadah', []);
  const [showSettings, setShowSettings] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedToday, setCelebratedToday] = useLocalStorage<string>('amalize_celebrated_date', '');
  const hasCelebratedRef = useRef(celebratedToday === todayStr);
  const { location: loc } = useUserLocation();
  const { hijri } = usePrayerTimes(loc?.latitude, loc?.longitude);
  const isRamadan = hijri?.month.number === 9;

  const wajibItems = useMemo(() => {
    return WAJIB_ITEMS.map(item => {
      if (item.id === 'dzuhur' && isFriday) {
        return { ...item, label: 'Sholat Dzuhur/Jum\'at' };
      }
      return item;
    });
  }, [isFriday]);

  const allOptionalAvailable = useMemo(() => {
    const items = [...AVAILABLE_OPTIONAL];
    if (isRamadan) items.push(...RAMADAN_OPTIONAL);
    return items;
  }, [isRamadan]);

  const allItems = useMemo(() => {
    const items = [...wajibItems];
    if (isRamadan) items.push(...RAMADAN_WAJIB);
    const optionalInTracker = allOptionalAvailable.filter(item => enabledOptional.includes(item.id));
    items.push(...optionalInTracker);
    items.push(...customItems);
    return items;
  }, [wajibItems, isRamadan, enabledOptional, allOptionalAvailable, customItems]);

  const toggle = (id: string) => setChecks({ ...checks, [id]: !checks[id] });
  const completed = allItems.filter((item) => checks[item.id]).length;
  const progress = allItems.length > 0 ? Math.round((completed / allItems.length) * 100) : 0;

  // Celebration trigger
  useEffect(() => {
    if (progress === 100 && allItems.length > 0 && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      setCelebratedToday(todayStr);
      setShowCelebration(true);
    }
  }, [progress, allItems.length, todayStr, setCelebratedToday]);

  const toggleOptional = (id: string) => {
    if (enabledOptional.includes(id)) {
      setEnabledOptional(enabledOptional.filter(i => i !== id));
      const newChecks = { ...checks };
      delete newChecks[id];
      setChecks(newChecks);
    } else {
      setEnabledOptional([...enabledOptional, id]);
    }
  };

  const addCustomItem = () => {
    const label = newLabel.trim();
    if (!label) return;
    const id = `custom_${Date.now()}`;
    setCustomItems([...customItems, { id, label }]);
    setNewLabel('');
  };

  const removeCustomItem = (id: string) => {
    setCustomItems(customItems.filter((item) => item.id !== id));
    const newChecks = { ...checks };
    delete newChecks[id];
    setChecks(newChecks);
  };

  // Weekly recap
  const last7 = getLast7Days();
  const weeklyData = last7.map((d) => {
    const key = `tracker_${dateStr(d)}`;
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return 0;
      const data = JSON.parse(stored);
      const checked = Object.values(data).filter(Boolean).length;
      return Math.round((checked / allItems.length) * 100);
    } catch {
      return 0;
    }
  });

  // Monthly recap
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const monthlyCompleted = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), i + 1);
    if (d > today) return -1;
    const key = `tracker_${dateStr(d)}`;
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return 0;
      const data = JSON.parse(stored);
      return Object.values(data).filter(Boolean).length;
    } catch {
      return 0;
    }
  });
  const activeDays = monthlyCompleted.filter((v) => v > 0).length;
  const totalPast = monthlyCompleted.filter((v) => v >= 0).length;
  const monthlyPercent = totalPast > 0 ? Math.round((activeDays / totalPast) * 100) : 0;

  return (
    <div className="animate-fade-in space-y-4">
      <SEOHead title="Tracker Ibadah Harian — Amalize | Pantau Progress Ibadahmu" description="Tracker Ibadah pada Amalize membantu pengguna memantau ibadah harian seperti sholat 5 waktu dan ibadah lainnya agar lebih konsisten." path="/tracker" />
      {showCelebration && (
        <TrackerCelebration onClose={() => setShowCelebration(false)} />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Tracker Ibadah</h2>
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
              <div className="absolute right-0 top-10 z-50 w-80 rounded-xl bg-card p-4 shadow-lg border border-border space-y-3 max-h-[70vh] overflow-y-auto">
                <p className="text-xs font-semibold text-foreground">Kelola Checklist</p>

                {/* Available optional items */}
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Rekomendasi Ibadah</p>
                  {allOptionalAvailable.map(item => {
                    const isEnabled = enabledOptional.includes(item.id);
                    return (
                      <div key={item.id} className="flex items-center justify-between py-1.5 px-1">
                        <span className="text-sm text-foreground">{item.label}</span>
                        {isEnabled ? (
                          <button
                            onClick={() => toggleOptional(item.id)}
                            className="rounded p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleOptional(item.id)}
                            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/80"
                          >+</button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Custom items */}
                <div className="space-y-2 border-t border-border pt-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Ibadah Kustom</p>
                  <div className="flex gap-2">
                    <input
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
                      placeholder="Tambah ibadah baru..."
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <button
                      onClick={addCustomItem}
                      disabled={!newLabel.trim()}
                      className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/80 disabled:opacity-40"
                    >+</button>
                  </div>
                  {customItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-1 px-1">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <button onClick={() => removeCustomItem(item.id)} className="rounded p-1 text-muted-foreground hover:text-destructive transition-colors">
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace('Minggu', 'Ahad')}
      </p>

      {/* Progress */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress Hari Ini</span>
          <span className="text-2xl font-bold text-accent">{progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-accent transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{completed}/{allItems.length} ibadah tercatat</p>
      </div>

      {/* Checklist */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Checklist Harian</h3>
        <div className="space-y-1">
          {allItems.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors">
              <input
                type="checkbox"
                checked={checks[item.id] || false}
                onChange={() => toggle(item.id)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              <span className={`flex-1 text-sm ${checks[item.id] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Weekly chart */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Rekap Mingguan</h3>
        <div className="flex items-end justify-between gap-1" style={{ height: 100 }}>
          {last7.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t bg-secondary relative" style={{ height: 80 }}>
                <div
                  className="absolute bottom-0 w-full rounded-t bg-accent transition-all duration-500"
                  style={{ height: `${weeklyData[i]}%` }}
                />
              </div>
              <span className={`text-[10px] ${dateStr(d) === todayStr ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                {DAY_SHORT[d.getDay()]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly recap */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Rekap Bulanan</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Konsistensi ibadah</span>
          <span className="text-lg font-bold text-accent">{monthlyPercent}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${monthlyPercent}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{activeDays} dari {totalPast} hari aktif beribadah</p>
      </div>
    </div>
  );
}
