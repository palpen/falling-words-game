export class SettingsPanel {
    constructor(config) {
        this.config = config;
        this.fallSpeedSlider = document.getElementById('fall-speed');
        this.fallSpeedValue = document.getElementById('fall-speed-value');
        this.targetWordsMinus = document.getElementById('target-words-minus');
        this.targetWordsPlus = document.getElementById('target-words-plus');
        this.targetWordsValue = document.getElementById('target-words-value');
        this.difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
        this.soundToggle = document.getElementById('sound-toggle');
        this.resetButton = document.getElementById('reset-defaults');
    }

    init(audio) {
        this.audio = audio;
        this.loadSettings();
        this.setupEventListeners();
    }

    loadSettings() {
        const baseSpeed = this.config.get('gameplay.baseSpeed');
        this.fallSpeedSlider.value = baseSpeed;
        this.fallSpeedValue.textContent = `${baseSpeed.toFixed(1)}x`;

        const targetWords = this.config.get('gameplay.targetWords');
        this.targetWordsValue.textContent = targetWords;

        const soundEnabled = this.config.get('audio.enabled');
        this.updateSoundToggle(soundEnabled);
    }

    setupEventListeners() {
        this.fallSpeedSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.fallSpeedValue.textContent = `${value.toFixed(1)}x`;
            this.config.set('gameplay.baseSpeed', value);
        });

        this.targetWordsMinus.addEventListener('click', () => {
            let current = parseInt(this.targetWordsValue.textContent);
            if (current > 1) {
                current--;
                this.targetWordsValue.textContent = current;
                this.config.set('gameplay.targetWords', current);
            }
        });

        this.targetWordsPlus.addEventListener('click', () => {
            let current = parseInt(this.targetWordsValue.textContent);
            if (current < 50) {
                current++;
                this.targetWordsValue.textContent = current;
                this.config.set('gameplay.targetWords', current);
            }
        });

        this.difficultyRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const difficulty = parseInt(e.target.value);
                console.log('Starting difficulty changed to:', difficulty);
            });
        });

        this.soundToggle.addEventListener('click', () => {
            const currentEnabled = this.config.get('audio.enabled');
            const newEnabled = !currentEnabled;
            this.config.set('audio.enabled', newEnabled);
            this.audio.setEnabled(newEnabled);
            this.updateSoundToggle(newEnabled);
        });

        this.resetButton.addEventListener('click', () => {
            this.config.reset();
            this.loadSettings();
            this.audio.setEnabled(true);
        });
    }

    updateSoundToggle(enabled) {
        if (enabled) {
            this.soundToggle.textContent = 'ON';
            this.soundToggle.className = 'toggle-on';
        } else {
            this.soundToggle.textContent = 'OFF';
            this.soundToggle.className = 'toggle-off';
        }
    }
}
