import { Particle } from '../entities/Particle.js';

export class Particles {
    constructor() {
        this.particles = [];
    }

    createExplosion(x, y, color = '#FFD700') {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 3 + 2;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed - 2
            };
            const size = Math.random() * 4 + 2;
            const lifetime = Math.random() * 0.5 + 0.5;

            this.particles.push(new Particle(x, y, color, velocity, size, lifetime));
        }
    }

    createCelebration(x, y) {
        const particleCount = 30;
        const colors = ['#FFD700', '#00FF00', '#FF69B4', '#00FFFF', '#FF4500'];

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed - 3
            };
            const size = Math.random() * 6 + 3;
            const lifetime = Math.random() * 0.8 + 0.6;
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push(new Particle(x, y, color, velocity, size, lifetime));
        }
    }

    createCrash(x, y) {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI - Math.PI / 2;
            const speed = Math.random() * 2 + 1;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            const size = Math.random() * 3 + 1;
            const lifetime = Math.random() * 0.4 + 0.3;

            this.particles.push(new Particle(x, y, '#888888', velocity, size, lifetime));
        }
    }

    update(deltaTime) {
        this.particles.forEach(particle => particle.update(deltaTime));
        this.particles = this.particles.filter(p => p.isActive);
    }

    render(ctx) {
        this.particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fillRect(
                particle.x - particle.size / 2,
                particle.y - particle.size / 2,
                particle.size,
                particle.size
            );
        });
        ctx.globalAlpha = 1.0;
    }
}
