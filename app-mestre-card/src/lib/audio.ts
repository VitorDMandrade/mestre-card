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

// ============================================================================
// MOTOR ACÚSTICO HÍBRIDO: RÁDIO DO POSTO DE FRONTEIRA & TRAVA DE EVIDÊNCIA (Fase 2B)
// ============================================================================

let radioAudioElement: HTMLAudioElement | null = null;
let radioSourceNode: MediaElementAudioSourceNode | null = null;
let radioFilterNode: BiquadFilterNode | null = null;
let radioGainNode: GainNode | null = null;

// Nós de áudio do gerador procedural de contingência (fail-safe)
let proceduralOsc1: OscillatorNode | null = null;
let proceduralOsc2: OscillatorNode | null = null;
let proceduralNoiseNode: AudioBufferSourceNode | null = null;
let proceduralGainNode: GainNode | null = null;
let isRadioPlaying = false;

export function isAmbientRadioActive(): boolean {
  return isRadioPlaying;
}

function stopProceduralRadio(): void {
  try {
    if (proceduralOsc1) {
      proceduralOsc1.stop();
      proceduralOsc1.disconnect();
      proceduralOsc1 = null;
    }
    if (proceduralOsc2) {
      proceduralOsc2.stop();
      proceduralOsc2.disconnect();
      proceduralOsc2 = null;
    }
    if (proceduralNoiseNode) {
      proceduralNoiseNode.stop();
      proceduralNoiseNode.disconnect();
      proceduralNoiseNode = null;
    }
    if (proceduralGainNode) {
      proceduralGainNode.disconnect();
      proceduralGainNode = null;
    }
  } catch (e) {
    console.warn('Erro ao parar rádio procedural:', e);
  }
}

function startProceduralRadio(ctx: AudioContext): void {
  try {
    stopProceduralRadio();

    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.015, t);
    masterGain.connect(ctx.destination);
    proceduralGainNode = masterGain;

    // 1. Zumbido elétrico de 60Hz + 120Hz (hum analógico vintage)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, t);
    const osc1Gain = ctx.createGain();
    osc1Gain.gain.setValueAtTime(0.008, t);
    osc1.connect(osc1Gain);
    osc1Gain.connect(masterGain);
    osc1.start(t);
    proceduralOsc1 = osc1;

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(120, t);
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.004, t);
    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);
    osc2.start(t);
    proceduralOsc2 = osc2;

    // 2. Ruído estático contínuo com filtro passa-faixa em 1200Hz
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1200, t);
    noiseFilter.Q.setValueAtTime(1.0, t);

    noise.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    noise.start(t);
    proceduralNoiseNode = noise;
  } catch (e) {
    console.warn('Procedural radio start failed:', e);
  }
}

/**
 * Ativa ou desativa o Rádio Ambiente do Posto de Fronteira.
 * Reproduz streaming roteado com filtro passa-faixa 1800Hz e atenuação 0.15,
 * com fail-safe imediato para o gerador procedural analógico.
 */
export function toggleAmbientRadio(play: boolean): void {
  if (!play) {
    isRadioPlaying = false;
    if (radioAudioElement) {
      try {
        radioAudioElement.pause();
        radioAudioElement.currentTime = 0;
      } catch (e) {}
    }
    if (radioGainNode) {
      try {
        radioGainNode.disconnect();
      } catch (e) {}
      radioGainNode = null;
    }
    if (radioFilterNode) {
      try {
        radioFilterNode.disconnect();
      } catch (e) {}
      radioFilterNode = null;
    }
    if (radioSourceNode) {
      try {
        radioSourceNode.disconnect();
      } catch (e) {}
      radioSourceNode = null;
    }
    radioAudioElement = null;
    stopProceduralRadio();
    return;
  }

  isRadioPlaying = true;
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  try {
    if (!radioAudioElement) {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.loop = true;
      audio.src = './assets/audio/radio_checkpoint_80s.mp3';
      radioAudioElement = audio;

      try {
        const source = ctx.createMediaElementSource(audio);
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, ctx.currentTime);
        filter.Q.setValueAtTime(0.8, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, ctx.currentTime);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        radioSourceNode = source;
        radioFilterNode = filter;
        radioGainNode = gain;
      } catch (nodeErr) {
        console.warn('Roteamento Web Audio falhou, tocando direto no elemento:', nodeErr);
      }
    }

    const playPromise = radioAudioElement.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Streaming de áudio falhou, ativando fallback procedural Web Audio:', err);
        startProceduralRadio(ctx);
      });
    }
  } catch (err) {
    console.warn('Falha ao instanciar áudio, usando procedural:', err);
    startProceduralRadio(ctx);
  }
}

/**
 * 6. Som de Trava de Evidência (Engrenagem Metálica Pesada)
 * Onda triangle descendo de 340Hz para 140Hz em 70ms com decaimento exponencial rápido.
 */
export function playEvidenceLockSound(enabled: boolean = true): void {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.07);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  } catch (e) {
    console.warn('AudioContext evidenceLock falhou:', e);
  }
}

// ============================================================================
// SÍNTESE ACÚSTICA: PROTOCOLO DECODER (SEÇÃO 02 - TEORIA)
// ============================================================================

/**
 * 7. Som de Chirp de Decodificação / Descramble (Terminal Analógico)
 * Varredura rápida em onda dente de serra descendo de 1200Hz para 800Hz em 35ms.
 */
export function playDecoderChirpSound(enabled: boolean = true): void {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.035);

    gain.gain.setValueAtTime(0.045, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.035);
  } catch (e) {
    console.warn('AudioContext decoderChirp falhou:', e);
  }
}

/**
 * 8. Som de Sucesso de Desclassificação de Slot (Acorde Harmônico C5 + E5)
 * Duplo acorde senoidal simultâneo (523.25Hz + 659.25Hz) atenuando suavemente em 200ms.
 */
export function playDecodedSuccessSound(enabled: boolean = true): void {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.09, t);
    masterGain.gain.exponentialRampToValueAtTime(0.001, t + 0.20);
    masterGain.connect(ctx.destination);

    // C5 (523.25Hz)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, t);
    osc1.connect(masterGain);
    osc1.start(t);
    osc1.stop(t + 0.20);

    // E5 (659.25Hz)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, t);
    osc2.connect(masterGain);
    osc2.start(t);
    osc2.stop(t + 0.20);
  } catch (e) {
    console.warn('AudioContext decodedSuccess falhou:', e);
  }
}

/**
 * 9. Som de Erro / Rejeição de Ficha no Slot (Zumbido Elétrico Baixo)
 * Onda dente de serra em 130Hz com filtro passa-baixa em 300Hz durando 80ms.
 */
export function playDecoderErrorSound(enabled: boolean = true): void {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, t);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  } catch (e) {
    console.warn('AudioContext decoderError falhou:', e);
  }
}

/**
 * 10. Fechamento de contato elétrico e pulso capacitivo ascendente (Reator Causal)
 */
export function playCircuitConnectSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(940, now + 0.14);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(3600, now + 0.14);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch (e) {
    console.warn('AudioContext circuitConnect falhou:', e);
  }
}

/**
 * 11. Faísca de arco voltaico com desarme violento de disjuntor (Reator Causal)
 */
export function playCircuitShortSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Ruído de faísca (arco elétrico)
    const bufferSize = Math.floor(ctx.sampleRate * 0.08);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // Queda mecânica do disjuntor (onda dente de serra descendente pesada)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.22);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {
    console.warn('AudioContext circuitShort falhou:', e);
  }
}

/**
 * 12. Turbina de ressonância harmônica em sobrecarga triunfal de 100% (Reator Causal)
 */
export function playReactorOverdriveSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const frequencies = [261.63, 329.63, 392.0, 523.25, 659.25]; // C E G C E

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 0.8, now + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + delay + 0.4);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.65);
    });
  } catch (e) {
    console.warn('AudioContext reactorOverdrive falhou:', e);
  }
}

/**
 * 13. Rearme mecânico de disjuntor industrial de alta voltagem (Trava de mola pesada)
 */
export function playBreakerResetSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    // Estalo agudo de trava mecânica metálica
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(1400, t);
    clickOsc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
    clickGain.gain.setValueAtTime(0.18, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(t);
    clickOsc.stop(t + 0.04);

    // Baque grave de mola e fechamento de contato de cobre pesado
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'triangle';
    thudOsc.frequency.setValueAtTime(180, t + 0.03);
    thudOsc.frequency.exponentialRampToValueAtTime(45, t + 0.18);
    thudGain.gain.setValueAtTime(0.3, t + 0.03);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.20);
    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(t + 0.03);
    thudOsc.stop(t + 0.20);
  } catch (e) {
    console.warn('AudioContext breakerReset falhou:', e);
  }
}

// ─── VIA 3: BOSS FIGHT ROGUELIKE (SEÇÃO 05 - LAB) ───────────────────────────

let bossBattleAudio: HTMLAudioElement | null = null;
let bossVictoryAudio: HTMLAudioElement | null = null;

/**
 * Inicia a trilha sonora orquestrada de batalha em loop contínuo
 */
export function startBossBattleMusic(enabled = true): void {
  if (!enabled) return;
  try {
    if (!bossBattleAudio) {
      bossBattleAudio = new Audio('./audio/boss_battle_theme.mp3');
      bossBattleAudio.loop = true;
      bossBattleAudio.volume = 0.18;
      bossBattleAudio.onerror = () => {
        if (bossBattleAudio && !bossBattleAudio.src.includes('/assets/audio/')) {
          bossBattleAudio.src = './assets/audio/boss_battle_theme.mp3';
          bossBattleAudio.play().catch(() => {});
        }
      };
    }
    bossBattleAudio.currentTime = 0;
    const playPromise = bossBattleAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay da trilha do boss bloqueado pelo navegador:', err);
      });
    }
  } catch (e) {
    console.warn('Erro ao inicializar trilha do boss:', e);
  }
}

/**
 * Interrompe a trilha sonora de batalha e reinicia o ponteiro
 */
export function stopBossBattleMusic(): void {
  try {
    if (bossBattleAudio) {
      bossBattleAudio.pause();
      bossBattleAudio.currentTime = 0;
    }
  } catch (e) {
    console.warn('Erro ao parar trilha do boss:', e);
  }
}

/**
 * Toca a fanfarra orquestrada de vitória épica sobre o Examinador
 */
export function playBossVictoryFanfareAudio(enabled = true): void {
  if (!enabled) return;
  try {
    stopBossBattleMusic();
    if (!bossVictoryAudio) {
      bossVictoryAudio = new Audio('./audio/boss_victory_fanfare.mp3');
      bossVictoryAudio.volume = 0.35;
      bossVictoryAudio.onerror = () => {
        if (bossVictoryAudio && !bossVictoryAudio.src.includes('/assets/audio/')) {
          bossVictoryAudio.src = './assets/audio/boss_victory_fanfare.mp3';
          bossVictoryAudio.play().catch(() => {
            playBossDefeatedFanfare(enabled);
          });
        } else {
          playBossDefeatedFanfare(enabled);
        }
      };
    }
    bossVictoryAudio.currentTime = 0;
    const playPromise = bossVictoryAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback procedural se o arquivo mp3 for bloqueado
        playBossDefeatedFanfare(enabled);
      });
    }
  } catch (e) {
    playBossDefeatedFanfare(enabled);
  }
}

/**
 * 14. Golpe de corte de lâmina / tese axiomática (Web Audio API procedural)
 */
export function playSwordSlashSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.04);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);
    filter.Q.setValueAtTime(3.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.12);
  } catch (e) {
    console.warn('AudioContext swordSlash falhou:', e);
  }
}

/**
 * 15. Bloqueio e deflexão metálica do Escudo Mnemônico
 */
export function playShieldBlockSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(6.0, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {
    console.warn('AudioContext shieldBlock falhou:', e);
  }
}

/**
 * 16. Arpeggio cristalino do Oráculo de Foco (Revelação de fraqueza)
 */
export function playFocusOracleSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const freqs = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (e) {
    console.warn('AudioContext focusOracle falhou:', e);
  }
}

/**
 * 17. Rugido grave sub-harmônico do Boss ao sofrer golpe de tese
 */
export function playBossHitRoarSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(30, now + 0.35);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    console.warn('AudioContext bossHitRoar falhou:', e);
  }
}

/**
 * 18. Fanfarra heróica procedural de vitória épica (F4 -> Ab4 -> Bb4 -> C5)
 */
export function playBossDefeatedFanfare(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const chords = [349.23, 415.30, 466.16, 523.25]; // F4, Ab4, Bb4, C5
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.24, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  } catch (e) {
    console.warn('AudioContext bossDefeatedFanfare falhou:', e);
  }
}

/**
 * 19. Som de estilhaçamento de fase (escudo quebrando + transição no Gauntlet)
 */
export function playPhaseBreakSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    // Impacto metálico descendente
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.3);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);

    // Ruído branco estilhaçado
    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.03);
    noise.stop(now + 0.21);
  } catch (e) {
    console.warn('AudioContext phaseBreak falhou:', e);
  }
}

/**
 * 16. Som tático de abertura de Dossiê do Acervo Oficial (Chirp eletrônico + folheamento digital)
 */
export function playAcervoOpenSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    // 1. Chirp eletrônico de autenticação tática (440Hz -> 880Hz)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    oscGain.gain.setValueAtTime(0.01, now);
    oscGain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);

    // 2. Micro-ruído de papel digital / arquivo desbloqueado
    const bufferSize = Math.floor(ctx.sampleRate * 0.05);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.02);
    noise.stop(now + 0.07);
  } catch (e) {
    console.warn('AudioContext playAcervoOpenSound falhou:', e);
  }
}

/* ==========================================================================
   CONSTELAÇÃO NEURAL 3D // ENGENHARIA ACÚSTICA CÓSMICA
   ========================================================================== */

let constellationDroneAudio: HTMLAudioElement | null = null;

/**
 * Inicia a reprodução em loop contínuo do Drone de Foco Tático
 */
export function playConstellationDrone(volume = 0.35): void {
  try {
    if (!constellationDroneAudio) {
      constellationDroneAudio = new Audio('./assets/audio/tactical_focus_drone.mp3');
      constellationDroneAudio.loop = true;
    }
    constellationDroneAudio.volume = Math.max(0, Math.min(1, volume));
    const playPromise = constellationDroneAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Autoplay do drone bloqueado pelo navegador:', err);
      });
    }
  } catch (e) {
    console.warn('Falha ao iniciar constellation drone:', e);
  }
}

/**
 * Pausa suavemente o drone cósmico
 */
export function stopConstellationDrone(): void {
  try {
    if (constellationDroneAudio) {
      constellationDroneAudio.pause();
    }
  } catch (e) {
    console.warn('Falha ao pausar constellation drone:', e);
  }
}

/**
 * Ajusta o volume do drone cósmico em tempo real
 */
export function setConstellationDroneVolume(volume: number): void {
  if (constellationDroneAudio) {
    constellationDroneAudio.volume = Math.max(0, Math.min(1, volume));
  }
}

/**
 * Verifica se o drone cósmico está tocando
 */
export function isConstellationDronePlaying(): boolean {
  return constellationDroneAudio ? !constellationDroneAudio.paused : false;
}

/**
 * Chime etéreo de alta frequência ao passar o cursor sobre um nó estelar
 */
export function playConstellationHoverSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    // Frequência harmônica cristalina
    osc.frequency.setValueAtTime(1046.5, now); // C6
    osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.06); // E6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    console.warn('AudioContext playConstellationHoverSound falhou:', e);
  }
}

/**
 * Pulso de acoplamento estelar (onda de choque acústica grave com brilho agudo)
 */
export function playConstellationSelectSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    // Sub-grave de ancoragem gravitacional
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130, now);
    subOsc.frequency.exponentialRampToValueAtTime(65, now + 0.25);

    subGain.gain.setValueAtTime(0.18, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.25);

    // Chime agudo ressonante
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = 'triangle';
    chimeOsc.frequency.setValueAtTime(880, now);
    chimeOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

    chimeGain.gain.setValueAtTime(0.08, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chimeOsc.start(now);
    chimeOsc.stop(now + 0.2);
  } catch (e) {
    console.warn('AudioContext playConstellationSelectSound falhou:', e);
  }
}

/**
 * Som de salto no hiperespaço (Warp Speed) ao entrar em um card a partir da constelação
 */
export function playConstellationWarpSound(enabled = true): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {
    console.warn('AudioContext playConstellationWarpSound falhou:', e);
  }
}

