import { useState, useEffect, useRef } from 'react';

interface CalibrationScreenProps {
  onCalibrated: () => void;
}

export default function CalibrationScreen({ onCalibrated }: CalibrationScreenProps) {
  const [accuracy, setAccuracy] = useState<'low' | 'medium' | 'high'>('low');
  const [progress, setProgress] = useState(0);
  const stableCount = useRef(0);
  const lastHeading = useRef<number | null>(null);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;
      if ((e as any).webkitCompassHeading != null) {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha != null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading == null || isNaN(heading)) return;

      if (lastHeading.current !== null) {
        let diff = Math.abs(heading - lastHeading.current);
        if (diff > 180) diff = 360 - diff;

        if (diff < 8) {
          stableCount.current++;
        } else {
          stableCount.current = Math.max(0, stableCount.current - 2);
        }

        const p = Math.min(100, (stableCount.current / 30) * 100);
        setProgress(p);

        if (stableCount.current > 10) setAccuracy('medium');
        if (stableCount.current > 20) setAccuracy('high');
        if (stableCount.current >= 30) {
          onCalibrated();
        }
      }
      lastHeading.current = heading;
    };

    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
    }
    window.addEventListener('deviceorientation', handleOrientation, true);

    // Auto-skip after 6 seconds on desktop or if no sensor
    const timeout = setTimeout(() => onCalibrated(), 6000);

    return () => {
      if ('ondeviceorientationabsolute' in window) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
      }
      window.removeEventListener('deviceorientation', handleOrientation, true);
      clearTimeout(timeout);
    };
  }, [onCalibrated]);

  const dotColor = accuracy === 'high' ? 'bg-green-500' : accuracy === 'medium' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 animate-fade-in px-4">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-foreground">Kalibrasi Kompas</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Agar arah kiblat lebih akurat, gerakkan ponsel membentuk angka 8 di udara.
        </p>
      </div>

      {/* Figure 8 Animation */}
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Figure 8 path */}
          <path
            d="M100,100 C100,60 140,30 140,70 C140,110 100,100 100,100 C100,100 60,90 60,130 C60,170 100,140 100,100"
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.2)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Animated dot */}
          <circle r="8" fill="hsl(var(--accent))">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              path="M100,100 C100,60 140,30 140,70 C140,110 100,100 100,100 C100,100 60,90 60,130 C60,170 100,140 100,100"
            />
          </circle>
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, hsl(43 65% 52% / 0.1) 0%, transparent 70%)' }} />
      </div>

      {/* Progress */}
      <div className="w-full max-w-xs space-y-3">
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColor} transition-colors`} />
          <span className="text-xs text-muted-foreground">
            {accuracy === 'high' ? 'Akurasi Tinggi' : accuracy === 'medium' ? 'Akurasi Sedang' : 'Mengkalibrasi...'}
          </span>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={onCalibrated}
        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
      >
        Lewati kalibrasi
      </button>
    </div>
  );
}
