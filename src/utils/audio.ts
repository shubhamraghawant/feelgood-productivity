// Web Audio API Sound Synthesizer for Playful Micro-Interactions

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientSource: { stop: () => void } | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientSource) {
      this.stopAmbient();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft "bloop / water drop" sound
  public playWaterDrop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;

      // Frequency drop: 800Hz -> 300Hz quickly
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.12);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio context might be blocked prior to user interaction
    }
  }

  // Satisfying "pop / check" sound
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;

      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore
    }
  }

  // Cheerful complete / chime sound (Pastel Major Chord)
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      });
    } catch {
      // Ignore
    }
  }

  // Level Up / Big Highlight Complete Fanfare
  public playLevelUp() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const melody = [
        { f: 440, d: 0.1 },  // A4
        { f: 554.37, d: 0.1 }, // C#5
        { f: 659.25, d: 0.1 }, // E5
        { f: 880, d: 0.35 }    // A5
      ];
      let t = this.ctx.currentTime;

      melody.forEach(item => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.f, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + item.d + 0.05);

        t += item.d * 0.85;
      });
    } catch {
      // Ignore
    }
  }

  // Ambient sound generator (Lofi / Waves / Binaural)
  public playAmbient(type: 'binaural' | 'waves' | 'rain' | 'none') {
    this.stopAmbient();
    if (this.isMuted || type === 'none') return;

    try {
      this.initContext();
      if (!this.ctx) return;

      if (type === 'binaural') {
        // Binaural Gamma Waves: 200Hz Left, 240Hz Right (40Hz beat for deep focus)
        const merger = this.ctx.createChannelMerger(2);
        const oscL = this.ctx.createOscillator();
        const oscR = this.ctx.createOscillator();
        const masterGain = this.ctx.createGain();

        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(200, this.ctx.currentTime);

        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(240, this.ctx.currentTime);

        masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

        oscL.connect(merger, 0, 0);
        oscR.connect(merger, 0, 1);
        merger.connect(masterGain);
        masterGain.connect(this.ctx.destination);

        oscL.start();
        oscR.start();

        this.ambientSource = {
          stop: () => {
            try {
              oscL.stop();
              oscR.stop();
            } catch {
              // Ignore
            }
          }
        };
      } else if (type === 'waves' || type === 'rain') {
        // Synthesize soft filtered white/pink noise
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = type === 'waves' ? 'lowpass' : 'bandpass';
        filter.frequency.setValueAtTime(type === 'waves' ? 400 : 700, this.ctx.currentTime);

        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, this.ctx.currentTime);

        // Gentle modulation for waves
        if (type === 'waves') {
          const lfo = this.ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime); // 5 sec swell
          const lfoGain = this.ctx.createGain();
          lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);
          lfo.connect(filter.frequency);
          lfo.start();
        }

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        whiteNoise.start();

        this.ambientSource = {
          stop: () => {
            try {
              whiteNoise.stop();
            } catch {
              // Ignore
            }
          }
        };
      }
    } catch {
      // Ignore
    }
  }

  public stopAmbient() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch {
        // Ignore
      }
      this.ambientSource = null;
    }
  }
}

export const sound = new SoundManager();
