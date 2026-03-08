export interface Doa {
  id: string;
  category: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  keywords?: string[];
}

export interface AlMatsuratItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  /** Optional evening variant — if present, the item has different pagi/petang wording */
  evening?: {
    arabic: string;
    latin: string;
    translation: string;
  };
  /** Optional note shown below the title, e.g. "Dibaca ketika pagi hari" */
  note?: string;
}

export const DOA_CATEGORIES = [
  'Dzikir Pagi & Petang',
  'Doa Harian',
  'Doa Sholat',
] as const;

export const alMatsuratList: AlMatsuratItem[] = [
  {
    id: 'matsurat-taawudz',
    title: "Ta'awudz",
    arabic: "\u0627\u064E\u0639\u064F\u0648\u0652\u0630\u064F \u0628\u0650\u0627\u0644\u0644\u0651\u0670\u0647\u0650 \u0627\u0644\u0633\u0651\u064E\u0645\u0650\u064A\u0652\u0639\u0650 \u0627\u0644\u0652\u0639\u064E\u0644\u0650\u064A\u0652\u0645\u0650 \u0645\u0650\u0646\u064E \u0627\u0644\u0634\u0651\u064E\u064A\u0652\u0637\u064E\u0627\u0646\u0650 \u0627\u0644\u0631\u0651\u064E\u062C\u0650\u064A\u0652\u0645\u0650",
    latin: "A'uudzubillahissami'il aliimi minasyaithanirrajiim",
    translation: "Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk."
  },
  {
    id: 'matsurat-alfatihah',
    title: "Al-Fatihah",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ۝١ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ۝٢ الرَّحْمٰنِ الرَّحِيْمِۙ ۝٣ مٰلِكِ يَوْمِ الدِّيْنِۗ ۝٤ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ۝٥ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ۝٦ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ۝٧",
    latin: "Bismillaahirrahmaanirrahiiim. ۝ Alhamdulillaahi rabbil 'aalamiin. Arrahmaanirrahiim. ۝ Maaliki yaumid-diin. ۝ Iyyaaka na'budu wa iyyaaka nasta'iin. ۝ Ihdinash-shiraathal mustaqiim. ۝ Shiraathal-ladziina an'amta 'alaihim, ghairil-maghdhuubi 'alaihim waladh-dhaalliin.",
    translation: "1.Dengan menyebut nama Allah yang Maha Pemurah lagi Maha Penyayang.  2.Segala puji bagi Allah, Tuhan semesta alam.  3.Maha Pemurah lagi Maha Penyayang.  4.Yang menguasai di hari Pembalasan.  5.Hanya Engkaulah yang Kami sembah, dan hanya kepada Engkaulah Kami meminta pertolongan.  6.Tunjukilah Kami jalan yang lurus.  7.(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat."
  },
  {
    id: 'matsurat-qs-albaqarah-1-5',
    title: "QS. Al-Baqarah : 1-5",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ, الۤمّۤۚ ۝١ ذٰلِكَ الْكِتٰبُ لَا رَيْبَۛ فِيْهِۛ هُدًى لِّلْمُتَّقِيْنَۙ ۝٢ الَّذِيْنَ يُؤْمِنُوْنَ بِالْغَيْبِ وَيُقِيْمُوْنَ الصَّلٰوةَ وَمِمَّا رَزَقْنٰهُمْ يُنْفِقُوْنَۙ ۝٣ وَالَّذِيْنَ يُؤْمِنُوْنَ بِمَآ اُنْزِلَ اِلَيْكَ وَمَآ اُنْزِلَ مِنْ قَبْلِكَۚ وَبِالْاٰخِرَةِ هُمْ يُوْقِنُوْنَۗ ۝٤ اُولٰۤىِٕكَ عَلٰى هُدًى مِّنْ رَّبِّهِمْۙ وَاُولٰۤىِٕكَ هُمُ الْمُفْلِحُوْنَ ۝٥",
    latin: "Bismillaahirrahmaanirrahiiim. ۝ Alif laam miim. ۝ Dzaalikal-kitaabu laa raiba fiih, hudal lil-muttaqiin. ۝ Alladziina yu'minuuna bil-ghaibi wa yuqiimuunash-shalaata wa mimmaa razaqnaahum yunfiquun. ۝ Walladziina yu'minuuna bimaa unzila ilaika wa maa unzila min qablik, wa bil-aakhirati hum yuuqinuun. ۝ Ulaa'ika 'alaa hudam mir rabbihim wa ulaa'ika humul-muflihuun.",
    translation: "Dengan menyebut nama Allah yang Maha Pemurah lagi Maha Penyayang.  1.Alif Laam Miim.  2.Kitab (Al-Qur'an) ini tidak ada keraguan di dalamnya; (ia merupakan) petunjuk bagi orang-orang yang bertakwa.  3.(yaitu) orang-orang yang beriman pada yang gaib, menegakkan salat, dan menginfakkan sebagian rezeki yang Kami anugerahkan kepada mereka.  4.dan mereka yang beriman pada (Al-Qur'an) yang diturunkan kepadamu (Nabi Muhammad) dan (kitab-kitab suci) yang telah diturunkan sebelum engkau dan mereka yakin akan adanya akhirat.  5.Merekalah yang mendapat petunjuk dari Tuhannya dan mereka itulah orang-orang yang beruntung."
  },
  {
    id: 'matsurat-qs-albaqarah-255-257',
    title: "QS. Al-Baqarah : 255 - 257",
    arabic: "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ ۝٢٥٥ لَآ اِكْرَاهَ فِى الدِّيْنِۗ قَدْ تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّۚ فَمَنْ يَّكْفُرْ بِالطَّاغُوْتِ وَيُؤْمِنْۢ بِاللّٰهِ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقٰى لَا انْفِصَامَ لَهَاۗ وَاللّٰهُ سَمِيْعٌ عَلِيْمٌ ۝٢٥٦ اَللّٰهُ وَلِيُّ الَّذِيْنَ اٰمَنُوْا يُخْرِجُهُمْ مِّنَ الظُّلُمٰتِ اِلَى النُّوْرِۗ وَالَّذِيْنَ كَفَرُوْٓا اَوْلِيَاۤؤُهُمُ الطَّاغُوْتُ يُخْرِجُوْنَهُمْ مِّنَ النُّوْرِ اِلَى الظُّلُمٰتِۗ اُولٰۤىِٕكَ اَصْحٰبُ النَّارِۚ هُمْ فِيْهَا خٰلِدُوْنَ ۝٢٥٧",
    latin: "Allahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuwwa laa nauum, lahuu maa fissamaawaati wa maa fil ardhi, mandzalladzii yasyfa'u indahuu ilaa bi idznih, ya'lamu maa baina aidiihim wa maa khalfahum wa laa yuhiithuuuna bi syai'im-min 'ilmihii illaa bimaa syaa-a wasi'a kursiyyuhus-samaawaati wal-ardha, wa laa ya'uuduhuu hifzhuhumaa wa huwal 'aliyyul-'azhiim. ۝ Laa ikraaha fiddiin, qad tabayyanar-rusydu minal ghayy, faman yakfur bith-thaaguuti wa yu'min billaahi faqadistamsaka bil 'urwatil wutsqaa, lanfishaama lahaa, wallaahu samii'un 'aliim. ۝ Allaahu waliyyulladziina aamanuu yukhrijuhum minazh-zhulumaati ilan-nuur, walladziina kafaruu auliyaa-uhumuth-thaaguutu yukhrijuunahum minan-nuuri ilazh-zhulumaati, ulaa-ika ash-haabun-naar, hum fiihaa khaaliduun.",
    translation: "255.Allah, tidak ada tuhan selain Dia, Yang Mahahidup lagi terus-menerus mengurus (makhluk-Nya). Dia tidak dilanda oleh kantuk dan tidak (pula) oleh tidur. Milik-Nyalah apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka. Mereka tidak mengetahui sesuatu apa pun dari ilmu-Nya, kecuali apa yang Dia kehendaki. Kursi-Nya (ilmu dan kekuasaan-Nya) meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dialah yang Mahatinggi lagi Mahaagung.  256.Tidak ada paksaan dalam (menganut) agama (Islam). Sungguh, telah jelas jalan yang benar dari jalan yang sesat. Siapa yang ingkar kepada tagut dan beriman kepada Allah sungguh telah berpegang teguh pada tali yang sangat kuat yang tidak akan putus. Allah Maha Mendengar lagi Maha Mengetahui.  257.Allah adalah pelindung orang-orang yang beriman. Dia mengeluarkan mereka dari aneka kegelapan menuju cahaya (iman). Sedangkan orang-orang yang kufur, pelindung-pelindung mereka adalah tagut. Mereka (tagut) mengeluarkan mereka (orang-orang kafir itu) dari cahaya menuju aneka kegelapan. Mereka itulah para penghuni neraka. Mereka kekal di dalamnya."
  },
   {
    id: 'matsurat-qs-albaqarah-284-286',
    title: "QS. Al-Baqarah : 284-286",
    arabic: "لِلّٰهِ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ وَاِنْ تُبْدُوْا مَا فِيْٓ اَنْفُسِكُمْ اَوْ تُخْفُوْهُ يُحَاسِبْكُمْ بِهِ اللّٰهُۗ فَيَغْفِرُ لِمَنْ يَّشَاۤءُ وَيُعَذِّبُ مَنْ يَّشَاۤءُۗ وَاللّٰهُ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ ۝٢٨٤ اٰمَنَ الرَّسُوْلُ بِمَآ اُنْزِلَ اِلَيْهِ مِنْ رَّبِّهٖ وَالْمُؤْمِنُوْنَۗ كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰۤىِٕكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖۗ لَا نُفَرِّقُ بَيْنَ اَحَدٍ مِّنْ رُّسُلِهٖۗ وَقَالُوْا سَمِعْنَا وَاَطَعْنَا غُفْرَانَكَ رَبَّنَا وَاِلَيْكَ الْمَصِيْرُ ۝٢٨٥ لَا يُكَلِّفُ اللّٰهُ نَفْسًا اِلَّا وُسْعَهَا ۗ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ اِنْ نَّسِيْنَآ اَوْ اَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ اِصْرًا كَمَا حَمَلْتَهٗ عَلَى الَّذِيْنَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهٖۚ وَاعْفُ عَنَّاۗ وَاغْفِرْ لَنَاۗ وَارْحَمْنَا ۗ اَنْتَ مَوْلٰىنَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكٰفِرِيْنَ ۝٢٨٦",
    latin: "Lillaahi maa fis-samaawaati wa maa fil-ardhi, Wa in tubduu maa fii anfusikum autukh-fuuhu yuhaasibkum bihilaah, Fayaghfiru limayyasyaa-u wa yu'adzidzibu mayyasyaa', wallahu 'alaa kulli syai'in qadiir. ۝ Aamanarrasuulu bimaa unzila ilaihi mirrabbihii wal mu'minuun. Kullun aamana billahi wa malaa'ikatihii wa kutubihii wa rusulih, laa nufarriqu baina ahadim mirrusulih. Wa qaaluu sami'naa wa atha'naa ghufraanaka rabbanaa wa ilaikal mashiir. ۝ Laa yukallifullaahu nafsan illaa wus'ahaa, lahaa maa kasabat wa'alaihaa maktasabat, Rabbanaa laa tu-aakhidznaa innasiinaa auakhtha'naa, rabbanaa wa laa tahmil 'alainaa ishran kamaa hamaltahuu 'alalladziinaa min qablinaa, rabbanaa wa laa tuhammilna maa laa thaaqata lanaa bihi wa'fu 'annaa waghfirlanaa warhamnaa anta maulanaa fanshurnaa 'alal qaumil kaafiriin.",
    translation: "284.Milik Allahlah apa yang ada di langit dan apa yang ada di bumi. Jika kamu menyatakan apa yang ada di dalam hatimu atau kamu menyembunyikannya, niscaya Allah memperhitungkannya bagimu. Dia mengampuni siapa saja yang Dia kehendaki dan mengazab siapa pun yang Dia kehendaki. Allah Mahakuasa atas segala sesuatu. 285.Rasul (Muhammad) beriman pada apa (Al-Qur'an) yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang mukmin. Masing-masing beriman kepada Allah, malaikat-malaikat-Nya, kitab kitab-Nya, dan rasul-rasul-Nya. (Mereka berkata,) \"Kami tidak membeda-bedakan seorang pun dari rasul-rasul-Nya.\" Mereka juga berkata, \"Kami dengar dan kami taat. Ampunilah kami, wahai Tuhan kami. Hanya kepada-Mu tempat (kami) kembali. 286.Allah tidak membebani seseorang, kecuali menurut kesanggupannya. Baginya ada sesuatu (pahala) dari (kebajikan) yang diusahakannya dan terhadapnya ada (pula) sesuatu (siksa) atas (kejahatan) yang diperbuatnya. (Mereka berdoa,) \"Wahai Tuhan kami, janganlah Engkau hukum kami jika kami lupa atau kami salah. Wahai Tuhan kami, janganlah Engkau bebani kami dengan beban yang berat sebagaimana Engkau bebankan kepada orang-orang sebelum kami. Wahai Tuhan kami, janganlah Engkau pikulkan kepada kami apa yang tidak sanggup kami memikulnya. Maafkanlah kami, ampunilah kami, dan rahmatilah kami. Engkaulah pelindung kami. Maka, tolonglah kami dalam menghadapi kaum kafir.\""
  },
  {
    id: 'matsurat-qs-alikhlash : 1 – 4',
    title: "QS. Al-Ikhlash : 1 – 4",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ, قُلْ هُوَ اللّٰهُ اَحَدٌۚ ۝١ اَللّٰهُ الصَّمَدُۚ ۝٢ لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ ۝٣ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ۝٤",
    latin: "Bismillaahirrahmaanirrahiiim. ۝ Qul huwallaahu ahad. ۝ Allaahush-shamad. ۝ Lam yalid walam yuulad. ۝ Walam yakul-lahuu kufuwan ahad.",
    translation: "Dengan menyebut nama Allah Yang Pemurah lagi Maha Penyayang.  1.Katakanlah: \"Dialah Allah, Yang Maha Esa.  2.Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu.  3.Dia tiada beranak dan tidak pula diperanakkan,  4.dan tidak ada seorangpun yang setara dengan Dia.\""
  },
  {
    id: 'matsurat-qs-alfalaq : 1 – 5',
    title: "QS. Al-Falaq : 1 – 5",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ, قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ ۝١ مِنْ شَرِّ مَا خَلَقَۙ ۝٢ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ ۝٣ وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ ۝٤ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ ۝٥",
    latin: "Bismillaahirrahmaanirrahiiim. ۝ Qul a'uudzu bi rabbil-falaq. ۝ Min syarri maa khalaq. ۝ Wa min syarri ghaasiqin idzaa waqab. ۝ Wa min syarrin-naffaatsaati fill 'uqad. ۝ Wa min syarri haasidin idzaa hasad.",
    translation: "Dengan menyebut nama Allah Yang Pemurah lagi Maha Penyayang.  1.Katakanlah:Aku berlindung kepada Tuhan yang menguasai subuh(fajar).  2.dari kejahatan (makhluk yang) Dia ciptakan,  3.dan dari kejahatan malam apabila telah gelap gulita,  4.dan dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul (talinya),  5.dan dari kejahatan orang yang dengki apabila dia dengki."
  },
  {
    id: 'matsurat-qs-annas : 1 – 6',
    title: "QS. An-Nas : 1 – 6",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ, قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ ۝١ مَلِكِ النَّاسِۙ ۝٢ اِلٰهِ النَّاسِۙ ۝٣ مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ ۝٤ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ ۝٥ مِنَ الْجِنَّةِ وَالنَّاسِ ۝٦",
    latin: "Bismillaahirrahmaanirrahiiim. ۝ Qul a'uudzubi rabbinnaas. ۝ Malikinnaas. ۝ ilaahinnaas. ۝ Min syarril waswaasil khannaas. ۝ Alladzii yuwaswisu fii shuduurinnaas. ۝ Minal jinnati wannaas.",
    translation: "Dengan menyebut nama Allah Yang Pemurah lagi Maha Penyayang.  1.Katakanlah:Aku berlindung kepada Tuhan manusia,  2.raja manusia,  3.sembahan manusia,  4.Dari kejahatan (bisikan) setan yang biasa bersembunyi,  5.Yang membisikkan (kejahatan) ke dalam dada manusia.  6.Dari (golongan) jin dan manusia."
  },
  {
    id: 'matsurat-dzikir 1',
    title: "Dzikir 3x",
    note: "Dibaca ketika pagi hari",
    arabic: "اَصْبَحْنَا وَاَصْبَحَ الْمُلْكُ لِلّٰهِ وَالْحَمْدُ لِلّٰهِ لَا شَرِيْكَ لَهُ. لَآ اِلٰهَ اِلَّا هُوَ وَاِلَيْهِ النُّشُوْرُ",
    latin: "Ash-bahnā wa ash-bahal-mulku lillāhi wal-hamdulillāhi lā syarīka lahū lā ilāha illā huwa wa ilaihin-nusyūr.",
    translation: "Kami memasuki waktu pagi dan kerajaan (alam semesta) ini milik Allah. Segala puji bagi Allah, tidak ada sekutu bagi-Nya. Tidak ada tuhan selain Dia, dan hanya kepada-Nya lah tempat kembali.",
    evening: {
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ، وَالْحَمْدُ لِلّٰهِ لَا شَرِيْكَ لَهُ، لَا إِلَهَ إِلَّا هُوَ وَإِلَيْهِ الْمَصِيْرُ",
      latin: "Amsainā wa amsal-mulku lillāhi wal-hamdulillāhi lā syarīka lahū lā ilāha illā huwa wa ilaihil-mashīr.",
      translation: "Kami memasuki waktu petang dan kerajaan (alam semesta) ini milik Allah. Segala puji bagi Allah, tidak ada sekutu bagi-Nya. Tidak ada tuhan selain Dia, dan hanya kepada-Nya lah tempat kembali."
    }
  },
  {
    id: 'matsurat-dzikir 2',
    title: "Dzikir 3x",
    note: "Dibaca ketika pagi hari",
    arabic: "اَصْبَحْنَا عَلَى فِطْرَةِ الإِْسْلَامِ. وَكَلِمَةِ الْإِحْلَاصِ. وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللّهُ عَلَيْهِ وَسَلَّمَ. وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا. وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
    latin: "Ash-baḥnā 'alā fiṭratil-islāmi wa 'alā kalimatil-ikhlāṣ wa 'alā dīni nabiyyinā muḥammadin ṣallallāhu 'alaihi wa sallam wa 'alā millati abīnā ibrāhīma ḥanīfan wa mā kāna minal-musyrikīn.",
    translation: "Kami memasuki waktu pagi di dalam keadaan fitrah Islam, di atas kalimat keikhlasan, di atas agama Nabi kami Muhammad shallallahu 'alaihi wa sallam, dan di atas millah ayah kami Ibrahim yang lurus, seorang muslim, dan ia tidaklah termasuk golongan orang-orang musyrik.",
    evening: {
      arabic: "اَمْسَيْنَا عَلَى فِطْرَةِ الإِسْلاَمِ , وَعَلَى كَلِمَةِ الإِخْلاَصِ وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللّهُ عَلَيْهِ وَسَلَّمَ. وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا. وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
      latin: "Amsainā 'alā fiṭratil-islāmi wa 'alā kalimatil-ikhlāṣ wa 'alā dīni nabiyyinā muḥammadin ṣallallāhu 'alaihi wa sallam wa 'alā millati abīnā ibrāhīma ḥanīfan wa mā kāna minal-musyrikīn.",
      translation: "Kami memasuki waktu petang di dalam keadaan fitrah Islam, di atas kalimat keikhlasan, di atas agama Nabi kami Muhammad shallallahu 'alaihi wa sallam, dan di atas millah ayah kami Ibrahim yang lurus, seorang muslim, dan ia tidaklah termasuk golongan orang-orang musyrik."
    }
  },
  {
    id: 'matsurat-dzikir 3',
    title: "Dzikir 3x",
    note: "Dibaca ketika pagi hari",
    arabic: "اللَّهُمَّ إِنِّي اَصْبَحْتُ مِنْكَ فِى نِعْمَةٍ وَعَافِيَةٍ وَسِتْرٍ. فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِي الدُّنْيَا وَ الْأَخِرَةِ",
    latin: "Allāhumma innī ash-baḥtu minka fī ni'matin wa 'āfiyatin wa sitr, fa-atimm 'alayya ni'mataka wa 'āfiyataka wa sitraka fīd-dunyā wal-ākhirah.",
    translation: "Ya Allah, sesungguhnya aku telah memasuki waktu pagi dalam keadaan mendapat nikmat, sehat dan dalam keadaan tertutup. Maka sempurnakanlah atas diriku nikmat, kesehatan dan perlindungan-Mu di dunia dan akhirat.",
    evening: {
      arabic: "اللّٰهُـمَّ إِنِّيْ أَمْسَيْتُ مِنْكَ فِيْ نِعْمَةٍ وَعَافِيَةٍ وَسِتْرٍ, فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِيْ الدِّيْنِ وَالدُّنْيَا وَالْأَخِرَةِ",
      latin: "Allāhumma innī amsaitu minka fī ni'matin wa 'āfiyatin wa sitr, fa-atimm 'alayya ni'mataka wa 'āfiyataka wa sitraka fīd-dīni wad-dunyā wal-ākhirah.",
      translation: "Ya Allah, sesungguhnya aku telah memasuki waktu petang dalam keadaan mendapat nikmat, sehat dan dalam keadaan tertutup. Maka sempurnakanlah atas diriku nikmat, kesehatan dan perlindungan-Mu dalam agama, dunia dan akhirat."
    }
  },
  {
    id: 'matsurat-dzikir 4',
    title: "Dzikir 3x",
    note: "Dibaca ketika pagi hari",
    arabic: "اللُّهُمَّ مَآ أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ. فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
    latin: "Allāhumma mā ash-baha bī min ni'matin aw bi-aḥadin min khalqika faminka waḥdaka lā syarīka laka falakal-ḥamdu wa lakash-shukr.",
    translation: "Ya Allah, apa saja nikmat yang aku rasakan pagi ini atau diperoleh seseorang dari makhluk-Mu, adalah dari-Mu semata, tiada sekutu bagi-Mu. Bagi-Mu segala puji dan syukur.",
    evening: {
      arabic: "اللّٰهُـمَّ مَا أَمْسَى بِيْ مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَاشَرِيْكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      latin: "Allāhumma mā amsā bī min ni'matin aw bi-aḥadin min khalqika faminka waḥdaka lā syarīka laka falakal-ḥamdu wa lakash-shukr.",
      translation: "Ya Allah, apa saja nikmat yang aku rasakan petang ini atau diperoleh seseorang dari makhluk-Mu, adalah dari-Mu semata, tiada sekutu bagi-Mu. Bagi-Mu segala puji dan syukur."
    }
  },
  {
    id: 'matsurat-dzikir 5',
    title: "Dzikir 3x",
    arabic: "يَارَبِّيْ لَكَ الْحَمْدُ كَمَا يَنْبَغِيْ لِجَلَالِ وَجْهِكَ الْكَرِيْمِ وَعَظِيْمِ سُلْطَانِكَ",
    latin: "Yaa rabbi lakal hamdu kamaa yanbagii lijalaali wajhikal kariimi wa'azhiimi sulthanik.",
    translation: "Yaa Tuhanku, bagi-Mu segala puji sebagaimana yang selayaknya untuk kemuliaan wajah-Mu dan keagungan kekuasaan-Mu."
  },
  {
    id: 'matsurat-dzikir 6',
    title: "Dzikir 3x",
    arabic: "رَضِتُ بِاللّٰهِ رَبَّا وَبِالْإِسْلاَمِ دِيْنَا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُوْلاَ ",
    latin: "Radhiitu billahi rabba, wa bil islamidiina, wa bi Muhammadin nabiyawwarasuula.",
    translation: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, Dan Muhammad sebagai Nabi dan Rasulku."
  },
  {
    id: 'matsurat-dzikir 6b',
    title: "Dzikir 3x",
    arabic: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
    latin: "Subhaanallahi wa bihamdihi 'adada khalqihi wa ridhaa nafsihi wa zinata 'arsyihi wa midadaa kalimaatihi",
    translation: "Maha Suci Allah dan segala puji bagi-Nya sebanyak bilangan makhluk-Nya, serela diri-Nya, setimbangan 'Arsy-Nya dan sebanyak tinta (bagi kata-kata-Nya)."
  },
  {
    id: 'matsurat-dzikir 7',
    title: "Dzikir 3x",
    arabic: "بِسْمِ اللّٰهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    latin: "Bismillahil-ladzii laa yadhurru ma'asmihi syaiun fiil ardhi walaa fissamaa-i wa huwassamii'ul 'aliim.",
    translation: "Dengan nama Allah, yang selama bersama nama-Nya tidak ada sesuatu pun di bumi ataupun di langit yang dapat membahayakan. Dan Dia-lah yang Maha Mendengar lagi Maha Mengetahui."
  },
  {
    id: 'matsurat-doa 1',
    title: "Do'a 3x",
    arabic: "اللّٰهُـمَّ إِنَّا نَعُوْذُبِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ",
    latin: "Allahumma inna na'udzubika min an nusyrika bika syai an na'lamuhu wa nastaghfiruka lima laa na'lamuh.",
    translation: "Yaa Allah, sesungguhnya kami berlindung kepada-Mu dari menyekutukan-Mu dengan sesuatu yang kami ketahui, dan kami mohon ampun kepada-Mu untuk sesuatu yang tidak kami ketahui."
  },
  {
    id: 'matsurat-doa 2',
    title: "Do'a 3x",
    arabic: "أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    latin: "A'udzu bikalimaatillahittaammaati min syarri maa khalaq.",
    translation: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari keburukan yang Dia ciptakan."
  },
  {
    id: 'matsurat-doa 3',
    title: "Do'a 3x",
    arabic: "اَللّٰهُـمَّ اِنِّى اَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ , وَاَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ , وَاَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ , وَاَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّ جَالِ",
    latin: "Allahumma inni a'udzu bika minal hammi wal hazan wa a'uzuu bika minal 'ajzi wal kasal wa 'auuzu bika minal jubni wal bukhl wa a'uzuu bika min gholabati daini wa qohrirrijal.",
    translation: "Yaa Allah, aku berlindung kepada-Mu dari rasa gelisah dan sedih, dan aku berlindung kepada-Mu dari kelemahan dan kemalasan, dan aku berlindung kepada-Mu dari sifat pengecut dan bakhil, dan juga aku berlindung kepada-Mu dari tekanan hutang, dan kesewenang-wenangan orang."
  },
  {
    id: 'matsurat-doa 4',
    title: "Do'a 3x",
    arabic: "اللّٰهُمَّ عَافِنِي فِي بَدَنِي، اللّٰهُمَّ عَافِنِي فِي سَمْعِي، اللّٰهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلٰهَ إِلَّا أَنْتَ",
    latin: "Allahumma 'aafinii fii badanii, Allahumma 'aafinii fii sam'ii, Allahumma 'aafinii fii basharii, laa ilaaha illaa Anta",
    translation: "Ya Allah, sehatkanlah badanku. Ya Allah, sehatkanlah pendengaranku. Ya Allah, sehatkanlah penglihatanku. Tiada Tuhan yang berhak disembah kecuali Engkau"
  },
  {
    id: 'matsurat-doa 5',
    title: "Do'a 3x",
    arabic: "اللّٰهُـمَّ إِنِّي أَعُوْذُبِكَ مِنَ الْكُفْرِ وَالْفَقْرِ, وَأَعُوْذُبِكَ مِنْ عَذَابِ الْقَبْرِ, لَآ إِلَهَ إِلَّا أَنْتَ",
    latin: "Allahumma innii a'udzu bika minal kufri wal faqri, Allahumma inni 'audzu bika min 'adzaabil qabri, laa ilaaha illa anta.",
    translation: "Yaa Allah, sesungguhnya aku berlindung kepada-Mu dari kekufuran dan kefakiran, dan aku berlindung kepada-Mu dari adzab kubur. Tiada Tuhan yang berhak disembah kecuali Engkau."
  },
  {
    id: 'matsurat-dzikirdoa 1',
    title: "Dzikir & Do'a 3x",
    arabic: "اَللّٰهُـمَّ أَنْتَ رَ بِّيْ لاَ إِلَهَ إِلاَّ أَنْتَ،, خَلَقْتَنِيْ وَأَنَا عَبْدُكَ،, وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ،, أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ،, أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ،, وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ",
    latin: "Allahumma anta rabbi laa ilaha illa anta khalaqtanii wa anaa 'abduka wa anaa 'alaa 'ahdika wa wa'dika maastatha'tu a'udzuubika min syarri maa shana'tu abuu-u laka bini'matika 'alaiyya wa abuu-u bizanbii faaghfir lii fainnahu laa yaghfiru dzunuuba illa anta",
    translation: "Yaa Allah, Engkau Tuhanku, tiada Tuhan kecuali Engkau. Engkau yang menciptakanku dan aku adalah hamba-Mu.dan Aku berada di atas janji-Mu, semampuku. Aku berlindung kepada-Mu dari keburukan perbuatanku. Aku mengakui banyaknya nikmat (yang Engkau anugerahkan) kepadaku dan aku mengakui dosa-dosaku, maka ampunilah aku. Karena sesungguhnya tidak ada yang bisa mengampuni dosa-dosa kecuali Engkau."
  },
  {
    id: 'matsurat-dzikirdoa 2',
    title: "Dzikir & Do'a 3x",
    arabic: "أَسْتَغْفِرُ اللّٰهَ الَّذِي لَآ إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    latin: "Astagfirullah, alladzii laa ilaaha illa huwal haiyyul qayyuum wa atuubu ilaih",
    translation: "Aku mohon ampun kepada Allah, yang tiada Tuhan kecuali Dia. Yang Maha hidup kekal dan senantiasa mengurus (makhluk-Nya) dan aku bertaubat kepada-Nya."
  },
  {
    id: 'matsurat-dzikirdoa 3',
    title: "Dzikir & Do'a 10x",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    latin: "Allahumma shalli 'ala Muhammad wa 'ala ali Muhammad, kama shallaita 'ala Ibrahima wa 'ala ali Ibrahima. Wa barik 'ala Muhammad wa 'ala ali Muhammad, kama barakta 'ala Ibrahima wa 'ala ali Ibrahima, fil 'alamina innaka hamidun majid.",
    translation: "Ya Allah, limpahkanlah kemurahan-Mu kepada Muhammad dan keluarganya, sebagaimana Kau telah melimpahkan kemurahan-Mu kepada Ibrahim dan keluarganya. Berkahilah Muhammad dan keluarganya, sebagaimana Kau telah memberkahi Ibrahim dan keluarganya. Di seluruh alam semesta, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia"
  },
  {
    id: 'matsurat-dzikir 8',
    title: "Dzikir 100x",
    arabic: "سُبْحَانَ اللّٰهِ،, وَالْحَمْدُ لِلّٰهِ،, وَلَآ إِلَهَ إِلَّا اللّٰهُ،, وَاللّٰهُ أَكْبَرُ",
    latin: "Subhaanallah wal hamdu lillahi wa laa ilaa ha illallahu wallahu akbar.",
    translation: "Maha Suci Allah, Segala Puji bagi Allah, Tiada Tuhan melainkan Allah dan Allah Maha Besar."
  },
  {
    id: 'matsurat-dzikir 9',
    title: "Dzikir 10x",
    arabic: "لَآ إِلَـهَ إِلَّا اللّٰهُ وَحْدَهُ لَاشَرِيْكَ لَهُ , لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ",
    latin: "Laa ilaaha illallaahu wahdahu laa syariikalah, lahul mulku walahul hamdu yuhyii wa yumiitu wa huwa 'alaa kulli syai-in qadiir.",
    translation: "Tiada Tuhan melainkan Allah semata. Tiada sekutu bagi-Nya, bagi-Nya seluruh kerajaan, dan bagi-Nya segala puji, yang menghidupkan dan juga mematikan, dan Dia berkuasa atas segala sesuatu."
  },
  {
    id: 'matsurat-dzikirdoa 4',
    title: "Dzikir & do'a 3x",
    arabic: "سُبْحَانَكَ اللّٰهُـمَّ وَبِحَمْدِكَ , أَشْهَدُ أَنْ لَآ إِلَهَ إِلَّآ أَنْتَ،, أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ",
    latin: "Subhaanakallaahumma wa bihamdika asyhadu alla ilaaha illaa anta astaghfiruka wa atuubu ilaika.",
    translation: "Maha Suci Engkau yaa Allah, dan segala puji bagi-Mu. Aku bersaksi bahwa tiada Tuhan melainkan Engkau, aku mohon ampun dan bertaubat kepada-Mu."
  },
  {
    id: 'matsurat-sholawat',
    title: "Sholawat",
    arabic: "اللّٰهُـمَّ صَلِّ عَلَى مُحَمَّدٍ عَبْدِكَ وَرَسُوْلِكَ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ تَسْلِيْمًا عَدَدَ مَا أَحَاطَ بِهِ عِلْمُكَ وَخَطَّ بِهِ قَلَمُكَ وَأَحْصَاهُ كِتَابُكَ، وَارْضَ اللَّهُمَّ عَنْ سَادَاتِنَا أَبِي بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيٍّ،, وَعَنِ الصَّحَابَةِ أَجْمَعِيْنَ،, وَعَنِ التَّابِعِيْنَ وَتَابِعِيْهِمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّيْنِ",
    latin: "Allāhumma ṣalli 'alā Muḥammadin 'abdika wa rasūlikan-nabiyyil-ummiyyi wa 'alā ālihī wa ṣaḥbihī wa sallim taslīman 'adada mā aḥāṭa bihī 'ilmuka wa khaṭṭa bihī qalamuka wa aḥṣāhu kitābuka, wardhallaahumma 'an saadaatinaa abii bakrin wa 'umara wa 'utsmaana wa 'alii, wa 'anish-shahaabat i ajma'aiin, wa 'anit-taabi'iina wa taabi'iihim bi ihsaanin ilaa yaumiddiin.",
    translation: "Yaa Allah, berilah sholawat kepada Muhammad; hamba-Mu, dan Rasul-Mu, Nabi yang ummi. Juga kepada keluarga dan para sahabatnya, serta berilah keselamatan sebanyak yang terjangkau oleh ilmu-Mu, yang tercatat oleh pena-Mu; dan yang terangkum oleh kitab-Mu. Ridhailah yaa Allah para pemimpin kami Abu Bakar, Umar, Utsman, dan Ali, serta semua sahabat, semua tabi'in dan orang-orang yang mengikuti mereka sampai hari Pembalasan."
  },
  {
    id: 'matsurat-qs-assaffat-180-182',
    title: "QS. As-Saffat :26 - 27",
    arabic: "سُبْحٰنَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُوْنَۚ ۝١٨٠ وَسَلٰمٌ عَلَى الْمُرْسَلِيْنَۚ ۝١٨١ وَالْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ ۝١٨٢",
    latin: "subhaana rabbika rabbil'izzati 'amma yashifuun ۝ wasalaamun 'alal mursaliin ۝ walhamdulillahirabbil 'aalamiin",
    translation: "180.Maha suci Tuhanmu,Tuhan yang Maha perkasa dari sifat yang meraka katakan  181.Dan selamat sejahtera bagi para Rasul  182.Dan segala puji bagi Allah Tuhan Seluruh alam."
  },
   {
    id: 'matsurat-qs-aliimran-26-27',
    title: "QS. Ali Imran :26 - 27",
    arabic: "قُلِ اللّٰهُمَّ مٰلِكَ الْمُلْكِ تُؤْتِى الْمُلْكَ مَنْ تَشَاۤءُ وَتَنْزِعُ الْمُلْكَ مِمَّنْ تَشَاۤءُۖ وَتُعِزُّ مَنْ تَشَاۤءُ وَتُذِلُّ مَنْ تَشَاۤءُۗ بِيَدِكَ الْخَيْرُۗ اِنَّكَ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ ۝٢٦ تُوْلِجُ الَّيْلَ فِى النَّهَارِ وَتُوْلِجُ النَّهَارَ فِى الَّيْلِ وَتُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَتُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَتَرْزُقُ مَنْ تَشَاۤءُ بِغَيْرِ حِسَابٍ ۝٢٧",
    latin: "Qulillahumma malikal mulki tu'tilmulka man tasaa'u watanzi'ul mulka mimmantasaa'u watu 'ijzu mantasaa'u wa tudzillu mantasaa'u biyadikal khairu innaka 'ala kulli syai-in qadiir. ۝ Tuulijul laila fiinnahaari wa tuulijunnahaara fillaili wa tukhrijul hayya minal mayyiti wa tukhrijul mayyita minal hayyi wa tarzuqu mantasyaa'u bighairi hisaab.",
    translation: "26.Katakanlah (Nabi Muhammad), \"Wahai Allah, Pemilik kekuasaan, Engkau berikan kekuasaan kepada siapa pun yang Engkau kehendaki dan Engkau cabut kekuasaan dari siapa yang Engkau kehendaki. Engkau muliakan siapa yang Engkau kehendaki dan Engkau hinakan siapa yang Engkau kehendaki. Di tangan-Mulah segala kebajikan. Sesungguhnya Engkau Mahakuasa atas segala sesuatu.  27.Engkau masukkan malam ke dalam siang dan Engkau masukkan siang ke dalam malam. Dan Engkau keluarkan yang hidup dari yang mati dan Engkau keluarkan yang mati dari yang hidup. Dan Engkau berikan rezeki kepada siapa yang Engkau kehendaki tanpa perhitungan."
  },
  {
    id: 'matsurat-dzikir 4b',
    title: "Dzikir 1x",
    note: "Dibaca ketika pagi hari",
    arabic: "اللَّهُمَّ إِنَّ هٰذَا إِقْبَالُ نَهَارِكَ وَإِدْبَارُ لَيْلِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْلِيْ",
    latin: "Allāhumma inna hādzā iqbālu nahārika wa idbāru lailika wa ashwātu du'ātika faghfirlī.",
    translation: "Ya Allah, sesungguhnya ini adalah datangnya siang-Mu dan berlalunya malam-Mu serta suara-suara para pendoa-Mu, maka ampunilah aku.",
    evening: {
      arabic: "اللهم إِنَّ هَذَا إِقْبَالُ لَيْلِكَ وَإِدْبَارُ نَهَارِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْلِي",
      latin: "Allāhumma inna hādzā iqbālu lailika wa idbāru nahārika wa ashwātu du'ātika faghfirlī.",
      translation: "Ya Allah, sesungguhnya ini adalah datangnya malam-Mu dan berlalunya siang-Mu serta suara-suara para pendoa-Mu, maka ampunilah aku."
    }
  },
  {
    id: 'matsurat-doarabithah',
    title: "Doa Rabithah",
    arabic: "اللّٰهُمَّ إِنَّكَ تَعْلَمُ أَنَّ هٰذِهِ الْقُلُوْبَ قَدِ اجْتَمَعَتْ عَلَى مَحَبَّتِكَ، وَالْتَقَتْ عَلَى طَاعَتِكَ، وَتَوَحَّدَتْ عَلَى دَعْوَتِكَ، وَتَعَاهَدَتْ عَلَى نُصْرَةِ شَرِيْعَتِكَ، فَوَثِّقِ اللّٰهُمَّ رَابِطَتَهَا، وَأَدِمْ وُدَّهَا، وَاهْدِهَا سُبُلَهَا، وَامْلَأْهَا بِنُوْرِكَ الَّذِيْ لَا يَخْبُو، وَاشْرَحْ صُدُوْرَهَا بِفَيْضِ الْإِيْمَانِ بِكَ، وَجَمِيْلِ التَّوَكُّلِ عَلَيْكَ، وَأَحْيِهَا بِمَعْرِفَتِكَ، وَأَمِتْهَا عَلَى الشَّهَادَةِ فِيْ سَبِيْلِكَ، إِنَّكَ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرُ, اللّٰهُمَّ آمِيْن، وَصَلِّ اللّٰهُمَّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ",
    latin: "Allaahumma innaka ta'lamu anna haadihil quluuba qadijtama'at 'alaa makhabbatika wal taqat 'alaa thaa'atika wa tawahhadat 'alaa da'watika wa ta'aahadat 'alaa nuhrati syari'atika fawatsiqillahumma raabithatahaa, wa adhim wuddahaa, wahdihaa, subulahaa, wamla'haa, binuurikalladzii layakhbuu, wasrah shuduurahaa bifaidil iimaanibika, wa jamiilittawakulli 'alaika wa ahyihaa bima'rifatika wa amit-haa 'alasy-syahaadati fi sabiilika innaka ni'mal maula wa ni'mannashiir,  Allāhumma āmīn, wa ṣalli-llāhumma 'alā sayyidinā Muḥammadin wa 'alā ālihī wa ṣaḥbihī wa sallim.",
    translation: "Yaa Allah, sesungguhnya Engkau Maha Mengetahui bahwa hati-hati ini telah berkumpul atas dasar kecintaan pada-Mu, bersua atas dasar ketaatan pada-Mu, bersatu dalam rangka menyeru (dijalan)-Mu, dan berjanji setia untuk membela syari'at-Mu, maka kuatkanlah ikatan pertaliannya. Yaa Allah, abadikanlah kasih sayangnya, tunjukanlah jalan-jalannya, dan penuhilah ia dengan cahaya-Mu yang tidak pernah redup , lapangkanlah dadanya dengan limpahan iman dan keindahan tawakal kepada-Mu, hidupkanlah tawakal kepada-Mu, hidupkanlah ia dengan pengenalan pada-Mu, dan matikanlah ia dalam keadaan syahid di jalan-Mu. Sesungguhnya Engkau sebaik-baik pelindung dan sebaik-baik penolong, Yaa Allah kabulkanlah. Dan semoga sholawat serta salam selalu tercurahkan kepada junjungan kami Muhammad, kepada keluarganya dan kepada semua sahabatnya."
  },
];

export const doaList: Doa[] = [
  {
    id: 'pagi-1',
    category: 'Dzikir Pagi & Petang',
    title: "Doa Pagi Hari",
    arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0628\u0650\u0643\u064E \u0623\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u0627 \u0648\u064E\u0628\u0650\u0643\u064E \u0623\u0645\u0652\u0633\u064E\u064A\u0652\u0646\u0627\u060C \u0648\u064E\u0628\u0650\u0643\u064E \u0646\u064E\u062D\u0652\u064A\u0627\u060C \u0648\u064E\u0628\u0650\u0643\u064E \u0646\u064E\u0645\u064F\u0648\u062A\u064F\u060C \u0648\u064E\u0625\u0650\u0644\u064E\u064A\u0652\u0643\u064E \u0627\u0644\u0646\u0651\u064F\u0634\u064F\u0648\u0631\u064F",
    latin: "All\u0101humma bika ashbahn\u0101, wa bika amsain\u0101, wa bika nahy\u0101, wa bika nam\u016btu, wa ilaikal nusy\u016bru",
    translation: "Ya Allah, karena Engkau kami mengalami waktu pagi dan waktu petang dan karena Engkau kami hidup dan mati, dan kepada-Mu juga kami akan kembali."
  },
  {
    id: 'petang-1',
    category: 'Dzikir Pagi & Petang',
    title: "Doa Petang Hari",
    arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0628\u0650\u0643\u064E \u0623\u064E\u0645\u0652\u0633\u064E\u064A\u0652\u0646\u064E\u0627\u060C \u0648\u064E\u0628\u0650\u0643\u064E \u0623\u064E\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u064E\u0627\u060C \u0648\u064E\u0628\u0650\u0643\u064E \u0646\u064E\u062D\u0652\u064A\u064E\u0627\u060C \u0648\u064E\u0628\u0650\u0643\u064E \u0646\u064E\u0645\u064F\u0648\u062A\u064F\u060C \u0648\u064E\u0625\u0650\u0644\u064E\u064A\u0652\u0643\u064E \u0627\u0644\u0652\u0645\u064E\u0635\u0650\u064A\u0631\u064F",
    latin: "All\u0101humma bika amsain\u0101, wa bika asbahna, wa bika nahy\u0101, wa bika nam\u016btu, wa ilaikal mash\u012br",
    translation: "Ya Allah, dengan-Mu kami memasuki waktu petang, dengan-Mu kami memasuki waktu pagi, dengan-Mu kami hidup, dengan-Mu kami mati, dan kepada-Mu tempat kembali."
  },
  {
    id: 'Sayyidul Istighfar-1',
    category: 'Dzikir Pagi & Petang',
    title: "Doa Sayyidul Istighfar",
    arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0623\u064E\u0646\u0652\u062A\u064E \u0631\u064E\u0628\u0651\u0650\u064A \u0644\u064E\u0627 \u0625\u0650\u0644\u0670\u0647\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0623\u064E\u0646\u0652\u062A\u064E \u062E\u064E\u0644\u064E\u0642\u0652\u062A\u064E\u0646\u0650\u064A \u0648\u064E\u0623\u064E\u0646\u064E\u0627 \u0639\u064E\u0628\u0652\u062F\u064F\u0643\u064E \u0648\u064E\u0623\u064E\u0646\u064E\u0627 \u0639\u064E\u0644\u0670\u0649 \u0639\u064E\u0647\u0652\u062F\u0650\u0643\u064E \u0648\u064E\u0648\u064E\u0639\u0652\u062F\u0650\u0643\u064E \u0645\u064E\u0627 \u0627\u0633\u0652\u062A\u064E\u0637\u064E\u0639\u0652\u062A\u064F \u0623\u064E\u0639\u064F\u0648\u0652\u0630\u064F \u0628\u0650\u0643\u064E \u0645\u0650\u0646\u0652 \u0634\u064E\u0631\u0651\u0650 \u0645\u064E\u0627 \u0635\u064E\u0646\u064E\u0639\u0652\u062A\u064F \u0623\u064E\u0628\u064F\u0648\u0621\u064F \u0644\u064E\u0643\u064E \u0628\u0650\u0646\u0650\u0639\u0652\u0645\u064E\u062A\u0650\u0643\u064E \u0639\u064E\u0644\u064E\u064A\u0651\u064E \u0648\u064E\u0623\u064E\u0628\u064F\u0648\u0621\u064F \u0644\u064E\u0643\u064E \u0628\u0650\u0630\u064E\u0646\u0652\u0628\u0650\u064A \u0641\u064E\u0627\u063A\u0652\u0641\u0650\u0631\u0652 \u0644\u0650\u064A \u0641\u064E\u0625\u0650\u0646\u0651\u064E\u0647\u064F \u0644\u064E\u0627 \u064A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0630\u0651\u064F\u0646\u064F\u0648\u0628\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0623\u064E\u0646\u0652\u062A\u064E",
    latin: "Allahumma anta rabbi laa ilaaha illa anta khalaqtanii wa anaa 'abduka wa anaa 'alaa 'ahdika wa wa'dika mastatha'tu a'uudzubika min syarri maa shana'tu abuu-u laka bini'matika 'alayya wa abuu-u bi dzanbi faghfir lii fa innahu laa yaghfirudz dzubuuba illa anta",
    translation: "Ya Allah, Engkau Rabbku, tidak ada sembahan yang haq kecuali Engkau. Engkau menciptakanku dan aku hamba-Mu. Aku di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang aku lakukan, aku mengakui untuk-Mu nikmat-nikmat-Mu atasku, dan aku mengakui untuk-Mu dosa-dosaku, maka ampunilah aku, sungguh tidak ada yang mengampuni dosa-dosa selain Engkau."
  },
  {
    id: 'aktivitas-1',
    category: 'Doa Harian',
    title: "Doa Masuk WC",
    arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0625\u0650\u0646\u0651\u0650\u0649 \u0623\u064E\u0639\u064F\u0648\u0630\u064F \u0628\u0650\u0643\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0652\u062E\u064F\u0628\u064F\u062B\u0650 \u0648\u064E\u0627\u0644\u0652\u062E\u064E\u0628\u064E\u0627\u0626\u0650\u062B\u0650",
    latin: "Allahumma innii a'uudzubika minal khubutsi wal khabaa-its",
    translation: "Ya Allah, aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan."
  },
  {
    id: 'aktivitas-2',
    category: 'Doa Harian',
    title: "Doa Keluar WC",
    arabic: "\u063A\u064F\u0641\u0652\u0631\u064E\u0627\u0646\u064E\u0643\u064E",
    latin: "Ghufraanaka",
    translation: "Aku memohon ampunan-Mu."
  },
  {
    id: 'aktivitas-3',
    category: 'Doa Harian',
    title: "Doa Bercermin",
    arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0623\u064E\u0646\u0652\u062A\u064E \u062D\u064E\u0633\u0651\u064E\u0646\u0652\u062A\u064E \u062E\u064E\u0644\u0652\u0642\u0650\u064A \u0641\u064E\u062D\u064E\u0633\u0651\u0650\u0646\u0652 \u062E\u064F\u0644\u064F\u0642\u0650\u064A",
    latin: "Allahumma anta hassanta khalqii fahassin khuluqii",
    translation: "Ya Allah, Engkau telah membaguskan penciptaanku, maka baguskanlah pula akhlakku."
  },
  {
    id: 'aktivitas-4',
    category: 'Doa Harian',
    title: "Doa Naik Kendaraan",
    arabic: "\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0633\u064E\u062E\u0651\u064E\u0631\u064E \u0644\u064E\u0646\u064E\u0627 \u0647\u0670\u0630\u064E\u0627 \u0648\u064E\u0645\u064E\u0627 \u0643\u064F\u0646\u0651\u064E\u0627 \u0644\u064E\u0647\u064F \u0645\u064F\u0642\u0652\u0631\u0650\u0646\u0650\u064A\u0652\u0646\u064E \u0648\u064E\u0625\u0650\u0646\u0651\u064E\u0627 \u0625\u0650\u0644\u0670\u0649 \u0631\u064E\u0628\u0651\u0650\u0646\u064E\u0627 \u0644\u064E\u0645\u064F\u0646\u0652\u0642\u064E\u0644\u0650\u0628\u064F\u0648\u0652\u0646\u064E",
    latin: "Subhanalladzi sakhkhara lanaa haadza wa maa kunnaa lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun",
    translation: "Maha Suci Allah yang menundukkan semua ini bagi kami, padahal kami sebelumnya tidak mampu. Dan sesungguhnya kami akan kembali kepada Tuhan kami."
  },
  {
    id: 'aktivitas-5',
    category: 'Doa Harian',
    title: "Doa Naik Kendaraan Laut",
    arabic: "بِسْمِ اللهِ مَجْر۪ىهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ",
    latin: "Bismillâhi majreha wa mursâhâ, inna rabbî laghafûrur rahîm",
    translation: "Dengan nama Allah di waktu berlayar dan berlabuhnya. Sesungguhnya Tuhanku benar-benar Maha Pengampun lagi Maha Penyayang."
  },
  {
    id: 'aktivitas-6',
    category: 'Doa Harian',
    title: "Doa Safar (Bepergian Jauh)",
    arabic: "اَللّٰهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هٰذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اَللّٰهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اَللّٰهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ",
    latin: "Allâhumma innâ nas'âluka fî safarinâ hâdzal birra wat taqwâ, wa minal 'amali mâ tardhâ. Allâhumma hawwin 'alainâ safarinâ hâdzâ wath-wi 'annâ bu'udah. Allâhumma antas-shâhibu fis-safari wal khalîfatu fil ahli.",
    translation: "Ya Allah, sesungguhnya kami memohon kepada-Mu kebaikan dan takwa dalam perjalanan kami ini, serta amal yang Engkau ridai. Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah jaraknya yang jauh. Ya Allah, Engkaulah teman dalam perjalanan dan penjaga bagi keluarga (yang ditinggalkan)."
  },
  {
    id: 'aktivitas-7',
    category: 'Doa Harian',
    title: "Doa Masuk Rumah",
    arabic: "\u0627\u0644\u0644\u0651\u0670\u0647\u064F\u0645\u0651\u064E \u0625\u0650\u0646\u0651\u0650\u064A \u0623\u064E\u0633\u0652\u0623\u064E\u0644\u064F\u0643\u064E \u062E\u064E\u064A\u0652\u0631\u064E \u0627\u0644\u0645\u064E\u0648\u0652\u0644\u064E\u062C\u0650\u060C \u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u0670\u0647\u0650 \u0648\u064E\u0644\u064E\u062C\u0652\u0646\u064E\u0627\u060C \u0648\u064E\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u0670\u0647\u0650 \u062E\u064E\u0631\u064E\u062C\u0652\u0646\u064E\u0627\u060C \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u0670\u0647\u0650 \u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u062A\u064E\u0648\u064E\u0643\u0651\u064E\u0644\u0652\u0646\u064E\u0627",
    latin: "Allahumma innii as-aluka khairal mauliji, bismillahi wa lajnaa, wa bismillahi kharajnaa, wa 'alallahi rabbanaa tawakkalnaa",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar. Dengan menyebut nama-Mu kami masuk, dengan menyebut nama-Mu kami keluar, dan hanya kepada Allah, Tuhan kami, kami bertawaka."
  },
  {
    id: 'aktivitas-8',
    category: 'Doa Harian',
    title: "Doa Keluar Rumah",
    arabic: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u062A\u064E\u0648\u064E\u0643\u0651\u064E\u0644\u0652\u062A\u064F \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u0647\u0650\u060C \u0644\u064E\u0627 \u062D\u064E\u0648\u0652\u0644\u064E \u0648\u064E\u0644\u064E\u0627 \u0642\u064F\u0648\u0651\u064E\u0629\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0628\u0650\u0627\u0644\u0644\u0647\u0650",
    latin: "Bismillahi tawakkaltu 'alallahi, laa hawla wa laa quwwata illa billah",
    translation: "Dengan menyebut nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan melainkan dengan pertolongan Allah."
  },
  {  id: 'aktivitas-9',
    category: 'Doa Harian',
    title: "Doa Masuk Masjid",
    arabic: " اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِك",
    latin: "Allahummaf-tahlii abwaaba rahmatik.",
    translation: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu."
  },
    {  id: 'aktivitas-10',
    category: 'Doa Harian',
    title: "Doa Keluar Masjid",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma innii as-aluka min fadhlik.",
    translation: "Ya Allah, sesungguhnya aku memohon keutamaan/karunia dari-Mu."
  },
  {  id: 'aktivitas-11',
    category: 'Doa Harian',
    title: "Doa Untuk Kedua Orang Tua",
    arabic: "رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرَا",
    latin: "Rabbighfir lī, wa li wālidayya, warham humā kamā rabbayānī shaghīrā.",
    translation: "Tuhanku, ampunilah dosaku dan (dosa) kedua orang tuaku. Sayangilah keduanya sebagaimana keduanya menyayangiku di waktu aku kecil."
  },
   {  id: 'aktivitas-12',
    category: 'Doa Harian',
    title: "Doa Mengenakan Pakaian",
    arabic: "اَللّٰهُمَّ اِنِّى اَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا هُوَ لَهُ وَاَعُوْذُبِكَ مِنْ شَرِّهِ وَشَرِّمَا هُوَلَهُ",
    latin: "Allâhumma innî as'aluka min khairihi wa khairi mâ huwa lahu, wa a'ûdzubika min syarrihi wa syarri mâ huwa lahu.",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan pakaian ini dan kebaikan sesuatu yang ada di dalamnya, dan aku berlindung kepada-Mu dari keburukan pakaian ini dan keburukan sesuatu yang ada di dalamnya."
  },
  {  id: 'aktivitas-13',
    category: 'Doa Harian',
    title: "Doa Melepas Pakaian",
    arabic: "بِسْمِ اللهِ الَّذِيْ لاَ إِلَهَ إِلَّا هُوَ",
    latin: "Bismillâhil ladzî lâ ilâha illâ huwa.",
    translation: "Dengan nama Allah yang tiada Tuhan selain Dia."
  },
  {  id: 'aktivitas-14',
    category: 'Doa Harian',
    title: "Doa Mengenakan Pakaian Baru",
    arabic: "اَللّٰهُمَّ لَكَ الْحَمْدُ اَنْتَ كَسَوْتَنِيْهِ اَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ وَاَعُوْذُبِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    latin: "Allâhumma lakal hamdu anta kasautanîhi, as'aluka min khairihi wa khairi mâ shuni'ala lahu, wa a'ûdzubika min syarrihi wa syarri mâ shuni'ala lahu.",
    translation: "Ya Allah, hanya milik-Mu segala puji, Engkaulah yang memberi pakaian ini kepadaku. Aku memohon kepada-Mu kebaikan pakaian ini dan kebaikan yang ia dibuat untuknya. Dan aku berlindung kepada-Mu dari keburukan pakaian ini dan keburukan yang ia dibuat untuknya."
  },
  {  id: 'aktivitas-15',
    category: 'Doa Harian',
    title: "Doa Ketika Medengar Petir",
    arabic: "اَللّٰهُمَّ لَا تَقْتُلْنَا بِغَضَبِكَ وَلَا تُهْلِكْنَا بِعَذَابِكَ وَعَافِنَا قَبْلَ ذٰلِكَ",
    latin: "Allâhumma lâ taqtulnâ bighadhabika walâ tuhliknâ bi'adzâbika wa 'âfinâ qabla dzâlika.",
    translation: "Ya Allah, janganlah Engkau bunuh kami dengan kemurkaan-Mu, janganlah Engkau binasakan kami dengan azab-Mu, dan selamatkanlah kami sebelum itu."
  },
  {  id: 'aktivitas-16',
    category: 'Doa Harian',
    title: "Doa Ketika Turun Hujan",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    latin: "Allâhumma shayyiban nâfi‘an.",
    translation: "Ya Allah, turunkanlah pada kami hujan yang bermanfaat."
  },
  {  id: 'aktivitas-17',
    category: 'Doa Harian',
    title: "Doa Setelah Hujan Reda",
    arabic: "مُطِرْنَا بِفَضْلِ اللّٰهِ وَرَحْمَتِهِ",
    latin: "Muthirnâ bifadhlillâhi wa rahmatih.",
    translation: "Kita diberi hujan karena karunia dan rahmat Allah."
  },
   {  id: 'aktivitas-18',
    category: 'Doa Harian',
    title: "Doa Ketika Melihat Keindahan Langit",
    arabic: "رَبَّنَا مَا خَلَقْتَ هَذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanâ mâ khalaqta hâdzâ bâthilan, subhânaka faqina 'adzâban-nâr.",
    translation: "Ya Tuhan kami, tidaklah Engkau menciptakan semua ini sia-sia; Mahasuci Engkau, maka lindungilah kami dari azab neraka."
  },
  {  id: 'aktivitas-19',
    category: 'Doa Harian',
    title: "Doa Sapu Jagat",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbanâ âtinâ fid-dunyâ hasanatan wa fil-âkhirati hasanatan wa qinâ 'adzâban-nâr.",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."
  },
  {  id: 'aktivitas-20',
    category: 'Doa Harian',
    title: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللّٰهُمَّ أَحْيَا وَأَمُوتُ",
    latin: "Bismika Allâhumma ahyâ wa amût.",
    translation: "Dengan nama-Mu ya Allah, aku hidup dan aku mati."
  },
  {  id: 'aktivitas-21',
    category: 'Doa Harian',
    title: "Doa Bangun Tidur",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdulillâhil ladzî ahyânâ ba‘da mâ amâtanâ wa ilaihin nusyûr.",
    translation: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nyalah kami kembali."
  },
  {  id: 'aktivitas-22',
    category: 'Doa Harian',
    title: "Doa Ketika Mimpi Buruk",
    arabic: "اللَّهُمَّ إِنِّي أَعُوْذُبِكَ مِنْ عَمَلِ الشَّيْطَانِ وَسَيِّئَاتِ الأَحْلَامِ",
    latin: "Allaahumma innii a'uudzubika min 'amalisy syaithaani wa sayyi-aatil ahlaami.",
    translation: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari perbuatan setan dan keburukan mimpi."
  },
  {  id: 'aktivitas-23',
    category: 'Doa Harian',
    title: "Doa Ketika Bermimpi Baik",
    arabic: "الْحَمْدُ للهِ الَّذِيْ قَضَى حَاجَاتِيْ",
    latin: "Alhamdulillahil ladzii qodhoo haajaati.",
    translation: "Segala puji bagi Allah yang telah memenuhi hajat-hajatku."
  },
  {  id: 'aktivitas-24',
    category: 'Doa Harian',
    title: "Doa Ketika Ada Angin Kencang",
    arabic: "اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيْهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوْذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيْهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
    latin: "Allâhumma innî as'aluka khairahâ wa khaira mâ fîhâ wa khaira mâ ursilat bihi, wa a'ûdzubika min syarrihâ wa syarri mâ fîhâ wa syarri mâ ursilat bihi.",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan angin ini, kebaikan apa yang ada di dalamnya, dan kebaikan apa yang dibawanya. Dan aku berlindung kepada-Mu dari keburukan angin ini, keburukan apa yang ada di dalamnya, dan keburukan apa yang dibawanya."
  },
  {  id: 'aktivitas-25',
    category: 'Doa Harian',
    title: "Doa Sebelum Belajar",
    arabic: "رَضِيْتُ بِاللهِ رَبًّا، وَبِالْإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولًا. رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
    latin: "Rodhîtu billâhi robba, wabil islâmi dîna, wabi muhammadin nabiyya warosûlâ. Robbi zidnî 'ilmâ warzuqnî fahmâ.",
    translation: "Aku rida Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad sebagai Nabi dan Rasulku. Ya Tuhanku, tambahkanlah kepadaku ilmu dan berilah aku karunia untuk memahaminya."
  },
  {  id: 'aktivitas-26',
    category: 'Doa Harian',
    title: "Doa Setelah Belajar",
    arabic: "اَللّٰهُمَّ قَدِ اسْتَوْدَعْنَاكَ بِمَا عَلَّمْتَنَاهُ، فَارْدُدْهُ إِلَيْنَا عِنْدَ حَاجَتِنَا إِلَيْهِ، وَلَا تُنْسِنَا عَنْهُ. يَا رَبَّ الْعَالَمِيْنَ",
    latin: "Allâhumma qodis-tauda‘nâka bimâ ‘allamtanâhu, fardudhu ilainâ ‘inda hâjatinâ ilaihi, wa lâ tunsinâ ‘anhu, yâ rabbal 'âlamîn.",
    translation: "Ya Allah, sungguh kami telah menitipkan kepada-Mu atas apa yang telah Engkau ajarkan kepada kami, maka kembalikanlah ia kepada kami di saat kami membutuhkannya, dan janganlah Engkau jadikan kami lupa darinya, wahai Tuhan semesta alam."
  },
  {  id: 'aktivitas-27',
    category: 'Doa Harian',
    title: "Doa Sebelum Makan",
    arabic: "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allâhumma bârik lanâ fîmâ razaqtanâ wa qinâ 'adzâban-nâr.",
    translation: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka."
  },
  {  id: 'aktivitas-28',
    category: 'Doa Harian',
    title: "Doa Setelah Makan",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
    latin: "Alhamdulillâhil ladzî ath‘amanâ wa saqânâ wa ja‘alanâ muslimîn.",
    translation: "Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami termasuk golongan orang-orang muslim."
  },
  {  id: 'aktivitas-29',
    category: 'Doa Harian',
    title: "Doa Ketika Lupa Membaca Doa Makan",
    arabic: "بِسْمِ اللهِ فِيْ أَوَّلِهِ وَآخِرِهِ",
    latin: "Bismillâhi fî awwalihi wa âkhirihi.",
    translation: "Dengan nama Allah pada awal dan akhirnya."
  },
  {  id: 'aktivitas-30',
    category: 'Doa Harian',
    title: "Doa Berbuka Puasa",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
    latin: "Dzahabazh-zhoma'uu wabtallatil 'uruuqu wa tsabatal ajru in syaa Allah.",
    translation: "Telah hilang rasa haus, telah basah urat-urat, dan telah tetap pahala, insya Allah."
  },
  {  id: 'aktivitas-31',
    category: 'Doa Harian',
    title: "Memulai & Niat Wudhu",
    arabic: "بِسْمِ اللّٰهِ، نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلّٰهِ تَعَالَى",
    latin: "Bismillâhi, nawaitul wudhû'a liraf' il hadatsil ashghari fardhan lillâhi ta'âlâ.",
    translation: "Dengan nama Allah, aku niat berwudu untuk menghilangkan hadas kecil, fardu karena Allah Ta'ala."
  },
  {  id: 'aktivitas-32',
    category: 'Doa Harian',
    title: "Doa Sesudah Wudhu",
    arabic: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اَللّٰهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    latin: "Asyhadu allâ ilâha illallâh wahdahu lâ syarîka lah, wa asyhadu anna Muhammadan 'abduhu wa rasûluh. Allâhummaj'âlnî minat-tawwâbîna waj'âlnî minal-mutathahhirîn.",
    translation: "Aku bersaksi bahwa tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk golongan orang-orang yang bertaubat dan jadikanlah aku termasuk golongan orang-orang yang menyucikan diri."
  },
  {  id: 'aktivitas-33',
    category: 'Doa Harian',
    title: "Doa Sesudah Adzan",
    arabic: "اَللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا نِ الْوَسِيْلَةَ وَالْفَضِيْلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُوْدًا نِ الَّذِيْ وَعَدْتَهُ",
    latin: "Allâhumma rabba hâdzihid-da'âtit-tâmmah, wash-shalâtil-qâ'îmâ, âti Muhammadanil-wasîlata wal-fadhîlah, wab'atshu maqâmam-mahmûdanil-ladzî wa'adtah.",
    translation: "Ya Allah, Tuhan pemilik panggilan yang sempurna ini dan shalat yang akan didirikan, berilah Nabi Muhammad wasilah (kedudukan tinggi di surga) dan keutamaan, serta bangkitkanlah beliau di tempat yang terpuji yang telah Engkau janjikan."
  },
  {  id: 'aktivitas-34',
    category: 'Doa Harian',
    title: "Doa Ketika Sakit",
    arabic: "بِسْمِ اللّٰهِ.  أَعُوْذُ بِاللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
    latin: "Bismillâh (3x),  A'ûdzu billâhi wa qudratihi min syarri mâ ajidu wa uhâdziru (7x).",
    translation: "Dengan nama Allah. Aku berlindung kepada Allah dan kekuasaan-Nya dari kejahatan sesuatu yang aku jumpai dan aku khawatirkan."
  },
  {  id: 'aktivitas-35',
    category: 'Doa Harian',
    title: "Doa Menjenguk Orang Sakit",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ. اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا",
    latin: "Lâ ba'sa thahûrun insyâ Allâh. Allâhumma rabban-nâsi adzhibil ba'sa, isyfi antas-syâfî lâ syifâ'a illâ syifâ'uka syifâ'an lâ yughâdiru saqaman.",
    translation: "Tidak apa-apa, semoga menjadi pembersih dosa, insya Allah. Ya Allah, Tuhan manusia, hilangkanlah penyakit ini. Sembuhkanlah, Engkaulah Yang Maha Menyembuhkan, tidak ada kesembuhan kecuali kesembuhan-Mu, kesembuhan yang tidak meninggalkan rasa sakit."
  },
  {  id: 'aktivitas-36',
    category: 'Doa Harian',
    title: "Adab & Doa Bersin",
    arabic: "الْحَمْدُ لِلّٰهِ — يَرْحَمُكَ اللّٰهُ — يَهْدِيكُمُ اللّٰهُ وَيُصْلِحُ بَالَكُمْ",
    latin: "Alhamdulillâh (Dibaca oleh yang bersin) — Yarhamukallâh (Jawaban orang yang mendengar) — Yahdîkumullâhu wa yushlihu bâlakum (Balasan kembali oleh orang yang bersin).",
    translation: "Segala puji bagi Allah. Semoga Allah melimpahkan rahmat-Nya kepadamu. Semoga Allah memberikan petunjuk kepadamu dan memperbaiki keadaanmu."
  },
  {  id: 'aktivitas-37',
    category: 'Doa Harian',
    title: "Doa Ziarah Kubur",
    arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللّٰهُ بِكُمْ لَاحِقُونَ، أَسْأَلُ اللّٰهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
    latin: "Assalāmu 'alaikum ahlad-diyāri minal mu'minīna wal muslimīn, wa innā in syā'allāhu bikum lāhiqūn, as'ālullāha lanā wa lakumul 'āfiyah.",
    translation: "Semoga keselamatan tercurah kepada kalian, wahai penghuni kubur, dari orang-orang mukmin dan muslim. Sesungguhnya kami pun, insya Allah, akan menyusul kalian. Aku memohon kepada Allah keselamatan bagi kami dan bagi kalian."
  },
  {  id: 'aktivitas-38',
    category: 'Doa Harian',
    title: "Doa Memohon Kecerdasan Dalam Berfikir",
    arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَأَعِذْنِي مِنْ شَرِّ نَفْسِي",
    latin: "Allâhumma al-himnî rusydî, wa a'îdznî min syarri nafsî.",
    translation: "Ya Allah, ilhamkanlah kepadaku kecerdasan (petunjuk) dan lindungilah aku dari kejahatan diriku sendiri."
  },
  {  id: 'aktivitas-39',
    category: 'Doa Harian',
    title: "Doa Memohon Ilmu yang Bermanfaat",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    latin: "Allâhumma innî as'âluka 'ilmân nâfi'â, wa rizqan thayyibâ, wa 'amalan mutaqabbalâ.",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima."
  },
  {  id: 'aktivitas-40',
    category: 'Doa Harian',
    title: "Doa Memohon Kemudahan Urusan",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    latin: "Rabbisy-syrah lî shadrî wa yassir lî amrî wahlul 'uqdatam min lisânî yafqahû qaulî.",
    translation: "Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan lidahku agar mereka mengerti perkataanku."
  },
];

// Doa Sholat with sub-items (multiple versions in one card)
export interface DoaSholatGroup {
  id: string;
  category: string;
  title: string;
  items: { subtitle?: string; arabic?: string; latin?: string; translation: string }[];
}

export const doaSholatGroups: DoaSholatGroup[] = [
  {
    id: 'sholat-iftitah',
    category: 'Doa Sholat',
    title: "Doa Iftitah",
    items: [
      {
        subtitle: "Doa Iftitah (Versi 1)",
        arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        latin: "Allaahumma baa'id bainii wabainaa khotoo yaa ya kamaa baa'adta bainal masyriqi wal maghrib. Allaahumma naqqinii minal khotoo yaa kamaa yunaqqats tsaubul abyadhuu minaddanas. Allaahummaghsil khotoo yaa ya bil maa-i wats tsalji wal barod.",
        translation: "Ya Allah, jauhkanlah antara diriku dan di antara kesalahan-kesalahanku sebagaimana Engkau jauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan sebagaimana dibersihkannya kain putih dari kotoran. Ya Allah, cucilah kesalahan-kesalahanku dengan air, salju dan embun."
      },
      {
        subtitle: "Doa Iftitah (Versi 2)",
        arabic: "اللّٰهُ أَكْبَرُ كَبِيْرًا وَّالْحَمْدُ لِلّٰهِ كَثِيْرًا وَّسُبْحَانَ اللّٰهِ بُكْرَةً وَّأَصِيْلًا، إِنِّيْ وَجَّهْتُ وَجْهِيَ لِلَّذِيْ فَطَرَ السَّمٰوَاتِ وَالْأَرْضَ حَنِيْفًا مُّسْلِمًا وَّمَا أَنَا مِنَ الْمُشْرِكِيْنَ، إِنَّ صَلَاتِيْ وَنُسُكِيْ وَمَحْيَايَ وَمَمَاتِيْ لِلّٰهِ رَبِّ الْعَالَمِيْنَ، لَا شَرِيْكَ لَهُ وَبِذٰلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِيْنَ",
        latin: "Allaahu akbar kabiiraa walhamdulillaahi katsiiraa, wa subhaanallaahi bukratan wa'ashiilaa. Innii wajjahtu wajhiya lilladzii fatharas samaawaati wal ardha haniifan musliman wa maa anaa minal musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil 'aalamiin. Laa syariikalahu wa bidzaalika umirtu wa ana minal muslimiin.",
        translation: "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan pujian yang banyak, dan Maha Suci Allah pada waktu pagi dan petang. Sesungguhnya aku hadapkan wajahku kepada Zat yang telah menciptakan langit dan bumi dengan penuh ketulusan dan penyerahan diri, dan aku bukanlah termasuk orang-orang musyrik. Sesungguhnya shalatku, ibadahku, hidupku, dan matiku hanyalah milik Allah, Tuhan semesta alam. Tidak ada sekutu bagi-Nya, dan demikianlah aku diperintahkan, dan aku termasuk golongan orang-orang Muslim."
      }
    ]
  },
   {
    id: 'sholat-bacaantaawudz',
    category: 'Doa Sholat',
    title: "Bacaan Ta'awudz",
    items: [
     {
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        latin: "A'uudzubillahissami'il aliimi minasyaithanirrajiim.",
        translation: "Aku berlindung kepada Allah Yang Maha Mendengar lagi Maha Mengetahui dari godaan setan yang terkutuk."
      }
    ]
  },
   {
    id: 'sholat-surahalfatihah',
    category: 'Doa Sholat',
    title: "Surah Al-Fatihah",
    items: [
     {
        arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ۝١ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ۝٢ الرَّحْمٰنِ الرَّحِيْمِۙ ۝٣ مٰلِكِ يَوْمِ الدِّيْنِۗ ۝٤ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ۝٥ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ۝٦ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ۝٧",
        latin: "Bismillaahirrahmaanirrahiiim. ۝ Alhamdulillaahi rabbil 'aalamiin. Arrahmaanirrahiim. ۝ Maaliki yaumid-diin. ۝ Iyyaaka na'budu wa iyyaaka nasta'aiin. ۝ Ihdinash-shiraathal mustaqiim. ۝ Shiraathal-ladziina an'amta 'alaihim, ghairil-maghdhuubi 'alaihim waladh-dhaalliin.",
        translation: "1.Dengan menyebut nama Allah yang Maha Pemurah lagi Maha Penyayang.  2.Segala puji bagi Allah, Tuhan semesta alam.  3.Maha Pemurah lagi Maha Penyayang.  4.Yang menguasai di hari Pembalasan.  5.Hanya Engkaulah yang Kami sembah, dan hanya kepada Engkaulah Kami meminta pertolongan.  6.Tunjukilah Kami jalan yang lurus.  7.(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat."
      }
    ]
  },
  {
    id: 'sholat-tamin',
    category: 'Doa Sholat',
    title: "Ta'min",
    items: [
     {
        arabic: "آمِيْنُ",
        latin: "Aamiin.",
        translation: "Kabulkanlah doa kami."
      }
    ]
  },
  {
    id: 'sholat-surah/ayat alquran',
    category: 'Doa Sholat',
    title: "Membaca surah / ayat dalam Al-Qur'an",
    items: [
     {
        subtitle: "Membaca surah / ayat dalam Al-Qur'an pada rakaat pertama dan kedua, Pilihlah surah / ayat yang anda hafal.",
        arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ, قُلْ هُوَ اللّٰهُ اَحَدٌۚ ۝١ اَللّٰهُ الصَّمَدُۚ ۝٢ لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ ۝٣ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ۝٤",
        latin: "Bismillaahirrahmaanirrahiiim. Qul huwallaahu ahad. Allaahush-shamad. Lam yalid walam yuulad. Walam yakul-lahuu kufuwan ahad.",
        translation: "Contoh: QS. Al-Ikhlas (112:1-4)\n\nDengan menyebut nama Allah Yang Pemurah lagi Maha Penyayang. 1.Katakanlah: \"Dialah Allah, Yang Maha Esa. 2.Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. 3.Dia tiada beranak dan tidak pula diperanakkan, 4.dan tidak ada seorangpun yang setara dengan Dia.\""
      }
    ]
  },
  {
    id: 'sholat-bacaanruku',
    category: 'Doa Sholat',
    title: "Bacaan Ruku'",
    items: [
     {
        subtitle: "Bacaan Ruku' (Versi 1)",
        arabic: "سُبْحَانَكَ اللّٰهُمَّ رَبَّنَا وَبِحَمْدِكَ اللّٰهُمَّ اغْفِرْ لِيْ",
        latin: "Subhânakallâhumma rabbanâ wa bihamdika allâhummaghfir lî.",
        translation: "Mahasuci Engkau, ya Allah, Tuhan kami, dan dengan memuji-Mu, ya Allah, ampunilah aku."
      },
      {
        subtitle: "Bacaan Ruku' (Versi 2)",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيْمِ وَبِحَمْدِهِ",
        latin: "Subhâna rabbiyal 'adhîmi wa bihamdih.",
        translation: "Maha Suci Rabbku yang maha Agung dan maha terpuji."
      }
    ]
  },
  {
    id: 'sholat-bacaanitidal',
    category: 'Doa Sholat',
    title: "Bacaan I'tidal",
    items: [
     {
        subtitle: "Bacaan I'tidal (Versi 1)",
        arabic: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ. رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
        latin: "Sami'allâhu liman hamidah. Rabbanâ wa lakal hamdu hamdan katsîran thayyiban mubârakan fîhi.",
        translation: "Allah mendengar orang yang memuji-Nya. Ya Tuhan kami, segala puji bagi-Mu dengan pujian yang banyak, baik, dan penuh berkah."
      },
      {
        subtitle: "Bacaan I'tidal (Versi 2)",
        arabic: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءُ السَّمَاوَاتِ وَمِلْءُ الْأَرْضِ وَمِلْءُ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
        latin: "Sami'allâhu liman hamidah. Rabbanâ lakal hamdu mil'us-samâwâti wa mil'ul-ardhi wa mil'u mâ syi'ta min syai'in ba'du.",
        translation: "Allah mendengar orang yang memuji-Nya. Wahai Tuhan kami, bagi-Mu segala puji sepenuh langit dan sepenuh bumi serta sepenuh apa pun yang Engkau kehendaki setelah itu."
      }
    ]
  },
  {
    id: 'sholat-bacaansujud',
    category: 'Doa Sholat',
    title: "Bacaan Sujud",
    items: [
     {
        subtitle: "Bacaan Sujud (Versi 1)",
        arabic: "سُبْحَانَكَ اللّٰهُمَّ رَبَّنَا وَبِحَمْدِكَ اللّٰهُمَّ اغْفِرْ لِيْ",
        latin: "Subhânakallâhumma rabbanâ wa bihamdika allâhummaghfir lî.",
        translation: "Mahasuci Engkau, ya Allah, Tuhan kami, dan dengan memuji-Mu, ya Allah, ampunilah aku."
      },
      {
        subtitle: "Bacaan Sujud (Versi 2)",
        arabic: "سُبْحَانَ رَبِّىَ الأَعْلَى وَبِحَمْدِهِ",
        latin: "Subhâna rabbiyal a'lâ wa bihamdih.",
        translation: "Mahasuci Tuhanku Yang Mahatinggi dan dengan memuji-Nya."
      }
    ]
  },
  {
    id: 'sholat-bacaandudukdiantaraduasujud',
    category: 'Doa Sholat',
    title: "Bacaan Duduk di Antara Dua Sujud",
    items: [
     {
        subtitle: "Bacaan Duduk di Antara Dua Sujud (Versi 1)",
        arabic: "اَللّٰهُمَّ اغْفِرْ لِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَاهْدِنِيْ وَارْزُقْنِيْ",
        latin: "Allâhummaghfir lî warhamnî wajburnî wahdinî warzuqnî.",
        translation: "Ya Allah, ampunilah aku, kasihanilah aku, cukupilah kekuranganku, tunjukilah aku, dan berilah rezeki kepadaku."
      },
      {
        subtitle: "Bacaan Duduk di Antara Dua Sujud (Versi 2)",
        arabic: "رَبِّ اغْفِرْ لِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ",
        latin: "Rabbighfirlî warhamnî wajburnî warfa'nî warzuqnî wahdinî wa 'âfinî wa'fu 'annî.",
        translation: "Ya Tuhanku, ampunilah aku, sayangilah aku, tutuplah kekuranganku, angkatlah derajatku, berilah rezeki kepadaku, berilah aku petunjuk, sehatkanlah aku, dan maafkanlah aku."
      }
    ]
  },
  {
    id: 'sholat-bacaantasyahud',
    category: 'Doa Sholat',
    title: "Tasyahud Awal",
    items: [
     {
        subtitle: "Bacaan Tasyahud Awal + Sholawat (Versi 1)",
        arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        latin: "Attahiyyaatu lillaahi wash-sholawaatu wath-thoyyibaat. Assalaamu 'alaika ayyuhan nabiyyu warohmatullaahi wabarokaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahis shoolihiin. Asyhadu allaa ilaaha illallaah wa asyhadu anna Muhammadan 'abduhuu warasuuluh. Allahumma sholli 'ala Muhammad wa 'ala aali Muhammad, kamaa shollaita 'ala Ibraahiim wa 'ala aali Ibraahiim. Wa baarik 'ala Muhammad wa 'ala aali Muhammad, kamaa baarokta 'ala Ibraahiim wa 'ala aali Ibraahiim. Innaka hamiidum majiid.",
        translation: "Segala kehormatan, kebahagiaan dan kebagusan adalah kepunyaan Allah. Semoga keselamatan bagi Engkau, ya Nabi Muhammad, beserta rahmat dan kebahagiaan Allah. Mudah-mudahan keselamatan juga bagi kita sekalian dan hamba-hamba Allah yang baik-baik. Aku bersaksi bahwa tiada Tuhan melainkan Allah dan aku bersaksi bahwa Muhammad itu hamba Allah dan utusan-Nya. Ya Allah, limpahkanlah kemurahan-Mu kepada Muhammad dan keluarganya, sebagaimana Engkau telah limpahkan kepada Ibrahim dan keluarganya. Berkahilah Muhammad dan keluarganya sebagaimana Engkau telah berkahi Ibrahim dan keluarganya. Sesungguhnya Engkau yang Maha Terpuji dan Maha Mulia."
      },
      {
        subtitle: "Bacaan Tasyahud Awal + Sholawat (Versi 2)",
        arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
        latin: "Attahiyyaatul mubaarakaatus sholawaatut thoyyibaatu lillaah. Assalaamu 'alaika ayyuhan nabiyyu warohmatullaahi wabarokaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahis shoolihiin. Asyhadu allaa ilaaha illallaah wa asyhadu anna Muhammadar rasuulullaah. Allahumma sholli 'ala sayyidinaa Muhammad.",
        translation: "Segala penghormatan yang penuh berkah, segenap selawat yang baik adalah milik Allah. Semoga keselamatan, rahmat Allah, dan berkah-Nya tetap tercurahkan kepadamu wahai Nabi. Semoga keselamatan tetap tercurahkan kepada kami dan kepada hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad."
      }
    ]
  },
  {
    id: 'sholat-bacaantasyahudakhir',
    category: 'Doa Sholat',
    title: "Tasyahud Akhir",
    items: [
     {
        subtitle: "Bacaan Tasyahud Akhir + Sholawat (Versi 1)",
        arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        latin: "Attahiyyaatu lillaahi wash-sholawaatu wath-thoyyibaat. Assalaamu 'alaika ayyuhan nabiyyu warohmatullaahi wabarokaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahis shoolihiin. Asyhadu allaa ilaaha illallaah wa asyhadu anna Muhammadan 'abduhuu warasuuluh. Allahumma sholli 'ala Muhammad wa 'ala aali Muhammad, kamaa shollaita 'ala Ibraahiim wa 'ala aali Ibraahiim. Wa baarik 'ala Muhammad wa 'ala aali Muhammad, kamaa baarokta 'ala Ibraahiim wa 'ala aali Ibraahiim. Innaka hamiidum majiid.",
        translation: "Segala kehormatan, kebahagiaan dan kebagusan adalah kepunyaan Allah. Semoga keselamatan bagi Engkau, ya Nabi Muhammad, beserta rahmat dan kebahagiaan Allah. Mudah-mudahan keselamatan juga bagi kita sekalian dan hamba-hamba Allah yang baik-baik. Aku bersaksi bahwa tiada Tuhan melainkan Allah dan aku bersaksi bahwa Muhammad itu hamba Allah dan utusan-Nya. Ya Allah, limpahkanlah kemurahan-Mu kepada Muhammad dan keluarganya, sebagaimana Engkau telah limpahkan kepada Ibrahim dan keluarganya. Berkahilah Muhammad dan keluarganya sebagaimana Engkau telah berkahi Ibrahim dan keluarganya. Sesungguhnya Engkau yang Maha Terpuji dan Maha Mulia."
      },
      {
        subtitle: "Bacaan Tasyahud Akhir + Sholawat (Versi 2)",
        arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        latin: "Attahiyyaatul mubaarakaatus sholawaatut thoyyibaatu lillaah. Assalaamu 'alaika ayyuhan nabiyyu warohmatullaahi wabarokaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahis shoolihiin. Asyhadu allaa ilaaha illallaah wa asyhadu anna Muhammadar rasuulullaah. Allahumma sholli 'ala sayyidinaa Muhammad wa 'ala aali sayyidinaa Muhammad, kamaa shollaita 'ala sayyidinaa Ibraahiim wa 'ala aali sayyidinaa Ibraahiim. Wa baarik 'ala sayyidinaa Muhammad wa 'ala aali sayyidinaa Muhammad, kamaa baarokta 'ala sayyidinaa Ibraahiim wa 'ala aali sayyidinaa Ibraahiim. Fil 'aalamiina innaka hamiidum majiid.",
        translation: "Segala penghormatan yang penuh berkah, segenap selawat yang baik adalah milik Allah. Semoga keselamatan, rahmat Allah, dan berkah-Nya tetap tercurahkan kepadamu wahai Nabi. Semoga keselamatan tetap tercurahkan kepada kami dan kepada hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan keluarganya, sebagaimana Engkau telah melimpahkan rahmat kepada junjungan kami Nabi Ibrahim dan keluarganya. Berkatilah junjungan kami Nabi Muhammad dan keluarganya, sebagaimana Engkau telah memberkati junjungan kami Nabi Ibrahim dan keluarganya. Di seluruh alam semesta, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia."
      }
    ]
  },
  {
    id: 'sholat-doasesudahtasyahudawal',
    category: 'Doa Sholat',
    title: "Do’a sesudah Tasyahud Awal",
    items: [
     {
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْماً كَثِيراً وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ. فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        latin: "Allahumma innii dzolamtu nafsii dzulman katsiiro, wa laa yaghfirudz dzunuuba illaa anta faghfir lii maghfirotan min 'indika warhamnii, innaka antal ghofuurur rohiim.",
        translation: "Ya Allah, sesungguhnya aku telah mendzalimi diriku dengan kezaliman yang banyak. Tiada sesiapa yang dapat mengampunkan dosa-dosa melainkan Engkau, maka ampunilah bagiku dengan keampunan daripada-Mu dan rahmatilah aku. Sesungguhnya Engkau maha pengampun lagi maha penyayang."
      }
    ]
  },
  {
    id: 'sholat-doasesudahtasyahudakhir',
    category: 'Doa Sholat',
    title: "Do’a sesudah Tasyahud Akhir",
    items: [
     {
        arabic: "اَللّٰهُمَّ إِنِّى أَعُوْذُبِكَ مِنْ عَذَابِ جَهَنَّمَ, وَمِنْ عَذَابِ الْقَبْرِ, وَمِنْ فِتْنَةِ الْمَحْياَ وَالْمَمَاتِ, وَمِنْ شَرِّ فِتْنَةِ الْمَسِيْحِ الدَّجَّالِ",
        latin: "Allaahumma innii a'udzubika min 'adzaabi jahannam. Wamin 'adzaabil qobri. Wamin fitnatil mahyaa walmamaati. Wamin syarri fitnatil masiihiddadjaal.",
        translation: "Ya Allah aku berlindung kepada Engkau dari siksa jahannam dan siksa kubur, begitu juga dari fitnah hidup dan mati, serta dari jahatnya fitnah dajjal (pengembara yang dusta)"
      }
    ]
  },
  {
    id: 'sholat-salam',
    category: 'Doa Sholat',
    title: "Salam",
    items: [
     {
        arabic: "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
        latin: "Assalaamua'alaikum warohmatullaahi wabarokaatuh.",
        translation: "Berbahagialah kamu sekalian dengan rahmat dan berkah Allah."
      }
    ]
  },
];
