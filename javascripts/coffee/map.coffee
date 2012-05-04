class Map
  this.TILE_WIDTH   = 20
  this.TILE_HEIGHT  = 20
  this.WALL_PADDING = 6

  this.WALL   = "w"
  this.PATH   = "p"
  this.FOOD   = "f"
  this.PACMAN = "P"

  constructor: ->
    @matrix = MAPS_MATRIX[0]
    @width  = @matrix[0].length * Map.TILE_WIDTH
    @height = @matrix.length    * Map.TILE_HEIGHT
    @tiles = []
    @entities =
      players: []
      foods: []

    for array, i in @matrix
      @tiles[i] = []
      for value, j in array
        @tiles[i][j] = new Tile(this, i, j, value)
        x = @tiles[i][j].centerCoordinate().x
        y = @tiles[i][j].centerCoordinate().y

        if value is Map.FOOD
          food = new Food(x, y, this)
          @tiles[i][j].type = Map.PATH
          @tiles[i][j].entities.push(food)
          @entities.foods.push(food)

        if value is Map.PACMAN
          @tiles[i][j].type = Map.PATH
          @entities.players.push(new Player(x, y, this))

    @foodCounter = @entities.foods.length

  draw: (context) ->
    context.beginPath()
    for array, i in @matrix
      for value, j in array
        x = j * Map.TILE_WIDTH
        y = i * Map.TILE_HEIGHT
        tile = @tiles[i][j]

        if tile.isWall()
          startX = if tile.isWallLeftCorner()  then (x + Map.WALL_PADDING)                   else x
          endX   = if tile.isWallRightCorner() then (x + Map.TILE_WIDTH - Map.WALL_PADDING)  else (x + Map.TILE_WIDTH)
          startY = if tile.isWallUpCorner()    then (y + Map.WALL_PADDING)                   else y
          endY   = if tile.isWallDownCorner()  then (y + Map.TILE_HEIGHT - Map.WALL_PADDING) else (y + Map.TILE_HEIGHT)

          if tile.above()?.isPath()
            _y = y + Map.WALL_PADDING + 0.5
            context.moveTo startX, _y
            context.lineTo endX, _y

          if tile.right()?.isPath()
            _x = x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5
            context.moveTo _x, startY
            context.lineTo _x, endY

          if tile.below()?.isPath()
            _y = y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5
            context.moveTo startX, _y
            context.lineTo endX, _y

          if tile.left()?.isPath()
            _x = x + Map.WALL_PADDING + 0.5
            context.moveTo _x, startY
            context.lineTo _x, endY

          if (tile.above()?.isWall() or not tile.above()?) and (tile.right()?.isWall() or not tile.right()?) and (tile.below()?.isWall() or not tile.below()?) and (tile.left()?.isWall() or not tile.left()?)
            if tile.aboveRight()?.isPath()
              context.moveTo (x + Map.TILE_WIDTH), (y + Map.WALL_PADDING + 0.5)
              context.lineTo (x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5), (y + Map.WALL_PADDING + 0.5)
              context.lineTo (x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5), y

            if tile.belowRight()?.isPath()
              context.moveTo (x + Map.TILE_WIDTH), (y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5)
              context.lineTo (x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5), (y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5)
              context.lineTo (x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5), (y + Map.TILE_HEIGHT)

            if tile.belowLeft()?.isPath()
              context.moveTo x, (y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5)
              context.lineTo (x + Map.WALL_PADDING + 0.5), (y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5)
              context.lineTo (x + Map.WALL_PADDING + 0.5), (y + Map.TILE_HEIGHT)

            if tile.aboveLeft()?.isPath()
              context.moveTo x, (y + Map.WALL_PADDING + 0.5)
              context.lineTo (x + Map.WALL_PADDING + 0.5), (y + Map.WALL_PADDING + 0.5)
              context.lineTo (x + Map.WALL_PADDING + 0.5), y

    context.closePath()
    context.strokeStyle = "#03F"
    context.stroke()

  drawGrid: (context) ->
    context.beginPath()
    for array, i in @matrix
      for value, j in array
        x = j * Map.TILE_WIDTH
        y = i * Map.TILE_HEIGHT

        context.moveTo x, y + Map.TILE_HEIGHT + 0.5
        context.lineTo x + Map.TILE_WIDTH, y + Map.TILE_HEIGHT + 0.5
        context.moveTo x + Map.TILE_WIDTH + 0.5, y
        context.lineTo x + Map.TILE_WIDTH + 0.5, y + Map.TILE_HEIGHT

        context.closePath()
        context.strokeStyle = "#444"
        context.stroke()

        context.font = "bold 12px sans-serif"
        context.textBaseline = "middle"
        context.fillStyle = "#FFF"

        if j is 0
          context.textAlign = "left"
          context.fillText i, x, y + (Map.TILE_HEIGHT / 2)

        if i is 0
          context.textAlign = "center"
          context.fillText j, x + (Map.TILE_WIDTH / 2), y + 6
