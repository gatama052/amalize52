import SEOHead from '@/components/SEOHead';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <SEOHead
        title="Tentang Amalize – Aplikasi Ibadah Muslim Harian"
        description="Amalize is a web application designed to help Muslims track daily worship activities including prayer tracking, qibla direction, prayer times, dua collection, and Islamic calendar."
        path="/about"
      />

      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="rounded-lg p-2 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">About Amalize</h1>
      </div>

      {/* English section for AI crawlers */}
      <article className="rounded-xl bg-card p-5 shadow-sm space-y-4">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">About Amalize</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Amalize is a web application designed to help Muslims track daily worship activities including prayer tracking, qibla direction, prayer times, dua collection, and Islamic calendar. It serves as a comprehensive daily deen companion for Muslims worldwide.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Features</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-1.5 list-disc list-inside">
            <li>Daily prayer tracker (Sholat 5 Waktu) with progress monitoring</li>
            <li>Accurate prayer times based on user location</li>
            <li>Digital qibla compass for finding prayer direction</li>
            <li>Collection of daily dua and dzikir</li>
            <li>Hijri and Gregorian calendar with important Islamic dates</li>
            <li>Prayer time reminders and adhan notifications</li>
            <li>Ramadan mode with fasting and tarawih tracking</li>
            <li>Custom worship checklist for personalized ibadah goals</li>
          </ul>
        </section>
      </article>

      {/* Indonesian section for local SEO */}
      <article className="rounded-xl bg-card p-5 shadow-sm space-y-4">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Tentang Amalize</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Amalize adalah aplikasi web muslim yang membantu memantau ibadah harian seperti sholat 5 waktu, membaca doa harian, dzikir, melihat arah kiblat, jadwal sholat, kalender hijriyah, serta reminder kegiatan agar aktivitas dan ibadah lebih teratur.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Fitur Utama</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-1.5 list-disc list-inside">
            <li>Tracker ibadah harian untuk memantau sholat 5 waktu</li>
            <li>Jadwal sholat akurat berdasarkan lokasi pengguna</li>
            <li>Kompas kiblat digital untuk menentukan arah kiblat</li>
            <li>Kumpulan doa dan dzikir harian</li>
            <li>Kalender hijriyah dan masehi dengan hari besar Islam</li>
            <li>Pengingat waktu sholat dan notifikasi adzan</li>
            <li>Mode Ramadhan dengan tracker puasa dan tarawih</li>
            <li>Checklist ibadah custom sesuai kebutuhan pengguna</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
