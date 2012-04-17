# Game contants
WALL         = 1
PATH         = 0
PACMAN       = 3
TILE_WIDTH   = 20
TILE_HEIGHT  = 20
WALL_PADDING = 6

jQuery ($) ->
  game = new Game

  $(document).bind "keydown", game.handleKey
  game.init()

  setInterval( ->
    game.update()
    game.draw()
  30)
