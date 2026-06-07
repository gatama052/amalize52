import { useEffect, useRef } from 'react';
import { getAnalyser } from '@/lib/audioBus';

interface AudioVisualizerProps {
  active: boolean;
  size?: number;
  bars?: number;
}

/**
 * Diamond (belah ketupat) shaped audio visualizer.
 * Bars are arranged horizontally and mirrored vertically. Their max-height
 * envelope is triangular (peak in the middle), so the resulting silhouette
 * forms a rhombus that pulses with the live audio.
 */
export default function AudioVisualizer({ active, size = 180, bars = 21 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const fallbackRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    ctx2d.scale(dpr, dpr);

    let analyser: AnalyserNode | null = null;
    let data: Uint8Array<ArrayBuffer> | null = null;
    try {
      analyser = getAnalyser();
      data = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    } catch {}

    const cssColor = (v: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(v).trim();

    const draw = () => {
      // Sample audio
      let levels: number[] = new Array(bars).fill(0);
      if (analyser && data) {
        analyser.getByteFrequencyData(data);
        const step = Math.max(1, Math.floor(data.length / bars));
        for (let i = 0; i < bars; i++) {
          let sum = 0;
          for (let j = 0; j < step; j++) sum += data[i * step + j] || 0;
          levels[i] = (sum / step) / 255; // 0..1
        }
      }

      // Detect silence -> use animated fallback so the visual stays alive
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

      const primary = cssColor('--primary') || '210 90% 60%';
      const accent = cssColor('--accent') || '45 95% 55%';

      // Diamond guideline (subtle)
      ctx2d.save();
      ctx2d.translate(W / 2, H / 2);
      ctx2d.rotate(Math.PI / 4);
      ctx2d.strokeStyle = `hsla(${primary}, 0.18)`;
      ctx2d.lineWidth = 1;
      const guide = size * 0.62;
      ctx2d.strokeRect(-guide / 2, -guide / 2, guide, guide);
      ctx2d.restore();

      // Bars with diamond envelope
      const usable = size * 0.86;
      const barW = (usable / bars) * 0.55;
      const gap = usable / bars;
      const maxBarH = size * 0.42;
      const cx = W / 2;
      const cy = H / 2;
      const mid = (bars - 1) / 2;

      for (let i = 0; i < bars; i++) {
        // Triangular envelope (1 at center, 0 at ends) -> diamond shape
        const env = 1 - Math.abs(i - mid) / mid;
        const lvl = Math.min(1, levels[i]);
        const h = Math.max(2, maxBarH * env * (0.25 + 0.85 * lvl));
        const x = cx - usable / 2 + gap * (i + 0.5) - barW / 2;

        // Gradient: accent (gold) -> primary
        const grad = ctx2d.createLinearGradient(0, cy - h, 0, cy + h);
        grad.addColorStop(0, `hsl(${accent})`);
        grad.addColorStop(0.5, `hsl(${primary})`);
        grad.addColorStop(1, `hsl(${accent})`);
        ctx2d.fillStyle = grad;

        // Mirrored bar (top + bottom from center)
        const radius = barW / 2;
        const total = h * 2;
        roundRect(ctx2d, x, cy - h, barW, total, radius);
        ctx2d.fill();
      }

      // Center glow dot
      const glow = ctx2d.createRadialGradient(cx, cy, 0, cx, cy, size * 0.18);
      glow.addColorStop(0, `hsla(${accent}, 0.35)`);
      glow.addColorStop(1, `hsla(${accent}, 0)`);
      ctx2d.fillStyle = glow;
      ctx2d.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, size, bars]);

  if (!active) return null;

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
