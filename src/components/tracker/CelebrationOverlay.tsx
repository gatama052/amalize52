import { useEffect, useState, useMemo } from 'react';
import { CELEBRATION_MOTIVATIONS } from '@/data/tracker-insights';
import mosqueLogo from '@/assets/mosque-logo.png';

interface CelebrationOverlayProps {
  show: boolean;
  onComplete: () => void;
}

// Simple confetti particle
function Confetti() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 1.5,
      size: 4 + Math.random() * 6,
      color: ['hsl(43,65%,52%)', 'hsl(215,70%,14%)', 'hsl(43,65%,72%)', 'hsl(0,0%,100%)', 'hsl(140,50%,55%)'][i % 5],
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            borderRadius: '2px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function CelebrationOverlay({ show, onComplete }: CelebrationOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const motivation = useMemo(() => {
    const seed = new Date().getDate();
    return CELEBRATION_MOTIVATIONS[seed % CELEBRATION_MOTIVATIONS.length];
  }, []);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'linear-gradient(135deg, hsl(215 75% 8%) 0%, hsl(215 70% 14%) 50%, hsl(215 60% 20%) 100%)',
      }}
    >
      <Confetti />
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
        <blockquote className="border-l-2 border-accent/40 pl-3 text-left">
          <p className="text-foreground/70 italic text-xs leading-relaxed">
            "{motivation.text}"
          </p>
          <p className="text-foreground/50 text-[10px] mt-1">({motivation.source})</p>
        </blockquote>
      </div>
    </div>
  );
}
