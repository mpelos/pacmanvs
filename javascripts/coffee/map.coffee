class Map
  constructor: (@context, @matrix) ->

  matrix: ->
    @matrix

  draw: ->
    for array, i in @matrix
      for value, j in array
        x = j * TILE_WIDTH
        y = i * TILE_HEIGHT
        tile = new Tile(this, i, j)

        if tile.isWall()
          if tile.above().isPath()
            _y = y + 0.5
            @context.moveTo x, _y
            @context.lineTo (x + TILE_WIDTH), _y

          if tile.right().isPath()
            _x = x + TILE_WIDTH - 0.5
            @context.moveTo _x, y
            @context.lineTo _x, (y + TILE_HEIGHT)

          if tile.below().isPath()
            _y = y + TILE_HEIGHT - 0.5
            @context.moveTo x, _y
            @context.lineTo (x + TILE_WIDTH), _y

          if tile.left().isPath()
            _x = x + 0.5
            @context.moveTo _x, y
            @context.lineTo _x, (y + TILE_HEIGHT)

    @context.stroke()

