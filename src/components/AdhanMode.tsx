import type { AdhanModeState } from '@/hooks/useAzanNotification';
import mosqueLogo from '@/assets/mosque-logo.png';
import AudioVisualizer from './AudioVisualizer';

interface AdhanModeProps {
  state: AdhanModeState;
  isPlaying: boolean;
  onStop: () => void;
  onSnooze: () => void;
}

export default function AdhanMode({ state, isPlaying, onStop, onSnooze }: AdhanModeProps) {
  if (!state.active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center adhan-bg">
      <div className="absolute inset-0 islamic-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full adhan-glow animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm">
        {/* Mosque icon */}
        <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <img src={mosqueLogo} alt="Masjid" className="w-14 h-14 object-contain" />
        </div>

        {/* Prayer name */}
        <h1 className="text-4xl font-bold text-foreground tracking-wide mb-2">
          {state.prayerName}
        </h1>

        {/* Time */}
        <p className="text-5xl font-mono font-bold text-primary mb-4">
          {state.prayerTime}
        </p>

        {/* Status */}
        <p className="text-muted-foreground text-sm mb-10">
          {isPlaying ? 'Adzan sedang berkumandang...' : 'Waktu sholat telah tiba'}
        </p>

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

        {/* Button */}
        <div className="w-full">
          <button
            onClick={onStop}
            className="w-full rounded-xl py-3.5 px-4 text-sm font-semibold bg-primary text-primary-foreground active:scale-95 transition-transform"
          >
            ⏹ Hentikan
          </button>
        </div>
      </div>
    </div>
  );
}
