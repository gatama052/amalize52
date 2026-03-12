import { useState, useEffect, useCallback } from 'react';
import logo from '@/assets/logo.png';
import Confetti from './Confetti';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [firstOpenAfterInstall, setFirstOpenAfterInstall] = useState(false);

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true;

  // Detect first open after install
  useEffect(() => {
    if (isStandalone && !localStorage.getItem('amalize_install_celebrated')) {
      setFirstOpenAfterInstall(true);
      setInstalled(true);
      setShowConfetti(true);
      localStorage.setItem('amalize_install_celebrated', 'true');
    }
  }, [isStandalone]);

  useEffect(() => {
    if (isStandalone && !firstOpenAfterInstall) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const installedHandler = () => {
      setInstalled(true);
      setShowConfetti(true);
      localStorage.setItem('amalize_install_celebrated', 'true');
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, [isStandalone, firstOpenAfterInstall]);

  // Show install popup 4s after deferred prompt (3-5s after splash)
  useEffect(() => {
    if (!deferredPrompt || dismissed || installed || isStandalone) return;
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, [deferredPrompt, dismissed, installed, isStandalone]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
      setShowConfetti(true);
      localStorage.setItem('amalize_install_celebrated', 'true');
    }
    setShow(false);
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  const handleOpenApp = () => {
    setInstalled(false);
    setShowConfetti(false);
  };

  // Success celebration after install
  if (installed && (showConfetti || firstOpenAfterInstall)) {
    return (
      <>
        {showConfetti && <Confetti duration={2800} />}
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative w-full max-w-sm rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-scale-in">
            {/* Decorative top accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/60 to-accent" />

            <div className="p-5 text-center">
              {/* Logo */}
              <div className="flex justify-center mb-3">
                <img src={logo} alt="Amalize" className="h-14 w-14 rounded-xl shadow-md" />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground mb-2">
                Amalize berhasil diinstall 🎉
              </h3>

              {/* Description */}
              <div className="text-xs text-muted-foreground leading-relaxed space-y-2 mb-5">
                <p>Terima kasih telah menginstall Amalize.</p>
                <p>
                  Kini kamu dapat mengakses berbagai fitur dengan lebih cepat langsung dari perangkatmu.
                </p>
                <p>
                  Semoga aplikasi ini dapat membantu aktivitas dan ibadah harianmu.
                </p>
                <p className="font-medium text-foreground/80">Semoga bermanfaat. 🤲</p>
              </div>

              {/* Button */}
              <button
                onClick={handleOpenApp}
                className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-accent-foreground shadow-md transition-all hover:brightness-110 active:scale-[0.97]"
              >
                Buka Amalize
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleDismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-scale-in">
        {/* Decorative top accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/60 to-accent" />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <img src={logo} alt="Amalize" className="h-10 w-10 rounded-lg shadow-sm" />
            <div>
              <h3 className="text-base font-bold text-foreground">Install Amalize</h3>
              <p className="text-[10px] text-muted-foreground">Your Deen Daily Companion</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Install Amalize di perangkatmu untuk pengalaman yang lebih nyaman. Akses berbagai fitur lebih cepat seperti aplikasi mobile dan buka Amalize langsung dari layar utama perangkatmu.
          </p>

          {/* Benefits */}
          <div className="space-y-2 mb-5 rounded-xl bg-secondary/50 p-3">
            {[
              'Akses lebih cepat',
              'Bisa dibuka langsung dari Home Screen',
              'Pengalaman seperti aplikasi mobile',
            ].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <span className="text-accent text-sm">✔</span>
                <span className="text-xs text-foreground">{text}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDismiss}
              className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              Nanti
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-md transition-all hover:brightness-110 active:scale-[0.97]"
            >
              Install App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
