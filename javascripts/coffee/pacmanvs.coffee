jQuery ($) ->
  game = new Game
  $(".wrapper").css "width": "#{game.map.width}px", "height": "#{game.map.height}px"
  $(document).bind "keydown", game.handleKey
  game.init()
