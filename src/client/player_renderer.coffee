class PlayerRenderer
  constructor: (@context, @player, options = {}) ->
    @radius = options.radius || (Map.tileWidth + (Map.wallPadding / 2)) / 2
    @frame = 0

  draw: ->

  reset: ->
