import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { HIJRI_MONTHS } from '@/data/important-dates';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  time: string;
  location?: string;
  notes?: string;
  reminderMinutes: number; // 0 = tepat waktu, 5, 15, 30, 60, etc.
  reminded?: boolean;
}

export default function DailyDetail() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const dateObj = date ? new Date(date + 'T00:00:00') : new Date();
  const { location: loc } = useUserLocation();
  const { hijri } = usePrayerTimes(loc?.latitude, loc?.longitude, dateObj);

  const [allEvents, setAllEvents] = useLocalStorage<CalendarEvent[]>('deenflow_events', []);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderMinutes, setReminderMinutes] = useState(0);

  const dayEvents = allEvents
    .filter((e) => e.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));

  const resetForm = () => {
    setTitle(''); setTime('09:00'); setLocation(''); setNotes(''); setReminderMinutes(0); setEditId(null);
  };

  const openAdd = () => { resetForm(); setShowForm(true); };

  const openEdit = (ev: CalendarEvent) => {
    setTitle(ev.title); setTime(ev.time); setLocation(ev.location || ''); setNotes(ev.notes || ''); setReminderMinutes(ev.reminderMinutes); setEditId(ev.id);
    setShowForm(true);
  };

  const save = () => {
    if (!title.trim() || !date) return;
    if (editId) {
      setAllEvents(allEvents.map((e) => e.id === editId ? { ...e, title, time, location, notes, reminderMinutes, reminded: false } : e));
    } else {
      const newEvent: CalendarEvent = { id: Date.now().toString(), date, title, time, location, notes, reminderMinutes, reminded: false };
      setAllEvents([...allEvents, newEvent]);
    }
    setShowForm(false); resetForm();
  };

  const remove = (id: string) => {
    setAllEvents(allEvents.filter((e) => e.id !== id));
  };

  const REMINDER_OPTIONS = [
    { value: 0, label: 'Tepat waktu' },
    { value: 5, label: '5 menit sebelum' },
    { value: 15, label: '15 menit sebelum' },
    { value: 30, label: '30 menit sebelum' },
    { value: 60, label: '1 jam sebelum' },
    { value: 120, label: '2 jam sebelum' },
  ];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Back */}
      <button onClick={() => navigate('/calendar')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        Kembali
      </button>

      {/* Date header */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <h2 className="text-lg font-bold text-foreground">
          {dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
        {hijri && (
          <p className="mt-1 text-sm text-accent">{hijri.day} {HIJRI_MONTHS[hijri.month.number]} {hijri.year} H</p>
        )}
      </div>

      {/* Event list */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Acara Hari Ini</h3>
          <button onClick={openAdd} className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/80">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Tambah
          </button>
        </div>

        {dayEvents.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Belum ada acara. Tekan ➕ untuk menambahkan.</p>
        ) : (
          <div className="space-y-2">
            {dayEvents.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3 rounded-lg bg-secondary p-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/20 text-xs font-bold text-accent">
                  {ev.time.substring(0, 5)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{ev.title}</p>
                  {ev.location && <p className="text-xs text-muted-foreground">📍 {ev.location}</p>}
                  {ev.notes && <p className="text-xs text-muted-foreground mt-0.5">{ev.notes}</p>}
                  <p className="text-[10px] text-accent mt-1">
                    🔔 {REMINDER_OPTIONS.find((r) => r.value === ev.reminderMinutes)?.label || `${ev.reminderMinutes} menit sebelum`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(ev)} className="rounded p-1 text-muted-foreground hover:text-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                  <button onClick={() => remove(ev.id)} className="rounded p-1 text-muted-foreground hover:text-destructive">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{editId ? 'Edit Acara' : 'Tambah Acara'}</h3>

          <div>
            <label className="text-xs text-muted-foreground">Tanggal</label>
            <p className="text-sm font-medium text-foreground">{dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Judul Acara *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Rapat keluarga"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Jam</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Lokasi (opsional)</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Contoh: Bojonegoro"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Catatan (opsional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Catatan tambahan..." rows={2}
              className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Pengingat</label>
            <select value={reminderMinutes} onChange={(e) => setReminderMinutes(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
              {REMINDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-1">
            <button onClick={save} disabled={!title.trim()}
              className="flex-1 rounded-lg bg-accent py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/80 disabled:opacity-40">
              {editId ? 'Simpan' : 'Tambah Acara'}
            </button>
            <button onClick={() => { setShowForm(false); resetForm(); }}
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary">
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
