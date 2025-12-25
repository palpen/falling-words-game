export class Particle {
    constructor(x, y, color, velocity, size, lifetime) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = velocity.x;
        this.vy = velocity.y;
        this.size = size;
        this.lifetime = lifetime;
        this.age = 0;
        this.isActive = true;
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
        this.vy += 0.2;
        this.age += deltaTime;

        if (this.age >= this.lifetime) {
            this.isActive = false;
        }
    }

    get opacity() {
        return Math.max(0, 1 - (this.age / this.lifetime));
    }
}
