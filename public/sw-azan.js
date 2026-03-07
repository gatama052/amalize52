// Custom Service Worker for Azan notifications in background
const PRAYER_NAMES = {
  Fajr: 'Subuh', Dhuhr: 'Dzuhur', Asr: 'Ashar', Maghrib: 'Maghrib', Isha: 'Isya',
};
const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const CHECK_INTERVAL = 30000; // 30 seconds

let checkTimer = null;

function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
}

async function getPrayerTimings() {
  // Try to get cached prayer times from the message or cache
  const cache = await caches.open('azan-prayer-cache');
  const response = await cache.match('prayer-timings');
  if (response) {
    const data = await response.json();
    // Check if data is for today
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
    if (!timings) return;

    const now = new Date();
    const nowKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    
    // Get last played from cache
    const cache = await caches.open('azan-prayer-cache');
    const lastPlayedRes = await cache.match('last-played');
    const lastPlayed = lastPlayedRes ? await lastPlayedRes.text() : '';

    for (const key of PRAYER_KEYS) {
      const t = timings[key];
      if (!t) continue;
      const { h, m } = parseTime(t);
      const prayerKey = `${nowKey}-${key}`;

      if (now.getHours() === h && now.getMinutes() === m && lastPlayed !== prayerKey) {
        // Store last played
        await cache.put('last-played', new Response(prayerKey));
        
        // Show notification
        const name = PRAYER_NAMES[key] || key;
        await self.registration.showNotification(`🕌 Waktu ${name} telah tiba`, {
          body: `Saatnya menunaikan sholat ${name}. Semoga Allah menerima ibadah Anda.`,
          icon: '/icon-512.png',
          tag: `azan-${key}`,
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200],
          data: { key, action: 'azan' },
        });
        
        // Notify all clients to play audio
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach(client => {
          client.postMessage({ type: 'PLAY_AZAN', prayer: key });
        });
        
        return;
      }
    }
  } catch (e) {
    console.warn('SW azan check error:', e);
  }
}

// Listen for messages from the main app
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'UPDATE_PRAYER_TIMINGS') {
    const cache = await caches.open('azan-prayer-cache');
    await cache.put('prayer-timings', new Response(JSON.stringify({
      timings: event.data.timings,
      date: new Date().toDateString(),
    })));
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
  checkPrayerTimes(); // Check immediately
}

function stopChecking() {
  if (checkTimer) {
    clearInterval(checkTimer);
    checkTimer = null;
  }
}

// Handle notification click
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

// Keep alive via periodic sync if available
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'azan-check') {
    event.waitUntil(checkPrayerTimes());
  }
});
