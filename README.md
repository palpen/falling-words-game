# Falling Words Game 🚀

A space-themed typing game where words fall from the sky like asteroids, and you must type them before they hit Earth!

## Features

- **Space Theme**: Beautiful animated space background with twinkling stars and Earth
- **Progressive Difficulty**: Game gets harder as you complete more words
- **Sound Effects**: Success sounds, crash sounds, and ambient space music
- **Particle Effects**: Explosions when you type words correctly
- **Configurable Settings**:
  - Adjustable fall speed (0.5x - 2.0x)
  - Customizable target word count (1-50)
  - Sound toggle
  - Settings persist across sessions
- **Custom Word Lists**: Edit `data/words.txt` to add your own words

## How to Play

1. Open `index.html` in a web browser
2. Click **START** to begin
3. Type the falling words before they hit Earth
4. Reach your target word count to win!

### Controls

- **Type letters**: Match falling words
- **Backspace**: Clear current word and start over

## Adding Your Own Words

Edit `data/words.txt` and add one word per line:

```
cat
dog
rocket
galaxy
```

## Customizing Settings

Click the **Settings** button on the start screen to adjust:
- **Fall Speed**: How fast words fall
- **Words to Win**: How many words needed to complete the game
- **Starting Difficulty**: Easy, Normal, or Hard
- **Sound**: Toggle sound effects on/off

## Technical Details

Built with:
- Vanilla JavaScript (ES6 modules)
- HTML5 Canvas for rendering
- Web Audio API for sounds
- LocalStorage for settings persistence

### Project Structure

```
falling-words-game/
├── index.html
├── data/
│   ├── words.txt           # Editable word list
│   └── config.json         # Default configuration
├── styles/
│   ├── main.css            # Base styles
│   ├── game.css            # Canvas and animations
│   └── ui.css              # UI components
└── scripts/
    ├── main.js             # Entry point
    ├── core/               # Game engine
    ├── entities/           # Game objects
    ├── systems/            # Game systems
    └── ui/                 # User interface
```

## Credits

Created as a parent-daughter learning project.
