# [Wordle Game in Vue 3](wordle.poojanchapagain.com.np)

Welcome to Wordle Game, a Vue 3 implementation of the popular word puzzle game! The game challenges players to guess a secret five-letter word within a limited number of attempts. Each guess provides feedback to help players narrow down the correct word.

This project is built with Vue 3 and utilizes a large dataset of English words to ensure a diverse and challenging gameplay experience.

## Features

- Dynamic Gameplay: Guess the secret five-letter word within six attempts.
- Visual Feedback: Colored tiles indicate correct, present, or absent letters after each guess.
- Interactive Keyboard: Use the on-screen keyboard or your physical keyboard to input guesses.
- Responsive Design: Optimized for both desktop and mobile devices.
- Extensive Word List: The game uses a comprehensive list of 370,000+ English words sourced from the [dwyl/english-words](https://github.com/dwyl/english-words) repository.

## How to Play

1. Start the Game: The game will randomly choose a five-letter word from the word list.
2. Make a Guess: Use the on-screen keyboard or your own to type in your guesses.
3. Tile Colors Guide:

- Green: The letter is in the correct position.
- Yellow: The letter is in the word but in the wrong position.
- Gray: The letter is not in the word at all.

4. Win or Lose: You have six attempts to guess the correct word. If you guess correctly, you win! If you fail to guess within six tries, the correct word will be revealed.

## Installation

### Prerequisites

- Node.js: Make sure you have Node.js installed.

### Steps to Install

1. Clone the Repository:

```sh
git clone https://github.com/yourusername/wordle-game-vue3.git
```

2. Navigate to the Project Directory:

```sh
cd wordle-game-vue3
```

3. Navigate to the Project Directory:

```sh
npm install
```

4. Navigate to the Project Directory:

```sh
npm run dev
```

Your application should now be running on http://localhost:3000.

## Word List Source

The word list used in this project comes from the excellent [dwyl/english-words](https://github.com/dwyl/english-words) repository, which provides over 370,000 English words. For this Wordle game, we specifically use five-letter words from this dataset to ensure an engaging and diverse gameplay experience.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to submit an issue or create a pull request.
