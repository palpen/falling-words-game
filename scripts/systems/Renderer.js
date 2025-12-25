export class Renderer {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.config = config;
        this.stars = [];
        this.initCanvas();
        this.initStars();
    }

    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.initStars();
        });
    }

    initStars() {
        this.stars = [];
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                brightness: Math.random() * 0.5 + 0.5,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#000428');
        gradient.addColorStop(1, '#004e92');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars(time) {
        this.stars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkle})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }

    drawEarth() {
        const earthHeight = 100;
        const y = this.canvas.height - earthHeight;

        const gradient = this.ctx.createLinearGradient(0, y, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a472a');
        gradient.addColorStop(0.3, '#2d5016');
        gradient.addColorStop(1, '#0f380f');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, y, this.canvas.width, earthHeight);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            this.ctx.arc(
                Math.random() * this.canvas.width,
                y + Math.random() * 30,
                Math.random() * 20 + 10,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }

        this.ctx.font = '24px Comic Sans MS';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🌍 EARTH 🌍', this.canvas.width / 2, this.canvas.height - 40);
    }

    drawWord(word) {
        const fontSize = this.config.get('display.fontSize');
        this.ctx.font = `bold ${fontSize}px ${this.config.get('display.fontFamily')}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 3;

        if (word.typed.length > 0) {
            this.ctx.fillStyle = this.config.get('display.typedColor');
            this.ctx.fillText(word.typed, word.x, word.y);

            const typedWidth = this.ctx.measureText(word.typed).width;
            this.ctx.fillStyle = this.config.get('display.untypedColor');
            this.ctx.fillText(word.remaining, word.x + typedWidth / 2, word.y);
        } else {
            this.ctx.fillStyle = this.config.get('display.untypedColor');
            this.ctx.fillText(word.text, word.x, word.y);
        }

        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }

    drawWords(words) {
        words.forEach(word => {
            if (word.isActive) {
                this.drawWord(word);
            }
        });
    }

    render(words, time) {
        this.clear();
        this.drawBackground();
        this.drawStars(time);
        this.drawEarth();
        this.drawWords(words);
    }
}
