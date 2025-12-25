import { Config } from './core/Config.js';
import { Game } from './core/Game.js';

let game;

async function init() {
    const config = new Config();
    await config.load();

    const canvas = document.getElementById('game-canvas');
    game = new Game(canvas, config);
    await game.init();

    setupUI();

    console.log('✅ Game initialized');
    console.log('📋 Config loaded:', config.current);
    console.log('🎮 Game ready!');
}

function setupUI() {
    const startButton = document.getElementById('start-button');
    const playAgainButton = document.getElementById('play-again-button');
    const settingsButton = document.getElementById('settings-button');
    const closeSettingsButton = document.getElementById('close-settings');

    startButton.addEventListener('click', () => {
        game.start();
    });

    playAgainButton.addEventListener('click', () => {
        game.reset();
        game.screens.showStart();
    });

    settingsButton.addEventListener('click', () => {
        game.screens.showSettings();
    });

    closeSettingsButton.addEventListener('click', () => {
        game.screens.hideSettings();
    });
}

init().catch(err => {
    console.error('❌ Failed to initialize:', err);
});
