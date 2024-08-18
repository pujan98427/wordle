<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import wordList from 'word-list'

const game = ref({
  guessesAllowed: 6,
  wordLength: 5,
  theWord: '',
  currentRowIndex: 0,
  board: [],
  letters: [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['Enter', ...'ZXCVBNM'.split(''), 'Backspace']
  ],
  message: '',
  errors: false
})

const validWords = wordList.filter((word) => word.length === 5)
console.log(validWords)

// Initialize the board
const initBoard = () => {
  game.value.theWord = validWords[Math.floor(Math.random() * validWords.length)]
  game.value.board = Array.from({ length: game.value.guessesAllowed }, () => {
    return Array.from({ length: game.value.wordLength }, () => ({ letter: '', status: '' }))
  })
}

// Function to find the matching tile for a key
const matchingTileForKey = (key) => {
  for (const row of game.value.board) {
    for (const tile of row) {
      if (tile.letter.toLowerCase() === key.toLowerCase()) {
        return tile
      }
    }
  }
  return null
}

// Handle key press event
const handleKeyPress = (event) => {
  const key = event.key.toUpperCase()
  if (/^[A-Z]$/.test(key)) {
    fillTile(key)
  } else if (key === 'BACKSPACE') {
    emptyTile()
  } else if (key === 'ENTER') {
    submitGuess()
  }
}

// Handle keyboard click
const handleKeyboardClick = (event) => {
  const key = event.target.dataset.key?.toUpperCase()
  if (key) {
    handleKeyPress({ key })
  }
}

// Fill the tile
const fillTile = (key) => {
  const currentRow = game.value.board[game.value.currentRowIndex]
  const emptyTile = currentRow.find((tile) => !tile.letter)
  if (emptyTile) {
    emptyTile.letter = key
  }
}

// Remove the last letter from the current row
const emptyTile = () => {
  const currentRow = game.value.board[game.value.currentRowIndex]
  const filledTile = [...currentRow].reverse().find((tile) => tile.letter)
  if (filledTile) {
    filledTile.letter = ''
  }
}

// Submit the guess
const submitGuess = () => {
  const currentRow = game.value.board[game.value.currentRowIndex]
  const currentGuess = currentRow.map((tile) => tile.letter).join('')

  if (currentGuess.length < game.value.wordLength) {
    game.value.message = 'Guess is too short!'
    return
  }

  if (!validWords.includes(currentGuess)) {
    game.value.message = 'Invalid word...'
    return
  }

  updateTileStatus(currentRow, currentGuess)

  if (currentGuess === game.value.theWord) {
    game.value.message = 'You Win!'
  } else if (game.value.currentRowIndex === game.value.guessesAllowed - 1) {
    game.value.message = `Game Over. The word was: ${game.value.theWord}`
  } else {
    game.value.currentRowIndex++
  }
}

// Update the tile status
const updateTileStatus = (row, guess) => {
  const wordArray = game.value.theWord.split('')
  row.forEach((tile, index) => {
    if (tile.letter === wordArray[index]) {
      tile.status = 'correct'
    } else if (wordArray.includes(tile.letter)) {
      tile.status = 'present'
    } else {
      tile.status = 'absent'
    }
  })
}

// Mount and cleanup
onMounted(() => {
  initBoard()
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <header class="max-w-[150px] text-center my-6 2xl:my-12 mx-auto">
    <h1>
      <a href="poojanchapagain.com.np">
        <img src="/images/mylogo.png" alt="pujan chapagain logo" />
      </a>
    </h1>

    <!-- Game Message -->
  </header>
  <main @keyup.window="handleKeyPress($event)" class="px-4">
    <div id="game-wrap">
      <div id="game" class="grid grid-cols-1 gap-1.5 max-w-[344px] mx-auto">
        <!-- Game board rendering rows and tiles -->
        <div
          v-for="(row, rowIndex) in game.board"
          :key="rowIndex"
          class="row grid grid-cols-5 gap-1.5"
          :class="{
            current: game.currentRowIndex === rowIndex,
            invalid: game.currentRowIndex === rowIndex && game.errors
          }"
        >
          <div
            v-for="tile in row"
            :key="tile.letter"
            class="tile text-4xl font-bold leading-[1] uppercase w-[62px] h-[62px] flex items-center justify-center border-2 border-[#565758]"
            :class="tile.status"
          >
            {{ tile.letter }}
          </div>
        </div>
        <output>{{ game.message }}</output>
      </div>
    </div>

    <!-- Keyboard for interacting with the game -->
    <div
      id="keyboard"
      @click.stop="handleKeyboardClick($event)"
      class="max-w-[484px] mt-10 2xl:mt-24 mx-auto"
    >
      <div v-for="row in game.letters" :key="row" class="flex justify-center">
        <div class="row flex gap-2 mb-2">
          <div
            v-for="key in row"
            :key="key"
            class="text-xl font-semibold rounded bg-[#818384] text-[#f8f8f8] flex-1"
          >
            <button
              class="key px-4 h-14 flex items-center justify-center cursor-pointer"
              v-if="key === 'Backspace'"
              data-key="Backspace"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" style="display: flex">
                <path
                  d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                />
              </svg>
            </button>

            <button
              v-else
              class="key px-4 flex items-center justify-center h-14 cursor-pointer"
              :class="matchingTileForKey(key)?.status"
              type="button"
              :data-key="key"
            >
              {{ key }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
