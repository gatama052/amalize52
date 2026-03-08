/**
 * Motivation texts organized by time slot and day type.
 * Each slot has 5+ variations per day type for variety.
 */

export type DayType = 'biasa' | 'seninkamis' | 'jumat' | 'ramadan';
export type TimeSlot =
  | 'tahajud'
  | 'menjelangSubuh'
  | 'siapSubuh'
  | 'pagi'
  | 'pagiSiang'
  | 'menjelangDzuhur'
  | 'siang'
  | 'menjelangAshar'
  | 'menjelangMaghrib'
  | 'setelahMaghrib'
  | 'setelahIsya'
  | 'sebelumTidur';

interface MotivationEntry {
  icon: string;
  texts: Record<DayType, string[]>;
}

export const MOTIVATIONS: Record<TimeSlot, MotivationEntry> = {
  tahajud: {
    icon: '🌙',
    texts: {
      biasa: [
        "Sepertiga malam adalah waktu yang penuh rahmat. Jika mampu, bangunlah untuk menunaikan sholat Tahajud dan memohon kepada Allah.",
        "Malam yang tenang ini adalah waktu terbaik untuk bermunajat kepada Allah. Bangunlah dan sholat Tahajud.",
        "Di keheningan malam, Allah turun ke langit dunia. Manfaatkan waktu ini untuk berdoa dan sholat Tahajud.",
        "Sepertiga malam terakhir adalah waktu mustajab untuk berdoa. Jangan lewatkan kesempatan emas ini.",
        "Bangunlah di sepertiga malam untuk mendekatkan diri kepada Allah melalui sholat Tahajud dan istighfar.",
      ],
      seninkamis: [
        "Sepertiga malam yang penuh keberkahan. Jika berniat berpuasa sunnah hari ini, semoga Allah memudahkan dan menerima niat ibadah Anda.",
        "Malam ini penuh rahmat. Bangunlah untuk Tahajud dan niatkan puasa sunnah Senin\u2013Kamis esok hari.",
        "Di sepertiga malam ini, panjatkan doa terbaik dan persiapkan diri untuk puasa sunnah hari ini.",
        "Sepertiga malam adalah waktu sahur terbaik. Jika berniat puasa sunnah, bangunlah dan makan sahur.",
        "Waktu sahur telah tiba. Bangunlah untuk sholat Tahajud dan nikmati sahur untuk puasa sunnah hari ini.",
      ],
      jumat: [
        "Sepertiga malam di hari Jumat adalah waktu yang mulia. Bangunlah untuk Tahajud dan perbanyak shalawat kepada Nabi Muhammad \uFDFA.",
        "Malam Jumat yang penuh berkah. Manfaatkan sepertiga malam ini untuk bermunajat dan memperbanyak shalawat.",
        "Di malam Jumat yang mulia ini, bangunlah untuk Tahajud. Doa di waktu ini sangat mustajab.",
        "Sepertiga malam Jumat adalah waktu yang istimewa. Perbanyak shalawat dan doa kepada Allah.",
        "Malam Jumat penuh keberkahan. Jangan lewatkan kesempatan untuk sholat Tahajud dan berdzikir.",
      ],
    },
  },

  menjelangSubuh: {
    icon: '🌄',
    texts: {
      biasa: [
        "Menjelang Subuh adalah waktu yang penuh keberkahan. Luangkan waktu untuk membaca Al-Quran atau memperbanyak istighfar.",
        "Waktu menjelang Subuh sangat mulia. Perbanyak istighfar dan doa agar hari ini penuh keberkahan.",
        "Sebelum fajar menyingsing, luangkan waktu untuk berdzikir dan memohon ampunan kepada Allah.",
        "Menjelang Subuh, hati yang tenang dan lisan yang berdzikir akan membawa keberkahan sepanjang hari.",
        "Waktu sebelum Subuh adalah kesempatan untuk mendekatkan diri kepada Allah melalui istighfar dan tilawah.",
      ],
      seninkamis: [
        "Menjelang Subuh yang penuh berkah ini, semoga Allah memudahkan ibadah Anda hari ini, termasuk puasa sunnah Senin\u2013Kamis.",
        "Sebelum fajar di hari puasa sunnah, perbanyak doa agar diberi kekuatan menjalani ibadah hari ini.",
        "Menjelang Subuh, sempurnakan sahur dan nikmati keberkahan puasa sunnah Senin\u2013Kamis.",
        "Waktu menjelang Subuh yang berkah. Semoga puasa sunnah hari ini menjadi bekal di akhirat.",
        "Di waktu menjelang Subuh ini, niatkan ibadah puasa sunnah dengan ikhlas karena Allah.",
      ],
      jumat: [
        "Menjelang Subuh di hari Jumat yang mulia, perbanyak dzikir dan shalawat kepada Nabi Muhammad \uFDFA.",
        "Fajar di hari Jumat akan segera menyingsing. Perbanyak shalawat dan persiapkan diri untuk beribadah.",
        "Menjelang Subuh Jumat, luangkan waktu untuk berdzikir dan membaca shalawat agar hari ini penuh berkah.",
        "Sebelum fajar Jumat tiba, panjatkan doa terbaik dan perbanyak shalawat kepada Rasulullah \uFDFA.",
        "Menjelang Subuh di hari yang mulia ini, manfaatkan waktu untuk istighfar dan shalawat.",
      ],
    },
  },

  siapSubuh: {
    icon: '🕌',
    texts: {
      biasa: [
        "Sebentar lagi waktu Subuh tiba. Bersiaplah untuk berwudhu dan menyambut panggilan adzan.",
        "Waktu Subuh hampir tiba. Segera berwudhu dan persiapkan diri untuk sholat berjamaah.",
        "Adzan Subuh akan segera berkumandang. Bersiaplah menyambut panggilan Allah.",
        "Beberapa menit lagi waktu Subuh. Jangan lewatkan sholat di awal waktu.",
        "Subuh hampir tiba. Berwudhulah dan niatkan sholat Subuh dengan khusyuk.",
      ],
      seninkamis: [
        "Sebentar lagi waktu Subuh tiba. Awali hari dengan sholat Subuh dan niatkan puasa sunnah hari ini.",
        "Waktu Subuh hampir tiba. Segera berwudhu dan mulai hari puasa sunnah dengan sholat Subuh.",
        "Adzan Subuh sebentar lagi. Sempurnakan niat puasa sunnah dan sambut panggilan sholat.",
        "Subuh hampir tiba di hari puasa sunnah. Bersiaplah sholat dan mulai hari dengan penuh berkah.",
        "Sebentar lagi Subuh. Jangan lupa niatkan puasa sunnah Senin\u2013Kamis sebelum terbit fajar.",
      ],
      jumat: [
        "Sebentar lagi waktu Subuh di hari Jumat. Sambut panggilan adzan dengan hati yang khusyuk.",
        "Subuh Jumat hampir tiba. Persiapkan diri dengan wudhu dan niat sholat yang ikhlas.",
        "Waktu Subuh di hari Jumat yang mulia hampir tiba. Jangan lewatkan sholat di awal waktu.",
        "Adzan Subuh Jumat sebentar lagi. Sambut dengan hati yang bersih dan penuh harap.",
        "Sebentar lagi Subuh di hari terbaik. Bersiaplah menyambut keberkahan hari Jumat.",
      ],
    },
  },

  pagi: {
    icon: '☀️',
    texts: {
      biasa: [
        "Awali hari dengan dzikir pagi agar hati lebih tenang dan aktivitas berjalan penuh keberkahan.",
        "Selamat pagi. Jangan lupa membaca dzikir pagi agar dilindungi Allah sepanjang hari.",
        "Pagi yang cerah. Awali dengan bismillah dan dzikir pagi untuk memulai hari dengan penuh berkah.",
        "Pagi ini adalah anugerah baru dari Allah. Manfaatkan dengan beribadah dan berbuat kebaikan.",
        "Selamat pagi. Semoga hari ini penuh keberkahan. Jangan lupa membaca dzikir pagi.",
      ],
      seninkamis: [
        "Selamat pagi. Hari ini adalah hari yang dianjurkan untuk berpuasa sunnah Senin\u2013Kamis. Semoga Allah memudahkan ibadah kita.",
        "Pagi di hari puasa sunnah. Awali dengan dzikir pagi dan semoga Allah memberi kekuatan menjalani puasa.",
        "Selamat pagi. Semoga puasa sunnah hari ini membawa keberkahan dan mendekatkan kita kepada Allah.",
        "Pagi yang berkah di hari puasa sunnah. Jaga niat dan perbanyak dzikir sepanjang hari.",
        "Selamat pagi di hari puasa sunnah. Baca dzikir pagi dan nikmati hari dengan penuh ibadah.",
      ],
      jumat: [
        "Selamat pagi di hari Jumat yang penuh berkah. Jangan lupa memperbanyak shalawat dan membaca Surah Al-Kahfi.",
        "Pagi Jumat yang mulia. Awali dengan dzikir pagi, shalawat, dan sempatkan membaca Surah Al-Kahfi.",
        "Selamat pagi. Hari Jumat adalah hari terbaik. Perbanyak shalawat kepada Nabi Muhammad \uFDFA.",
        "Pagi yang cerah di hari Jumat. Jangan lupa membaca Surah Al-Kahfi dan memperbanyak shalawat.",
        "Selamat pagi di hari Jumat yang penuh keberkahan. Awali dengan dzikir dan shalawat.",
      ],
    },
  },

  pagiSiang: {
    icon: '🌤️',
    texts: {
      biasa: [
        "Di tengah aktivitas pagi, jangan lupa menyempatkan diri untuk berdzikir dan mengingat Allah.",
        "Aktivitas pagi yang sibuk bukan alasan melupakan dzikir. Ingatlah Allah di setiap kesempatan.",
        "Semoga aktivitas pagi ini berjalan lancar. Jaga lisan dengan berdzikir kepada Allah.",
        "Di antara kesibukan, sempatkan untuk mengucap istighfar agar hati tetap tenang.",
        "Pagi yang produktif. Jangan lupa selipkan dzikir di antara aktivitas Anda.",
      ],
      seninkamis: [
        "Di hari puasa sunnah ini, semoga Allah memberi kekuatan dan keberkahan dalam setiap aktivitas Anda.",
        "Semoga puasa sunnah hari ini berjalan lancar. Perbanyak dzikir di tengah kesibukan.",
        "Di tengah aktivitas dan puasa sunnah, jangan lupa mengingat Allah. Semoga diberi kemudahan.",
        "Puasa sunnah bukan penghalang produktivitas. Justru, ini menambah keberkahan dalam bekerja.",
        "Semoga aktivitas hari ini diberkahi. Jaga puasa sunnah dengan ikhlas dan sabar.",
      ],
      jumat: [
        "Pagi di hari Jumat adalah waktu yang baik untuk memperbanyak shalawat dan amal kebaikan.",
        "Di hari Jumat yang berkah ini, perbanyak shalawat dan jangan lupa membaca Surah Al-Kahfi.",
        "Aktivitas di hari Jumat. Selipkan shalawat dan dzikir di antara kesibukan Anda.",
        "Hari Jumat penuh keberkahan. Semoga setiap aktivitas hari ini bernilai ibadah.",
        "Di pagi Jumat yang mulia, jangan lupa memperbanyak shalawat kepada Nabi \uFDFA.",
      ],
    },
  },

  menjelangDzuhur: {
    icon: '🕌',
    texts: {
      biasa: [
        "Sebentar lagi waktu Dzuhur tiba. Bersiaplah untuk menunaikan sholat tepat waktu.",
        "Waktu Dzuhur hampir tiba. Segera bersiap untuk sholat agar tidak terlewat.",
        "Adzan Dzuhur akan segera berkumandang. Bersiaplah berwudhu dan menuju tempat sholat.",
        "Menjelang Dzuhur, jeda sejenak dari aktivitas dan persiapkan diri untuk sholat.",
        "Waktu Dzuhur mendekat. Jangan tunda sholat, segera tunaikan di awal waktu.",
      ],
      seninkamis: [
        "Menjelang Dzuhur di hari puasa sunnah. Semoga ibadah hari ini diterima oleh Allah.",
        "Waktu Dzuhur hampir tiba. Di hari puasa sunnah ini, tunaikan sholat dengan khusyuk.",
        "Sebentar lagi Dzuhur. Meski berpuasa, jangan kendor dalam menunaikan sholat tepat waktu.",
        "Menjelang Dzuhur di hari puasa sunnah. Perbanyak doa saat menunggu adzan.",
        "Waktu Dzuhur mendekat. Semoga puasa sunnah dan sholat hari ini diterima Allah.",
      ],
      jumat: [
        "Menjelang waktu sholat di hari Jumat yang penuh berkah. Semoga setiap amal dilipatgandakan pahalanya.",
        "Waktu sholat Jumat hampir tiba. Bersiaplah dengan mandi, berpakaian rapi, dan berangkat ke masjid.",
        "Sebentar lagi sholat Jumat. Berangkatlah lebih awal untuk mendapat tempat terbaik di masjid.",
        "Menjelang sholat Jumat yang penuh berkah. Perbanyak shalawat sebelum berangkat ke masjid.",
        "Waktu sholat Jumat mendekat. Jangan lupa mandi Jumat dan memakai wewangian.",
      ],
    },
  },

  siang: {
    icon: '🌤️',
    texts: {
      biasa: [
        "Di tengah aktivitas, jangan lupa menyempatkan diri untuk berdzikir dan mengingat Allah.",
        "Siang yang sibuk bukan alasan melupakan Allah. Sempatkan berdzikir walau sejenak.",
        "Semoga aktivitas siang ini berjalan lancar. Jaga hati dengan berdzikir kepada Allah.",
        "Di antara kesibukan siang, selipkan istighfar dan shalawat untuk ketenangan hati.",
        "Siang hari adalah waktu bekerja. Niatkan aktivitas sebagai ibadah dan jangan lupa berdzikir.",
      ],
      seninkamis: [
        "Semoga puasa sunnah hari ini berjalan dengan lancar dan membawa keberkahan bagi Anda.",
        "Di tengah puasa sunnah, jaga kesabaran dan perbanyak dzikir. Semoga Allah meridhai.",
        "Siang di hari puasa sunnah. Tetap semangat dan niatkan semua karena Allah.",
        "Puasa sunnah Senin\u2013Kamis menambah pahala. Semoga diberi kekuatan hingga waktu berbuka.",
        "Semoga siang ini penuh berkah. Jaga puasa sunnah dengan sabar dan ikhlas.",
      ],
      jumat: [
        "Hari Jumat adalah hari yang istimewa. Semoga setiap amal ibadah hari ini dilipatgandakan pahalanya.",
        "Siang di hari Jumat yang berkah. Perbanyak shalawat dan sedekah hari ini.",
        "Di hari Jumat, setiap amal kebaikan bernilai lebih. Semoga hari ini penuh ibadah.",
        "Siang Jumat yang penuh berkah. Semoga Allah menerima semua amal kita hari ini.",
        "Hari Jumat adalah hari terbaik. Perbanyak dzikir dan shalawat di siang hari ini.",
      ],
    },
  },

  menjelangAshar: {
    icon: '🌇',
    texts: {
      biasa: [
        "Sebentar lagi waktu Ashar tiba. Mari bersiap untuk menunaikan sholat tepat waktu.",
        "Waktu Ashar hampir tiba. Jangan tunda sholat, segera bersiap berwudhu.",
        "Menjelang Ashar, jeda sejenak dari aktivitas dan bersiaplah untuk sholat.",
        "Adzan Ashar sebentar lagi. Ingatlah, sholat Ashar sangat ditekankan dalam Islam.",
        "Waktu Ashar mendekat. Segera tunaikan sholat di awal waktu.",
      ],
      seninkamis: [
        "Menjelang waktu Ashar di hari puasa sunnah. Semoga Allah menerima ibadah kita hari ini.",
        "Waktu Ashar hampir tiba. Meski berpuasa, jangan kendor dalam menunaikan sholat.",
        "Sebentar lagi Ashar di hari puasa sunnah. Perbanyak doa menjelang sholat.",
        "Menjelang Ashar, tetap semangat menjalani puasa sunnah. Waktu berbuka semakin dekat.",
        "Waktu Ashar mendekat di hari puasa sunnah. Segera bersiap sholat dengan khusyuk.",
      ],
      jumat: [
        "Menjelang Ashar di hari Jumat yang mulia. Perbanyak dzikir dan doa kepada Allah.",
        "Waktu Ashar hampir tiba di hari Jumat. Jangan lupa terus memperbanyak shalawat.",
        "Sebentar lagi Ashar. Di hari Jumat yang berkah ini, perbanyak doa dan dzikir.",
        "Menjelang Ashar Jumat, manfaatkan waktu untuk berdoa. Ada waktu mustajab di hari ini.",
        "Waktu Ashar di hari Jumat mendekat. Ingat, di hari Jumat ada waktu ijabah doa.",
      ],
    },
  },

  menjelangMaghrib: {
    icon: '🌅',
    texts: {
      biasa: [
        "Sebentar lagi waktu Maghrib tiba. Mari bersiap menunaikan sholat.",
        "Waktu Maghrib hampir tiba. Jangan lewatkan berdoa menjelang adzan.",
        "Menjelang Maghrib, perbanyak doa karena doa menjelang Maghrib sangat mustajab.",
        "Adzan Maghrib sebentar lagi. Bersiaplah berwudhu dan menunaikan sholat.",
        "Waktu Maghrib mendekat. Jangan lupa berdoa sebelum adzan berkumandang.",
      ],
      seninkamis: [
        "Sebentar lagi waktu berbuka puasa sunnah. Semoga Allah menerima ibadah puasa hari ini.",
        "Waktu berbuka hampir tiba. Berdoalah, karena doa orang yang berpuasa sangat mustajab.",
        "Menjelang Maghrib di hari puasa sunnah. Sebentar lagi tiba waktu menikmati hidangan berbuka.",
        "Alhamdulillah, waktu berbuka puasa sunnah hampir tiba. Berdoalah sebelum adzan.",
        "Sebentar lagi berbuka. Semoga puasa sunnah hari ini diterima dan menjadi ladang pahala.",
      ],
      jumat: [
        "Menjelang Maghrib di hari Jumat yang penuh berkah. Semoga Allah menerima amal ibadah kita hari ini.",
        "Waktu Maghrib hampir tiba di hari Jumat. Perbanyak doa di saat-saat terakhir hari yang mulia ini.",
        "Menjelang Maghrib Jumat, manfaatkan waktu mustajab ini untuk berdoa.",
        "Sebentar lagi Maghrib di hari Jumat. Jangan lupa berdoa sebelum adzan berkumandang.",
        "Waktu Maghrib di hari Jumat mendekat. Perbanyak shalawat dan doa.",
      ],
    },
  },

  setelahMaghrib: {
    icon: '🌙',
    texts: {
      biasa: [
        "Setelah Maghrib adalah waktu yang baik untuk membaca Al-Quran dan berdzikir.",
        "Luangkan waktu setelah Maghrib untuk tilawah Al-Quran agar hati menjadi tenang.",
        "Malam telah tiba. Sempatkan membaca beberapa ayat Al-Quran setelah sholat Maghrib.",
        "Setelah Maghrib, manfaatkan waktu untuk membaca Al-Quran dan berdzikir kepada Allah.",
        "Waktu setelah Maghrib sangat baik untuk tilawah. Bacalah walau hanya satu halaman.",
      ],
      seninkamis: [
        "Setelah berbuka puasa sunnah, jangan lupa bersyukur dan memperbanyak dzikir kepada Allah.",
        "Alhamdulillah, puasa sunnah hari ini telah selesai. Perbanyak syukur dan tilawah malam ini.",
        "Setelah berbuka, nikmati waktu ini untuk berdzikir dan membaca Al-Quran.",
        "Puasa sunnah telah usai. Lanjutkan dengan ibadah malam dan tilawah Al-Quran.",
        "Setelah berbuka puasa sunnah, jangan lupa sholat Maghrib dan membaca Al-Quran.",
      ],
      jumat: [
        "Malam Jumat adalah waktu yang baik untuk memperbanyak shalawat dan membaca Al-Quran.",
        "Setelah Maghrib di malam Jumat, perbanyak shalawat dan tilawah Al-Quran.",
        "Malam Jumat yang berkah. Luangkan waktu untuk membaca Al-Quran dan bershalawat.",
        "Di malam Jumat, perbanyak shalawat kepada Nabi \uFDFA dan baca Surah Al-Kahfi jika belum.",
        "Malam Jumat penuh keberkahan. Manfaatkan untuk tilawah dan memperbanyak shalawat.",
      ],
    },
  },

  setelahIsya: {
    icon: '🌙',
    texts: {
      biasa: [
        "Setelah Isya, luangkan waktu untuk berdzikir atau membaca Al-Quran agar hati menjadi lebih tenang.",
        "Malam setelah Isya adalah waktu yang tenang untuk mendekatkan diri kepada Allah.",
        "Luangkan waktu setelah Isya untuk tilawah dan muhasabah diri.",
        "Setelah Isya, bacalah beberapa ayat Al-Quran sebelum melanjutkan aktivitas malam.",
        "Malam yang tenang setelah Isya. Manfaatkan untuk berdzikir dan berdoa.",
      ],
      seninkamis: [
        "Setelah Isya di hari puasa sunnah, semoga Allah menerima seluruh amal ibadah kita hari ini.",
        "Alhamdulillah, hari puasa sunnah telah berlalu. Tutup malam ini dengan dzikir dan doa.",
        "Setelah Isya di hari yang berkah ini, lanjutkan dengan tilawah dan muhasabah.",
        "Hari puasa sunnah telah usai. Semoga menjadi tabungan pahala di akhirat.",
        "Malam setelah Isya di hari puasa sunnah. Perbanyak syukur dan dzikir malam.",
      ],
      jumat: [
        "Malam Jumat adalah waktu yang baik untuk memperbanyak shalawat kepada Nabi Muhammad \uFDFA.",
        "Setelah Isya di malam Jumat, perbanyak shalawat dan baca Surah Al-Kahfi.",
        "Malam Jumat yang berkah. Luangkan waktu untuk shalawat dan tilawah.",
        "Di malam Jumat, jangan lupa memperbanyak shalawat dan doa kepada Allah.",
        "Malam Jumat penuh berkah. Manfaatkan untuk berdzikir dan bershalawat.",
      ],
    },
  },

  sebelumTidur: {
    icon: '😴',
    texts: {
      biasa: [
        "Sebelum tidur, jangan lupa membaca dzikir malam dan Surah Al-Mulk.",
        "Tutup hari ini dengan membaca Surah Al-Mulk dan dzikir sebelum tidur.",
        "Sebelum memejamkan mata, baca Ayat Kursi dan dzikir malam untuk perlindungan.",
        "Jangan lupa membaca doa sebelum tidur dan Surah Al-Mulk agar tidur penuh berkah.",
        "Akhiri hari dengan dzikir malam dan baca Surah Al-Mulk. Semoga tidur Anda nyenyak.",
      ],
      seninkamis: [
        "Tutup hari ini dengan dzikir sebelum tidur. Semoga Allah menerima ibadah puasa hari ini.",
        "Hari puasa sunnah telah selesai. Baca Surah Al-Mulk dan dzikir malam sebelum tidur.",
        "Sebelum tidur di hari puasa sunnah, bersyukurlah dan baca dzikir malam.",
        "Alhamdulillah, puasa sunnah hari ini telah usai. Tutup dengan Surah Al-Mulk.",
        "Semoga puasa sunnah hari ini diterima. Jangan lupa dzikir sebelum tidur.",
      ],
      jumat: [
        "Sebelum tidur di malam Jumat, perbanyak shalawat dan doa kepada Allah.",
        "Tutup hari Jumat dengan Surah Al-Mulk dan shalawat kepada Nabi \uFDFA.",
        "Malam Jumat yang berkah. Baca dzikir malam dan perbanyak shalawat sebelum tidur.",
        "Sebelum tidur di malam Jumat, jangan lupa baca Surah Al-Mulk dan bershalawat.",
        "Akhiri hari Jumat dengan dzikir, shalawat, dan doa terbaik sebelum tidur.",
      ],
    },
  },
};

/**
 * Get the current time slot based on the current time and prayer schedule.
 */
export function getTimeSlot(
  now: Date,
  prayerTimes?: { Fajr?: string; Dhuhr?: string; Asr?: string; Maghrib?: string; Isha?: string }
): TimeSlot {
  const h = now.getHours();
  const m = now.getMinutes();
  const currentMin = h * 60 + m;

  const toMin = (t?: string) => {
    if (!t) return null;
    const [hh, mm] = t.substring(0, 5).split(':').map(Number);
    return hh * 60 + mm;
  };

  const fajr = toMin(prayerTimes?.Fajr);
  const dhuhr = toMin(prayerTimes?.Dhuhr);
  const asr = toMin(prayerTimes?.Asr);
  const maghrib = toMin(prayerTimes?.Maghrib);
  const isha = toMin(prayerTimes?.Isha);

  if (currentMin >= 120 && currentMin <= 210) return 'tahajud';
  if (fajr !== null && currentMin > 210 && currentMin < fajr - 5) return 'menjelangSubuh';
  if (fajr !== null && currentMin >= fajr - 5 && currentMin < fajr) return 'siapSubuh';
  if (fajr !== null && currentMin >= fajr && currentMin <= 480) return 'pagi';
  if (currentMin > 480 && currentMin <= 630) return 'pagiSiang';
  if (dhuhr !== null && currentMin > 630 && currentMin < dhuhr) return 'menjelangDzuhur';
  if (dhuhr !== null && asr !== null && currentMin >= dhuhr && currentMin < asr - 10) return 'siang';
  if (asr !== null && currentMin >= asr - 10 && currentMin < asr) return 'menjelangAshar';
  if (asr !== null && maghrib !== null && currentMin >= asr && currentMin < maghrib - 10) return 'menjelangAshar';
  if (maghrib !== null && currentMin >= maghrib - 10 && currentMin < maghrib) return 'menjelangMaghrib';
  if (maghrib !== null && currentMin >= maghrib && currentMin <= 1170) return 'setelahMaghrib';
  if (isha !== null && currentMin >= isha && currentMin <= 1290) return 'setelahIsya';
  if (currentMin > 1170 && currentMin <= 1290) return 'setelahIsya';
  if (currentMin > 1290 || currentMin < 120) return 'sebelumTidur';

  return 'pagi';
}

/**
 * Get the day type: jumat, seninkamis, or biasa
 */
export function getDayType(now: Date): DayType {
  const day = now.getDay();
  if (day === 5) return 'jumat';
  if (day === 1 || day === 4) return 'seninkamis';
  return 'biasa';
}

/**
 * Pick a motivation text. Uses date-based seed for daily variety within same time slot.
 */
export function getMotivation(
  now: Date,
  prayerTimes?: { Fajr?: string; Dhuhr?: string; Asr?: string; Maghrib?: string; Isha?: string }
): { icon: string; text: string } {
  const slot = getTimeSlot(now, prayerTimes);
  const dayType = getDayType(now);
  const entry = MOTIVATIONS[slot];
  const texts = entry.texts[dayType];

  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const slotIndex = Object.keys(MOTIVATIONS).indexOf(slot);
  const seed = (dayOfYear * 13 + slotIndex * 7) % texts.length;

  return { icon: entry.icon, text: texts[seed] };
}
