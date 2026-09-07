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

/**
 * Sons mecânicos para o Guichê de Inspeção (Papers, Please Engine)
 */

// 1. Som de Carimbo Aprovado (Impacto pesado e seco de madeira com estalo metálico)
export function playStampApprovedSound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    // Onda grave de impacto da mesa
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.12);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.14);

    // Ruído percussivo de madeira/borracha
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);
  } catch (e) {
    console.warn('AudioContext stampApproved falhou:', e);
  }
}

// 2. Som de Carimbo Denegado (Impacto duplo mais metálico e agressivo)
export function playStampDeniedSound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    // Batida 1 (baque seco)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(90, t);
    osc1.frequency.exponentialRampToValueAtTime(25, t + 0.18);
    gain1.gain.setValueAtTime(0.4, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.2);

    // Tom agudo de carimbo de advertência (buzz mecânico sutil)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(220, t + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(110, t + 0.16);
    gain2.gain.setValueAtTime(0.08, t + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + 0.04);
    osc2.stop(t + 0.16);
  } catch (e) {
    console.warn('AudioContext stampDenied falhou:', e);
  }
}

// 3. Som de Papel Deslizando (ruído filtrado suave com fade)
export function playPaperSlideSound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const duration = 0.22;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const envelope = Math.sin(progress * Math.PI);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro passa-baixa para dar sensação de papel grosso
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.setValueAtTime(1.5, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(t);
  } catch (e) {
    console.warn('AudioContext paperSlide falhou:', e);
  }
}

// 4. Som de Teletipo / Notificação de Infração M.O.A. (cliques de impressora matricial)
export function playTeletypeWarningSound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const clicks = 5;

    for (let i = 0; i < clicks; i++) {
      const clickTime = t + i * 0.045;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + (i % 2) * 200, clickTime);

      gain.gain.setValueAtTime(0.08, clickTime);
      gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(clickTime);
      osc.stop(clickTime + 0.025);
    }

    // Alarme de advertência no final
    const alarmTime = t + clicks * 0.045 + 0.05;
    const alarmOsc = ctx.createOscillator();
    const alarmGain = ctx.createGain();
    alarmOsc.type = 'sawtooth';
    alarmOsc.frequency.setValueAtTime(320, alarmTime);
    alarmOsc.frequency.setValueAtTime(280, alarmTime + 0.12);
    alarmGain.gain.setValueAtTime(0.15, alarmTime);
    alarmGain.gain.exponentialRampToValueAtTime(0.001, alarmTime + 0.25);

    alarmOsc.connect(alarmGain);
    alarmGain.connect(ctx.destination);
    alarmOsc.start(alarmTime);
    alarmOsc.stop(alarmTime + 0.25);
  } catch (e) {
    console.warn('AudioContext teletypeWarning falhou:', e);
  }
}

// 5. Som de Guichê Abrindo / Próximo Postulante
export function playShutterSound(soundEnabled: boolean = true): void {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.15);

    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  } catch (e) {
    console.warn('AudioContext shutter falhou:', e);
  }
}

