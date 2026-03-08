import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { useAzanNotification } from '@/hooks/useAzanNotification';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useLocalStorage('deenflow_dark', true);
  const { location: loc, detectLocation } = useUserLocation();
  const { timings } = usePrayerTimes(loc?.latitude, loc?.longitude);
  const { enabled: azanEnabled, setEnabled: setAzanEnabled, testAzan, stopAzan, isPlaying, volume, setVolume } = useAzanNotification(timings);
  const [eventReminder, setEventReminder] = useLocalStorage('deenflow_event_reminder', true);
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDarkToggle = (val: boolean) => {
    setDarkMode(val);
    document.documentElement.classList.toggle('dark', val);
  };

  const handleRefreshLocation = async () => {
    setIsRefreshing(true);
    await detectLocation();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleShare = async () => {
    const shareText = `Assalamu'alaikum! 👋\n\nYuk, bikin harimu lebih teratur dengan Amalize. Aplikasi simpel untuk memantau progres ibadah harian, akses jadwal sholat & koleksi doa, serta dilengkapi kalender Hijriah/Masehi & reminder agenda agar jadwal kegiatanmu tidak terlewat.\n\nCek aplikasinya di sini ya: https://deenlyapp.lovable.app\n\nSemoga bermanfaat!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Amalize', text: shareText });
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('Teks berhasil disalin!');
    }
  };

  return (
    <div className="animate-fade-in space-y-4">
      <h2 className="text-lg font-bold text-foreground">Pengaturan</h2>

      {/* Notifications */}
      <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Notifikasi
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Notifikasi Adzan</p>
            <p className="text-xs text-muted-foreground">Putar adzan saat waktu sholat</p>
          </div>
          <Switch checked={azanEnabled} onCheckedChange={setAzanEnabled} />
        </div>
        {azanEnabled && (
          <>
            {/* Volume slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Volume Adzan</p>
                <span className="text-xs font-mono text-foreground">{volume}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-accent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={isPlaying ? stopAzan : testAzan}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isPlaying
                    ? 'bg-destructive/15 text-destructive hover:bg-destructive/25'
                    : 'bg-accent/15 text-accent hover:bg-accent/25'
                }`}
              >
                {isPlaying ? '⏹ Berhenti' : '🔊 Tes Adzan'}
              </button>
            </div>
          </>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Pengingat Acara</p>
            <p className="text-xs text-muted-foreground">Notifikasi sebelum acara dimulai</p>
          </div>
          <Switch checked={eventReminder} onCheckedChange={setEventReminder} />
        </div>
      </div>

      {/* Location */}
      <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Lokasi
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">{loc?.city || 'Belum terdeteksi'}</p>
            {loc && <p className="text-xs text-muted-foreground">{loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}</p>}
          </div>
          <button
            onClick={handleRefreshLocation}
            className="rounded-lg bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/25 transition-colors flex items-center gap-1.5"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Perbarui
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          Tampilan
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">{darkMode ? 'Mode Gelap' : 'Mode Terang'}</p>
            <p className="text-xs text-muted-foreground">Beralih antara tema gelap dan terang</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleDarkToggle} />
        </div>
      </div>

      {/* Language */}
      <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Bahasa
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground">Bahasa Indonesia</p>
          <span className="rounded-md bg-accent/15 px-2 py-1 text-xs text-accent">Aktif</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Bahasa lain akan tersedia di pembaruan mendatang</p>
      </div>

      {/* About */}
      <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
        <button onClick={() => setShowAbout(!showAbout)} className="flex w-full items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Tentang Amalize
          </h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-muted-foreground transition-transform ${showAbout ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showAbout && (
          <div className="text-sm text-muted-foreground leading-[1.6]">
            <p className="font-bold text-foreground text-base mb-3">Amalize: Your deen daily companion</p>
            <p>Assalamu'alaikum Warahmatullahi Wabarakatuh.</p>
            <p className="mt-3">Di tengah kesibukan dunia yang padat, menjaga konsistensi ibadah adalah tantangan tersendiri. Amalize hadir sebagai sahabat digital yang dirancang khusus untuk membantu Anda menjalankan ibadah dengan lebih teratur, terarah, dan penuh kesadaran. Kami percaya bahwa perubahan besar dalam hidup dimulai dari kebiasaan-kebiasaan kecil yang dilakukan secara istiqomah.</p>
            <p className="font-bold text-foreground text-[15px] mt-5">Mengapa Amalize?</p>
            <p className="mt-1">Amalize memadukan teknologi modern dengan nilai-nilai spiritual untuk menciptakan sistem yang sederhana, nyaman, dan relevan dengan kebutuhan Muslim masa kini. Seluruh fitur kami terintegrasi dalam satu dashboard terpadu, memberikan Anda kemudahan untuk memantau perjalanan spiritual Anda dalam satu genggaman.</p>
            <p className="font-bold text-foreground text-[15px] mt-5">Fitur Unggulan Kami:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1.5">
              <li><span className="font-medium">Jadwal Sholat & Arah Kiblat:</span> Pengingat waktu sholat yang akurat berbasis lokasi.</li>
              <li><span className="font-medium">Kalender Islam & Agenda:</span> Kalender hijriah terintegrasi dengan manajemen acara pribadi.</li>
              <li><span className="font-medium">Pusat Doa & Dzikir:</span> Koleksi doa harian, doa sholat, serta dzikir pagi dan petang.</li>
              <li><span className="font-medium">Tracker Ibadah:</span> Alat bantu untuk memantau progres ibadah harian Anda.</li>
            </ul>
            <p className="mt-3">Dengan memberikan dorongan spiritual yang lembut dan relevan, Amalize hadir untuk mendukung perjalanan ibadah Anda agar lebih disiplin, tenang, dan insya Allah penuh keberkahan.</p>
            <p className="mt-3">Wassalamu'alaikum Warahmatullahi Wabarakatuh.</p>
            <p className="text-xs mt-3">Dirancang dengan ❤️ untuk mendukung perjalanan ibadah umat Muslim di seluruh dunia.</p>
          </div>
        )}
      </div>

      {/* Privacy Policy */}
      <div className="rounded-xl bg-card p-4 shadow-sm space-y-3">
        <button onClick={() => setShowPrivacy(!showPrivacy)} className="flex w-full items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Kebijakan Privasi
          </h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-muted-foreground transition-transform ${showPrivacy ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showPrivacy && (
          <div className="text-sm text-muted-foreground leading-[1.6]">
            <p className="font-bold text-foreground text-base">Kebijakan Privasi</p>
            <p className="text-xs mt-1">Terakhir diperbarui: 3 Maret 2026</p>
            <p className="mt-3">Selamat datang di Amalize. Kami berkomitmen untuk menjaga privasi Anda dengan prinsip transparansi penuh.</p>
            <p className="font-bold text-foreground mt-4">1. Tanpa Akun & Tanpa Login</p>
            <p className="mt-1">Amalize sepenuhnya bersifat offline-first. Anda tidak perlu membuat akun, mendaftar, atau melakukan login.</p>
            <p className="font-bold text-foreground mt-4">2. Penyimpanan Data Lokal</p>
            <p className="mt-1">Seluruh data disimpan secara eksklusif di penyimpanan lokal perangkat Anda.</p>
            <p className="mt-1"><span className="font-medium">Penting:</span> Jika Anda reset pabrik, hapus cache, atau uninstall aplikasi, data akan hilang permanen.</p>
            <p className="font-bold text-foreground mt-4">3. Informasi Lokasi</p>
            <p className="mt-1">Akses lokasi hanya untuk menghitung jadwal sholat yang akurat. Data tidak dikirim ke server.</p>
            <p className="font-bold text-foreground mt-4">4. Analisis Penggunaan</p>
            <p className="mt-1">Kami tidak menggunakan pelacak pihak ketiga.</p>
            <p className="font-bold text-foreground mt-4">5. Keamanan Perangkat</p>
            <p className="mt-1">Keamanan data bergantung pada keamanan perangkat Anda.</p>
            <p className="font-bold text-foreground mt-4">6. Perubahan Kebijakan</p>
            <p className="mt-1">Kami dapat memperbarui kebijakan ini sewaktu-waktu melalui pembaruan aplikasi.</p>
            <p className="mt-3">Dengan menggunakan Amalize, Anda dianggap telah memahami dan menyetujui kebijakan privasi ini. Jika Anda mengalami kendala dalam penggunaan aplikasi atau memiliki saran untuk pengembangan Amalize ke depannya, kami dengan senang hati siap membantu dan mendengarkan masukan Anda.</p>
            <p className="mt-3 flex items-center gap-1.5">
              Silakan hubungi kami melalui email:
              <a href="mailto:inspirelimadua@gmail.com" className="inline-flex items-center gap-1 text-accent underline">
                <img src={inspireLogo} alt="" className="w-4 h-4 rounded-full inline-block" />
                inspirelimadua@gmail.com
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Share */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <button onClick={handleShare} className="flex w-full items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          <div className="text-left flex-1">
            <p className="text-sm font-semibold text-foreground">Bagikan ke Teman</p>
            <p className="text-xs text-muted-foreground">Ajak teman untuk beribadah bersama</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
