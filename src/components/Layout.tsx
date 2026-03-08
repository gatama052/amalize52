import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import mosqueLogo from '@/assets/mosque-logo.png';
import splashTitle from '@/assets/splash-amalize-text.png';
import splashTagline from '@/assets/splash-tagline.png';
import BottomNav from './BottomNav';
import AdhanMode from './AdhanMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEventReminder } from '@/hooks/useEventReminder';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useAzanNotification } from '@/hooks/useAzanNotification';

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [darkMode] = useLocalStorage('deenflow_dark', true);
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  useEventReminder();
  
  // Global azan notification system
  const { location: loc } = useUserLocation();
  const { timings } = usePrayerTimes(loc?.latitude, loc?.longitude);
  const { adhanMode, isPlaying, stopAzan, snoozeAzan } = useAzanNotification(timings);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Splash screen: 2 seconds then fade out
  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFade(true), 1600);
    const hideTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (showSplash) {
    return (
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-400 ${splashFade ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundColor: '#0B1E3D' }}
      >
        {/* Mosque logo */}
        <img
          src={mosqueLogo}
          alt="Amalize"
          className="h-28 w-28 object-contain mb-3 animate-[splash-logo_0.8s_ease-out_both]"
        />
        {/* AMALIZE text image */}
        <img
          src={splashTitle}
          alt="AMALIZE"
          className="h-10 object-contain animate-[splash-text_0.6s_ease-out_0.3s_both]"
        />
        {/* Tagline image */}
        <img
          src={splashTagline}
          alt="Your Daily Deen Companion"
          className="mt-1.5 h-10 object-contain animate-[splash-text_0.6s_ease-out_0.6s_both]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Amalize" className="h-9 w-9 rounded" />
            <h1 className="text-lg font-bold -ml-0.5">
              <span className="text-accent">Amal</span><span className="text-foreground">ize</span>
            </h1>
          </div>
          <button
            onClick={() => {
              const current = window.location.pathname;
              if (current === '/settings') {
                navigate(-1);
              } else {
                navigate('/settings');
              }
            }}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-24 pt-4">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
