import { useState, useCallback, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { doaList, alMatsuratList, doaSholatGroups, DOA_CATEGORIES, type Doa, type DoaSholatGroup, type AlMatsuratItem } from '@/data/doa';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Build Fuse indexes once
const fuseDoaList = new Fuse(doaList, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'keywords', weight: 1.5 },
    { name: 'arabic', weight: 0.5 },
    { name: 'latin', weight: 0.5 },
    { name: 'translation', weight: 0.8 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

const fuseSholatGroups = new Fuse(doaSholatGroups, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'items.subtitle', weight: 1 },
    { name: 'items.arabic', weight: 0.5 },
    { name: 'items.latin', weight: 0.5 },
    { name: 'items.translation', weight: 0.8 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

// Priority search: exact > partial > fuzzy
function prioritySearch<T extends { id?: string }>(fuse: Fuse<T>, items: T[], query: string, titleKey: string): T[] {
  const q = query.toLowerCase();

  // Priority 1: Exact title match
  const exactMatches = items.filter(item => {
    const title = ((item as any)[titleKey] || '').toLowerCase();
    return title === q || title.includes(q);
  });

  // Priority 2: Partial match - all query words appear somewhere in title
  const queryWords = q.split(/\s+/).filter(w => w.length > 0);
  const partialMatches = items.filter(item => {
    const title = ((item as any)[titleKey] || '').toLowerCase();
    return queryWords.every(w => title.includes(w)) && !exactMatches.includes(item);
  });

  // Priority 3: Fuzzy match via Fuse.js
  const fuzzyResults = fuse.search(query)
    .sort((a, b) => (a.score || 1) - (b.score || 1))
    .map(r => r.item);

  // Merge with deduplication, preserving priority order
  const seen = new Set<string>();
  const result: T[] = [];
  for (const list of [exactMatches, partialMatches, fuzzyResults]) {
    for (const item of list) {
      const id = (item as any).id;
      if (id && !seen.has(id)) {
        seen.add(id);
        result.push(item);
      }
    }
  }
  return result;
}

export default function DoaPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [favorites, setFavorites] = useLocalStorage<string[]>('doa_favorites', []);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [arabicSize, setArabicSize] = useLocalStorage<number>('doa_arabic_size', 24);
  const [showLatin, setShowLatin] = useLocalStorage<boolean>('doa_show_latin', true);
  const [showTranslation, setShowTranslation] = useLocalStorage<boolean>('doa_show_translation', true);
  const [focusMode, setFocusMode] = useLocalStorage<boolean>('doa_focus_mode', false);
  const [focusVersion, setFocusVersion] = useState<1 | 2>(1);
  const [focusDzikirTime, setFocusDzikirTime] = useState<'pagi' | 'petang'>('pagi');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleFav = (id: string) => {
    setFavorites(favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]);
  };

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  }, []);

  const sq = searchQuery.trim().toLowerCase();

  // --- Smart search with Fuse.js ---
  const { filtered, filteredGroups } = useMemo(() => {
    const seenIds = new Set<string>();

    let doaResults: Doa[];
    let groupResults: DoaSholatGroup[];

    if (sq) {
      // Use priority search: exact > partial > fuzzy
      doaResults = prioritySearch(fuseDoaList, doaList, sq, 'title');
      groupResults = prioritySearch(fuseSholatGroups, doaSholatGroups, sq, 'title');
    } else {
      doaResults = doaList;
      groupResults = doaSholatGroups;
    }

    const finalDoa = doaResults.filter((d) => {
      if (seenIds.has(d.id)) return false;
      if (showFavOnly && !favorites.includes(d.id)) return false;
      if (activeCategory !== 'Semua' && d.category !== activeCategory) return false;
      seenIds.add(d.id);
      return true;
    });

    const finalGroups = groupResults.filter((g) => {
      if (seenIds.has(g.id)) return false;
      if (showFavOnly && !favorites.includes(g.id)) return false;
      if (activeCategory !== 'Semua' && g.category !== activeCategory) return false;
      seenIds.add(g.id);
      return true;
    });

    return { filtered: finalDoa, filteredGroups: finalGroups };
  }, [sq, showFavOnly, favorites, activeCategory]);

  const showAlMatsurat = !showFavOnly && (activeCategory === 'Dzikir Pagi & Petang') && !sq;
  const showAlMatsuratBySearch = !showFavOnly && sq && ('dzikir pagi petang'.includes(sq) || 'al-matsurat'.includes(sq) || 'al matsurat'.includes(sq));

  // Focus mode only available for dzikir pagi/petang and doa sholat
  const canFocus = activeCategory === 'Dzikir Pagi & Petang' || activeCategory === 'Doa Sholat';

  // Focus mode: full page clean view
  if (focusMode && canFocus) {
    const isSholat = activeCategory === 'Doa Sholat';

    return (
      <div className="animate-fade-in">
        {/* Minimal header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Mode Fokus</h2>
          <button
            onClick={() => setFocusMode(false)}
            className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
          >
            Keluar
          </button>
        </div>

        {/* Version/time selector */}
        {isSholat ? (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFocusVersion(1)}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${focusVersion === 1 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}
            >
              Versi 1
            </button>
            <button
              onClick={() => setFocusVersion(2)}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${focusVersion === 2 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}
            >
              Versi 2
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFocusDzikirTime('pagi')}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${focusDzikirTime === 'pagi' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}
            >
              ☀️ Dzikir Pagi
            </button>
            <button
              onClick={() => setFocusDzikirTime('petang')}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${focusDzikirTime === 'petang' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}
            >
              🌙 Dzikir Petang
            </button>
          </div>
        )}

        {/* Font size control */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={() => setArabicSize(Math.max(16, arabicSize - 2))} className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold text-foreground">−</button>
          <span className="text-xs text-muted-foreground">Ukuran: {arabicSize}</span>
          <button onClick={() => setArabicSize(Math.min(48, arabicSize + 2))} className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold text-foreground">+</button>
        </div>

        {/* Clean continuous content */}
        <div className="space-y-0">
          {/* Al-Matsurat in focus (only for dzikir pagi/petang) */}
          {!isSholat && (
            <>
              <h3 className="text-center text-sm font-semibold text-accent border-b border-border pb-2 mb-6">
                {focusDzikirTime === 'pagi' ? '☀️ Dzikir Pagi' : '🌙 Dzikir Petang'}
              </h3>
              {alMatsuratList.map((item, idx) => {
                const isEvening = focusDzikirTime === 'petang';
                const displayArabic = isEvening && item.evening ? item.evening.arabic : item.arabic;
                return (
                  <div key={item.id}>
                    <div className="py-4 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground text-center">{idx + 1}. {item.title}</p>
                      {item.note && (
                        <p className="text-[10px] text-muted-foreground text-center">
                          {isEvening && item.evening ? 'Dibaca ketika sore hari' : item.note}
                        </p>
                      )}
                      <p className="text-right font-serif leading-[2] text-foreground" style={{ fontSize: arabicSize }} dir="rtl">{displayArabic}</p>
                    </div>
                    {idx < alMatsuratList.length - 1 && <div className="border-b border-border/30" />}
                  </div>
                );
              })}
            </>
          )}

          {/* Doa sholat groups in focus with version filter */}
          {isSholat && doaSholatGroups.map((group, gIdx) => {
            const hasMultiple = group.items.length > 1;
            const itemsToShow = hasMultiple
              ? group.items.filter((_, idx) => idx === focusVersion - 1)
              : group.items;

            return (
              <div key={group.id}>
                <div className="py-4 space-y-3">
                  <p className="text-xs font-semibold text-accent text-center">{group.title}</p>
                  {group.items[0]?.subtitle && !group.items[0]?.arabic && (
                    <p className="text-xs text-muted-foreground text-center">{group.items[0].subtitle}</p>
                  )}
                  {itemsToShow.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      {item.arabic && (
                        <p className="text-right font-serif leading-[2] text-foreground" style={{ fontSize: arabicSize }} dir="rtl">{item.arabic}</p>
                      )}
                      {!item.arabic && item.subtitle && (
                        <p className="text-xs text-muted-foreground text-center italic">{item.subtitle}</p>
                      )}
                    </div>
                  ))}
                </div>
                {gIdx < doaSholatGroups.length - 1 && <div className="border-b border-border/30" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Dzikir & Do'a</h2>
        <div className="flex items-center gap-1">
          {/* Search button */}
          <button
            onClick={() => {
              const next = !searchOpen;
              setSearchOpen(next);
              if (!next) { setSearchQuery(''); }
            }}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {/* 3-dot settings menu */}
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
              <div className="absolute right-0 top-10 z-50 w-64 rounded-xl bg-card p-4 shadow-lg border border-border space-y-4">
                {/* Arabic font size */}
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Ukuran Font Arab</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setArabicSize(Math.max(16, arabicSize - 2))} className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold text-foreground hover:bg-accent/20">−</button>
                    <span className="text-sm font-mono text-foreground min-w-[2rem] text-center">{arabicSize}</span>
                    <button onClick={() => setArabicSize(Math.min(40, arabicSize + 2))} className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold text-foreground hover:bg-accent/20">+</button>
                  </div>
                </div>
                {/* Latin toggle */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground">Transliterasi Latin</p>
                  <button
                    onClick={() => setShowLatin(!showLatin)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${showLatin ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}
                  >{showLatin ? 'ON' : 'OFF'}</button>
                </div>
                {/* Translation toggle */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground">Terjemahan</p>
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${showTranslation ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}
                  >{showTranslation ? 'ON' : 'OFF'}</button>
                </div>
                {/* Focus mode */}
                {canFocus && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-foreground">Mode Fokus</p>
                      <p className="text-[10px] text-muted-foreground">Halaman penuh, Arab & judul saja</p>
                    </div>
                    <button
                      onClick={() => { setFocusMode(true); setShowSettings(false); }}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >Aktifkan</button>
                  </div>
                )}
                {!canFocus && (
                  <div className="flex items-center justify-between opacity-50">
                    <div>
                      <p className="text-xs font-medium text-foreground">Mode Fokus</p>
                      <p className="text-[10px] text-muted-foreground">Hanya untuk Dzikir Pagi & Petang / Doa Sholat</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <form onSubmit={(e) => { e.preventDefault(); }} className="relative">
          <input
            ref={searchInputRef}
            type="search"
            enterKeyHint="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari doa atau dzikir..."
            className="w-full rounded-xl bg-secondary px-4 py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/30"
            autoFocus
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {searchQuery && (
            <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </form>
      )}

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scroll-hidden pb-1">
        {['Favorit', 'Semua', ...DOA_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (cat === 'Favorit') {
                setShowFavOnly(true);
                setActiveCategory('Semua');
              } else {
                setShowFavOnly(false);
                setActiveCategory(cat);
              }
            }}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              (cat === 'Favorit' && showFavOnly) || (cat !== 'Favorit' && !showFavOnly && activeCategory === cat)
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat === 'Favorit' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill={showFavOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="inline">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ) : cat}
          </button>
        ))}
      </div>

      {/* Doa list */}
      <div className="space-y-3">
        {filtered.length === 0 && filteredGroups.length === 0 && !showAlMatsurat && !showAlMatsuratBySearch ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {showFavOnly ? 'Belum ada doa favorit' : sq ? 'Tidak ditemukan hasil pencarian' : 'Tidak ada doa di kategori ini'}
          </p>
        ) : (
          <>
            {filtered.map((doa) => (
              <DoaCard key={doa.id} doa={doa} isFav={favorites.includes(doa.id)} onToggleFav={() => toggleFav(doa.id)}
                arabicSize={arabicSize} showLatin={showLatin} showTranslation={showTranslation} />
            ))}
            {filteredGroups.map((group) => (
              <DoaGroupCard key={group.id} group={group} isFav={favorites.includes(group.id)} onToggleFav={() => toggleFav(group.id)}
                arabicSize={arabicSize} showLatin={showLatin} showTranslation={showTranslation} />
            ))}
          </>
        )}
      </div>

      {/* Al-Matsurat */}
      {(showAlMatsurat || showAlMatsuratBySearch) && (
        <AlMatsuratCard isFav={favorites.includes('al-matsurat')} onToggleFav={() => toggleFav('al-matsurat')}
          arabicSize={arabicSize} showLatin={showLatin} showTranslation={showTranslation} />
      )}
    </div>
  );
}

interface DisplayProps {
  arabicSize: number;
  showLatin: boolean;
  showTranslation: boolean;
}

/**
 * Renders Quran verse translations with properly inline verse numbers.
 */
function renderTranslation(text: string) {
  const contohMatch = text.match(/^(Contoh:\s*[^\n]+)\n\n?([\s\S]*)$/);
  if (contohMatch) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground italic">{contohMatch[1]}</p>
        {renderTranslationInner(contohMatch[2])}
      </div>
    );
  }
  return renderTranslationInner(text);
}

function renderTranslationInner(text: string) {
  const verseRegex = /(?:^|(?<=\s))(\d+)\.\s*/g;
  const matches = [...text.matchAll(verseRegex)];
  
  if (matches.length === 0) return <p className="text-sm text-foreground">{text}</p>;

  const parts: { type: 'prefix' | 'verse'; num?: string; content: string }[] = [];
  
  const firstMatchIdx = matches[0].index!;
  const prefix = text.slice(0, firstMatchIdx).trim();
  if (prefix) {
    parts.push({ type: 'prefix', content: prefix });
  }
  
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const verseNum = m[1];
    const contentStart = m.index! + m[0].length;
    const contentEnd = i < matches.length - 1 ? matches[i + 1].index! : text.length;
    const content = text.slice(contentStart, contentEnd).trim();
    parts.push({ type: 'verse', num: verseNum, content });
  }

  return (
    <div className="space-y-1.5">
      {parts.map((p, i) => (
        <p key={i} className="text-sm text-foreground">
          {p.type === 'verse' && (
            <><span className="font-semibold text-muted-foreground">{p.num}.</span>{' '}</>
          )}
          {p.type === 'prefix' && <em>{p.content}</em>}
          {p.type === 'verse' && p.content}
        </p>
      ))}
    </div>
  );
}

function AlMatsuratCard({ isFav, onToggleFav, arabicSize, showLatin, showTranslation }: { isFav: boolean; onToggleFav: () => void } & DisplayProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <button onClick={() => setExpanded(!expanded)} className="flex-1 text-left">
          <p className="text-sm font-semibold text-foreground"> Dzikir Pagi & Petang</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{alMatsuratList.length} bacaan</p>
        </button>
        <button onClick={onToggleFav} className="shrink-0 p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={isFav ? 'text-accent' : 'text-muted-foreground'}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div className="mt-3 space-y-4 border-t border-border pt-3">
          {alMatsuratList.map((item, idx) => (
            <AlMatsuratItemView key={item.id} item={item} idx={idx} arabicSize={arabicSize} showLatin={showLatin} showTranslation={showTranslation} />
          ))}
        </div>
      )}
    </div>
  );
}

function AlMatsuratItemView({ item, idx, arabicSize, showLatin, showTranslation }: { item: AlMatsuratItem; idx: number } & DisplayProps) {
  return (
    <div className="space-y-2">
      {idx > 0 && <div className="border-t border-border/50" />}
      <p className="text-xs font-semibold text-foreground">{idx + 1}. {item.title}</p>
      {item.note && <p className="text-[10px] text-accent">{item.note}</p>}
      <p className="text-right font-serif leading-loose text-foreground" style={{ fontSize: arabicSize }} dir="rtl">{item.arabic}</p>
      {showLatin && <p className="text-sm italic text-muted-foreground">{item.latin}</p>}
      {showTranslation && renderTranslation(item.translation)}
      {/* Evening variant */}
      {item.evening && (
        <div className="mt-3 pt-2 border-t border-border/30 space-y-2">
          <p className="text-[10px] text-accent">Dibaca ketika sore hari</p>
          <p className="text-right font-serif leading-loose text-foreground" style={{ fontSize: arabicSize }} dir="rtl">{item.evening.arabic}</p>
          {showLatin && <p className="text-sm italic text-muted-foreground">{item.evening.latin}</p>}
          {showTranslation && renderTranslation(item.evening.translation)}
        </div>
      )}
    </div>
  );
}

function DoaGroupCard({ group, isFav, onToggleFav, arabicSize, showLatin, showTranslation }: { group: DoaSholatGroup; isFav: boolean; onToggleFav: () => void } & DisplayProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMultipleVersions = group.items.length > 1;

  return (
    <div className="rounded-xl bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <button onClick={() => setExpanded(!expanded)} className="flex-1 text-left">
          <p className="text-sm font-semibold text-foreground">{group.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{group.category}{hasMultipleVersions ? ` • ${group.items.length} versi` : ''}</p>
        </button>
        <button onClick={onToggleFav} className="shrink-0 p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={isFav ? 'text-accent' : 'text-muted-foreground'}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div className="mt-3 space-y-4 border-t border-border pt-3">
          {group.items.map((item, idx) => (
            <div key={idx} className="space-y-2">
              {idx > 0 && <div className="border-t border-border/50" />}
              {item.subtitle && (
                <p className={`text-xs ${hasMultipleVersions ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{item.subtitle}</p>
              )}
              {item.arabic && <p className="text-right font-serif leading-loose text-foreground" style={{ fontSize: arabicSize }} dir="rtl">{item.arabic}</p>}
              {showLatin && item.latin && <p className="text-sm italic text-muted-foreground">{item.latin}</p>}
              {showTranslation && renderTranslation(item.translation)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DoaCard({ doa, isFav, onToggleFav, arabicSize, showLatin, showTranslation }: { doa: Doa; isFav: boolean; onToggleFav: () => void } & DisplayProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <button onClick={() => setExpanded(!expanded)} className="flex-1 text-left">
          <p className="text-sm font-semibold text-foreground">{doa.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{doa.category}</p>
        </button>
        <button onClick={onToggleFav} className="shrink-0 p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={isFav ? 'text-accent' : 'text-muted-foreground'}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-border pt-3">
          <p className="text-right font-serif leading-loose text-foreground" style={{ fontSize: arabicSize }} dir="rtl">{doa.arabic}</p>
          {showLatin && <p className="text-sm italic text-muted-foreground">{doa.latin}</p>}
          {showTranslation && renderTranslation(doa.translation)}
        </div>
      )}
    </div>
  );
}
