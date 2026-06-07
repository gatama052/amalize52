import { useEffect, useRef, useCallback, useState } from 'react';
import type { CalendarEvent } from '@/pages/DailyDetail';
import { connectMediaElement, getAudioBus } from '@/lib/audioBus';

export interface EventAlarmState {
  active: boolean;
  event: CalendarEvent | null;
}

// Pre-load audio files to eliminate loading delay
let preloadedOpener: HTMLAudioElement | null = null;
let preloadedRingtone: HTMLAudioElement | null = null;

function preloadAudioFiles() {
  if (!preloadedOpener) {
    preloadedOpener = new Audio('/audio/event-opener.mp4');
    preloadedOpener.preload = 'auto';
    preloadedOpener.load();
  }
  if (!preloadedRingtone) {
    preloadedRingtone = new Audio('/audio/event-ringtone.mp4');
    preloadedRingtone.preload = 'auto';
    preloadedRingtone.load();
  }
}

// Preload on module load
preloadAudioFiles();

/**
 * Play a preloaded audio element (clone for concurrent use), seamlessly
 */
function playAudioFile(src: string, abortRef: { current: boolean }, volume = 0.7): Promise<void> {
  return new Promise((resolve) => {
    if (abortRef.current) { resolve(); return; }
    try {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.preload = 'auto';

      const done = () => {
        clearInterval(abortCheck);
        audio.removeEventListener('ended', done);
        audio.removeEventListener('error', done);
        resolve();
      };

      audio.addEventListener('ended', done);
      audio.addEventListener('error', done);

      const abortCheck = setInterval(() => {
        if (abortRef.current) {
          audio.pause();
          audio.currentTime = 0;
          done();
        }
      }, 100);

      audio.play().catch(() => done());
    } catch {
      resolve();
    }
  });
}

/**
 * Speak event reminder using SpeechSynthesis TTS - optimized for zero delay
 */
function speakReminder(ev: CalendarEvent, abortRef: { current: boolean }): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window) || abortRef.current) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const text = `Pengingat acara. Waktunya ${ev.title}${ev.location ? ' di ' + ev.location : ''}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id'));
    if (idVoice) utterance.voice = idVoice;

    const timeout = setTimeout(() => resolve(), 15000);
    const done = () => { clearTimeout(timeout); clearInterval(abortCheck); resolve(); };

    utterance.onend = done;
    utterance.onerror = done;

    const abortCheck = setInterval(() => {
      if (abortRef.current) {
        window.speechSynthesis.cancel();
        done();
      }
    }, 100);

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Seamless alarm sequence with zero gaps:
 * Beep pembuka → TTS → Ringtone → TTS → Ringtone → TTS → Ringtone
 */
async function playAlarmSequence(abortRef: { current: boolean }, ev: CalendarEvent) {
  // Ensure audio is preloaded
  preloadAudioFiles();

  // 1. Beep pembuka
  if (abortRef.current) return;
  await playAudioFile('/audio/event-opener.mp4', abortRef);

  // 2. (TTS + Ringtone) × 3 — seamless, no gaps
  for (let i = 0; i < 3; i++) {
    if (abortRef.current) return;
    await speakReminder(ev, abortRef);
    if (abortRef.current) return;
    await playAudioFile('/audio/event-ringtone.mp4', abortRef);
  }
}

function showEventNotification(ev: CalendarEvent) {
  if (!('Notification' in window)) return;

  const title = '📅 Pengingat Acara';
  const body = `${ev.title} telah tiba – ${ev.time}${ev.location ? ' di ' + ev.location : ''}`;
  const options: NotificationOptions = {
    body,
    icon: '/icon-512.png',
    tag: `event-alarm-${ev.id}`,
    requireInteraction: true,
  };

  if (Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, options);
      }).catch(() => {
        new Notification(title, options);
      });
    } else {
      new Notification(title, options);
    }
  }
}

export function useEventAlarm() {
  const [alarmState, setAlarmState] = useState<EventAlarmState>({ active: false, event: null });
  const [isPlaying, setIsPlaying] = useState(false);
  const abortRef = useRef(false);
  const snoozeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggeredRef = useRef<Set<string>>(new Set());

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const triggerAlarm = useCallback((ev: CalendarEvent) => {
    setAlarmState({ active: true, event: ev });
    showEventNotification(ev);
    abortRef.current = false;
    setIsPlaying(true);
    const ref = abortRef;
    playAlarmSequence(ref, ev).then(() => {
      if (!ref.current) {
        setIsPlaying(false);
        // Auto-dismiss overlay when sound finishes
        setAlarmState({ active: false, event: null });
      }
    });
  }, []);

  const stopAlarm = useCallback(() => {
    abortRef.current = true;
    setIsPlaying(false);
    setAlarmState({ active: false, event: null });
    if (snoozeTimerRef.current) {
      clearTimeout(snoozeTimerRef.current);
      snoozeTimerRef.current = null;
    }
  }, []);

  const snoozeAlarm = useCallback(() => {
    abortRef.current = true;
    setIsPlaying(false);
    const currentEvent = alarmState.event;
    setAlarmState({ active: false, event: null });

    if (currentEvent) {
      snoozeTimerRef.current = setTimeout(() => {
        triggerAlarm(currentEvent);
      }, 5 * 60 * 1000);
    }
  }, [alarmState.event, triggerAlarm]);

  // Check events every 1 second for precise timing
  useEffect(() => {
    const check = () => {
      if (alarmState.active) return; // Don't trigger while alarm is showing

      let events: CalendarEvent[] = [];
      try {
        const stored = localStorage.getItem('deenflow_events');
        if (stored) events = JSON.parse(stored);
      } catch {
        return;
      }

      if (!events.length) return;

      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const currentH = now.getHours();
      const currentM = now.getMinutes();

      for (const ev of events) {
        if (ev.date !== todayStr) continue;

        const [h, m] = ev.time.split(':').map(Number);
        
        // Calculate actual reminder time
        const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
        const reminderDate = new Date(eventDate.getTime() - (ev.reminderMinutes || 0) * 60 * 1000);
        const reminderH = reminderDate.getHours();
        const reminderM = reminderDate.getMinutes();

        const eventKey = `${ev.id}-${todayStr}-${reminderH}:${reminderM}`;

        if (currentH === reminderH && currentM === reminderM && !triggeredRef.current.has(eventKey)) {
          triggeredRef.current.add(eventKey);
          triggerAlarm(ev);
          return;
        }
      }
    };

    const interval = setInterval(check, 1000);
    check();
    return () => clearInterval(interval);
  }, [alarmState.active, triggerAlarm]);

  // Reset triggered set at midnight
  useEffect(() => {
    const checkMidnight = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        triggeredRef.current.clear();
      }
    }, 60000);
    return () => clearInterval(checkMidnight);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (snoozeTimerRef.current) clearTimeout(snoozeTimerRef.current);
    };
  }, []);

  return { alarmState, isPlaying, stopAlarm, snoozeAlarm };
}
