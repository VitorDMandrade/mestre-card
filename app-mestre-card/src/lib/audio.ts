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

export function playClickSound(soundEnabled: boolean = true): void {
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

    osc.type = 'sine';
    const startTime = ctx.currentTime;

    osc.frequency.setValueAtTime(2400, startTime);
    osc.frequency.exponentialRampToValueAtTime(800, startTime + 0.015);

    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.015);

    osc.start(startTime);
    osc.stop(startTime + 0.015);
  } catch (error) {
    console.warn('AudioContext click falhou:', error);
  }
}

export function playComboSound(combo: number, soundEnabled: boolean = true): void {
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

    osc.type = 'triangle';
    const startTime = ctx.currentTime;

    const baseFreq = 520 * Math.pow(1.08, Math.min(combo, 12));
    osc.frequency.setValueAtTime(baseFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, startTime + 0.12);

    gain.gain.setValueAtTime(0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

    osc.start(startTime);
    osc.stop(startTime + 0.18);
  } catch (error) {
    console.warn('AudioContext combo falhou:', error);
  }
}

export function playDamageSound(soundEnabled: boolean = true): void {
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

    osc.type = 'sawtooth';
    const startTime = ctx.currentTime;

    osc.frequency.setValueAtTime(160, startTime);
    osc.frequency.exponentialRampToValueAtTime(45, startTime + 0.28);

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

    osc.start(startTime);
    osc.stop(startTime + 0.28);
  } catch (error) {
    console.warn('AudioContext damage falhou:', error);
  }
}

export function playVictorySound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      const noteStart = startTime + idx * 0.08;
      const noteDuration = 0.25;

      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.08, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration);

      osc.start(noteStart);
      osc.stop(noteStart + noteDuration);
    });
  } catch (error) {
    console.warn('AudioContext victory falhou:', error);
  }
}

