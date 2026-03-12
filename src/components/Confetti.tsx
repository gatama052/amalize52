import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  shape: 'rect' | 'circle';
}

const COLORS = [
  'hsl(43 70% 50%)',   // gold
  'hsl(43 60% 65%)',   // light gold
  'hsl(40 30% 90%)',   // cream
  'hsl(0 0% 95%)',     // white
  'hsl(210 60% 75%)',  // light blue
  'hsl(43 80% 55%)',   // bright gold
  'hsl(215 40% 70%)',  // soft navy
];

export default function Confetti({ duration = 2500 }: { duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const count = 60;

    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: canvas.width / 2 + (Math.random() - 0.5) * 40,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 6 + 3,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    const startTime = Date.now();
    let animId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fadeStart = duration * 0.6;
      const globalOpacity = elapsed > fadeStart ? Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart)) : 1;

      for (const p of particles) {
        p.x += p.vx;
        p.vy += 0.12; // gravity
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = globalOpacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < duration) {
        animId = requestAnimationFrame(animate);
      } else {
        setVisible(false);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [duration]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[210] pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
