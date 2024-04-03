# setup prompts (HTML and CSS)

1. overview
2. board layout
3. play implementation
4. input handling

1. static board
2. new index.html, board() and start_game()
3. handle_move() and add_tile()
4. keyboard input and state management
5. we're done, here's where you can go see the code on github
6. one more thing, here's the Python and C versions
7. conclusions (bullet points up on screen)

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

## index.html

Prompt:

We are writing a 2048 game in pure HTML and JS.

Write the index.html page for our game with:

- the html5 doctype all in lowercase
- title just 2048
- stylesheet is "2048.css"
- h1 just "2048"
- div#game, initially empty
- javascript is "2048.js"; the script tag comes after the div
- nothing else

Output: see index.html

```html
```

## "bootstrap" block

decisions blah blah blah
...


## new index, board() and start_game()

```
