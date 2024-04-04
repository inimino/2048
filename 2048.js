/*
In setup_game we initialize and return the game structure, which is just an array of 16 ints.

There are two random tiles in the initial game state.

First we select two random distinct indices for the tiles, and then for each we pick a 2 with probability .9 or a 4 with probability .1.

*/

function setup_game() {
  const game = new Array(16).fill(0);
  let indices = new Set();
  while (indices.size < 2) {
    indices.add(Math.floor(Math.random() * game.length));
  }
  indices.forEach(index => {
    game[index] = Math.random() < 0.9 ? 1 : 2;
  });
  return game;
}

/* board()

In board() we get our game representation and return an HTML string containing div#game.

We only return the contents of the div (i.e. the inner HTML), which is just the 16 div tiles.
*/

function board(arr) {
  return arr.map(val => `<div class="tile ${val ? `tile-${val}` : 'tile-empty'}">${val ? 2 ** val : ''}</div>`).join('');
}

/* #game_update

In game_update() we take a board and a direction, and perform the update according to the rules of 2048, specifically:

1. Tiles slide in the direction of the move as far as they can until stopped by another tile or the edge of the board.
2. Tiles which are adjacent in the direction of the move and have the same value are then merged.
3. When multiple merges are possible, the rules are:
  - A merge which is furthest in the direction of motion is prioritized.
    For example, in a row [2 2 2 0] moving to the left, the result would be [4 2 0 0], not [2 4 0 0].
  - When both pairs in a row can merge, both merges are made, e.g. [2 2 2 2] -> [4 4 0 0] and [2 2 4 4] -> [4 8 0 0].

In game_update we extract each row or column in a particular way from the board state which is passed in.
Then we call handle_move_4cell() with a length-4 array of those values, and that function always handles the transformation as if it was a row moving to the left.

When we merge, since our board stores exponents (i.e. an 8 tile is stored as 3) and not tile values directly, we just add one to the exponent, rather than doubling it as we would do if we stored the actual power of two.

We can see that, for example, if the move is "d", we will call handle_move_4cell() with the array values from the board at indices [12 8 4 0], [13 9 5 1], and so on for all four columns.

We copy the grid given above into the comment and directly read out the indices into a 4-array for each of the directions as this is the easiest and cleanest and most fool-proof way to write the code.

We handle all four directions analogously.

Below we just write handle_move_4cell and game_update.
At the end of game_update we call add_new_tile, which we write in the next block, which takes the old and new array and returns the next game state.
It needs both the old and the new because it needs to know whether the move was a no-op, as in this case no new square will be added.
This function takes the board position and adds empty tiles, and it also handles detecting when the game is over.
*/

function handle_move_4cell(cells) {
    // Slide non-zero cells to the front
    let result = cells.filter(val => val > 0);
    result = [...result, ...Array(4 - result.length).fill(0)];

    // Merge adjacent cells if they are equal
    for (let i = 0; i < 3; i++) {
        if (result[i] !== 0 && result[i] === result[i + 1]) {
            result[i]++;
            result[i + 1] = 0;
        }
    }

    // Slide again after merge
    result = result.filter(val => val > 0);
    result = [...result, ...Array(4 - result.length).fill(0)];

    return result;
}

function game_update(board, direction) {
    let newBoard = Array(16).fill(0);
    let indices = {
        u: [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]],
        d: [[12, 8, 4, 0], [13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3]],
        l: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]],
        r: [[3, 2, 1, 0], [7, 6, 5, 4], [11, 10, 9, 8], [15, 14, 13, 12]]
    };

    indices[direction].forEach((group, index) => {
        const values = group.map(i => board[i]);
        const moved = handle_move_4cell(values);
        moved.forEach((value, i) => {
            newBoard[group[i]] = value;
        });
    });

    return add_new_tile(board, newBoard);
}
/*
In add_new_tile() we get two boards in the usual format.

First we compare the two boards.
These are the board before and after a move.
If the board didn't change we just return the second board.

We find all the empty tiles, pick one uniformly at random, and add a new tile there (that is, actually a 1 in the board representation).
(Note that if the move did something, there will always be at least one empty spot.)

The new tile will be 2 or 4 with odds 9 : 1, just as in the initial game setup.
*/

function add_new_tile(boardBefore, boardAfter) {
  if (boardBefore.join() === boardAfter.join()) return boardAfter;

  let emptyIndices = [];
  boardAfter.forEach((val, idx) => {
    if (val === 0) emptyIndices.push(idx);
  });

  let newIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  boardAfter[newIndex] = Math.random() < 0.9 ? 1 : 2;

  return boardAfter;
}

/* game state

Here we call setup_game and put the game state in a global variable.

We call board() and update the inner HTML of div#game.

(We are brought in by a script tag at the end of the body, so the div is already there.)

We handle keyboard input (arrow keys) and update the game state and the HTML.
*/

let gameState = setup_game();

function updateDisplay() {
  document.getElementById('game').innerHTML = board(gameState);
}

updateDisplay();

document.addEventListener('keydown', function(event) {
  let move = '';
  switch (event.key) {
    case 'ArrowUp': move = 'u'; break;
    case 'ArrowDown': move = 'd'; break;
    case 'ArrowLeft': move = 'l'; break;
    case 'ArrowRight': move = 'r'; break;
  }
  if (move) {
    gameState = game_update(gameState, move);
    updateDisplay();
  }
});

