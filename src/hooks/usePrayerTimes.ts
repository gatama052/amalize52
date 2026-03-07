import { useState, useEffect } from 'react';

export interface PrayerTimings {
  Imsak: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface HijriDate {
  day: string;
  month: { number: number; en: string; ar: string };
  year: string;
}

export interface DayData {
  timings: PrayerTimings;
  date: {
    gregorian: { date: string; day: string; month: { number: number; en: string }; year: string };
    hijri: HijriDate;
  };
}

function formatDateParam(d: Date): string {
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
}

export function usePrayerTimes(latitude?: number, longitude?: number, date?: Date) {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) return;
    const d = date || new Date();
    const dateStr = formatDateParam(d);
    const cacheKey = `prayer_${dateStr}_${latitude.toFixed(1)}_${longitude.toFixed(1)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      setTimings(parsed.timings);
      setHijri(parsed.hijri);
      setLoading(false);
      return;
    }

    fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=20`)
      .then(r => r.json())
      .then(json => {
        const t = json.data.timings;
        const h = json.data.date.hijri;
        setTimings(t);
        setHijri(h);
        localStorage.setItem(cacheKey, JSON.stringify({ timings: t, hijri: h }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [latitude, longitude, date?.toDateString()]);

  return { timings, hijri, loading };
}

export function useMonthlyPrayer(latitude?: number, longitude?: number, year?: number, month?: number) {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!latitude || !longitude || !year || !month) return;
    const cacheKey = `monthly_${year}_${month}_${latitude.toFixed(1)}_${longitude.toFixed(1)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=20`)
      .then(r => r.json())
      .then(json => {
        setData(json.data);
        localStorage.setItem(cacheKey, JSON.stringify(json.data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [latitude, longitude, year, month]);

  return { data, loading };
}
