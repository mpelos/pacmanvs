class Map
  constructor: (@matrix) ->

  draw: (context) ->
    context.beginPath()

    for array, i in @matrix
      for value, j in array
        x = j * TILE_WIDTH
        y = i * TILE_HEIGHT
        tile = new Tile(this, i, j)


        if tile.isWall()
          startX = if tile.isWallLeftCorner()  then (x + WALL_PADDING)               else x
          endX   = if tile.isWallRightCorner() then (x + TILE_WIDTH - WALL_PADDING)  else (x + TILE_WIDTH)
          startY = if tile.isWallUpCorner()    then (y + WALL_PADDING)               else y
          endY   = if tile.isWallDownCorner()  then (y + TILE_HEIGHT - WALL_PADDING) else (y + TILE_HEIGHT)

          if tile.above().isPath()
            _y = y + WALL_PADDING + 0.5
            context.moveTo startX, _y
            context.lineTo endX, _y

          if tile.right().isPath()
            _x = x + TILE_WIDTH - WALL_PADDING - 0.5
            context.moveTo _x, startY
            context.lineTo _x, endY

          if tile.below().isPath()
            _y = y + TILE_HEIGHT - WALL_PADDING - 0.5
            context.moveTo startX, _y
            context.lineTo endX, _y

          if tile.left().isPath()
            _x = x + WALL_PADDING + 0.5
            context.moveTo _x, startY
            context.lineTo _x, endY

          if tile.above().isWall() and tile.right().isWall() and tile.below().isWall() and tile.left().isWall()
            if tile.aboveRight().isPath()
              context.moveTo (x + TILE_WIDTH), (y + WALL_PADDING + 0.5)
              context.lineTo (x + TILE_WIDTH - WALL_PADDING - 0.5), (y + WALL_PADDING + 0.5)
              context.lineTo (x + TILE_WIDTH - WALL_PADDING - 0.5), y

            if tile.belowRight().isPath()
              context.moveTo (x + TILE_WIDTH), (y + TILE_HEIGHT - WALL_PADDING - 0.5)
              context.lineTo (x + TILE_WIDTH - WALL_PADDING - 0.5), (y + TILE_HEIGHT - WALL_PADDING - 0.5)
              context.lineTo (x + TILE_WIDTH - WALL_PADDING - 0.5), (y + TILE_HEIGHT)

            if tile.belowLeft().isPath()
              context.moveTo x, (y + TILE_HEIGHT - WALL_PADDING - 0.5)
              context.lineTo (x + WALL_PADDING + 0.5), (y + TILE_HEIGHT - WALL_PADDING - 0.5)
              context.lineTo (x + WALL_PADDING + 0.5), (y + TILE_HEIGHT)

            if tile.aboveLeft().isPath()
              context.moveTo x, (y + WALL_PADDING + 0.5)
              context.lineTo (x + WALL_PADDING + 0.5), (y + WALL_PADDING + 0.5)
              context.lineTo (x + WALL_PADDING + 0.5), y

    context.closePath()
    context.strokeStyle = "#03F"
    context.stroke()
