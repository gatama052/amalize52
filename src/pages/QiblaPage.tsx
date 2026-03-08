import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CalibrationScreen from '@/components/qibla/CalibrationScreen';
import QiblaCompass from '@/components/qibla/QiblaCompass';

export default function QiblaPage() {
  const navigate = useNavigate();
  const [calibrated, setCalibrated] = useState(false);

  const handleCalibrated = useCallback(() => setCalibrated(true), []);

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/jadwal')} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-foreground">Arah Kiblat</h2>
      </div>

      {calibrated ? <QiblaCompass /> : <CalibrationScreen onCalibrated={handleCalibrated} />}
    </div>
  );
}
