# setup prompts (HTML and CSS)

## "bootstrap" block

We are writing a 2048 game in pure HTML and JS.

Our game board HTML will look like this:

```html
<div id=game>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-1'>2</div>
<div class="tile tile-empty"></div>
<div class="tile tile-empty"></div>
<div class="tile tile-2'>4</div>
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

By "position index" we express the relationship between array indices and positions that we illustrate thusly:

```
 0  1  2  3
 4  5  6  7
 8  9 10 11
12 13 14 15
```

Thus in the example board above the 2 and 4 tiles are at index 2 and 5.

Note that we use log representations for things like CSS class names.
So "tile-1" means the tile with value 2^1, and "tile-17" is the highest-valued tile possible in the game.
This keeps our CSS and HTML a bit shorter and we only print the big numbers where necessary.

Reply with "OK".

## index.html

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

We are writing 2048 in pure HTML and JS.

Here we will be writing the CSS.

Our goal is to reproduce the look and feel of the original 2048 by Cerulli exactly.

Notes:

- Empty tiles and div#game should have different colors.
- Give the h1 a nice harmonious color.
- We can use flexbox layout.

- background colors for the tiles:

```
empty: #cdc1b4
tiles 1 through 17:
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
#3c3a32
#3c3a32
#3c3a32
#3c3a32
#3c3a32
#3c3a32
```

- font-sizes:

- 1--9: 55px
- 10--13: 45px
- 14--16: 36px
- 17: 30px

## new index, board() and start_game()

```

## static board first pass

Here's the prompt:

```

We are writing 2048 in pure HTML and JS.

Write an HTML page which contains just CSS, inline in a style element, followed by an HTML div#game.
- title "2048"
- a style element of inline CSS
- a div#game

This div will contain the 16 squares of a starting position, with a 2 and a 4 tile placed somewhere, and the rest as blank squares.

Our goal is to reproduce the look and feel of the original 2048 by Cerulli exactly.

Our 2 tile will be at position index 2 and our 4 tile at index 5.
By "position index" we express the relationship between array indices and positions that we illustrate thusly:

 0  1  2  3
 4  5  6  7
 8  9 10 11
12 13 14 15

CSS notes:

- Empty tiles and div#game should have different colors.
- Give the h1 a nice harmonious color.
- We can use flexbox layout.

```

