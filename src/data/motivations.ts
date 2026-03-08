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

// Special fasting days based on Hijri calendar
interface SpecialFastingDay {
  name: string;
  icon: string;
  texts: string[];
}

const SPECIAL_FASTING_DAYS: Record<string, SpecialFastingDay> = {
  // Puasa Arafah - 9 Dzulhijjah
  '12-9': {
    name: 'Puasa Arafah',
    icon: '🕋',
    texts: [
      "Hari ini adalah hari Arafah, salah satu puasa yang sangat dianjurkan. Semoga Allah menghapus dosa setahun yang lalu dan setahun yang akan datang.",
      "Puasa Arafah menghapus dosa dua tahun. Semoga Allah menerima ibadah puasa kita hari ini.",
      "Di hari Arafah yang mulia ini, berpuasalah dengan ikhlas. Rasulullah ﷺ bersabda puasa ini menghapus dosa dua tahun.",
      "Hari Arafah adalah hari yang sangat agung. Manfaatkan dengan berpuasa dan memperbanyak doa.",
      "Semoga puasa Arafah hari ini menjadi penghapus dosa kita. Perbanyak doa dan dzikir.",
    ],
  },
  // Puasa Tasu'a - 9 Muharram
  '1-9': {
    name: 'Puasa Tasu\'a',
    icon: '📿',
    texts: [
      "Hari ini adalah hari Tasu'a (9 Muharram). Dianjurkan berpuasa bersama dengan puasa Asyura besok.",
      "Puasa Tasu'a dianjurkan Rasulullah ﷺ untuk membedakan dengan puasa Ahli Kitab. Semoga Allah menerima.",
      "Di hari Tasu'a ini, berpuasalah sebagai persiapan menyambut puasa Asyura besok.",
      "Hari Tasu'a adalah hari yang baik untuk berpuasa. Lengkapi dengan puasa Asyura besok.",
      "Semoga puasa Tasu'a hari ini membawa keberkahan. Lanjutkan dengan puasa Asyura besok.",
    ],
  },
  // Puasa Asyura - 10 Muharram
  '1-10': {
    name: 'Puasa Asyura',
    icon: '📿',
    texts: [
      "Hari ini adalah hari Asyura (10 Muharram). Puasa di hari ini menghapus dosa setahun yang lalu.",
      "Puasa Asyura adalah sunnah yang sangat dianjurkan. Rasulullah ﷺ bersabda: menghapus dosa setahun yang lalu.",
      "Di hari Asyura yang mulia ini, berpuasalah dengan penuh keikhlasan kepada Allah.",
      "Hari Asyura penuh keberkahan. Semoga puasa kita hari ini diterima oleh Allah.",
      "Semoga puasa Asyura hari ini menjadi penghapus dosa. Perbanyak dzikir dan istighfar.",
    ],
  },
  // Ayyamul Bidh - 13, 14, 15 setiap bulan Hijriyah
  'bidh-13': {
    name: 'Puasa Ayyamul Bidh',
    icon: '🌕',
    texts: [
      "Hari ini adalah awal Ayyamul Bidh (13 Hijriyah). Dianjurkan berpuasa tiga hari: 13, 14, dan 15.",
      "Puasa Ayyamul Bidh sangat dianjurkan Rasulullah ﷺ. Hari ini tanggal 13 Hijriyah, mari berpuasa.",
      "Ayyamul Bidh dimulai hari ini. Berpuasalah selama tiga hari untuk mendapat pahala besar.",
      "Hari pertama Ayyamul Bidh. Semoga Allah memudahkan puasa sunnah tiga hari ini.",
      "Rasulullah ﷺ menganjurkan puasa Ayyamul Bidh. Hari ini tanggal 13, mari mulai berpuasa.",
    ],
  },
  'bidh-14': {
    name: 'Puasa Ayyamul Bidh',
    icon: '🌕',
    texts: [
      "Hari ini tanggal 14 Hijriyah, hari kedua Ayyamul Bidh. Semoga puasa sunnah ini diterima Allah.",
      "Lanjutkan puasa Ayyamul Bidh hari kedua ini. Semoga Allah memberi kekuatan dan pahala.",
      "Di hari kedua Ayyamul Bidh, semoga puasa kita bernilai ibadah yang besar di sisi Allah.",
      "Tanggal 14 Hijriyah, hari kedua puasa Ayyamul Bidh. Tetap semangat berpuasa sunnah.",
      "Puasa Ayyamul Bidh hari kedua. Semoga menjadi tabungan amal di akhirat.",
    ],
  },
  'bidh-15': {
    name: 'Puasa Ayyamul Bidh',
    icon: '🌕',
    texts: [
      "Hari ini tanggal 15 Hijriyah, hari terakhir Ayyamul Bidh. Sempurnakan puasa tiga hari ini.",
      "Hari terakhir Ayyamul Bidh. Alhamdulillah jika mampu menyelesaikan puasa tiga hari ini.",
      "Tanggal 15 Hijriyah, hari ketiga Ayyamul Bidh. Semoga puasa sunnah ini diterima Allah.",
      "Sempurnakan puasa Ayyamul Bidh hari ini. Semoga Allah menerima ibadah kita.",
      "Hari terakhir puasa Ayyamul Bidh. Semoga menjadi amal yang berat di timbangan kebaikan.",
    ],
  },
};

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
      ramadan: [
        "Sepertiga malam Ramadhan adalah waktu yang sangat mulia. Bangunlah untuk Tahajud dan persiapkan sahur.",
        "Di malam Ramadhan yang penuh rahmat ini, manfaatkan sepertiga malam untuk bermunajat dan sholat Tahajud.",
        "Malam Ramadhan penuh ampunan. Bangunlah untuk Tahajud, berdoa, dan bersiap sahur.",
        "Sepertiga malam di bulan Ramadhan sangat istimewa. Perbanyak doa dan istighfar sebelum sahur.",
        "Bangunlah di sepertiga malam Ramadhan ini. Sholat Tahajud dan sahur untuk menyempurnakan puasa.",
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
      ramadan: [
        "Menjelang Subuh di bulan Ramadhan. Sempurnakan sahur dan niatkan puasa dengan ikhlas karena Allah.",
        "Waktu sahur hampir berakhir. Perbanyak doa dan istighfar sebelum imsak tiba.",
        "Menjelang Subuh Ramadhan, sempurnakan sahur Anda. Sahur adalah sunnah yang penuh berkah.",
        "Sebelum fajar Ramadhan menyingsing, perbanyak istighfar dan sempurnakan makan sahur.",
        "Menjelang imsak di bulan penuh rahmat ini, berdoalah agar puasa hari ini dimudahkan.",
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
      ramadan: [
        "Waktu imsak telah tiba. Hentikan makan sahur dan bersiaplah untuk sholat Subuh.",
        "Sebentar lagi adzan Subuh Ramadhan. Bersiaplah sholat dan mulai hari penuh ibadah.",
        "Subuh Ramadhan hampir tiba. Sempurnakan niat puasa dan bersiaplah sholat Subuh.",
        "Adzan Subuh Ramadhan sebentar lagi. Sambut dengan hati yang khusyuk dan penuh harap.",
        "Waktu Subuh di bulan Ramadhan hampir tiba. Jangan lewatkan sholat di awal waktu.",
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
      ramadan: [
        "Selamat pagi di bulan Ramadhan yang penuh berkah. Awali dengan dzikir pagi dan nikmati hari puasa dengan penuh ibadah.",
        "Pagi Ramadhan yang cerah. Perbanyak dzikir dan jaga puasa dengan sabar serta ikhlas.",
        "Selamat pagi. Semoga puasa Ramadhan hari ini membawa keberkahan dan ampunan dari Allah.",
        "Pagi di bulan penuh rahmat. Manfaatkan waktu untuk membaca Al-Quran dan berdzikir.",
        "Selamat pagi di bulan Ramadhan. Jaga puasa, perbanyak dzikir, dan sebarkan kebaikan.",
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
      ramadan: [
        "Di tengah aktivitas Ramadhan, jaga puasa dengan sabar. Perbanyak dzikir dan istighfar.",
        "Semoga aktivitas di bulan Ramadhan ini penuh berkah. Jaga lisan dan perbanyak kebaikan.",
        "Ramadhan bukan penghalang produktivitas. Semoga Allah memberi kekuatan menjalani puasa.",
        "Di bulan Ramadhan, setiap aktivitas bisa bernilai ibadah jika diniatkan karena Allah.",
        "Tetap semangat beraktivitas di bulan Ramadhan. Perbanyak dzikir di tengah kesibukan.",
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
      ramadan: [
        "Menjelang Dzuhur di bulan Ramadhan. Tunaikan sholat dengan khusyuk meski sedang berpuasa.",
        "Waktu Dzuhur hampir tiba di bulan Ramadhan. Jangan lupa sholat tepat waktu.",
        "Sebentar lagi Dzuhur. Di bulan penuh rahmat ini, perbanyak doa saat menunggu adzan.",
        "Menjelang Dzuhur Ramadhan. Semoga puasa dan sholat kita diterima oleh Allah.",
        "Waktu Dzuhur mendekat. Tetap semangat berpuasa dan jangan tunda sholat.",
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
      ramadan: [
        "Siang Ramadhan, tetap semangat berpuasa. Perbanyak dzikir dan membaca Al-Quran.",
        "Di tengah puasa Ramadhan, jaga kesabaran dan perbanyak istighfar. Semoga Allah meridhai.",
        "Siang di bulan Ramadhan. Tetap produktif dan niatkan semua aktivitas sebagai ibadah.",
        "Semoga puasa Ramadhan hari ini berjalan lancar. Waktu berbuka semakin dekat, bersabarlah.",
        "Siang Ramadhan penuh berkah. Manfaatkan untuk memperbanyak tilawah Al-Quran.",
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
      ramadan: [
        "Menjelang Ashar di bulan Ramadhan. Tetap semangat, waktu berbuka semakin dekat.",
        "Waktu Ashar hampir tiba. Di bulan Ramadhan ini, perbanyak doa menjelang sholat.",
        "Sebentar lagi Ashar Ramadhan. Bersabarlah, pahala puasa sangat besar di sisi Allah.",
        "Menjelang Ashar di bulan penuh rahmat. Semoga puasa kita diterima Allah.",
        "Waktu Ashar mendekat di bulan Ramadhan. Segera bersiap sholat dan perbanyak dzikir.",
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
      ramadan: [
        "Sebentar lagi waktu berbuka puasa Ramadhan! Berdoalah, doa orang berpuasa sangat mustajab.",
        "Waktu berbuka Ramadhan hampir tiba. Panjatkan doa terbaik sebelum adzan Maghrib.",
        "Alhamdulillah, sebentar lagi berbuka puasa. Semoga puasa hari ini diterima Allah.",
        "Menjelang Maghrib Ramadhan. Bersabarlah sebentar lagi, waktu berbuka sudah sangat dekat.",
        "Waktu berbuka hampir tiba. Semoga puasa Ramadhan hari ini menjadi penghapus dosa.",
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
      ramadan: [
        "Alhamdulillah, berbuka puasa Ramadhan telah tiba. Bersyukurlah dan sholat Maghrib tepat waktu.",
        "Setelah berbuka Ramadhan, lanjutkan dengan sholat Maghrib dan persiapkan diri untuk Tarawih.",
        "Malam Ramadhan penuh berkah. Setelah berbuka, bersiaplah untuk sholat Tarawih berjamaah.",
        "Nikmati hidangan berbuka dan jangan lupa sholat Maghrib. Malam ini, lanjutkan dengan Tarawih.",
        "Setelah berbuka Ramadhan, perbanyak tilawah Al-Quran dan bersiap untuk sholat Tarawih.",
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
      ramadan: [
        "Setelah Isya dan Tarawih di bulan Ramadhan, lanjutkan dengan tilawah Al-Quran.",
        "Malam Ramadhan setelah Tarawih. Perbanyak dzikir dan berdoa kepada Allah.",
        "Semoga sholat Tarawih malam ini khusyuk. Lanjutkan dengan membaca Al-Quran.",
        "Malam Ramadhan penuh ampunan. Manfaatkan untuk ibadah dan tilawah.",
        "Setelah Tarawih, luangkan waktu untuk berdzikir dan berdoa. Berburu malam Lailatul Qadar.",
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
      ramadan: [
        "Sebelum tidur di malam Ramadhan, baca dzikir malam dan niatkan bangun untuk sahur.",
        "Tutup malam Ramadhan dengan Surah Al-Mulk. Jangan lupa pasang alarm untuk sahur.",
        "Sebelum tidur, bersyukurlah atas puasa hari ini. Bersiaplah bangun untuk sahur dan Tahajud.",
        "Malam Ramadhan yang berkah. Baca dzikir sebelum tidur dan niatkan qiyamul lail.",
        "Akhiri malam Ramadhan dengan dzikir dan doa. Semoga besok diberi kekuatan berpuasa.",
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
 * Get the day type based on priority:
 * 1. Ramadan (highest)
 * 2. Special fasting days
 * 3. Senin/Kamis fasting
 * 4. Jumat
 * 5. Biasa (default)
 */
export function getDayType(now: Date, hijriMonth?: number): DayType {
  // Priority 1: Ramadan
  if (hijriMonth === 9) return 'ramadan';
  
  const day = now.getDay();
  if (day === 5) return 'jumat';
  if (day === 1 || day === 4) return 'seninkamis';
  return 'biasa';
}

/**
 * Check for special fasting days based on Hijri calendar.
 * Returns special fasting motivation if applicable, null otherwise.
 */
function getSpecialFastingMotivation(
  now: Date,
  hijriMonth?: number,
  hijriDay?: number
): { icon: string; text: string } | null {
  if (!hijriMonth || !hijriDay) return null;
  
  // Don't show special fasting during Ramadan
  if (hijriMonth === 9) return null;

  // Check specific dates (Arafah, Tasu'a, Asyura)
  const dateKey = `${hijriMonth}-${hijriDay}`;
  const specialDay = SPECIAL_FASTING_DAYS[dateKey];
  if (specialDay) {
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const seed = dayOfYear % specialDay.texts.length;
    return { icon: specialDay.icon, text: specialDay.texts[seed] };
  }

  // Check Ayyamul Bidh (13, 14, 15 of any Hijri month)
  if (hijriDay >= 13 && hijriDay <= 15) {
    const bidhKey = `bidh-${hijriDay}`;
    const bidhDay = SPECIAL_FASTING_DAYS[bidhKey];
    if (bidhDay) {
      const dayOfYear = Math.floor(
        (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
      );
      const seed = dayOfYear % bidhDay.texts.length;
      return { icon: bidhDay.icon, text: bidhDay.texts[seed] };
    }
  }

  return null;
}

/**
 * Pick a motivation text with priority system:
 * 1. Ramadan → use ramadan day type
 * 2. Special fasting days (Arafah, Asyura, Ayyamul Bidh) → override
 * 3. Senin/Kamis → use seninkamis day type
 * 4. Jumat → use jumat day type
 * 5. Default → biasa
 */
export function getMotivation(
  now: Date,
  prayerTimes?: { Fajr?: string; Dhuhr?: string; Asr?: string; Maghrib?: string; Isha?: string },
  hijriMonth?: number,
  hijriDay?: number
): { icon: string; text: string } {
  const slot = getTimeSlot(now, prayerTimes);
  
  // Priority 2: Special fasting days (but not during Ramadan)
  const specialFasting = getSpecialFastingMotivation(now, hijriMonth, hijriDay);
  if (specialFasting) return specialFasting;

  // Priority 1 (Ramadan), 3 (Senin/Kamis), 4 (Jumat), 5 (biasa)
  const dayType = getDayType(now, hijriMonth);
  const entry = MOTIVATIONS[slot];
  const texts = entry.texts[dayType];

  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const slotIndex = Object.keys(MOTIVATIONS).indexOf(slot);
  const seed = (dayOfYear * 13 + slotIndex * 7) % texts.length;

  return { icon: entry.icon, text: texts[seed] };
}
