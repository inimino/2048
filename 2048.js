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
*/

function board(arr) {
  const tiles = arr.map(val => `<div class="tile ${val ? `tile-${val}` : 'tile-empty'}">${val ? 2 ** val : ''}</div>`).join('');
  return `<div id=game>${tiles}</div>`;
}

/* game state

Here we call setup_game and put the game state in a global variable.

We call board() and update the inner HTML of div#game.

(We are brought in by a script tag at the end of the body, so the div is already there.)

For now we don't do anything but load the initial game state; later we'll add input handling here.
*/

let gameState = setup_game();

document.getElementById('game').innerHTML = board(gameState);

