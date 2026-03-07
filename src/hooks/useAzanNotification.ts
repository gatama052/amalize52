import { useEffect, useRef, useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { PrayerTimings } from './usePrayerTimes';

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Subuh', Dhuhr: 'Dzuhur', Asr: 'Ashar', Maghrib: 'Maghrib', Isha: 'Isya',
};

const AZAN_AUDIO_PATH = '/audio/adzan.mp3';

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
}

function showNotification(key: string) {
  const name = PRAYER_NAMES[key] || key;

  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(`🕌 Waktu ${name} telah tiba`, {
          body: `Saatnya menunaikan sholat ${name}. Semoga Allah menerima ibadah Anda.`,
          icon: '/icon-512.png',
          tag: `azan-${key}`,
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200],
        } as NotificationOptions);
      }).catch(() => {
        new Notification(`🕌 Waktu ${name} telah tiba`, {
          body: `Saatnya menunaikan sholat ${name}. Semoga Allah menerima ibadah Anda.`,
          icon: '/icon-512.png',
        });
      });
    } else {
      new Notification(`🕌 Waktu ${name} telah tiba`, {
        body: `Saatnya menunaikan sholat ${name}. Semoga Allah menerima ibadah Anda.`,
        icon: '/icon-512.png',
      });
    }
  }
}

// Register custom azan service worker
async function registerAzanSW() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw-azan.js', { scope: '/' });
    console.log('Azan SW registered');
    
    // Try to register periodic sync
    if ('periodicSync' in reg) {
      try {
        await (reg as any).periodicSync.register('azan-check', {
          minInterval: 60 * 1000, // 1 minute
        });
      } catch {
        console.log('Periodic sync not available, using fallback');
      }
    }
    
    return reg;
  } catch (e) {
    console.warn('Azan SW registration failed:', e);
    return null;
  }
}

async function sendTimingsToSW(timings: PrayerTimings) {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return;
  navigator.serviceWorker.controller.postMessage({
    type: 'UPDATE_PRAYER_TIMINGS',
    timings,
  });
}

export function useAzanNotification(timings: PrayerTimings | null) {
  const [enabled, setEnabled] = useLocalStorage('deenflow_azan', true);
  const [volume, setVolume] = useLocalStorage('deenflow_azan_volume', 80);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<string>('');

  // Request notification permission
  useEffect(() => {
    if (enabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [enabled]);

  // Register azan service worker and send timings
  useEffect(() => {
    if (!enabled) return;
    
    registerAzanSW().then(() => {
      if (timings) {
        sendTimingsToSW(timings);
        // Tell SW to start checking
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'START_AZAN_CHECK' });
        }
      }
    });

    // Listen for SW messages to play audio
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PLAY_AZAN') {
        playAzan();
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSWMessage);

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'STOP_AZAN_CHECK' });
      }
    };
  }, [enabled]);

  // Send updated timings to SW whenever they change
  useEffect(() => {
    if (enabled && timings) {
      sendTimingsToSW(timings);
    }
  }, [timings, enabled]);

  // Pre-load audio & unlock on interaction
  useEffect(() => {
    const audio = new Audio(AZAN_AUDIO_PATH);
    audio.preload = 'auto';
    audio.volume = volume / 100;
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current = audio;

    const unlock = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;
        }).catch(() => {});
      }
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });

    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Check prayer times every second (foreground check)
  useEffect(() => {
    if (!enabled || !timings) return;

    const check = () => {
      const now = new Date();
      const nowKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

      for (const key of PRAYER_KEYS) {
        const t = timings[key];
        if (!t) continue;
        const { h, m } = parseTime(t);
        const prayerKey = `${nowKey}-${key}`;

        if (now.getHours() === h && now.getMinutes() === m && lastPlayedRef.current !== prayerKey) {
          lastPlayedRef.current = prayerKey;
          playAzan();
          showNotification(key);
          return;
        }
      }
    };

    const interval = setInterval(check, 1000);
    check();
    return () => clearInterval(interval);
  }, [enabled, timings]);

  const playAzan = useCallback(() => {
    try {
      const vol = volume / 100;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = vol;
        setIsPlaying(true);
        audioRef.current.play().catch((err) => {
          console.warn('Azan autoplay blocked:', err);
          setIsPlaying(false);
          const fallback = new Audio(AZAN_AUDIO_PATH);
          fallback.volume = vol;
          fallback.addEventListener('ended', () => setIsPlaying(false));
          fallback.addEventListener('pause', () => setIsPlaying(false));
          setIsPlaying(true);
          fallback.play().catch(() => setIsPlaying(false));
          audioRef.current = fallback;
        });
      } else {
        const audio = new Audio(AZAN_AUDIO_PATH);
        audio.volume = vol;
        audio.addEventListener('ended', () => setIsPlaying(false));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audioRef.current = audio;
        setIsPlaying(true);
        audio.play().catch(() => setIsPlaying(false));
      }
    } catch (e) {
      console.warn('Failed to play azan:', e);
      setIsPlaying(false);
    }
  }, [volume]);

  const stopAzan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const testAzan = useCallback(() => {
    playAzan();
    showNotification('Fajr');
  }, [playAzan]);

  return { enabled, setEnabled, stopAzan, testAzan, isPlaying, volume, setVolume };
}
