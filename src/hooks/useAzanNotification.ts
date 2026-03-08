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

export interface AdhanModeState {
  active: boolean;
  prayerKey: string;
  prayerName: string;
  prayerTime: string;
}

function showNotification(key: string, time: string) {
  const name = PRAYER_NAMES[key] || key;

  if ('Notification' in window && Notification.permission === 'granted') {
    const options = {
      body: `Waktu sholat ${name} telah tiba – ${time}`,
      icon: '/icon-512.png',
      tag: `azan-${key}`,
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
    } as any;

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(`🕌 Adzan ${name}`, options);
      }).catch(() => {
        new Notification(`🕌 Adzan ${name}`, options);
      });
    } else {
      new Notification(`🕌 Adzan ${name}`, options);
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
        await (reg as any).periodicSync.register('azan-check', { minInterval: 60 * 1000 });
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
  const reg = await navigator.serviceWorker.ready;
  const sw = reg.active;
  if (sw) {
    sw.postMessage({ type: 'UPDATE_PRAYER_TIMINGS', timings });
    sw.postMessage({ type: 'START_AZAN_CHECK' });
  }
}

export function useAzanNotification(timings: PrayerTimings | null) {
  const [enabled, setEnabled] = useLocalStorage('deenflow_azan', true);
  const [volume, setVolume] = useLocalStorage('deenflow_azan_volume', 80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [adhanMode, setAdhanMode] = useState<AdhanModeState>({ active: false, prayerKey: '', prayerName: '', prayerTime: '' });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<string>('');
  const snoozeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Request notification permission
  useEffect(() => {
    if (enabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [enabled]);

  // Track user interaction for autoplay unlock
  useEffect(() => {
    const markInteracted = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;
        }).catch(() => {});
      }
    };
    document.addEventListener('click', markInteracted, { once: true });
    document.addEventListener('touchstart', markInteracted, { once: true });
    return () => {
      document.removeEventListener('click', markInteracted);
      document.removeEventListener('touchstart', markInteracted);
    };
  }, []);

  // Register SW and send timings
  useEffect(() => {
    if (!enabled) return;
    registerAzanSW().then(() => {
      if (timings) sendTimingsToSW(timings);
    });
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PLAY_AZAN') {
        const key = event.data.prayer;
        const time = event.data.time || '';
        triggerAdzan(key, time);
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSWMessage);
    return () => { navigator.serviceWorker?.removeEventListener('message', handleSWMessage); };
  }, [enabled]);

  useEffect(() => {
    if (enabled && timings) sendTimingsToSW(timings);
  }, [timings, enabled]);

  // Pre-load audio
  useEffect(() => {
    const audio = new Audio(AZAN_AUDIO_PATH);
    audio.preload = 'auto';
    audio.volume = 1.0;
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      // Auto-close adhan mode when sound finishes
      setAdhanMode({ active: false, prayerKey: '', prayerName: '', prayerTime: '' });
    });
    audio.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current = audio;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update GainNode volume
  useEffect(() => {
    try {
      const { gain } = getAudioContext();
      gain.gain.value = volume / 100;
    } catch {}
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

        if (currentTime === prayerTime && lastPlayedRef.current !== prayerKey) {
          lastPlayedRef.current = prayerKey;
          console.log(`[Azan] ✅ Waktu ${PRAYER_NAMES[key]} tiba!`);
          triggerAdzan(key, prayerTime);
          return;
        }
      }
    };
    const interval = setInterval(check, 10000);
    check();
    return () => clearInterval(interval);
  }, [enabled, timings]);

  const triggerAdzan = useCallback((key: string, time: string) => {
    const name = PRAYER_NAMES[key] || key;
    setAdhanMode({ active: true, prayerKey: key, prayerName: name, prayerTime: time });
    showNotification(key, time);
    playAzan();
  }, []);

  const playAzan = useCallback(() => {
    try {
      const { ctx, gain } = getAudioContext();
      gain.gain.value = volume / 100;

      const connectToContext = (audio: HTMLAudioElement) => {
        try {
          const source = ctx.createMediaElementSource(audio);
          source.connect(gain);
        } catch {}
      };

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        connectToContext(audioRef.current);
        setIsPlaying(true);
        audioRef.current.play().catch((err) => {
          console.warn('[Azan] Autoplay blocked:', err);
          setIsPlaying(false);
          const fallback = new Audio(AZAN_AUDIO_PATH);
          fallback.volume = 1.0;
          fallback.addEventListener('ended', () => { setIsPlaying(false); setAdhanMode({ active: false, prayerKey: '', prayerName: '', prayerTime: '' }); });
          fallback.addEventListener('pause', () => setIsPlaying(false));
          connectToContext(fallback);
          audioRef.current = fallback;
          setIsPlaying(true);
          fallback.play().catch(() => setIsPlaying(false));
        });
      } else {
        const audio = new Audio(AZAN_AUDIO_PATH);
        audio.volume = 1.0;
        audio.addEventListener('ended', () => setIsPlaying(false));
        audio.addEventListener('pause', () => setIsPlaying(false));
        connectToContext(audio);
        audioRef.current = audio;
        setIsPlaying(true);
        audio.play().catch(() => setIsPlaying(false));
      }
    } catch (e) {
      console.warn('[Azan] Failed:', e);
      setIsPlaying(false);
    }
  }, [volume]);

  const stopAzan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setAdhanMode({ active: false, prayerKey: '', prayerName: '', prayerTime: '' });
    if (snoozeTimerRef.current) {
      clearTimeout(snoozeTimerRef.current);
      snoozeTimerRef.current = null;
    }
  }, []);

  const snoozeAzan = useCallback(() => {
    // Stop current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    const currentMode = adhanMode;
    setAdhanMode({ active: false, prayerKey: '', prayerName: '', prayerTime: '' });

    // Replay after 5 minutes
    snoozeTimerRef.current = setTimeout(() => {
      if (currentMode.prayerKey) {
        triggerAdzan(currentMode.prayerKey, currentMode.prayerTime);
      }
    }, 5 * 60 * 1000);
    console.log('[Azan] Snoozed for 5 minutes');
  }, [adhanMode, triggerAdzan]);

  const testAzan = useCallback(() => {
    const now = new Date();
    const time = formatTime(now.getHours(), now.getMinutes());
    triggerAdzan('Fajr', time);
  }, [triggerAdzan]);

  // Preview volume
  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    previewTimeoutRef.current = setTimeout(() => {
      try {
        const { ctx, gain } = getAudioContext();
        gain.gain.value = newVolume / 100;
        if (audioRef.current && !isPlaying) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 1.0;
          try {
            const source = ctx.createMediaElementSource(audioRef.current);
            source.connect(gain);
          } catch {}
          audioRef.current.play().then(() => {
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }, 3000);
          }).catch(() => {});
        }
      } catch {}
    }, 400);
  }, [isPlaying, setVolume]);

  // Cleanup snooze timer
  useEffect(() => {
    return () => {
      if (snoozeTimerRef.current) clearTimeout(snoozeTimerRef.current);
    };
  }, []);

  return { enabled, setEnabled, stopAzan, snoozeAzan, testAzan, isPlaying, volume, setVolume, previewVolume, adhanMode };
}
