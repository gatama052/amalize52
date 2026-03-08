// Golden Column Motivation System
// Priority: 1. Islamic Events  2. National Events  3. General Motivations

export interface GoldenMotivation {
  icon: string;
  text: string;
}

// Islamic event motivations (keyed by hijri month-day from important-dates.ts)
const ISLAMIC_MOTIVATIONS: Record<string, GoldenMotivation[]> = {
  '1-1': [
    { icon: '🌙', text: 'Selamat Tahun Baru Islam. Semoga tahun ini membawa keberkahan dan kebaikan dalam setiap langkah ibadah kita.' },
    { icon: '🌙', text: 'Tahun baru Hijriyah telah tiba. Jadikan momentum ini untuk memperbarui niat dan meningkatkan amal kebaikan.' },
    { icon: '🌙', text: 'Selamat menyambut tahun baru Islam. Semoga Allah memberikan kekuatan untuk menjadi hamba yang lebih baik.' },
  ],
  '1-10': [
    { icon: '📿', text: 'Hari Asyura adalah hari yang mulia. Dianjurkan untuk berpuasa sebagai bentuk syukur kepada Allah.' },
    { icon: '📿', text: 'Pada hari Asyura, Nabi Musa diselamatkan oleh Allah. Mari berpuasa sebagai bentuk rasa syukur.' },
    { icon: '📿', text: 'Puasa Asyura menghapuskan dosa setahun yang lalu. Semoga Allah menerima ibadah kita di hari mulia ini.' },
  ],
  '3-12': [
    { icon: '🕌', text: 'Maulid Nabi Muhammad ﷺ. Perbanyak shalawat dan teladani akhlak mulia Rasulullah dalam kehidupan sehari-hari.' },
    { icon: '🕌', text: 'Selamat memperingati Maulid Nabi ﷺ. Semoga kecintaan kita kepada Rasulullah semakin bertambah.' },
    { icon: '🕌', text: 'Hari kelahiran Nabi Muhammad ﷺ. Mari memperbanyak shalawat dan meneladani sunnah beliau.' },
  ],
  '7-27': [
    { icon: '✨', text: 'Isra Mi\'raj adalah perjalanan mulia Rasulullah ﷺ. Peristiwa ini mengajarkan kita pentingnya sholat.' },
    { icon: '✨', text: 'Memperingati Isra Mi\'raj, momen diwajibkannya sholat lima waktu. Semoga sholat kita semakin khusyuk.' },
    { icon: '✨', text: 'Malam Isra Mi\'raj mengingatkan kita akan kedekatan hamba dengan Rabb-nya melalui sholat.' },
  ],
  '8-15': [
    { icon: '🌙', text: 'Malam Nisfu Sya\'ban adalah malam pengampunan. Perbanyak istighfar dan doa kepada Allah.' },
    { icon: '🌙', text: 'Pada Nisfu Sya\'ban, amal perbuatan diangkat kepada Allah. Semoga amal kita diterima.' },
    { icon: '🌙', text: 'Malam Nisfu Sya\'ban penuh rahmat. Perbanyak ibadah dan mohon ampunan kepada Allah.' },
  ],
  '9-1': [
    { icon: '🌙', text: 'Ramadhan Mubarak! Bulan penuh rahmat dan ampunan telah tiba. Semoga kita diberikan kekuatan untuk beribadah.' },
    { icon: '🌙', text: 'Selamat menyambut bulan Ramadhan. Bulan di mana pahala dilipatgandakan dan pintu surga dibuka lebar.' },
    { icon: '🌙', text: 'Alhamdulillah, Ramadhan telah tiba. Semoga kita mampu meraih keberkahan dan kemenangan di bulan suci ini.' },
  ],
  '9-17': [
    { icon: '📖', text: 'Nuzulul Qur\'an — hari turunnya Al-Qur\'an sebagai petunjuk bagi umat manusia. Perbanyak tilawah hari ini.' },
    { icon: '📖', text: 'Hari ini Al-Qur\'an diturunkan sebagai cahaya dan petunjuk. Semoga kita senantiasa berpegang teguh padanya.' },
    { icon: '📖', text: 'Memperingati Nuzulul Qur\'an. Mari kita jadikan Al-Qur\'an sebagai pedoman hidup sehari-hari.' },
  ],
  '9-21': [
    { icon: '✨', text: 'Lailatul Qadr lebih baik dari seribu bulan. Perbanyak ibadah dan doa di malam-malam terakhir Ramadhan.' },
    { icon: '✨', text: 'Carilah Lailatul Qadr di malam-malam ganjil terakhir Ramadhan. Semoga Allah mengaruniakan kemuliaan malam ini.' },
  ],
  '10-1': [
    { icon: '🎉', text: 'Taqabbalallahu minna wa minkum. Selamat Hari Raya Idul Fitri! Semoga kita kembali fitri dan penuh keberkahan.' },
    { icon: '🎉', text: 'Selamat Idul Fitri! Mohon maaf lahir dan batin. Semoga kemenangan ini membawa kebahagiaan dan kedamaian.' },
    { icon: '🎉', text: 'Idul Fitri Mubarak! Hari kemenangan bagi yang telah berjuang di bulan Ramadhan. Taqabbalallahu minna wa minkum.' },
  ],
  '10-2': [
    { icon: '🎉', text: 'Masih dalam suasana Idul Fitri. Semoga silaturahmi dan kebahagiaan senantiasa menyertai hari-hari kita.' },
  ],
  '12-8': [
    { icon: '🕋', text: 'Hari Tarwiyah, hari persiapan menuju Arafah. Perbanyak dzikir dan doa untuk meraih keberkahan.' },
  ],
  '12-9': [
    { icon: '🕋', text: 'Hari Arafah adalah hari terbaik sepanjang tahun. Puasa Arafah menghapus dosa dua tahun. Semoga ibadah kita diterima.' },
    { icon: '🕋', text: 'Pada hari Arafah, Allah membanggakan hamba-Nya. Perbanyak doa dan puasa sunnah di hari mulia ini.' },
    { icon: '🕋', text: 'Hari Arafah penuh rahmat dan ampunan. Jangan lewatkan puasa sunnah di hari yang agung ini.' },
  ],
  '12-10': [
    { icon: '🐪', text: 'Selamat Hari Raya Idul Adha! Semoga pengorbanan kita diterima Allah dan membawa keberkahan.' },
    { icon: '🐪', text: 'Idul Adha Mubarak! Hari pengorbanan dan ketaatan kepada Allah. Taqabbalallahu minna wa minkum.' },
    { icon: '🐪', text: 'Selamat merayakan Idul Adha. Semoga semangat berkurban menginspirasi kebaikan dalam hidup kita.' },
  ],
  '12-11': [
    { icon: '📿', text: 'Hari Tasyrik — hari-hari untuk memperbanyak dzikir dan takbir. Allahu Akbar, Allahu Akbar.' },
  ],
  '12-12': [
    { icon: '📿', text: 'Hari Tasyrik kedua. Perbanyak takbir, tahmid, dan tahlil sebagai bentuk syukur kepada Allah.' },
  ],
  '12-13': [
    { icon: '📿', text: 'Hari Tasyrik terakhir. Sempurnakan ibadah dengan memperbanyak dzikir dan rasa syukur.' },
  ],
};

// Ramadan general motivations (shown throughout Ramadan when no specific Islamic event)
const RAMADAN_MOTIVATIONS: GoldenMotivation[] = [
  { icon: '🌙', text: 'Ramadhan adalah bulan penuh rahmat. Perbanyak tilawah, tarawih, dan amal kebaikan.' },
  { icon: '🌙', text: 'Di bulan Ramadhan, setiap kebaikan dilipatgandakan pahalanya. Semoga ibadah kita diterima.' },
  { icon: '🌙', text: 'Ramadhan mengajarkan kesabaran dan ketakwaan. Semoga kita meraih derajat muttaqin.' },
  { icon: '🌙', text: 'Bulan Ramadhan adalah bulan Al-Qur\'an. Perbanyak membaca dan merenungi ayat-ayat Allah.' },
  { icon: '🌙', text: 'Pintu surga dibuka lebar di bulan Ramadhan. Berlomba-lombalah dalam kebaikan.' },
  { icon: '🌙', text: 'Ramadhan adalah madrasah ketakwaan. Semoga puasa kita membentuk pribadi yang lebih baik.' },
  { icon: '🌙', text: 'Setiap tetes keringat dan rasa lapar di bulan Ramadhan adalah ibadah. Semoga Allah menerima puasa kita.' },
  { icon: '🌙', text: 'Manfaatkan setiap detik di bulan Ramadhan. Bulan ini adalah kesempatan emas meraih ampunan Allah.' },
];

// 10 malam terakhir Ramadhan (hari 21-30)
const LAST_TEN_NIGHTS: GoldenMotivation[] = [
  { icon: '✨', text: 'Kita memasuki 10 malam terakhir Ramadhan. Perbanyak ibadah untuk meraih Lailatul Qadr.' },
  { icon: '✨', text: '10 malam terakhir Ramadhan penuh kemuliaan. Hidupkan malam-malam ini dengan sholat dan doa.' },
  { icon: '✨', text: 'Rasulullah ﷺ menghidupkan 10 malam terakhir Ramadhan. Mari teladani dengan memperbanyak ibadah.' },
  { icon: '✨', text: 'Carilah Lailatul Qadr di malam-malam ganjil 10 terakhir Ramadhan. Satu malam lebih baik dari seribu bulan.' },
  { icon: '✨', text: 'Jangan sia-siakan 10 malam terakhir Ramadhan. Setiap malam bisa menjadi Lailatul Qadr.' },
];

// National event motivations
const NATIONAL_MOTIVATIONS: Record<string, GoldenMotivation[]> = {
  '1-1': [
    { icon: '🎊', text: 'Selamat Tahun Baru. Semoga tahun ini membawa kebaikan dan keberkahan bagi kita semua.' },
    { icon: '🎊', text: 'Tahun baru, semangat baru. Semoga kita senantiasa dalam lindungan dan rahmat Allah.' },
  ],
  '2-2': [
    { icon: '🌿', text: 'Selamat Hari Lahan Basah Sedunia. Menjaga alam adalah bagian dari menjaga amanah Allah.' },
  ],
  '4-21': [
    { icon: '🇮🇩', text: 'Selamat Hari Kartini. Semoga semangat perjuangan terus menginspirasi generasi bangsa.' },
  ],
  '5-1': [
    { icon: '💪', text: 'Selamat Hari Buruh. Semoga setiap kerja keras kita menjadi ladang pahala dan keberkahan.' },
  ],
  '5-2': [
    { icon: '📚', text: 'Selamat Hari Pendidikan Nasional. Menuntut ilmu adalah kewajiban bagi setiap Muslim.' },
    { icon: '📚', text: 'Hari Pendidikan Nasional. Semoga ilmu yang kita pelajari membawa manfaat dunia dan akhirat.' },
  ],
  '5-20': [
    { icon: '🇮🇩', text: 'Selamat Hari Kebangkitan Nasional. Semoga semangat persatuan selalu membara dalam diri kita.' },
  ],
  '6-1': [
    { icon: '🇮🇩', text: 'Selamat Hari Lahir Pancasila. Semoga nilai-nilai luhur bangsa terus menjadi pedoman hidup.' },
  ],
  '8-17': [
    { icon: '🇮🇩', text: 'Dirgahayu Republik Indonesia! Merdeka! Semoga bangsa ini semakin maju dan diberkahi Allah.' },
    { icon: '🇮🇩', text: 'Selamat Hari Kemerdekaan Indonesia. Semoga semangat para pahlawan menginspirasi kita untuk terus berkarya.' },
    { icon: '🇮🇩', text: 'Indonesia merdeka! Mari isi kemerdekaan ini dengan amal kebaikan dan membangun bangsa.' },
  ],
  '10-22': [
    { icon: '🕌', text: 'Selamat Hari Santri Nasional. Santri adalah penjaga peradaban dan pilar keberkahan negeri.' },
    { icon: '🕌', text: 'Hari Santri Nasional. Semoga semangat menuntut ilmu agama terus menyala di bumi pertiwi.' },
  ],
  '10-28': [
    { icon: '🇮🇩', text: 'Selamat Hari Sumpah Pemuda. Semangat persatuan pemuda adalah kekuatan bangsa.' },
  ],
  '11-10': [
    { icon: '🇮🇩', text: 'Selamat Hari Pahlawan. Semoga pengorbanan para pahlawan menjadi inspirasi dalam kehidupan kita.' },
    { icon: '🇮🇩', text: 'Hari Pahlawan mengingatkan kita akan jasa para pejuang. Semoga kita bisa menjadi pahlawan dalam kebaikan.' },
  ],
  '12-22': [
    { icon: '🕌', text: 'Selamat Hari Ibu. Surga berada di bawah telapak kaki ibu. Muliakan ibunda kita setiap hari.' },
  ],
};

// General motivations (when no event)
const GENERAL_MOTIVATIONS: GoldenMotivation[] = [
  { icon: '✨', text: 'Setiap hari adalah kesempatan baru untuk mendekatkan diri kepada Allah.' },
  { icon: '🌿', text: 'Semoga hari ini membawa keberkahan dalam setiap langkah Anda.' },
  { icon: '📿', text: 'Luangkan waktu sejenak untuk berdzikir dan mengingat Allah.' },
  { icon: '💎', text: 'Kebaikan kecil yang dilakukan dengan ikhlas memiliki nilai besar di sisi Allah.' },
  { icon: '🤲', text: 'Semoga Allah memudahkan setiap urusan dan memberkahi hari Anda.' },
  { icon: '🌅', text: 'Awali hari dengan niat baik dan hati yang penuh syukur.' },
  { icon: '⭐', text: 'Setiap amal baik adalah investasi untuk kehidupan akhirat.' },
  { icon: '🌸', text: 'Semoga ketenangan dan keberkahan selalu menyertai langkah Anda hari ini.' },
  { icon: '🌟', text: 'Jadilah cahaya kebaikan bagi orang-orang di sekitar Anda hari ini.' },
  { icon: '🕊️', text: 'Senyum kepada sesama adalah sedekah. Tebarkan kebaikan di mana pun Anda berada.' },
  { icon: '💫', text: 'Allah tidak membebani seseorang kecuali sesuai kemampuannya. Tetap semangat dan bertawakal.' },
  { icon: '🌺', text: 'Bersyukurlah atas nikmat hari ini. Dengan bersyukur, nikmat akan bertambah.' },
];

function pickByDate(arr: GoldenMotivation[], date: Date): GoldenMotivation {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return arr[seed % arr.length];
}

export interface GoldenResult {
  type: 'islamic' | 'ramadan' | 'national' | 'general';
  title: string;
  motivation: GoldenMotivation;
}

// Title maps for events
const ISLAMIC_TITLES: Record<string, string> = {
  '1-1': 'Tahun Baru Islam',
  '1-10': 'Hari Asyura',
  '3-12': 'Maulid Nabi Muhammad ﷺ',
  '7-27': "Isra Mi'raj",
  '8-15': "Nisfu Sya'ban",
  '9-1': 'Ramadhan Mubarak!',
  '9-17': 'Nuzulul Qur\'an',
  '9-21': 'Lailatul Qadr',
  '10-1': 'Idul Fitri 1447 H',
  '10-2': 'Idul Fitri 1447 H',
  '12-8': 'Hari Tarwiyah',
  '12-9': 'Hari Arafah',
  '12-10': 'Idul Adha',
  '12-11': 'Hari Tasyrik',
  '12-12': 'Hari Tasyrik',
  '12-13': 'Hari Tasyrik',
};

const NATIONAL_TITLES: Record<string, string> = {
  '1-1': 'Tahun Baru Masehi',
  '4-21': 'Hari Kartini',
  '5-1': 'Hari Buruh',
  '5-2': 'Hari Pendidikan Nasional',
  '5-20': 'Hari Kebangkitan Nasional',
  '6-1': 'Hari Lahir Pancasila',
  '8-17': 'Hari Kemerdekaan RI',
  '10-22': 'Hari Santri Nasional',
  '10-28': 'Hari Sumpah Pemuda',
  '11-10': 'Hari Pahlawan',
  '12-22': 'Hari Ibu',
  
};

export function getGoldenMotivation(
  date: Date,
  hijriMonth?: number,
  hijriDay?: number
): GoldenResult {
  // 1. Check specific Islamic event
  if (hijriMonth && hijriDay) {
    const hKey = `${hijriMonth}-${hijriDay}`;
    const islamicMotivs = ISLAMIC_MOTIVATIONS[hKey];
    if (islamicMotivs) {
      return { type: 'islamic', title: ISLAMIC_TITLES[hKey] || '', motivation: pickByDate(islamicMotivs, date) };
    }

    // Ramadan: 10 malam terakhir (21-30)
    if (hijriMonth === 9 && hijriDay >= 21 && hijriDay <= 30) {
      return { type: 'islamic', title: '10 Malam Terakhir Ramadhan', motivation: pickByDate(LAST_TEN_NIGHTS, date) };
    }

    // Ramadan general (month 9)
    if (hijriMonth === 9) {
      return { type: 'ramadan', title: 'Ramadhan Mubarak!', motivation: pickByDate(RAMADAN_MOTIVATIONS, date) };
    }
  }

  // 2. Check national event
  const gKey = `${date.getMonth() + 1}-${date.getDate()}`;
  const nationalMotivs = NATIONAL_MOTIVATIONS[gKey];
  if (nationalMotivs) {
    return { type: 'national', title: NATIONAL_TITLES[gKey] || '', motivation: pickByDate(nationalMotivs, date) };
  }

  // 3. General motivation
  return { type: 'general', title: '', motivation: pickByDate(GENERAL_MOTIVATIONS, date) };
}
