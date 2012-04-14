# Game contants
WALL         = 1
PATH         = 0
TILE_WIDTH   = 20
TILE_HEIGHT  = 20
WALL_PADDING = 4

window.onload = ->
  game = new Game

  setInterval( ->
    game.update()
    game.draw()
  6)
