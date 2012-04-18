jQuery ($) ->
  game = new Game
  $(document).bind "keydown", game.handleKey
  game.init()
