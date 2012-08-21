jQuery ($) ->
  game = new Game

  $(".wrapper").css "width": "#{game.map.width}px", "height": "#{game.map.height}px"
  $(document).bind "keydown", game.handleKey

  socket = io.connect $("meta[name='websocket']").attr("content")
  socket.on "character", game.setPlayerCharacter
