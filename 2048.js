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
