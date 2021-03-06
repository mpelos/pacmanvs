class Map
  this.TILE_WIDTH   = 20
  this.TILE_HEIGHT  = 20
  this.WALL_PADDING = 10

  this.WALL       = "w"
  this.GHOST_WALL = "g"
  this.PATH       = "p"
  this.FOOD       = "f"
  this.PACMAN     = "P"
  this.GHOST      = "G"

  constructor: (options = {})->
    mapIndex = options.mapIndex || 0
    @matrix = MAPS_MATRIX[mapIndex]
    @width  = @matrix[0].length * Map.TILE_WIDTH
    @height = @matrix.length    * Map.TILE_HEIGHT
    @tiles = []
    @entities =
      characters: []
      foods: []

    ghostAttributes =
      colors: ["#F81F17", "#48FEFE", "#FB9DCD", "#FACE26"]
      initialDirections: ["up", "right", "left", "down"]

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
          @entities.characters.push new Pacman(x, y, this)
          @entities.characters.reverse()

        if value is Map.GHOST
          @tiles[i][j].type = Map.GHOST_WALL
          options =
            color: ghostAttributes.colors.shift()
            direction: ghostAttributes.initialDirections.shift()
          ghost = new Ghost x, y, this, options
          @entities.characters.push(ghost)

  remainingFoods: ->
    _.filter @entities.foods, (food) ->
      !food.eated

  draw: (context) ->
    this.drawWalls(context)
    this.drawGhostWalls(context)

  drawWalls: (context) ->
    context.beginPath()
    this.drawLines(context)
    context.closePath()
    context.strokeStyle = "#03F"
    context.lineWidth = 2
    context.stroke()

  drawGhostWalls: (context) ->
    context.beginPath()
    this.drawLines(context, Map.GHOST_WALL)
    context.closePath()
    context.strokeStyle = "#EEACA9"
    context.lineWidth = 2
    context.stroke()

  drawLines: (context, wallType = Map.WALL) ->
    for array, i in @matrix
      for value, j in array
        x = j * Map.TILE_WIDTH
        y = i * Map.TILE_HEIGHT
        tile = @tiles[i][j]

        if tile.isWall(wallType)
          startX = if tile.isWallLeftCorner(wallType)  then (x + Map.WALL_PADDING)                   else x
          endX   = if tile.isWallRightCorner(wallType) then (x + Map.TILE_WIDTH - Map.WALL_PADDING)  else (x + Map.TILE_WIDTH)
          startY = if tile.isWallUpCorner(wallType)    then (y + Map.WALL_PADDING)                   else y
          endY   = if tile.isWallDownCorner(wallType)  then (y + Map.TILE_HEIGHT - Map.WALL_PADDING) else (y + Map.TILE_HEIGHT)

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

          if (tile.above()?.isWall(wallType) or not tile.above()?) and (tile.right()?.isWall(wallType) or not tile.right()?) and (tile.below()?.isWall(wallType) or not tile.below()?) and (tile.left()?.isWall(wallType) or not tile.left()?)
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

  drawTilesType: (context) ->
    context.font = "normal 12px menlo"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillStyle = "#FFF"

    for array, i in @matrix
      for value, j in array
        value = "p" if value is "f" or value is "P"
        value = "g" if value is "G"
        x = (j * Map.TILE_WIDTH) + (Map.TILE_WIDTH / 2)
        y = (i * Map.TILE_HEIGHT) + (Map.TILE_HEIGHT / 2)

        context.fillText value, x, y
