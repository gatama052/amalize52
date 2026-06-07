import type { EventAlarmState } from '@/hooks/useEventAlarm';
import AudioVisualizer from './AudioVisualizer';

interface EventReminderOverlayProps {
  state: EventAlarmState;
  isPlaying: boolean;
  onStop: () => void;
  onSnooze: () => void;
}

export default function EventReminderOverlay({ state, isPlaying, onStop, onSnooze }: EventReminderOverlayProps) {
  if (!state.active || !state.event) return null;

  const ev = state.event;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center event-alarm-bg">
      <div className="absolute inset-0 islamic-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full event-alarm-glow animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm">
        {/* Icon */}
        <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2 2" />
            <path d="M5 3L2 6" />
            <path d="M22 6l-3-3" />
            <path d="M6.38 18.7L4 21" />
            <path d="M17.64 18.67L20 21" />
          </svg>
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">
          Pengingat Acara
        </p>

        {/* Event name */}
        <h1 className="text-3xl font-bold text-foreground tracking-wide mb-2">
          {ev.title}
        </h1>

        {/* Location */}
        {ev.location && (
          <p className="text-muted-foreground text-sm mb-2">
            📍 {ev.location}
          </p>
        )}

        {/* Time */}
        <p className="text-5xl font-mono font-bold text-primary mb-4">
          {ev.time}
        </p>

        {/* Notes */}
        {ev.notes && (
          <p className="text-muted-foreground text-xs mb-6">
            {ev.notes}
          </p>
        )}

        {/* Sound wave */}
        {isPlaying && (
          <div className="flex items-end gap-1 mb-10 h-8">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-primary/70 rounded-full"
                style={{
                  height: `${h * 6}px`,
                  animation: `soundWave 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}

        {!isPlaying && <div className="mb-10" />}

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={onSnooze}
            className="flex-1 rounded-xl py-3.5 px-4 text-sm font-semibold bg-muted text-foreground border border-border active:scale-95 transition-transform"
          >
            ⏰ Tunda 5 Menit
          </button>
          <button
            onClick={onStop}
            className="flex-1 rounded-xl py-3.5 px-4 text-sm font-semibold bg-primary text-primary-foreground active:scale-95 transition-transform"
          >
            ⏹ Hentikan
          </button>
        </div>
      </div>
    </div>
  );
}
