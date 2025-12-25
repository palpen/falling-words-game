export class GameState {
    constructor(config) {
        this.config = config;
        this.reset();
    }

    reset() {
        this.phase = 'menu';
        this.score = 0;
        this.wordsCompleted = 0;
        this.wordsMissed = 0;
        this.targetWords = this.config.get('gameplay.targetWords');
        this.currentDifficulty = 2;
        this.comboCount = 0;
    }

    get progress() {
        return this.wordsCompleted / this.targetWords;
    }

    get hasWon() {
        return this.wordsCompleted >= this.targetWords;
    }

    getDifficultyForProgress() {
        const progress = this.progress;
        if (progress < 0.2) return 1;
        if (progress < 0.4) return 2;
        if (progress < 0.6) return 3;
        if (progress < 0.8) return 4;
        return 5;
    }

    addScore(points) {
        this.score += points;
        this.comboCount++;
    }

    resetCombo() {
        this.comboCount = 0;
    }

    completeWord() {
        this.wordsCompleted++;
        const basePoints = 10;
        const comboBonus = this.comboCount * 5;
        this.addScore(basePoints + comboBonus);

        this.currentDifficulty = this.getDifficultyForProgress();
    }

    missWord() {
        this.wordsMissed++;
        this.resetCombo();
    }
}
