import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation as useUserLocation } from '@/hooks/useLocation';
import { MapPin } from 'lucide-react';

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
  return dirs[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
}

// Normalize angle difference to [-180, 180]
function angleDiff(a: number, b: number): number {
  let d = a - b;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

export default function QiblaCompass() {
  const { location: loc } = useUserLocation();
  const [compass, setCompass] = useState<number>(0);
  const [hasData, setHasData] = useState(false);
  const [accuracy, setAccuracy] = useState<'high' | 'medium' | 'low'>('medium');
  const [fullAddress, setFullAddress] = useState('');

  const rawHeading = useRef(0);
  const smoothed = useRef(0);
  const animFrame = useRef(0);
  const varianceBuffer = useRef<number[]>([]);

  const qiblaAngle = loc ? calculateQiblaDirection(loc.latitude, loc.longitude) : 0;
  const needleAngle = qiblaAngle - compass;
  const isAligned = hasData && Math.abs(angleDiff(needleAngle, 0)) < 3;

  // Vibrate when aligned
  useEffect(() => {
    if (isAligned && navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [isAligned]);

  // Reverse geocoding
  useEffect(() => {
    if (!loc) return;
    const key = `${loc.latitude.toFixed(4)},${loc.longitude.toFixed(4)}`;
    const cached = localStorage.getItem('qibla_full_address');
    const cachedKey = localStorage.getItem('qibla_addr_coords');
    if (cached && cachedKey === key) { setFullAddress(cached); return; }
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${loc.latitude}&lon=${loc.longitude}&format=json&accept-language=id&zoom=18`)
      .then(r => r.json())
      .then(data => {
        const a = data.address || {};
        const parts = [a.village || a.suburb || a.neighbourhood || '', a.city_district || a.county || '', a.city || a.town || a.municipality || '', a.state || ''].filter(Boolean);
        const addr = parts.join(', ');
        setFullAddress(addr);
        localStorage.setItem('qibla_full_address', addr);
        localStorage.setItem('qibla_addr_coords', key);
      })
      .catch(() => setFullAddress(loc.city));
  }, [loc]);

  // Smooth animation loop with low-pass filter
  const animate = useCallback(() => {
    const target = rawHeading.current;
    const current = smoothed.current;
    let diff = angleDiff(target, current);
    // Low-pass: alpha=0.08 for smooth movement
    smoothed.current = (current + diff * 0.08 + 360) % 360;
    setCompass(smoothed.current);
    animFrame.current = requestAnimationFrame(animate);
  }, []);

  // Orientation handler
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    let heading: number | null = null;
    if ((e as any).webkitCompassHeading != null) {
      heading = (e as any).webkitCompassHeading;
    } else if (e.alpha != null) {
      heading = (360 - e.alpha) % 360;
    }
    if (heading == null || isNaN(heading)) return;

    if (!hasData) setHasData(true);
    rawHeading.current = heading;

    // Track variance for accuracy
    varianceBuffer.current.push(heading);
    if (varianceBuffer.current.length > 20) varianceBuffer.current.shift();
    if (varianceBuffer.current.length >= 10) {
      const vals = varianceBuffer.current;
      const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
      const variance = vals.reduce((s, v) => s + Math.pow(angleDiff(v, mean), 2), 0) / vals.length;
      if (variance < 25) setAccuracy('high');
      else if (variance < 100) setAccuracy('medium');
      else setAccuracy('low');
    }
  }, [hasData]);

  // Setup
  useEffect(() => {
    animFrame.current = requestAnimationFrame(animate);

    const needsPermission = typeof (DeviceOrientationEvent as any).requestPermission === 'function';
    if (needsPermission) {
      (DeviceOrientationEvent as any).requestPermission().then((state: string) => {
        if (state === 'granted') {
          if ('ondeviceorientationabsolute' in window) window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      }).catch(() => {});
    } else {
      if ('ondeviceorientationabsolute' in window) window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      cancelAnimationFrame(animFrame.current);
      if ('ondeviceorientationabsolute' in window) window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [animate, handleOrientation]);

  const dialRotation = -compass;
  const accuracyColor = accuracy === 'high' ? 'text-green-400' : accuracy === 'medium' ? 'text-yellow-400' : 'text-red-400';
  const accuracyDot = accuracy === 'high' ? 'bg-green-400' : accuracy === 'medium' ? 'bg-yellow-400' : 'bg-red-400';
  const accuracyLabel = accuracy === 'high' ? 'Akurasi Tinggi' : accuracy === 'medium' ? 'Akurasi Sedang' : 'Perlu Kalibrasi';
  const needleColor = isAligned ? '#22c55e' : 'hsl(43, 65%, 52%)';

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Location card */}
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
      <div className="rounded-2xl p-6 flex flex-col items-center gap-5" style={{
        background: 'linear-gradient(180deg, hsl(215 75% 8%) 0%, hsl(215 70% 14%) 100%)',
      }}>
        <div className="relative w-72 h-72">
          {/* Outer decorative ring */}
          <div className="absolute inset-0 rounded-full" style={{
            border: '2px solid hsl(43 65% 52% / 0.3)',
            boxShadow: '0 0 30px hsl(43 65% 52% / 0.1), inset 0 0 30px hsl(43 65% 52% / 0.05)',
          }} />

          {/* Main compass area */}
          <div className="absolute inset-3 rounded-full overflow-hidden" style={{
            background: 'radial-gradient(circle, hsl(215 70% 16%) 0%, hsl(215 75% 10%) 100%)',
            border: '1px solid hsl(215 40% 25%)',
          }}>
            {/* Rotating dial */}
            <div className="absolute inset-0 transition-none" style={{ transform: `rotate(${dialRotation}deg)` }}>
              {/* Degree ticks */}
              {Array.from({ length: 72 }).map((_, i) => {
                const isMajor = i % 18 === 0;
                const isMid = i % 9 === 0;
                return (
                  <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 5}deg)` }}>
                    <div className="absolute left-1/2 -translate-x-1/2" style={{
                      top: isMajor ? '6px' : '10px',
                      height: isMajor ? '14px' : isMid ? '10px' : '6px',
                      width: isMajor ? '2px' : '1px',
                      background: isMajor ? 'hsl(43, 65%, 52%)' : 'hsl(215, 15%, 40%)',
                      borderRadius: '1px',
                    }} />
                  </div>
                );
              })}

              {/* Degree numbers */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                <div key={deg} className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                  <span className="absolute left-1/2 -translate-x-1/2 text-[9px] font-medium" style={{
                    top: '24px',
                    color: deg % 90 === 0 ? 'hsl(43, 65%, 52%)' : 'hsl(215, 15%, 50%)',
                    transform: `translateX(-50%) rotate(${-deg}deg)`,
                    transformOrigin: 'center center',
                  }}>
                    {/* Show only intercardinal degrees */}
                    {deg % 90 !== 0 && deg}
                  </span>
                </div>
              ))}

              {/* Cardinal labels */}
              <span className="absolute left-1/2 -translate-x-1/2 text-sm font-bold" style={{ top: '22px', color: 'hsl(43, 65%, 60%)', transform: 'translateX(-50%)' }}>N</span>
              <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ right: '20px', color: 'hsl(215, 15%, 55%)' }}>E</span>
              <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold" style={{ bottom: '22px', color: 'hsl(215, 15%, 55%)', transform: 'translateX(-50%)' }}>S</span>
              <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ left: '20px', color: 'hsl(215, 15%, 55%)' }}>W</span>
            </div>

            {/* Qibla needle */}
            <div className="absolute inset-0" style={{ transform: `rotate(${needleAngle}deg)` }}>
              {/* Needle line */}
              <div className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{
                top: '28px',
                height: 'calc(50% - 28px)',
                width: '3px',
                background: `linear-gradient(to top, transparent, ${needleColor})`,
              }} />
              {/* Ka'bah icon with glow */}
              <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '8px', transform: 'translateX(-50%)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                  background: isAligned
                    ? 'radial-gradient(circle, hsl(142 70% 35%) 0%, hsl(142 70% 25%) 100%)'
                    : 'radial-gradient(circle, hsl(43 65% 52%) 0%, hsl(43 65% 38%) 100%)',
                  boxShadow: isAligned
                    ? '0 0 20px hsl(142 70% 45% / 0.6), 0 0 40px hsl(142 70% 45% / 0.3)'
                    : '0 0 20px hsl(43 65% 52% / 0.5), 0 0 40px hsl(43 65% 52% / 0.2)',
                }}>
                  <span className="text-lg">🕋</span>
                </div>
              </div>
              {/* Opposite tail */}
              <div className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{
                bottom: '28px',
                height: 'calc(50% - 28px)',
                width: '1px',
                background: 'hsl(215, 15%, 30%)',
              }} />
            </div>

            {/* Inner rings */}
            <div className="absolute inset-[30%] rounded-full" style={{ border: '1px solid hsl(215 40% 20%)' }} />
            <div className="absolute inset-[45%] rounded-full" style={{ border: '1px solid hsl(215 40% 16%)' }} />

            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{
              background: 'radial-gradient(circle, hsl(43 65% 60%) 0%, hsl(43 65% 42%) 100%)',
              boxShadow: '0 0 8px hsl(43 65% 52% / 0.4)',
            }} />

            {/* Fixed north indicator at top */}
          </div>

          {/* Fixed top triangle (device heading indicator) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10">
            <div style={{
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '12px solid hsl(43, 65%, 52%)',
              filter: 'drop-shadow(0 0 4px hsl(43 65% 52% / 0.5))',
            }} />
          </div>
        </div>

        {/* Degree display */}
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold" style={{ color: isAligned ? '#22c55e' : 'hsl(43, 65%, 60%)' }}>
            {qiblaAngle.toFixed(1)}°
          </p>
          <p className="text-sm font-medium" style={{ color: 'hsl(215, 15%, 60%)' }}>
            {getDirectionLabel(qiblaAngle)} dari Utara
          </p>
        </div>

        {/* Accuracy indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${accuracyDot}`} />
          <span className={`text-xs font-medium ${accuracyColor}`}>{accuracyLabel}</span>
        </div>

        {/* Status */}
        <p className="text-[11px] text-center" style={{ color: 'hsl(215, 15%, 50%)' }}>
          {isAligned
            ? '✅ Anda menghadap kiblat!'
            : hasData
            ? 'Putar perangkat ke arah 🕋'
            : '⏳ Mendeteksi sensor kompas...'}
        </p>
      </div>
    </div>
  );
}
