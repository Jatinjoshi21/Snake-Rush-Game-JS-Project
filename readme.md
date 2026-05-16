# Snake Game

A simple browser-based Snake game built with HTML, CSS, and JavaScript.

## Overview

This project creates a playable Snake game using a grid board and keyboard controls. The snake moves inside the game area, eats food, grows longer, and the game ends when the snake hits the edge of the board.

## How to Play

1. Open `index.html` in a web browser.
2. Press the **Start** button to begin the game.
3. Use the arrow keys to change the snake's direction.
4. Eat the red food to increase your score.
5. The game ends if the snake collides with the board boundary.

## Controls

- `ArrowUp` — move up
- `ArrowDown` — move down
- `ArrowLeft` — move left
- `ArrowRight` — move right

## Features

- Score tracking
- High score persistence using browser `localStorage`
- Timer display
- Start and restart controls

## Files

- `index.html` — game layout, styling, and logic
- `styles.css` — optional stylesheet if you want to separate styles outside the HTML
- `script.js` — optional separate JavaScript file if you want to move logic out of the HTML

## Notes

The current implementation uses inline CSS and JavaScript inside `index.html`. You can move the styles into `styles.css` and the script into `script.js` for a cleaner project structure.

## License

This project is free to use and modify.
