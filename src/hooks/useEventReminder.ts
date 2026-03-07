import { useEffect, useRef, useCallback } from 'react';
import type { CalendarEvent } from '@/pages/DailyDetail';

/**
 * Select a male Indonesian voice if available
 */
function getMaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  // Try to find Indonesian male voice
  const idMale = voices.find(v => v.lang.startsWith('id') && v.name.toLowerCase().includes('male'));
  if (idMale) return idMale;
  // Try any Indonesian voice with male-sounding name
  const idVoice = voices.find(v => v.lang.startsWith('id') && (v.name.toLowerCase().includes('adam') || v.name.toLowerCase().includes('rizky') || v.name.toLowerCase().includes('dimas')));
  if (idVoice) return idVoice;
  // Try Google Indonesian male
  const googleId = voices.find(v => v.lang.startsWith('id') && v.name.includes('Google'));
  if (googleId) return googleId;
  // Fallback: any Indonesian voice
  const anyId = voices.find(v => v.lang.startsWith('id'));
  if (anyId) return anyId;
  return null;
}

export function useEventReminder() {
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const triggerReminder = useCallback((ev: CalendarEvent) => {
    // Try service worker notification first (works in background)
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(`📅 ${ev.title}`, {
          body: `${ev.time}${ev.location ? ' di ' + ev.location : ''}${ev.notes ? ' - ' + ev.notes : ''}`,
          icon: '/icon-512.png',
          tag: `event-${ev.id}`,
          requireInteraction: true,
        } as NotificationOptions);
      }).catch(() => {
        fallbackNotification(ev);
      });
    } else {
      fallbackNotification(ev);
    }

    // Speech synthesis audio reminder with MALE voice
    if ('speechSynthesis' in window && document.visibilityState === 'visible') {
      window.speechSynthesis.cancel();
      const dayName = new Date(ev.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long' });
      const timeParts = ev.time.split(':');
      const hourText = timeParts[0];
      const minuteText = parseInt(timeParts[1]) > 0 ? ` lewat ${parseInt(timeParts[1])} menit` : '';
      const text = `Pengingat. ${dayName} pukul ${hourText}${minuteText}, waktunya ${ev.title}${ev.location ? ' di ' + ev.location : ''}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 0.85; // Lower pitch for more masculine voice
      const maleVoice = getMaleVoice();
      if (maleVoice) utterance.voice = maleVoice;
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
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
      let changed = false;

      const updated = events.map((ev) => {
        if (ev.reminded || ev.date !== todayStr) return ev;

        const [h, m] = ev.time.split(':').map(Number);
        const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
        const reminderTime = new Date(eventTime.getTime() - ev.reminderMinutes * 60 * 1000);
        const diffMs = now.getTime() - reminderTime.getTime();

        if (diffMs >= 0 && diffMs < 120000) {
          triggerReminder(ev);
          changed = true;
          return { ...ev, reminded: true };
        }
        return ev;
      });

      if (changed) {
        localStorage.setItem('deenflow_events', JSON.stringify(updated));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [triggerReminder]);
}

function fallbackNotification(ev: CalendarEvent) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(`📅 ${ev.title}`, {
      body: `${ev.time}${ev.location ? ' di ' + ev.location : ''}${ev.notes ? ' - ' + ev.notes : ''}`,
      icon: '/icon-512.png',
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((p) => {
      if (p === 'granted') {
        new Notification(`📅 ${ev.title}`, {
          body: `${ev.time}${ev.location ? ' di ' + ev.location : ''}`,
          icon: '/icon-512.png',
        });
      }
    });
  }
}
