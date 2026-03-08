// Custom Service Worker for Azan notifications in background
const PRAYER_NAMES = {
  Fajr: 'Subuh', Dhuhr: 'Dzuhur', Asr: 'Ashar', Maghrib: 'Maghrib', Isha: 'Isya',
};
const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const CHECK_INTERVAL = 10000; // 10 seconds

let checkTimer = null;

function parseTime(timeStr) {
  const clean = timeStr.replace(/\s*\(.*?\)\s*/g, '').trim();
  const [h, m] = clean.split(':').map(Number);
  return { h, m };
}

function formatTime(h, m) {
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

async function getPrayerTimings() {
  const cache = await caches.open('azan-prayer-cache');
  const response = await cache.match('prayer-timings');
  if (response) {
    const data = await response.json();
    const today = new Date().toDateString();
    if (data.date === today) {
      return data.timings;
    }
  }
  return null;
}

async function checkPrayerTimes() {
  try {
    const timings = await getPrayerTimings();
    if (!timings) {
      console.log('[SW Azan] No timings cached');
      return;
    }

    const now = new Date();
    const currentTime = formatTime(now.getHours(), now.getMinutes());
    const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    
    const cache = await caches.open('azan-prayer-cache');
    const lastPlayedRes = await cache.match('last-played');
    const lastPlayed = lastPlayedRes ? await lastPlayedRes.text() : '';

    for (const key of PRAYER_KEYS) {
      const t = timings[key];
      if (!t) continue;
      const { h, m } = parseTime(t);
      const prayerTime = formatTime(h, m);
      const prayerKey = `${todayKey}-${key}`;

      if (currentTime === prayerTime && lastPlayed !== prayerKey) {
        await cache.put('last-played', new Response(prayerKey));
        
        const name = PRAYER_NAMES[key] || key;
        console.log(`[SW Azan] ✅ Triggering notification for ${name}`);
        
        await self.registration.showNotification(`🕌 Waktu ${name} telah tiba`, {
          body: `Saatnya menunaikan sholat ${name}. Semoga Allah menerima ibadah Anda.`,
          icon: '/icon-512.png',
          tag: `azan-${key}`,
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200],
          data: { key, action: 'azan' },
        });
        
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach(client => {
          client.postMessage({ type: 'PLAY_AZAN', prayer: key, time: prayerTime });
        });
        
        return;
      }
    }
  } catch (e) {
    console.warn('[SW Azan] Check error:', e);
  }
}

self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'UPDATE_PRAYER_TIMINGS') {
    const cache = await caches.open('azan-prayer-cache');
    await cache.put('prayer-timings', new Response(JSON.stringify({
      timings: event.data.timings,
      date: new Date().toDateString(),
    })));
    console.log('[SW Azan] Prayer timings updated');
  }
  
  if (event.data && event.data.type === 'START_AZAN_CHECK') {
    startChecking();
  }
  
  if (event.data && event.data.type === 'STOP_AZAN_CHECK') {
    stopChecking();
  }
});

function startChecking() {
  if (checkTimer) clearInterval(checkTimer);
  checkTimer = setInterval(checkPrayerTimes, CHECK_INTERVAL);
  checkPrayerTimes();
  console.log('[SW Azan] Checking started');
}

function stopChecking() {
  if (checkTimer) {
    clearInterval(checkTimer);
    checkTimer = null;
  }
  console.log('[SW Azan] Checking stopped');
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    })
  );
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'azan-check') {
    event.waitUntil(checkPrayerTimes());
  }
});

// Auto-start checking when SW activates
self.addEventListener('activate', (event) => {
  console.log('[SW Azan] Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('install', () => {
  console.log('[SW Azan] Installed');
  self.skipWaiting();
});
