import { useEffect, useRef, useCallback, useState } from 'react';
import type { CalendarEvent } from '@/pages/DailyDetail';

export interface EventAlarmState {
  active: boolean;
  event: CalendarEvent | null;
}

/**
 * Generate a short beep tone using Web Audio API
 */
function playBeepTone(duration = 300, frequency = 880): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      gain.gain.value = 0.5;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
        resolve();
      }, duration);
    } catch {
      resolve();
    }
  });
}

/**
 * Generate alarm sound using Web Audio API (longer, more urgent)
 */
function playAlarmTone(duration = 800): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 660;
      gain.gain.value = 0.4;
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Modulate frequency for alarm effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 8;
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      osc.start();

      setTimeout(() => {
        osc.stop();
        lfo.stop();
        ctx.close();
        resolve();
      }, duration);
    } catch {
      resolve();
    }
  });
}

/**
 * Play the full alarm sequence: beep → alarm, repeated 3 times
 */
async function playAlarmSequence(abortRef: { current: boolean }) {
  for (let i = 0; i < 3; i++) {
    if (abortRef.current) return;
    await playBeepTone(250, 880);
    if (abortRef.current) return;
    await playAlarmTone(700);
    if (abortRef.current) return;
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
    playAlarmSequence(abortRef).then(() => {
      if (!abortRef.current) {
        setIsPlaying(false);
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
