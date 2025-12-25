import { GameState } from './GameState.js';
import { Renderer } from '../systems/Renderer.js';
import { WordManager } from '../systems/WordManager.js';
import { InputHandler } from '../systems/InputHandler.js';
import { Particles } from '../systems/Particles.js';
import { Audio } from '../systems/Audio.js';
import { HUD } from '../ui/HUD.js';
import { Screens } from '../ui/Screens.js';
import { SettingsPanel } from '../ui/SettingsPanel.js';

export class Game {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;
        this.state = new GameState(config);
        this.renderer = new Renderer(canvas, config);
        this.wordManager = new WordManager(config, canvas);
        this.inputHandler = new InputHandler();
        this.particles = new Particles();
        this.audio = new Audio(config);
        this.hud = new HUD();
        this.screens = new Screens();
        this.settingsPanel = new SettingsPanel(config);

        this.lastTime = 0;
        this.running = false;
        this.words = [];
        this.initialized = false;

        this.setupInputHandlers();
    }

    async init() {
        await this.wordManager.loadWords();
        this.inputHandler.init();
        this.audio.init();
        this.settingsPanel.init(this.audio);
        this.initialized = true;
    }

    setupInputHandlers() {
        this.inputHandler.onWordComplete = (word) => {
            word.isActive = false;
            this.state.completeWord();
            this.hud.update(this.state);
            this.particles.createExplosion(word.x, word.y, '#00FF00');
            this.audio.playSuccess();
        };

        this.inputHandler.onInputChange = (input) => {
            document.getElementById('typed-text').textContent = input;
        };
    }

    start() {
        this.state.reset();
        this.state.phase = 'playing';
        this.running = true;
        this.lastTime = performance.now();
        this.screens.hideAll();
        this.hud.update(this.state);
        this.audio.startAmbientMusic();
        this.gameLoop(this.lastTime);
    }

    stop() {
        this.running = false;
    }

    pause() {
        this.state.phase = 'paused';
        this.running = false;
    }

    resume() {
        this.state.phase = 'playing';
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    reset() {
        this.state.reset();
        this.words = [];
        this.particles.particles = [];
        this.audio.stopAmbientMusic();
        this.hud.reset();
        this.stop();
    }

    gameLoop(currentTime) {
        if (!this.running) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render(currentTime);

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        if (this.state.phase !== 'playing') return;

        this.wordManager.update(
            this.words,
            this.state.currentDifficulty,
            performance.now()
        );

        this.inputHandler.update(this.words);

        this.words.forEach(word => {
            word.update(deltaTime);

            if (word.y > this.canvas.height - 100) {
                word.isActive = false;
                if (!word.isComplete) {
                    this.state.missWord();
                    this.particles.createCrash(word.x, this.canvas.height - 100);
                    this.audio.playCrash();
                }
            }
        });

        this.words = this.words.filter(word => word.isActive);
        this.particles.update(deltaTime);

        if (this.state.hasWon) {
            this.state.phase = 'won';
            this.stop();
            this.showWinScreen();
        }
    }

    showWinScreen() {
        this.screens.showWin(this.state.score);
        this.audio.stopAmbientMusic();
        this.audio.playWin();
    }

    render(time) {
        this.renderer.render(this.words, time);
        this.particles.render(this.renderer.ctx);
    }
}
