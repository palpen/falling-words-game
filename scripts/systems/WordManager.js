import { Word } from '../entities/Word.js';

export class WordManager {
    constructor(config, canvas) {
        this.config = config;
        this.canvas = canvas;
        this.allWords = [];
        this.wordsByDifficulty = { 1: [], 2: [], 3: [], 4: [], 5: [] };
        this.lastSpawnTime = 0;
    }

    async loadWords() {
        const response = await fetch('/data/words.txt');
        const text = await response.text();
        this.allWords = text.split('\n')
            .map(word => word.trim())
            .filter(word => word.length > 0 && !word.startsWith('#'));

        this.categorizeWords();
    }

    categorizeWords() {
        this.allWords.forEach(word => {
            const length = word.length;
            if (length <= 4) {
                this.wordsByDifficulty[1].push(word);
                this.wordsByDifficulty[2].push(word);
            } else if (length <= 5) {
                this.wordsByDifficulty[2].push(word);
                this.wordsByDifficulty[3].push(word);
            } else if (length <= 6) {
                this.wordsByDifficulty[3].push(word);
                this.wordsByDifficulty[4].push(word);
            } else if (length <= 7) {
                this.wordsByDifficulty[4].push(word);
                this.wordsByDifficulty[5].push(word);
            } else {
                this.wordsByDifficulty[5].push(word);
            }
        });
    }

    getRandomWord(difficulty) {
        const words = this.wordsByDifficulty[difficulty];
        if (!words || words.length === 0) {
            return this.allWords[Math.floor(Math.random() * this.allWords.length)];
        }
        return words[Math.floor(Math.random() * words.length)];
    }

    shouldSpawn(currentTime, difficulty, activeWordsCount) {
        const difficultyConfig = this.config.get(`difficulty.${difficulty}`);
        const spawnDelay = difficultyConfig.spawnDelay;
        const maxWords = difficultyConfig.maxWords;

        return (currentTime - this.lastSpawnTime >= spawnDelay) &&
               (activeWordsCount < maxWords);
    }

    spawnWord(difficulty, currentTime) {
        const word = this.getRandomWord(difficulty);
        const difficultyConfig = this.config.get(`difficulty.${difficulty}`);
        const baseSpeed = this.config.get('gameplay.baseSpeed');

        const speed = difficultyConfig.speed * baseSpeed;
        const x = Math.random() * (this.canvas.width - 200) + 100;

        this.lastSpawnTime = currentTime;

        return new Word(word, x, speed, difficulty);
    }

    update(words, difficulty, currentTime) {
        const activeWordsCount = words.filter(w => w.isActive).length;

        if (this.shouldSpawn(currentTime, difficulty, activeWordsCount)) {
            const newWord = this.spawnWord(difficulty, currentTime);
            words.push(newWord);
        }
    }
}
