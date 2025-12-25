export class Word {
    constructor(text, x, speed, difficulty) {
        this.text = text.toLowerCase();
        this.x = x;
        this.y = 0;
        this.speed = speed;
        this.difficulty = difficulty;
        this.typed = "";
        this.isActive = true;
        this.color = "#FFD700";
    }

    get remaining() {
        return this.text.slice(this.typed.length);
    }

    get isComplete() {
        return this.typed === this.text;
    }

    get progress() {
        return this.typed.length / this.text.length;
    }

    update(deltaTime) {
        this.y += this.speed;
    }

    typeCharacter(char) {
        if (this.remaining[0] === char.toLowerCase()) {
            this.typed += char.toLowerCase();
            return true;
        }
        return false;
    }

    clearTyped() {
        this.typed = "";
    }

    matchesInput(input) {
        return this.text.startsWith(input.toLowerCase());
    }
}
