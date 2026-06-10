import { useEffect, useRef, useState } from 'react';
import { getAnalyser } from '@/lib/audioBus';

interface AudioVisualizerProps {
  active: boolean;
  size?: number;
  bars?: number;
}

/**
 * Vertical-bar audio visualizer (like the reference screenshot):
 * a few rounded gold bars that animate up/down with the audio rhythm.
 * Defensive: never throws — falls back to a synthetic animation if the
 * AudioContext / analyser is unavailable.
 */
export default function AudioVisualizer({ active, size = 180, bars = 5 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const smoothRef = useRef<number[]>(new Array(bars).fill(0));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx2d: CanvasRenderingContext2D | null = null;
    let analyser: AnalyserNode | null = null;
    let data: Uint8Array | null = null;

    const W = size;
    const H = Math.round(size * 0.6);

    try {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
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

    // Gold palette
    const gold = '45 95% 58%';
    const goldDeep = '40 85% 45%';
    const goldGlow = cssColor('--accent', gold);

    smoothRef.current = new Array(bars).fill(0);

    const draw = () => {
      try {
        if (!ctx2d) return;
        const levels: number[] = new Array(bars).fill(0);
        let hasAudio = false;

        if (analyser && data) {
          try {
            // @ts-ignore
            analyser.getByteFrequencyData(data);
            // sample a few frequency bands focused on low/mid (voice + adzan)
            const usableLen = Math.min(data.length, 48);
            const step = Math.max(1, Math.floor(usableLen / bars));
            let total = 0;
            for (let i = 0; i < bars; i++) {
              let sum = 0;
              for (let j = 0; j < step; j++) sum += data[i * step + j] || 0;
              const v = (sum / step) / 255;
              levels[i] = v;
              total += v;
            }
            hasAudio = total / bars > 0.03;
          } catch {
            /* ignore */
          }
        }

        if (!hasAudio) {
          // Synthetic rhythm fallback so it never looks dead
          tRef.current += 0.12;
          const t = tRef.current;
          for (let i = 0; i < bars; i++) {
            levels[i] = 0.35 + 0.45 * Math.abs(Math.sin(t * 0.9 + i * 0.9));
          }
        }

        // smooth (attack fast, release slow) so bars feel musical
        const s = smoothRef.current;
        for (let i = 0; i < bars; i++) {
          const target = levels[i];
          if (target > s[i]) s[i] = s[i] + (target - s[i]) * 0.55;
          else s[i] = s[i] + (target - s[i]) * 0.18;
        }

        ctx2d.clearRect(0, 0, W, H);

        const gap = W / (bars * 2 + 1);
        const barW = gap * 1.6;
        const cy = H / 2;
        const maxH = H * 0.92;
        const minH = H * 0.18;
        const mid = (bars - 1) / 2;

        for (let i = 0; i < bars; i++) {
          const env = 0.55 + 0.45 * (1 - Math.abs(i - mid) / (mid || 1));
          const lvl = Math.min(1, s[i]);
          const h = Math.max(minH, maxH * env * (0.35 + 0.75 * lvl));
          const x = gap + i * (barW + gap) + (gap * 0.5) - barW / 2;
          const y = cy - h / 2;

          const grad = ctx2d.createLinearGradient(0, y, 0, y + h);
          grad.addColorStop(0, `hsl(${gold})`);
          grad.addColorStop(0.5, `hsl(${goldGlow})`);
          grad.addColorStop(1, `hsl(${goldDeep})`);

          ctx2d.shadowColor = `hsla(${gold}, 0.55)`;
          ctx2d.shadowBlur = 14;
          ctx2d.fillStyle = grad;
          roundRect(ctx2d, x, y, barW, h, barW / 2);
          ctx2d.fill();
        }
        ctx2d.shadowBlur = 0;

        rafRef.current = requestAnimationFrame(draw);
      } catch (err) {
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

  const H = Math.round(size * 0.6);

  if (failed) {
    // CSS-only fallback bars
    return (
      <div
        style={{ width: size, height: H }}
        className="flex items-end justify-center gap-2"
        aria-hidden
      >
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="rounded-full bg-[hsl(45_95%_58%)] animate-pulse"
            style={{
              width: size / (bars * 2.2),
              height: `${40 + (i === Math.floor(bars / 2) ? 50 : Math.abs(Math.sin(i)) * 40)}%`,
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: H }}
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
