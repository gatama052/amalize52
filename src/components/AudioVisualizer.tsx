import { useEffect, useRef, useState } from 'react';
import { getAnalyser } from '@/lib/audioBus';

interface AudioVisualizerProps {
  active: boolean;
  size?: number;
  bars?: number;
}

/**
 * Diamond (belah ketupat) shaped audio visualizer.
 * Defensive: never throws — falls back to an animated diamond if the
 * AudioContext / analyser is unavailable.
 */
export default function AudioVisualizer({ active, size = 180, bars = 21 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const fallbackRef = useRef(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx2d: CanvasRenderingContext2D | null = null;
    let analyser: AnalyserNode | null = null;
    let data: Uint8Array | null = null;

    try {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(size * dpr));
      canvas.height = Math.max(1, Math.floor(size * dpr));
      ctx2d = canvas.getContext('2d');
      if (!ctx2d) return;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    } catch {
      return;
    }

    try {
      analyser = getAnalyser();
      data = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      analyser = null;
      data = null;
    }

    const cssColor = (v: string, fallback: string) => {
      try {
        const c = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
        return c || fallback;
      } catch {
        return fallback;
      }
    };

    const draw = () => {
      try {
        if (!ctx2d) return;
        const levels: number[] = new Array(bars).fill(0);

        if (analyser && data) {
          try {
            // @ts-ignore - lib.dom typing varies between TS versions
            analyser.getByteFrequencyData(data);
            const step = Math.max(1, Math.floor(data.length / bars));
            for (let i = 0; i < bars; i++) {
              let sum = 0;
              for (let j = 0; j < step; j++) sum += data[i * step + j] || 0;
              levels[i] = (sum / step) / 255;
            }
          } catch {
            // ignore — fall back below
          }
        }

        const avg = levels.reduce((a, b) => a + b, 0) / bars;
        if (avg < 0.04) {
          fallbackRef.current += 0.08;
          const t = fallbackRef.current;
          for (let i = 0; i < bars; i++) {
            levels[i] = 0.25 + 0.18 * Math.sin(t + i * 0.45);
          }
        } else {
          fallbackRef.current = 0;
        }

        const W = size;
        const H = size;
        ctx2d.clearRect(0, 0, W, H);

        const primary = cssColor('--primary', '210 90% 60%');
        const accent = cssColor('--accent', '45 95% 55%');

        // Diamond guideline
        ctx2d.save();
        ctx2d.translate(W / 2, H / 2);
        ctx2d.rotate(Math.PI / 4);
        ctx2d.strokeStyle = `hsla(${primary}, 0.18)`;
        ctx2d.lineWidth = 1;
        const guide = size * 0.62;
        ctx2d.strokeRect(-guide / 2, -guide / 2, guide, guide);
        ctx2d.restore();

        const usable = size * 0.86;
        const barW = (usable / bars) * 0.55;
        const gap = usable / bars;
        const maxBarH = size * 0.42;
        const cx = W / 2;
        const cy = H / 2;
        const mid = (bars - 1) / 2;

        for (let i = 0; i < bars; i++) {
          const env = 1 - Math.abs(i - mid) / mid;
          const lvl = Math.min(1, levels[i]);
          const h = Math.max(2, maxBarH * env * (0.25 + 0.85 * lvl));
          const x = cx - usable / 2 + gap * (i + 0.5) - barW / 2;

          const grad = ctx2d.createLinearGradient(0, cy - h, 0, cy + h);
          grad.addColorStop(0, `hsl(${accent})`);
          grad.addColorStop(0.5, `hsl(${primary})`);
          grad.addColorStop(1, `hsl(${accent})`);
          ctx2d.fillStyle = grad;

          const radius = barW / 2;
          roundRect(ctx2d, x, cy - h, barW, h * 2, radius);
          ctx2d.fill();
        }

        const glow = ctx2d.createRadialGradient(cx, cy, 0, cx, cy, size * 0.18);
        glow.addColorStop(0, `hsla(${accent}, 0.35)`);
        glow.addColorStop(1, `hsla(${accent}, 0)`);
        ctx2d.fillStyle = glow;
        ctx2d.fillRect(0, 0, W, H);

        rafRef.current = requestAnimationFrame(draw);
      } catch (err) {
        // Stop the loop on unexpected error; show CSS fallback instead.
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        setFailed(true);
        // eslint-disable-next-line no-console
        console.warn('[AudioVisualizer] draw error', err);
      }
    };

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [active, size, bars]);

  if (!active) return null;

  // CSS-only fallback so the overlay is never empty/black
  if (failed) {
    return (
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
        aria-hidden
      >
        <div
          style={{ width: size * 0.62, height: size * 0.62 }}
          className="rotate-45 rounded-md border border-primary/30 bg-primary/10 animate-pulse"
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="block"
    />
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
