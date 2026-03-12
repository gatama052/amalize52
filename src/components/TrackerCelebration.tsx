import { useEffect, useState } from 'react';
import Confetti from '@/components/Confetti';
import { X } from 'lucide-react';

const MOTIVATIONS = [
  {
    arabic: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
    translation: '"Sesungguhnya Allah tidak menyia-nyiakan pahala orang yang berbuat kebaikan."',
    source: '(QS. At-Taubah: 120)',
  },
  {
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    translation: '"Sesungguhnya setiap amal tergantung pada niatnya, dan setiap orang akan mendapatkan sesuai dengan apa yang ia niatkan."',
    source: '(HR. Bukhari dan Muslim)',
  },
  {
    arabic: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
    translation: '"Barang siapa mengerjakan kebaikan seberat biji zarrah, niscaya dia akan melihat balasannya."',
    source: '(QS. Az-Zalzalah: 7)',
  },
  {
    arabic: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
    translation: '"Amal yang paling dicintai oleh Allah adalah yang dilakukan terus-menerus meskipun sedikit."',
    source: '(HR. Bukhari dan Muslim)',
  },
  {
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ',
    translation: '"Ingatlah kepada-Ku, niscaya Aku akan mengingatmu."',
    source: '(QS. Al-Baqarah: 152)',
  },
  {
    arabic: 'إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا',
    translation: '"Sesungguhnya Allah bersama orang-orang yang bertakwa."',
    source: '(QS. An-Nahl: 128)',
  },
  {
    arabic: 'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَلَا إِلَى أَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ',
    translation: '"Sesungguhnya Allah tidak melihat rupa kalian dan tidak pula harta kalian, tetapi Allah melihat hati dan amal kalian."',
    source: '(HR. Muslim)',
  },
];

function getTodayMotivation() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return MOTIVATIONS[dayOfYear % MOTIVATIONS.length];
}

interface Props {
  onClose: () => void;
}

export default function TrackerCelebration({ onClose }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const motivation = getTodayMotivation();

  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Confetti duration={2800} />
      {showPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative mx-4 max-w-sm w-full rounded-2xl bg-card p-6 shadow-2xl border border-border animate-scale-in max-h-[85vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-4 pt-2">
              <h2 className="text-2xl font-bold text-foreground">MASYAALLAH 🎉</h2>

              <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                <p>
                  Alhamdulillah, seluruh ibadah yang ada di tracker hari ini telah kamu selesaikan.
                </p>
                <p>
                  Semoga Allah menerima setiap amal ibadahmu dan memberikan keberkahan dalam harimu. 🤲🏻
                </p>
                <p>
                  Tetap istiqamah dalam beribadah dan terus jaga konsistensi. 🔥😊
                </p>
              </div>

              {/* Motivasi */}
              <div className="rounded-xl bg-secondary/50 p-4 space-y-2 mt-4">
                <p className="text-right text-lg leading-loose font-arabic text-foreground" dir="rtl">
                  {motivation.arabic}
                </p>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  {motivation.translation}
                </p>
                <p className="text-[10px] text-muted-foreground/70">
                  {motivation.source}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
