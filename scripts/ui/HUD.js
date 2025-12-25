export class HUD {
    constructor() {
        this.scoreElement = document.getElementById('score');
        this.wordsCompletedElement = document.getElementById('words-completed');
        this.targetWordsElement = document.getElementById('target-words');
        this.progressFillElement = document.getElementById('progress-fill');
    }

    update(gameState) {
        this.scoreElement.textContent = gameState.score;
        this.wordsCompletedElement.textContent = gameState.wordsCompleted;
        this.targetWordsElement.textContent = gameState.targetWords;

        const progress = (gameState.wordsCompleted / gameState.targetWords) * 100;
        this.progressFillElement.style.width = `${progress}%`;
    }

    reset() {
        this.scoreElement.textContent = '0';
        this.wordsCompletedElement.textContent = '0';
        this.progressFillElement.style.width = '0%';
    }
}
