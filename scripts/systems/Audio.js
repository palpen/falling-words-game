export class Audio {
    constructor(config) {
        this.config = config;
        this.context = null;
        this.enabled = true;
        this.volume = 0.7;
        this.musicOscillator = null;
        this.musicGain = null;
    }

    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = this.config.get('audio.enabled');
            this.volume = this.config.get('audio.volume');
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    playSuccess() {
        if (!this.enabled || !this.context) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.setValueAtTime(523.25, now);
        oscillator.frequency.setValueAtTime(659.25, now + 0.1);
        oscillator.frequency.setValueAtTime(783.99, now + 0.2);

        gainNode.gain.setValueAtTime(this.volume * 0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.type = 'sine';
        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    playCrash() {
        if (!this.enabled || !this.context) return;

        const now = this.context.currentTime;
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.setValueAtTime(100, now);
        oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.2);

        gainNode.gain.setValueAtTime(this.volume * 0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        oscillator.type = 'sawtooth';
        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    playWin() {
        if (!this.enabled || !this.context) return;

        const now = this.context.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];

        notes.forEach((freq, i) => {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);

            const startTime = now + (i * 0.15);
            oscillator.frequency.setValueAtTime(freq, startTime);

            gainNode.gain.setValueAtTime(this.volume * 0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            oscillator.type = 'sine';
            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
        });
    }

    startAmbientMusic() {
        if (!this.enabled || !this.context || this.musicOscillator) return;

        this.musicOscillator = this.context.createOscillator();
        this.musicGain = this.context.createGain();

        this.musicOscillator.connect(this.musicGain);
        this.musicGain.connect(this.context.destination);

        this.musicOscillator.frequency.setValueAtTime(220, this.context.currentTime);
        this.musicGain.gain.setValueAtTime(this.volume * 0.05, this.context.currentTime);

        this.musicOscillator.type = 'sine';
        this.musicOscillator.start();

        this.modulateMusic();
    }

    modulateMusic() {
        if (!this.musicOscillator) return;

        const notes = [220, 246.94, 261.63, 293.66];
        const randomNote = notes[Math.floor(Math.random() * notes.length)];

        this.musicOscillator.frequency.setTargetAtTime(
            randomNote,
            this.context.currentTime,
            1.0
        );

        setTimeout(() => this.modulateMusic(), 2000 + Math.random() * 2000);
    }

    stopAmbientMusic() {
        if (this.musicOscillator) {
            this.musicOscillator.stop();
            this.musicOscillator = null;
            this.musicGain = null;
        }
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.stopAmbientMusic();
        }
    }
}
