import { useState, useMemo, useCallback, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import InsightCard from '@/components/tracker/InsightCard';
import CelebrationOverlay from '@/components/tracker/CelebrationOverlay';

const BASE_ITEMS = [
  { id: 'subuh', label: 'Sholat Subuh' },
  { id: 'dzuhur', label: 'Sholat Dzuhur' },
  { id: 'ashar', label: 'Sholat Ashar' },
  { id: 'maghrib', label: 'Sholat Maghrib' },
  { id: 'isya', label: 'Sholat Isya' },
  { id: 'tilawah', label: 'Tilawah Al-Quran' },
];

const OPTIONAL_ITEMS = [
  { id: 'rawatib', label: 'Sunnah Rawatib' },
  { id: 'dhuha', label: 'Sholat Dhuha' },
  { id: 'dzikir', label: 'Dzikir Pagi/Petang' },
  { id: 'sedekah', label: 'Sedekah' },
];

const RAMADAN_ITEMS = [
  { id: 'puasa', label: 'Puasa Ramadhan' },
  { id: 'tarawih', label: 'Sholat Tarawih' },
  { id: 'itikaf', label: "I'tikaf" },
  { id: 'khatam', label: 'Khatam Al-Quran' },
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

export default function TrackerPage() {
  const today = new Date();
  const todayStr = dateStr(today);
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>(`tracker_${todayStr}`, {});
  const [customItems, setCustomItems] = useLocalStorage<CustomItem[]>('deenflow_custom_ibadah', []);
  const [showSettings, setShowSettings] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const celebratedRef = useRef(false);
  const { location: loc } = useUserLocation();
  const { hijri } = usePrayerTimes(loc?.latitude, loc?.longitude);
  const isRamadan = hijri?.month.number === 9;

  const allItems = useMemo(() => {
    const items = [...BASE_ITEMS, ...OPTIONAL_ITEMS];
    if (isRamadan) items.push(...RAMADAN_ITEMS);
    return [...items, ...customItems];
  }, [isRamadan, customItems]);

  const toggle = (id: string) => {
    const newChecks = { ...checks, [id]: !checks[id] };
    setChecks(newChecks);
    // Check if all items completed after this toggle
    const newCompleted = allItems.filter((item) => newChecks[item.id]).length;
    if (newCompleted === allItems.length && allItems.length > 0 && !celebratedRef.current) {
      celebratedRef.current = true;
      setShowCelebration(true);
    }
  };
  const completed = allItems.filter((item) => checks[item.id]).length;
  const progress = allItems.length > 0 ? Math.round((completed / allItems.length) * 100) : 0;

  const uncheckedLabels = useMemo(
    () => allItems.filter((item) => !checks[item.id]).map((item) => item.label),
    [allItems, checks]
  );

  const handleCelebrationComplete = useCallback(() => setShowCelebration(false), []);

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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Tracker Ibadah</h2>
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
              <div className="absolute right-0 top-10 z-50 w-72 rounded-xl bg-card p-4 shadow-lg border border-border space-y-3 max-h-[70vh] overflow-y-auto">
                <p className="text-xs font-semibold text-foreground">Kelola Checklist</p>
                {/* Add custom */}
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
                {/* Custom items with delete */}
                {customItems.length > 0 && (
                  <div className="space-y-1 border-t border-border pt-2">
                    <p className="text-[10px] text-muted-foreground">Ibadah Kustom</p>
                    {customItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-1">
                        <span className="text-sm text-foreground">{item.label}</span>
                        <button onClick={() => removeCustomItem(item.id)} className="rounded p-1 text-muted-foreground hover:text-destructive">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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

      {/* Insight Card */}
      <InsightCard
        completed={completed}
        total={allItems.length}
        progress={progress}
        uncheckedLabels={uncheckedLabels}
      />

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
