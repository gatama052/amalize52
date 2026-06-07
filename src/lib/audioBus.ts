// Shared AudioContext + AnalyserNode so multiple audio sources can be visualized.
let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let masterGain: GainNode | null = null;
const connected = new WeakSet<HTMLMediaElement>();

export function getAudioBus() {
  if (!ctx || ctx.state === 'closed') {
    const AC = (window.AudioContext || (window as any).webkitAudioContext);
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.75;
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return { ctx: ctx!, analyser: analyser!, gain: masterGain! };
}

export function connectMediaElement(audio: HTMLMediaElement) {
  try {
    if (connected.has(audio)) return;
    const { ctx, gain } = getAudioBus();
    const src = ctx.createMediaElementSource(audio);
    src.connect(gain);
    connected.add(audio);
  } catch {
    // already connected or unsupported
  }
}

export function getAnalyser(): AnalyserNode {
  return getAudioBus().analyser;
}
