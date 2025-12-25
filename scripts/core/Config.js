export class Config {
    constructor() {
        this.defaults = null;
        this.current = null;
    }

    async load() {
        const response = await fetch('/data/config.json');
        this.defaults = await response.json();

        const saved = localStorage.getItem('gameConfig');
        const userSettings = saved ? JSON.parse(saved) : {};

        this.current = this.mergeDeep(this.defaults, userSettings);

        return this.current;
    }

    get(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.current);
    }

    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => obj[key], this.current);
        target[lastKey] = value;
        this.save();
    }

    save() {
        const userSettings = this.getUserSettings();
        localStorage.setItem('gameConfig', JSON.stringify(userSettings));
    }

    getUserSettings() {
        const user = {};

        if (this.current.gameplay.targetWords !== this.defaults.gameplay.targetWords) {
            user.gameplay = user.gameplay || {};
            user.gameplay.targetWords = this.current.gameplay.targetWords;
        }

        if (this.current.gameplay.baseSpeed !== this.defaults.gameplay.baseSpeed) {
            user.gameplay = user.gameplay || {};
            user.gameplay.baseSpeed = this.current.gameplay.baseSpeed;
        }

        if (this.current.audio.enabled !== this.defaults.audio.enabled) {
            user.audio = user.audio || {};
            user.audio.enabled = this.current.audio.enabled;
        }

        return user;
    }

    reset() {
        this.current = JSON.parse(JSON.stringify(this.defaults));
        localStorage.removeItem('gameConfig');
    }

    mergeDeep(target, source) {
        const output = JSON.parse(JSON.stringify(target));

        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.mergeDeep(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }

        return output;
    }

    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
}
