// Motivasi islami dari sumber shahih untuk Tracker Insight

export interface InsightMotivation {
  text: string;
  source: string;
}

export const MOTIVATIONS_0_20: InsightMotivation[] = [
  { text: 'Amalan yang paling dicintai Allah adalah yang dilakukan terus menerus walaupun sedikit.', source: 'HR. Bukhari & Muslim' },
  { text: 'Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga.', source: 'HR. Muslim' },
  { text: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.', source: 'HR. Ahmad' },
  { text: 'Sesungguhnya bersama kesulitan ada kemudahan.', source: 'QS. Al-Insyirah: 6' },
  { text: 'Tidaklah seorang hamba mendekatkan diri kepada-Ku dengan sesuatu yang lebih Aku cintai daripada apa yang Aku wajibkan kepadanya.', source: 'HR. Bukhari' },
];

export const MOTIVATIONS_20_50: InsightMotivation[] = [
  { text: 'Dan orang-orang yang berjihad di jalan Kami, sungguh akan Kami tunjukkan kepada mereka jalan-jalan Kami.', source: 'QS. Al-Ankabut: 69' },
  { text: 'Maukah aku tunjukkan kepadamu suatu amalan yang paling dicintai Allah? Yaitu sholat pada waktunya.', source: 'HR. Bukhari & Muslim' },
  { text: 'Sesungguhnya Allah tidak menyia-nyiakan pahala orang yang berbuat kebaikan.', source: 'QS. At-Taubah: 120' },
  { text: "Bacalah Al-Qur'an, karena sesungguhnya ia akan datang pada hari kiamat sebagai pemberi syafaat bagi yang membacanya.", source: 'HR. Muslim' },
  { text: 'Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya.', source: 'QS. At-Talaq: 2' },
];

export const MOTIVATIONS_50_80: InsightMotivation[] = [
  { text: 'Sesungguhnya Allah mencintai orang-orang yang berbuat kebaikan.', source: 'QS. Al-Baqarah: 195' },
  { text: 'Dua nikmat yang sering dilupakan oleh kebanyakan manusia: kesehatan dan waktu luang.', source: 'HR. Bukhari' },
  { text: 'Dan barangsiapa yang mengerjakan kebaikan seberat dzarrah pun, niscaya dia akan melihat balasannya.', source: 'QS. Az-Zalzalah: 7' },
  { text: 'Janganlah kamu meremehkan kebaikan sedikit pun, meskipun hanya bertemu saudaramu dengan wajah berseri.', source: 'HR. Muslim' },
  { text: 'Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka beribadah kepada-Ku.', source: 'QS. Adz-Dzariyat: 56' },
];

export const MOTIVATIONS_80_100: InsightMotivation[] = [
  { text: 'Amalan yang paling dicintai Allah adalah yang dilakukan terus menerus walaupun sedikit.', source: 'HR. Bukhari & Muslim' },
  { text: 'Dan orang-orang yang sabar, sesungguhnya Allah beserta orang-orang yang sabar.', source: 'QS. Al-Baqarah: 153' },
  { text: 'Barangsiapa menjaga sholat, maka sholat itu akan menjadi cahaya, bukti, dan keselamatan baginya di hari kiamat.', source: 'HR. Ahmad' },
  { text: 'Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sehingga mereka mengubah keadaan yang ada pada diri mereka sendiri.', source: "QS. Ar-Ra'd: 11" },
  { text: 'Setiap amal anak Adam akan dilipatgandakan, satu kebaikan akan dicatat sepuluh hingga tujuh ratus kali lipat.', source: 'HR. Muslim' },
];

export const CELEBRATION_MOTIVATIONS: InsightMotivation[] = [
  { text: 'Amalan yang paling dicintai Allah adalah yang dilakukan terus menerus walaupun sedikit.', source: 'HR. Bukhari & Muslim' },
  { text: 'Dan barangsiapa yang mengerjakan kebaikan seberat dzarrah pun, niscaya dia akan melihat balasannya.', source: 'QS. Az-Zalzalah: 7' },
  { text: 'Sesungguhnya Allah mencintai orang-orang yang berbuat kebaikan.', source: 'QS. Al-Baqarah: 195' },
  { text: 'Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga.', source: 'HR. Muslim' },
  { text: 'Dan orang-orang yang sabar, sesungguhnya Allah beserta orang-orang yang sabar.', source: 'QS. Al-Baqarah: 153' },
];

export function getMotivationByProgress(progress: number, seed: number): InsightMotivation {
  let pool: InsightMotivation[];
  if (progress <= 20) pool = MOTIVATIONS_0_20;
  else if (progress <= 50) pool = MOTIVATIONS_20_50;
  else if (progress <= 80) pool = MOTIVATIONS_50_80;
  else pool = MOTIVATIONS_80_100;
  return pool[seed % pool.length];
}

export function getAnalysis(completed: number, total: number): string {
  if (completed === 0) return 'Kamu belum memulai ibadah hari ini. Yuk mulai dari yang ringan!';
  return `Kamu sudah menyelesaikan ${completed} dari ${total} ibadah hari ini.`;
}

// Time period detection
export type TimePeriod = 'pagi' | 'siang' | 'malam' | 'tidur';

export function getTimePeriod(hour: number): TimePeriod {
  if (hour >= 22 || hour < 4) return 'tidur';
  if (hour >= 4 && hour < 10) return 'pagi';
  if (hour >= 10 && hour < 15) return 'siang';
  return 'malam'; // 15-22
}

// Map of which items are appropriate for each time period
const TIME_APPROPRIATE_ITEMS: Record<TimePeriod, string[]> = {
  pagi: ['dzikir', 'tilawah', 'dhuha', 'sedekah', 'subuh', 'rawatib'],
  siang: ['tilawah', 'sedekah', 'dzikir', 'rawatib', 'dzuhur', 'ashar'],
  malam: ['dzikir', 'tilawah', 'rawatib', 'maghrib', 'isya', 'sedekah', 'tarawih'],
  tidur: ['rawatib', 'tilawah'],
};

const TIME_SUGGESTIONS: Record<TimePeriod, string[]> = {
  pagi: ['Dzikir Pagi', 'Tilawah Al-Quran', 'Sholat Dhuha', 'Sedekah'],
  siang: ['Tilawah Al-Quran', 'Sedekah', 'Dzikir', 'Sunnah Rawatib'],
  malam: ['Dzikir Petang', 'Tilawah Al-Quran', 'Istighfar', 'Persiapan Tahajud'],
  tidur: ['Persiapan Sholat Tahajud', 'Persiapan Sholat Subuh', 'Sunnah Rawatib', 'Tilawah Al-Quran'],
};

export function getTimeLabel(period: TimePeriod): string {
  switch (period) {
    case 'pagi': return 'pagi ini';
    case 'siang': return 'siang ini';
    case 'malam': return 'malam ini';
    case 'tidur': return 'menjelang tidur';
  }
}

export function getSuggestion(
  completed: number,
  total: number,
  progress: number,
  uncheckedItems: string[],
  hour: number
): string {
  if (progress === 100) return 'Alhamdulillah, semua ibadah hari ini sudah selesai!';

  const period = getTimePeriod(hour);
  const timeLabel = getTimeLabel(period);
  const appropriate = TIME_APPROPRIATE_ITEMS[period];
  const timeSuggestions = TIME_SUGGESTIONS[period];

  // Filter unchecked items that are appropriate for current time
  const relevantUnchecked = uncheckedItems.filter(label => {
    const lower = label.toLowerCase();
    return appropriate.some(key => lower.includes(key.toLowerCase()));
  });

  if (progress >= 80) {
    const remaining = total - completed;
    return `Tinggal ${remaining} ibadah lagi. Semangat menyelesaikannya!`;
  }

  if (relevantUnchecked.length > 0) {
    const picks = relevantUnchecked.slice(0, 2).join(' atau ');
    return `Masih ada amalan yang bisa dilakukan ${timeLabel} seperti ${picks}.`;
  }

  if (uncheckedItems.length > 0) {
    // Fallback to generic time-based suggestions
    const genericPicks = timeSuggestions.slice(0, 2).join(' atau ');
    return `${timeLabel.charAt(0).toUpperCase() + timeLabel.slice(1)}, coba lanjutkan dengan ${genericPicks}.`;
  }

  return 'Lanjutkan ibadahmu satu per satu, pasti bisa!';
}
