export class InputHandler {
    constructor() {
        this.currentInput = "";
        this.targetWord = null;
        this.onWordComplete = null;
        this.onInputChange = null;
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        if (e.key === 'Backspace') {
            this.clearInput();
            return;
        }

        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            this.addCharacter(e.key.toLowerCase());
        }
    }

    addCharacter(char) {
        this.currentInput += char;
        if (this.onInputChange) {
            this.onInputChange(this.currentInput);
        }
    }

    clearInput() {
        this.currentInput = "";
        this.targetWord = null;
        if (this.onInputChange) {
            this.onInputChange(this.currentInput);
        }
    }

    update(words) {
        if (this.currentInput.length === 0) {
            this.targetWord = null;
            return null;
        }

        const matchingWords = words.filter(word =>
            word.isActive && word.matchesInput(this.currentInput)
        );

        if (matchingWords.length === 0) {
            return null;
        }

        this.targetWord = matchingWords[0];

        matchingWords.forEach(word => {
            word.typed = this.currentInput;
        });

        if (this.targetWord.isComplete) {
            const completedWord = this.targetWord;
            this.clearInput();
            if (this.onWordComplete) {
                this.onWordComplete(completedWord);
            }
            return completedWord;
        }

        return null;
    }
}
