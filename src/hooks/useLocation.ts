import { useState, useEffect } from 'react';

export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  fullAddress?: string;
}

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(() => {
    const cached = localStorage.getItem('userLocation');
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(!location);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      fallback('Geolokasi tidak didukung');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let city = 'Lokasi Terdeteksi';
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          const a = data.address || {};
          // Prioritaskan tingkat terkecil: hamlet/suburb/village
          const detail = a.hamlet || a.suburb || a.neighbourhood || a.village || '';
          const area = a.village || a.town || a.city || a.county || '';
          // Gabungkan detail + area jika berbeda
          if (detail && area && detail !== area) {
            city = `${detail}, ${area}`;
          } else {
            city = detail || area || city;
          }
        } catch {}
        const loc = { latitude, longitude, city };
        setLocation(loc);
        localStorage.setItem('userLocation', JSON.stringify(loc));
        setLoading(false);
      },
      () => fallback('Izin lokasi ditolak')
    );
  };

  const fallback = (msg: string) => {
    setError(msg);
    const loc = { latitude: -6.2088, longitude: 106.8456, city: 'Jakarta (default)' };
    setLocation(loc);
    localStorage.setItem('userLocation', JSON.stringify(loc));
    setLoading(false);
  };

  useEffect(() => {
    if (!location) detectLocation();
  }, []);

  return { location, loading, error, detectLocation };
}
