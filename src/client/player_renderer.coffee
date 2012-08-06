class PlayerRenderer
  constructor: (@player, @context) ->
    @radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    @frame = 0

  draw: ->
