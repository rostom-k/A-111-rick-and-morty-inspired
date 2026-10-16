// Web Audio API Synthesizer with 6 Contextual Music Themes & Minecraft-style Ambient Cooldowns

export type MusicTheme =
  | 'chinese_calm'        // Moment calme (Asian / Chinese meditative pentatonic flute & guzheng)
  | 'woodland_adventure'  // Moment heureux aventure (Warm upbeat pastoral acoustic adventure chords)
  | 'deep_silence'        // Moment trop calme (Deep sub-drone, eerie stillness, subtle breathing void)
  | 'stalking_shadow'     // Le mystère (Suspenseful chromatic arpeggio, detective clockwork pulse)
  | 'desolate_pulse'      // La peur et l'aventure (Dark rhythmic synth pulse, survival horror dread)
  | 'the_ominous'         // Les combat trop désavantageux (Dissonant heavy drone stabs, crisis alarms)
  | 'none';

class TerminalAudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  
  // Ambient white noise / room tone node
  private whiteNoiseNode: AudioNode | null = null;
  private whiteNoiseGain: GainNode | null = null;

  // Active music tracking
  private activeMusicNodes: Array<{ stop: () => void }> = [];
  private currentTrack: MusicTheme = 'none';
  private trackPlaying: boolean = false;
  private musicMasterGain: GainNode | null = null;

  // Minecraft-style silence cooldown timer
  private nextMusicEligibleTime: number = 0;
  private currentContextMood: MusicTheme = 'chinese_calm';

  constructor() {
    // Lazy initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopCurrentMusic();
      this.stopWhiteNoise();
    } else {
      this.startWhiteNoise();
    }
  }

  // --- Retro Sound Effects ---

  public playKeyClick() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550 + Math.random() * 250, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {}
  }

  public playEnterBeep() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1760, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {}
  }

  public playWarningBeep() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }

  public playItemPickup() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      osc.frequency.setValueAtTime(783.99, now + 0.12);
      osc.frequency.setValueAtTime(1046.50, now + 0.18);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.3);
    } catch {}
  }

  public playCrtBoot() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(15734, now + 0.4);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.5);
    } catch {}
  }

  public playTimerTick() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.045);
    } catch {}
  }

  public playAlarmAlert() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.15);
      osc.frequency.linearRampToValueAtTime(440, now + 0.3);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.45);
    } catch {}
  }

  // --- Biome & Atmospheric Sound Effects ---

  // 1. City / Street Outside Ambiance (Cars passing, distant footsteps, urban wind)
  public playCityOutsideAmbience() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Passing car engine / road rumble (Filtered noise with Doppler sweep)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(140, now);
      bandpass.frequency.linearRampToValueAtTime(280, now + 0.8);
      bandpass.frequency.linearRampToValueAtTime(110, now + 1.8);
      bandpass.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 2.0);

      // Distant pavement footsteps
      for (let s = 0; s < 3; s++) {
        const stepTime = now + 0.4 + s * 0.45;
        const stepOsc = this.ctx.createOscillator();
        const stepGain = this.ctx.createGain();
        stepOsc.type = 'triangle';
        stepOsc.frequency.setValueAtTime(90 + Math.random() * 30, stepTime);
        stepGain.gain.setValueAtTime(0.04, stepTime);
        stepGain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.06);

        stepOsc.connect(stepGain);
        stepGain.connect(this.ctx.destination);
        stepOsc.start(stepTime);
        stepOsc.stop(stepTime + 0.07);
      }
    } catch {}
  }

  // 2. Viscous Mutant Steps / Squelchy Slime (Post-apocalyptic mutant footsteps)
  public playViscousMutantSteps() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Double wet squelch step
      for (let step = 0; step < 2; step++) {
        const t = now + step * 0.35;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        // Downward pitch bend with gooey wet snap
        osc.frequency.setValueAtTime(320 + Math.random() * 60, t);
        osc.frequency.exponentialRampToValueAtTime(75, t + 0.12);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(150, t + 0.14);
        filter.Q.setValueAtTime(6, t); // High resonance for wet slime texture

        gain.gain.setValueAtTime(0.07, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.2);
      }
    } catch {}
  }

  // 3. Subterranean Water Drip (Dungeon cavern droplet)
  public playWaterDrip() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);
      osc.frequency.exponentialRampToValueAtTime(1900 + Math.random() * 300, now + 0.03);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {}
  }

  // 4. Chains Rattling in the Dark (Dungeon iron chains)
  public playChainRattle() {
    if (!this.isEnabled) return;
    this.initContext();
    const ctx = this.ctx;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [840, 1180, 1540];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.05;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.16);
      });
    } catch {}
  }

  // 5. Digital Glitch / Data Pulse (Cyberpunk Neuro-Mind)
  public playDigitalGlitch() {
    if (!this.isEnabled) return;
    this.initContext();
    const ctx = this.ctx;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [2200, 3100, 1750, 4200];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.035;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.035, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.045);
      });
    } catch {}
  }

  // 6. Airlock Hiss / Oxygen Steam (Astra-7 Space exploration)
  public playAirlockHiss() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1600, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.75);
    } catch {}
  }

  // 7. Minecraft-Style Spooky Cave Sound Effect ("Cave Noise")
  public playMinecraftCaveNoise() {
    if (!this.isEnabled) return;
    this.initContext();
    const ctx = this.ctx;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const variant = Math.floor(Math.random() * 4);

      if (variant === 0) {
        // Variant 0: Haunting pitch-bent train whistle in an abandoned mine shaft
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(260, now + 1.5);
        osc.frequency.exponentialRampToValueAtTime(140, now + 3.2);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 3.6);
      } else if (variant === 1) {
        // Variant 1: Dissonant Tritone Drone (Devil's interval chord stab echoing in the cavern)
        const freqs = [130.81, 185.00, 261.63]; // C3, F#3, C4
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, now);
          filter.frequency.exponentialRampToValueAtTime(120, now + 3.0);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 3.3);
        });
      } else if (variant === 2) {
        // Variant 2: Deep Sub-Bass Cavern Rumbling
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(45, now);
        sub.frequency.linearRampToValueAtTime(65, now + 1.2);
        sub.frequency.exponentialRampToValueAtTime(35, now + 3.0);

        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.linearRampToValueAtTime(0.18, now + 0.6);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

        sub.connect(subGain);
        subGain.connect(ctx.destination);
        sub.start(now);
        sub.stop(now + 3.3);
      } else {
        // Variant 3: Metallic Ghost Echo / Cavern Gong
        const freqs = [280, 415, 620, 890];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.06, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + 3.0);
        });
      }
    } catch {}
  }

  // 8. Triumphant Arcade Victory Fanfare ("GG TU AS RÉUSSI !")
  public playVictoryFanfare() {
    if (!this.isEnabled) return;
    this.initContext();
    const ctx = this.ctx;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Arpeggiated triumphant arcade fanfare: C5 -> E5 -> G5 -> C6 -> High Sustained Chord
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.15 },
        { freq: 659.25, time: 0.14, dur: 0.15 },
        { freq: 783.99, time: 0.28, dur: 0.15 },
        { freq: 1046.5, time: 0.42, dur: 0.45 },
        { freq: 1318.5, time: 0.85, dur: 0.9 }, // High E6 triumph
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.18, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });
    } catch {}
  }

  // --- Subtle White Noise & CRT Room Tone (Plays during Minecraft-style silence gaps) ---

  public startWhiteNoise() {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.ctx || this.whiteNoiseNode) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Warm filtered pink/white noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.0766320;
        b2 = 0.57000 * b2 + white * 0.4368000;
        data[i] = (b0 + b1 + b2) * 0.05;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Lowpass filter for warm background room tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      this.whiteNoiseGain = this.ctx.createGain();
      // Very soft, non-intrusive ambient bed
      this.whiteNoiseGain.gain.setValueAtTime(0.012, this.ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(this.whiteNoiseGain);
      this.whiteNoiseGain.connect(this.ctx.destination);

      noiseSource.start();
      this.whiteNoiseNode = noiseSource;
    } catch {}
  }

  public stopWhiteNoise() {
    if (this.whiteNoiseNode) {
      try {
        (this.whiteNoiseNode as AudioBufferSourceNode).stop();
        this.whiteNoiseNode.disconnect();
      } catch {}
      this.whiteNoiseNode = null;
    }
    if (this.whiteNoiseGain) {
      try {
        this.whiteNoiseGain.disconnect();
      } catch {}
      this.whiteNoiseGain = null;
    }
  }

  // --- Minecraft-Style Dynamic Music Manager ---
  // Music does NOT loop continuously. It plays once, then stays silent with ambient noise
  // for a cooldown period (minutes), then respawns based on current events and biome!

  public notifyContextEvent(theme: MusicTheme, forceImmediate: boolean = false) {
    this.currentContextMood = theme;
    if (!this.isEnabled) return;
    this.initContext();

    // Ensure subtle room tone is running
    if (!this.whiteNoiseNode) {
      this.startWhiteNoise();
    }

    const now = Date.now();
    // If a track is already playing
    if (this.trackPlaying) {
      // If critical danger ('the_ominous') happens, interrupt immediately
      if (theme === 'the_ominous' && this.currentTrack !== 'the_ominous') {
        this.stopCurrentMusic();
        this.playThemeTrack(theme);
      }
      return;
    }

    // Check if cooldown has passed or if forced by dramatic event (critical fumble / peril / victory)
    if (forceImmediate || now >= this.nextMusicEligibleTime) {
      this.playThemeTrack(theme);
    }
  }

  public getCurrentPlayingTheme(): MusicTheme {
    return this.trackPlaying ? this.currentTrack : 'none';
  }

  public stopCurrentMusic() {
    for (const node of this.activeMusicNodes) {
      try {
        node.stop();
      } catch {}
    }
    this.activeMusicNodes = [];
    this.trackPlaying = false;
    this.currentTrack = 'none';
  }

  private playThemeTrack(theme: MusicTheme) {
    this.stopCurrentMusic();
    if (!this.ctx || !this.isEnabled) return;

    this.currentTrack = theme;
    this.trackPlaying = true;

    // Master gain for smooth music fade in & out
    this.musicMasterGain = this.ctx.createGain();
    const startTime = this.ctx.currentTime;
    this.musicMasterGain.gain.setValueAtTime(0.001, startTime);
    this.musicMasterGain.gain.linearRampToValueAtTime(0.09, startTime + 2.5); // Fade in over 2.5s
    this.musicMasterGain.connect(this.ctx.destination);

    // Schedule the selected musical theme
    let trackDurationSeconds = 40;

    switch (theme) {
      case 'chinese_calm':
        trackDurationSeconds = this.synthChineseCalm(startTime);
        break;
      case 'woodland_adventure':
        trackDurationSeconds = this.synthWoodlandAdventure(startTime);
        break;
      case 'deep_silence':
        trackDurationSeconds = this.synthDeepSilence(startTime);
        break;
      case 'stalking_shadow':
        trackDurationSeconds = this.synthStalkingShadow(startTime);
        break;
      case 'desolate_pulse':
        trackDurationSeconds = this.synthDesolatePulse(startTime);
        break;
      case 'the_ominous':
        trackDurationSeconds = this.synthTheOminous(startTime);
        break;
      default:
        trackDurationSeconds = 30;
    }

    // Fade out smoothly at the end
    const fadeOutStart = startTime + trackDurationSeconds - 3.5;
    if (fadeOutStart > startTime) {
      this.musicMasterGain.gain.setValueAtTime(0.09, fadeOutStart);
      this.musicMasterGain.gain.linearRampToValueAtTime(0.001, startTime + trackDurationSeconds);
    }

    // After music finishes: Enter Minecraft-style white noise silence period (1.5 to 3 minutes)
    setTimeout(() => {
      this.stopCurrentMusic();
      // Set cooldown: 90 to 180 seconds of pure atmospheric room tone / white noise
      const silenceDurationMs = (90 + Math.random() * 90) * 1000;
      this.nextMusicEligibleTime = Date.now() + silenceDurationMs;
    }, trackDurationSeconds * 1000);
  }

  // 1. Chinese Calm ("moment calme"): Pentatonic guzheng plucks & tranquil bamboo flute melodies
  private synthChineseCalm(startTime: number): number {
    if (!this.ctx || !this.musicMasterGain) return 35;
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C D E G A C D E
    const pattern = [0, 2, 4, 3, 1, 3, 5, 4, 2, 0, 1, 3, 2, 0];

    let t = startTime;
    for (let loop = 0; loop < 2; loop++) {
      for (const noteIdx of pattern) {
        const freq = pentatonic[noteIdx % pentatonic.length];
        
        // Guzheng plucked note (triangle + sharp decay)
        const pluck = this.ctx.createOscillator();
        const pluckGain = this.ctx.createGain();
        pluck.type = 'triangle';
        pluck.frequency.setValueAtTime(freq, t);
        pluckGain.gain.setValueAtTime(0.4, t);
        pluckGain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

        pluck.connect(pluckGain);
        pluckGain.connect(this.musicMasterGain);
        pluck.start(t);
        pluck.stop(t + 1.3);
        this.activeMusicNodes.push(pluck);

        // Soft flute breath octave
        if (noteIdx % 2 === 0) {
          const flute = this.ctx.createOscillator();
          const fluteGain = this.ctx.createGain();
          flute.type = 'sine';
          flute.frequency.setValueAtTime(freq * 0.5, t);
          fluteGain.gain.setValueAtTime(0.001, t);
          fluteGain.gain.linearRampToValueAtTime(0.18, t + 0.3);
          fluteGain.gain.linearRampToValueAtTime(0.001, t + 1.4);

          flute.connect(fluteGain);
          fluteGain.connect(this.musicMasterGain);
          flute.start(t);
          flute.stop(t + 1.5);
          this.activeMusicNodes.push(flute);
        }

        t += 1.4;
      }
      t += 1.0;
    }
    return t - startTime;
  }

  // 2. Woodland Adventure ("moment heureux aventure"): Bright acoustic folk chords, pastoral upbeat warmth
  private synthWoodlandAdventure(startTime: number): number {
    if (!this.ctx || !this.musicMasterGain) return 36;
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C maj
      [220.00, 261.63, 329.63, 440.00], // A min
      [174.61, 220.00, 261.63, 349.23], // F maj
      [196.00, 246.94, 293.66, 392.00], // G maj
    ];

    let t = startTime;
    for (let rep = 0; rep < 2; rep++) {
      for (const chord of chords) {
        // Arpeggiated cheerful wood notes
        for (let i = 0; i < chord.length; i++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(chord[i], t + i * 0.32);
          gain.gain.setValueAtTime(0.28, t + i * 0.32);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.32 + 1.0);

          osc.connect(gain);
          gain.connect(this.musicMasterGain);
          osc.start(t + i * 0.32);
          osc.stop(t + i * 0.32 + 1.1);
          this.activeMusicNodes.push(osc);
        }

        // Bass root anchor
        const bass = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bass.type = 'triangle';
        bass.frequency.setValueAtTime(chord[0] * 0.5, t);
        bassGain.gain.setValueAtTime(0.2, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 2.2);

        bass.connect(bassGain);
        bassGain.connect(this.musicMasterGain);
        bass.start(t);
        bass.stop(t + 2.3);
        this.activeMusicNodes.push(bass);

        t += 2.4;
      }
    }
    return t - startTime;
  }

  // 3. Deep Silence ("moment trop calme"): Eerie sub-bass drone and isolated breath resonance
  private synthDeepSilence(startTime: number): number {
    if (!this.ctx || !this.musicMasterGain) return 30;
    const dur = 32;

    // Sub-bass drone (48Hz)
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(48, startTime);
    subGain.gain.setValueAtTime(0.4, startTime);
    sub.connect(subGain);
    subGain.connect(this.musicMasterGain);
    sub.start(startTime);
    sub.stop(startTime + dur);
    this.activeMusicNodes.push(sub);

    // Occasional cold distant harmonic chime
    const chimes = [72, 108, 144, 216];
    for (let i = 0; i < 4; i++) {
      const chimeTime = startTime + 3 + i * 7.5;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(chimes[i], chimeTime);
      gain.gain.setValueAtTime(0.12, chimeTime);
      gain.gain.exponentialRampToValueAtTime(0.001, chimeTime + 4.5);

      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(chimeTime);
      osc.stop(chimeTime + 5.0);
      this.activeMusicNodes.push(osc);
    }

    return dur;
  }

  // 4. The Stalking Shadow ("le mystère"): Creeping chromatic detective arpeggio & stealth pulse
  private synthStalkingShadow(startTime: number): number {
    if (!this.ctx || !this.musicMasterGain) return 34;
    const mysteryNotes = [130.81, 138.59, 146.83, 138.59, 164.81, 155.56, 130.81]; // C C# D C# E Eb C
    let t = startTime;

    for (let loop = 0; loop < 4; loop++) {
      for (const freq of mysteryNotes) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        // Lowpass filtered for dark muffled shadow feel
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, t);

        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicMasterGain);

        osc.start(t);
        osc.stop(t + 0.9);
        this.activeMusicNodes.push(osc);

        t += 0.9;
      }
      t += 0.5;
    }
    return t - startTime;
  }

  // 5. Desolate Pulse ("la peur et l'aventure"): Steady dark rhythmic heartbeat synth pulse
  private synthDesolatePulse(startTime: number): number {
    if (!this.ctx || !this.musicMasterGain) return 32;
    const bpm = 84;
    const beatInterval = 60 / bpm;
    const totalBeats = 36;

    for (let b = 0; b < totalBeats; b++) {
      const beatTime = startTime + b * beatInterval;
      
      // Heartbeat pulse bass
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, beatTime);
      osc.frequency.exponentialRampToValueAtTime(32, beatTime + 0.25);

      gain.gain.setValueAtTime(0.35, beatTime);
      gain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.35);

      osc.connect(gain);
      gain.connect(this.musicMasterGain);
      osc.start(beatTime);
      osc.stop(beatTime + 0.4);
      this.activeMusicNodes.push(osc);

      // Desolate drone layer every 4 beats
      if (b % 4 === 0) {
        const drone = this.ctx.createOscillator();
        const dGain = this.ctx.createGain();
        drone.type = 'sawtooth';

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, beatTime);

        drone.frequency.setValueAtTime(110, beatTime);
        dGain.gain.setValueAtTime(0.12, beatTime);
        dGain.gain.exponentialRampToValueAtTime(0.001, beatTime + beatInterval * 3.5);

        drone.connect(filter);
        filter.connect(dGain);
        dGain.connect(this.musicMasterGain);
        drone.start(beatTime);
        drone.stop(beatTime + beatInterval * 3.6);
        this.activeMusicNodes.push(drone);
      }
    }

    return totalBeats * beatInterval;
  }

  // 6. The Ominous ("les combat trop désavantageux"): Severe dissonance, brass-like dread stabs, critical peril
  private synthTheOminous(startTime: number): number {
    if (!this.ctx || !this.musicMasterGain) return 26;
    const dur = 28;

    // Tritone discord (Devil's interval) : C & F#
    const discordFreqs = [65.41, 92.50, 130.81, 185.00];

    for (let rep = 0; rep < 3; rep++) {
      const stabTime = startTime + rep * 8.5;

      for (const freq of discordFreqs) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, stabTime);
        filter.frequency.linearRampToValueAtTime(180, stabTime + 4.0);

        osc.frequency.setValueAtTime(freq, stabTime);
        gain.gain.setValueAtTime(0.35, stabTime);
        gain.gain.exponentialRampToValueAtTime(0.001, stabTime + 6.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicMasterGain);

        osc.start(stabTime);
        osc.stop(stabTime + 6.2);
        this.activeMusicNodes.push(osc);
      }
    }

    return dur;
  }

  // Fallback legacy support
  public setAmbience(type: string) {
    if (!this.isEnabled) return;
    this.startWhiteNoise();
    // Map legacy biome strings to the new 6 Minecraft-style music themes
    if (type.includes('water') || type.includes('calm') || type.includes('rest')) {
      this.notifyContextEvent('chinese_calm');
    } else if (type.includes('woodland') || type.includes('forest') || type.includes('happy')) {
      this.notifyContextEvent('woodland_adventure');
    } else if (type.includes('silence') || type.includes('quiet') || type.includes('vacuum')) {
      this.notifyContextEvent('deep_silence');
    } else if (type.includes('mystery') || type.includes('shadow') || type.includes('echo')) {
      this.notifyContextEvent('stalking_shadow');
    } else if (type.includes('pulse') || type.includes('spore') || type.includes('alien')) {
      this.notifyContextEvent('desolate_pulse');
    } else if (type.includes('ominous') || type.includes('danger') || type.includes('combat')) {
      this.notifyContextEvent('the_ominous');
    }
  }

  public stopAmbience() {
    this.stopCurrentMusic();
    this.stopWhiteNoise();
  }
}

export const terminalAudio = new TerminalAudioManager();
