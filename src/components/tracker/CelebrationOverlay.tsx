import { useEffect, useState, useMemo, useCallback } from 'react';
import { CELEBRATION_MOTIVATIONS } from '@/data/tracker-insights';
import mosqueLogo from '@/assets/mosque-logo.png';

interface CelebrationOverlayProps {
  show: boolean;
  onComplete: () => void;
  completedItems?: string[];
}

// Burst confetti - particles explode from center
function BurstConfetti() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const angle = (i / 60) * 360 + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const distance = 120 + Math.random() * 200;
      const tx = Math.cos(rad) * distance;
      const ty = Math.sin(rad) * distance - 100; // bias upward
      return {
        id: i,
        size: 4 + Math.random() * 6,
        color: ['hsl(43,65%,52%)', 'hsl(215,70%,14%)', 'hsl(43,65%,72%)', 'hsl(0,0%,100%)', 'hsl(140,50%,55%)', 'hsl(0,70%,60%)'][i % 6],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
        tx,
        ty,
        duration: 1 + Math.random() * 0.8,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: '50%',
            top: '35%',
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            borderRadius: '2px',
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            animation: `confettiBurst ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
            opacity: 0,
            // Use CSS custom properties for the target position
            ['--tx' as string]: `${p.tx}px`,
            ['--ty' as string]: `${p.ty}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function CelebrationOverlay({ show, onComplete, completedItems = [] }: CelebrationOverlayProps) {
  const [visible, setVisible] = useState(false);

  const motivation = useMemo(() => {
    const seed = new Date().getDate();
    return CELEBRATION_MOTIVATIONS[seed % CELEBRATION_MOTIVATIONS.length];
  }, []);

  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  const handleClose = useCallback(() => {
    setVisible(false);
    onComplete();
  }, [onComplete]);

  const handleShare = useCallback(async () => {
    const canvas = document.createElement('canvas');
    const w = 720;
    const h = 1280;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, 'hsl(215, 75%, 8%)');
    bg.addColorStop(0.5, 'hsl(215, 70%, 14%)');
    bg.addColorStop(1, 'hsl(215, 60%, 20%)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Islamic pattern dots
    ctx.fillStyle = 'rgba(212, 175, 55, 0.06)';
    for (let x = 0; x < w; x += 40) {
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Title
    ctx.fillStyle = 'hsl(43, 65%, 52%)';
    ctx.font = 'bold 32px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Amalize – Progress Ibadah Hari Ini', w / 2, 120);

    // Date
    const today = new Date();
    const dateText = today.toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText(dateText, w / 2, 165);

    // Progress circle
    const cx = w / 2;
    const cy = 310;
    const r = 80;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2);
    ctx.strokeStyle = 'hsl(43, 65%, 52%)';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = 'hsl(43, 65%, 52%)';
    ctx.font = 'bold 48px system-ui, sans-serif';
    ctx.fillText('100%', cx, cy + 16);

    // Subtitle
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '22px system-ui, sans-serif';
    ctx.fillText('Ibadah Selesai', cx, cy + r + 45);

    // Completed items
    let yPos = 480;
    ctx.textAlign = 'left';
    ctx.font = '20px system-ui, sans-serif';
    const maxShow = Math.min(completedItems.length, 12);
    for (let i = 0; i < maxShow; i++) {
      ctx.fillStyle = 'hsl(43, 65%, 52%)';
      ctx.fillText('✔', 120, yPos);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(completedItems[i], 155, yPos);
      yPos += 36;
    }
    if (completedItems.length > 12) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(`+${completedItems.length - 12} lainnya`, 155, yPos);
      yPos += 36;
    }

    // Motivation
    const motY = Math.max(yPos + 40, 900);
    ctx.textAlign = 'center';

    // Motivation border line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, motY - 10);
    ctx.lineTo(100, motY + 60);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = 'italic 18px system-ui, sans-serif';

    // Wrap motivation text
    const motWords = motivation.text.split(' ');
    let motLine = '';
    let motLineY = motY;
    for (const word of motWords) {
      const test = motLine + word + ' ';
      if (ctx.measureText(test).width > 480) {
        ctx.fillText(`"${motLine.trim()}"`.replace(/^""/, '"'), 115, motLineY);
        motLine = word + ' ';
        motLineY += 28;
      } else {
        motLine = test;
      }
    }
    if (motLine.trim()) {
      const prefix = motLineY === motY ? '"' : '';
      ctx.fillText(`${prefix}${motLine.trim()}"`, 115, motLineY);
    }
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillText(`(${motivation.source})`, 115, motLineY + 28);

    // Watermark
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('Amalize', w - 40, h - 40);

    // Download
    const link = document.createElement('a');
    link.download = `amalize-progress-${today.toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [completedItems, motivation]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, hsl(215 75% 8%) 0%, hsl(215 70% 14%) 50%, hsl(215 60% 20%) 100%)',
      }}
    >
      <BurstConfetti />
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm animate-scale-in">
        {/* Icon */}
        <div className="w-20 h-20 mb-5 rounded-full bg-accent/15 flex items-center justify-center backdrop-blur-sm border border-accent/25">
          <img src={mosqueLogo} alt="" className="w-12 h-12 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-accent mb-3">MasyaAllah! 🎉</h1>

        {/* Message */}
        <p className="text-foreground/90 text-sm leading-relaxed mb-5">
          Hari ini kamu berhasil menyelesaikan seluruh ibadah yang kamu targetkan. Semoga amalmu diterima dan menjadi jalan menuju keberkahan.
        </p>

        {/* Motivation */}
        <blockquote className="border-l-2 border-accent/40 pl-3 text-left mb-8">
          <p className="text-foreground/70 italic text-xs leading-relaxed">
            "{motivation.text}"
          </p>
          <p className="text-foreground/50 text-[10px] mt-1">({motivation.source})</p>
        </blockquote>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleClose}
            className="flex-1 rounded-xl bg-foreground/10 border border-foreground/20 py-3 text-sm font-semibold text-foreground/80 hover:bg-foreground/15 transition-colors"
          >
            ✔ Tutup
          </button>
          <button
            onClick={handleShare}
            className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/80 transition-colors"
          >
            📤 Bagikan Progress
          </button>
        </div>
      </div>
    </div>
  );
}
