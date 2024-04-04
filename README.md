# 2048

This is a 2048 implementation written using ChatGPT4 and [cmpr](https://github.com/inimino/cmpr).

There's a video walkthrough you can follow to build your own 2048 with the same approach.

## First pass: static board

Here's the prompt:

```
We are writing 2048 in pure HTML and JS.

Write an HTML page which contains just the following:

- title "2048"
- a style element of inline CSS
- a div#game

This div will contain the 16 squares of a starting position, with a 2 and a 4 tile placed somewhere, and the rest as empty tiles.

We want to use the exact some colors as original 2048 by Cerulli.

Our 2 tile will be at position index 2 and our 4 tile at index 5.
By "position index" we express the relationship between array indices and positions illustrated in this grid:

 0  1  2  3
 4  5  6  7
 8  9 10 11
 12 13 14 15

(Later we'll be using an array of ints to represent game state using this same layout.)

CSS notes:

- Empty tiles and div#game should have different colors.
- Give the h1 a nice harmonious color.
- We can use flexbox layout.
```

## First upgrade: the "bootstrap" prompt

We start the conversation with a "bootstrap" prompt that contains all the key decisions we've already made in one place.

Then in our second prompt, we'll be asking GPT4 to write specific code, such as a particular function.
When this results in decisions that apply to the entire project, we can move those into the bootstrap prompt.

````
We are writing a 2048 game in pure HTML and JS.

Our game board HTML will look like this:

```html
<div id=game>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-1">2</div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-2">4</div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
</div>
```

Our game state representation uses a simple array of 16 integers.
We'll use the log of the tile value, for example here is our sample board above:

```js
[0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0]
```

We can illustrate the relationship between array indices and positions by the following grid:

```
 0  1  2  3
 4  5  6  7
 8  9 10 11
12 13 14 15
```

Thus in the example board above the 2 and 4 tiles are at index 2 and 5.

We also use this log representations for things like CSS class names.
So "tile-1" means the tile with value 2^1, and "tile-17" is the highest-valued tile possible in the game.
This keeps our CSS and HTML a bit shorter and we only print the big numbers where necessary.

To communicate between the input layer and game implementation, we use "u", "d", "l", "r" to identify the moves that the player can make in the game.

Code we already have:

- setup_game - returns initial random game representation
- board - takes game representation into HTML string
- game_update - takes game representation and move into new representation

Reply with "OK".
````

## First index.html

Prompt:

Write the index.html page for our game with:

- the html5 doctype all in lowercase
- title just 2048
- stylesheet is "2048.css"
- h1 just "2048"
- div#game, initially empty
- javascript is "2048.js"; the script tag comes after the div
- nothing else

Output: see index.html

## CSS prompt

Here we will be writing the CSS.

Our goal is to reproduce the look and feel of the original 2048 by Cerulli in the tiles and the board.

Use #bbada0 for the page background, #776e65 for the h1 color.

Write all CSS on single lines in the form "selector { rule ; rule }" with all rules for a selector on a single line, separated by semicolon, and with no semicolon after the last rule before the closing curly brace.

Notes:

- Empty tiles and div#game should have different colors.
- Give the h1 a nice harmonious color and center it; 20px vertical margins and font-size 60px works well.
- We can use flexbox on the body for the basic layout and centering.
- We use grid for the 4-by-4 #game layout, with repeat (4, 1fr) / repeat (4, 1fr).
- The div#game should be 500px square.
- Give us a nice spacing around the #game itself and center it horizontally.
- The text should be #81a8b5 for the 2 and 4 tiles, and #f9f6f2 for all others. (set the default color on the .tile class and then only special case -1 and -2).
- background colors for the tiles:

```
empty: #cdc1b4
tiles 1 through 11:
#eee4da
#ede0c8
#f2b179
#f59563
#f67c5f
#f65e3b
#edcf72
#edcc61
#edc850
#edc53f
#edc22e
12--17: #3c3a32
```

- font-sizes:

- 1--9: 55px
- 10--13: 45px
- 14--16: 36px
- 17: 30px
