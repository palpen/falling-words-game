export class Screens {
    constructor() {
        this.startScreen = document.getElementById('start-screen');
        this.winScreen = document.getElementById('win-screen');
        this.settingsPanel = document.getElementById('settings-panel');
        this.finalScoreValue = document.getElementById('final-score-value');
    }

    showStart() {
        this.startScreen.classList.remove('hidden');
        this.winScreen.classList.add('hidden');
        this.settingsPanel.classList.add('hidden');
    }

    hideStart() {
        this.startScreen.classList.add('hidden');
    }

    showWin(score) {
        this.finalScoreValue.textContent = score;
        this.winScreen.classList.remove('hidden');
    }

    hideWin() {
        this.winScreen.classList.add('hidden');
    }

    showSettings() {
        this.settingsPanel.classList.remove('hidden');
    }

    hideSettings() {
        this.settingsPanel.classList.add('hidden');
    }

    hideAll() {
        this.startScreen.classList.add('hidden');
        this.winScreen.classList.add('hidden');
        this.settingsPanel.classList.add('hidden');
    }
}
