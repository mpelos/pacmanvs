# Game contants
WALL         = 1
PATH         = 0
PACMAN       = 3
TILE_WIDTH   = 20
TILE_HEIGHT  = 20
WALL_PADDING = 6

window.onload = ->
  game = new Game

  game.init()
  setInterval( ->
    game.update()
    game.draw()
  30)
