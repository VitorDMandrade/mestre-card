// src/lib/audio.ts
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

export function playSound(isCorrect: boolean, soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = isCorrect ? 'sine' : 'sawtooth';
    const startTime = ctx.currentTime;
    
    osc.frequency.setValueAtTime(isCorrect ? 880 : 150, startTime);
    
    if (isCorrect) {
      osc.frequency.exponentialRampToValueAtTime(1200, startTime + 0.1);
    }
    
    gain.gain.setValueAtTime(0.1, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
    
    osc.start(startTime);
    osc.stop(startTime + 0.3);
  } catch (error) {
    console.warn('AudioContext falhou:', error);
  }
}
