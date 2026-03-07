import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { MapPin, ArrowLeft } from 'lucide-react';

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function calculateQiblaDirection(lat: number, lng: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA_LAT);
  const deltaLambda = toRad(KAABA_LNG - lng);
  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  let bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

function getDirectionLabel(deg: number): string {
  const dirs = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
  const idx = Math.round(((deg % 360) + 360) % 360 / 45) % 8;
  return dirs[idx];
}

export default function QiblaPage() {
  const navigate = useNavigate();
  const { location: loc } = useUserLocation();
  const [compass, setCompass] = useState<number | null>(null);
  const [permissionState, setPermissionState] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [fullAddress, setFullAddress] = useState<string>('');

  const rawCompass = useRef<number>(0);
  const smoothedCompass = useRef<number>(0);
  const animFrame = useRef<number>(0);
  const hasData = useRef(false);

  const qiblaAngle = loc ? calculateQiblaDirection(loc.latitude, loc.longitude) : 0;

  // Reverse geocoding
  useEffect(() => {
    if (!loc) return;
    const coordsKey = `${loc.latitude.toFixed(4)},${loc.longitude.toFixed(4)}`;
    const cached = localStorage.getItem('qibla_full_address');
    const cachedCoords = localStorage.getItem('qibla_addr_coords');
    if (cached && cachedCoords === coordsKey) {
      setFullAddress(cached);
      return;
    }
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${loc.latitude}&lon=${loc.longitude}&format=json&accept-language=id&zoom=18`)
      .then(r => r.json())
      .then(data => {
        const a = data.address || {};
        const parts = [a.village || a.suburb || a.neighbourhood || '', a.city_district || a.county || '', a.city || a.town || a.municipality || '', a.state || ''].filter(Boolean);
        const addr = parts.join(', ');
        setFullAddress(addr);
        localStorage.setItem('qibla_full_address', addr);
        localStorage.setItem('qibla_addr_coords', coordsKey);
      })
      .catch(() => setFullAddress(loc.city));
  }, [loc]);

  // Smooth animation loop
  const animate = useCallback(() => {
    const target = rawCompass.current;
    const current = smoothedCompass.current;
    let diff = target - current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    smoothedCompass.current = (current + diff * 0.12 + 360) % 360;
    setCompass(smoothedCompass.current);
    animFrame.current = requestAnimationFrame(animate);
  }, []);

  // Handle orientation events
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    let heading: number | null = null;

    if ((e as any).webkitCompassHeading != null) {
      heading = (e as any).webkitCompassHeading;
    } else if (e.alpha != null) {
      // Check if absolute
      if ((e as any).absolute === true || (e as any).webkitCompassHeading != null) {
        heading = (360 - e.alpha) % 360;
      } else {
        // Relative orientation fallback
        heading = (360 - e.alpha) % 360;
      }
    }

    if (heading != null && !isNaN(heading)) {
      hasData.current = true;
      rawCompass.current = heading;
    }
  }, []);

  // Setup sensor listeners
  const startCompass = useCallback(() => {
    animFrame.current = requestAnimationFrame(animate);

    // Try absolute orientation first (Android)
    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
    }
    // Also listen to regular deviceorientation (iOS + fallback)
    window.addEventListener('deviceorientation', handleOrientation, true);

    // Timeout: if no data after 5 seconds, mark denied
    setTimeout(() => {
      if (!hasData.current) {
        setPermissionState('denied');
      }
    }, 5000);

    return () => {
      if ('ondeviceorientationabsolute' in window) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
      }
      window.removeEventListener('deviceorientation', handleOrientation, true);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [animate, handleOrientation]);

  useEffect(() => {
    const needsPermission = typeof (DeviceOrientationEvent as any).requestPermission === 'function';

    if (needsPermission) {
      setPermissionState('idle');
      animFrame.current = requestAnimationFrame(animate);
      return () => {
        if (animFrame.current) cancelAnimationFrame(animFrame.current);
      };
    } else {
      setPermissionState('granted');
      return startCompass();
    }
  }, [startCompass, animate]);

  const requestPermission = () => {
    setPermissionState('requesting');
    (DeviceOrientationEvent as any).requestPermission()
      .then((state: string) => {
        if (state === 'granted') {
          setPermissionState('granted');
          startCompass();
        } else {
          setPermissionState('denied');
        }
      })
      .catch(() => setPermissionState('denied'));
  };

  const dialRotation = compass !== null ? -compass : 0;
  const needleRotation = compass !== null ? qiblaAngle - compass : qiblaAngle;
  const needsIOSPermission = typeof (DeviceOrientationEvent as any).requestPermission === 'function' && permissionState === 'idle';

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/jadwal')} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-foreground">Arah Kiblat</h2>
      </div>

      {/* Location */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Lokasi Saat Ini</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {fullAddress || loc?.city || 'Mendeteksi lokasi...'}
            </p>
            {loc && (
              <p className="text-[10px] text-muted-foreground mt-1">
                {loc.latitude.toFixed(4)}°, {loc.longitude.toFixed(4)}°
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Compass */}
      <div className="rounded-xl bg-card p-6 shadow-sm flex flex-col items-center gap-5">
        <div className="relative w-72 h-72">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: 'hsl(var(--accent) / 0.3)' }} />

          {/* Compass dial */}
          <div className="absolute inset-3 rounded-full bg-card border-2 border-border overflow-hidden">
            <div className="absolute inset-0" style={{ transform: `rotate(${dialRotation}deg)`, transition: 'transform 0.08s linear' }}>
              {/* Degree marks */}
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 10}deg)` }}>
                  <div className={`absolute left-1/2 -translate-x-1/2 ${
                    i % 9 === 0 ? 'top-1.5 h-3 w-0.5 bg-accent' : 'top-2 h-2 w-px bg-border'
                  }`} />
                </div>
              ))}

              {/* Cardinal directions */}
              <span className="absolute left-1/2 top-5 -translate-x-1/2 text-xs font-bold text-accent">U</span>
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted-foreground">T</span>
              <span className="absolute left-1/2 bottom-5 -translate-x-1/2 text-[10px] font-semibold text-muted-foreground">S</span>
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted-foreground">B</span>
            </div>

            {/* Qibla needle */}
            <div className="absolute inset-0" style={{ transform: `rotate(${needleRotation}deg)`, transition: 'transform 0.08s linear' }}>
              <div className="absolute left-1/2 top-4 h-[calc(50%-16px)] w-0.5 -translate-x-1/2 rounded-full bg-accent" />
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-accent">
                  <span className="text-base">🕋</span>
                </div>
              </div>
              <div className="absolute left-1/2 bottom-4 h-[calc(50%-16px)] w-px -translate-x-1/2 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent border-2 border-card shadow" />

            {/* Inner rings */}
            <div className="absolute inset-[30%] rounded-full border border-border/30" />
            <div className="absolute inset-[45%] rounded-full border border-border/15" />
          </div>
        </div>

        {/* Info */}
        <div className="text-center space-y-1.5">
          <p className="text-2xl font-bold text-foreground">{qiblaAngle.toFixed(1)}°</p>
          <p className="text-sm font-medium text-muted-foreground">{getDirectionLabel(qiblaAngle)} dari Utara</p>
          <p className="text-xs text-muted-foreground">
            {compass !== null && hasData.current
              ? '✅ Kompas aktif — putar perangkat ke arah 🕋'
              : needsIOSPermission
              ? 'Ketuk tombol di bawah untuk mengaktifkan kompas'
              : permissionState === 'denied'
              ? '⚠️ Kompas tidak tersedia di perangkat ini — gunakan derajat di atas sebagai acuan manual'
              : '⏳ Mendeteksi sensor kompas...'}
          </p>
        </div>

        {/* iOS permission */}
        {needsIOSPermission && (
          <button
            onClick={requestPermission}
            className="rounded-xl px-5 py-2.5 text-sm font-medium bg-accent text-accent-foreground transition-colors"
          >
            Aktifkan Kompas
          </button>
        )}

        {/* Calibration tip */}
        {compass !== null && hasData.current && (
          <div className="rounded-lg bg-secondary/50 px-3 py-2 text-center">
            <p className="text-[10px] text-muted-foreground">
              💡 Kalibrasi: Gerakkan perangkat membentuk angka 8 untuk akurasi lebih baik
            </p>
          </div>
        )}
      </div>
    </div>
  );
}