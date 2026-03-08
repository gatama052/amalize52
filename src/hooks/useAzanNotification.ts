import { useEffect, useRef, useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { PrayerTimings } from './usePrayerTimes';

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Subuh', Dhuhr: 'Dzuhur', Asr: 'Ashar', Maghrib: 'Maghrib', Isha: 'Isya',
};

const AZAN_AUDIO_PATH = '/audio/adzan.mp3';

let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;

function getAudioContext(): { ctx: AudioContext; gain: GainNode } {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return { ctx: audioContext, gain: gainNode! };
}

function formatTime(h: number, m: number): string {
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function parseTime(timeStr: string): { h: number; m: number } {
  const clean = timeStr.replace(/\s*\(.*?\)\s*/g, '').trim();
  const [h, m] = clean.split(':').map(Number);
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
    console.log('[Azan] SW registered');
    
    if ('periodicSync' in reg) {
      try {
        await (reg as any).periodicSync.register('azan-check', {
          minInterval: 60 * 1000,
        });
      } catch {
        console.log('[Azan] Periodic sync not available');
      }
    }
    
    return reg;
  } catch (e) {
    console.warn('[Azan] SW registration failed:', e);
    return null;
  }
}

async function sendTimingsToSW(timings: PrayerTimings) {
  if (!('serviceWorker' in navigator)) return;
  
  // Wait for SW to be ready
  const reg = await navigator.serviceWorker.ready;
  const sw = reg.active;
  if (sw) {
    sw.postMessage({
      type: 'UPDATE_PRAYER_TIMINGS',
      timings,
    });
    sw.postMessage({ type: 'START_AZAN_CHECK' });
    console.log('[Azan] Timings sent to SW');
  }
}

export function useAzanNotification(timings: PrayerTimings | null) {
  const [enabled, setEnabled] = useLocalStorage('deenflow_azan', true);
  const [volume, setVolume] = useLocalStorage('deenflow_azan_volume', 80);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<string>('');
  const userInteractedRef = useRef(false);

  // Request notification permission on enable
  useEffect(() => {
    if (enabled && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
          console.log('[Azan] Notification permission:', perm);
        });
      } else {
        console.log('[Azan] Notification permission already:', Notification.permission);
      }
    }
  }, [enabled]);

  // Track user interaction for autoplay unlock
  useEffect(() => {
    const markInteracted = () => {
      userInteractedRef.current = true;
      // Pre-unlock audio
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;
        }).catch(() => {});
      }
    };
    document.addEventListener('click', markInteracted, { once: true });
    document.addEventListener('touchstart', markInteracted, { once: true });
    document.addEventListener('scroll', markInteracted, { once: true });

    return () => {
      document.removeEventListener('click', markInteracted);
      document.removeEventListener('touchstart', markInteracted);
      document.removeEventListener('scroll', markInteracted);
    };
  }, []);

  // Register azan service worker and send timings
  useEffect(() => {
    if (!enabled) return;
    
    registerAzanSW().then(() => {
      if (timings) {
        sendTimingsToSW(timings);
      }
    });

    // Listen for SW messages to play audio
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PLAY_AZAN') {
        console.log('[Azan] SW triggered azan for:', event.data.prayer);
        playAzan();
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSWMessage);

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
    };
  }, [enabled]);

  // Send updated timings to SW whenever they change
  useEffect(() => {
    if (enabled && timings) {
      sendTimingsToSW(timings);
    }
  }, [timings, enabled]);

  // Pre-load audio
  useEffect(() => {
    const audio = new Audio(AZAN_AUDIO_PATH);
    audio.preload = 'auto';
    audio.volume = volume / 100;
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current = audio;

    return () => {
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

  // MAIN: Check prayer times every 10 seconds (foreground)
  useEffect(() => {
    if (!enabled || !timings) return;

    const check = () => {
      const now = new Date();
      const currentTime = formatTime(now.getHours(), now.getMinutes());
      const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

      for (const key of PRAYER_KEYS) {
        const rawTime = timings[key];
        if (!rawTime) continue;
        
        const { h, m } = parseTime(rawTime);
        const prayerTime = formatTime(h, m);
        const prayerKey = `${todayKey}-${key}`;

        // Debug logging
        console.log(`[Azan] Check: ${key} = ${prayerTime}, now = ${currentTime}, lastPlayed = ${lastPlayedRef.current}`);

        if (currentTime === prayerTime && lastPlayedRef.current !== prayerKey) {
          lastPlayedRef.current = prayerKey;
          console.log(`[Azan] ✅ Waktu ${PRAYER_NAMES[key]} tiba! Playing azan...`);
          playAzan();
          showNotification(key);
          return;
        }
      }
    };

    // Check every 10 seconds for better accuracy
    const interval = setInterval(check, 10000);
    check(); // Check immediately
    console.log('[Azan] Foreground checker started');

    return () => {
      clearInterval(interval);
      console.log('[Azan] Foreground checker stopped');
    };
  }, [enabled, timings]);

  const playAzan = useCallback(() => {
    try {
      const vol = volume / 100;
      console.log('[Azan] Attempting to play audio, volume:', vol);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = vol;
        setIsPlaying(true);
        audioRef.current.play().catch((err) => {
          console.warn('[Azan] Autoplay blocked, trying fallback:', err);
          setIsPlaying(false);
          // Fallback: create new audio element
          const fallback = new Audio(AZAN_AUDIO_PATH);
          fallback.volume = vol;
          fallback.addEventListener('ended', () => setIsPlaying(false));
          fallback.addEventListener('pause', () => setIsPlaying(false));
          setIsPlaying(true);
          fallback.play().catch((e2) => {
            console.warn('[Azan] Fallback also blocked:', e2);
            setIsPlaying(false);
          });
          audioRef.current = fallback;
        });
      } else {
        const audio = new Audio(AZAN_AUDIO_PATH);
        audio.volume = vol;
        audio.addEventListener('ended', () => setIsPlaying(false));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audioRef.current = audio;
        setIsPlaying(true);
        audio.play().catch((e) => {
          console.warn('[Azan] New audio play failed:', e);
          setIsPlaying(false);
        });
      }
    } catch (e) {
      console.warn('[Azan] Failed to play azan:', e);
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
    console.log('[Azan] Test triggered');
    playAzan();
    showNotification('Fajr');
  }, [playAzan]);

  return { enabled, setEnabled, stopAzan, testAzan, isPlaying, volume, setVolume };
}
