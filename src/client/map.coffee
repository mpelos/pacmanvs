class Map
  @tileWidth   = 20
  @tileHeight  = 20
  @wallPadding = 10

  this.WALL       = "w"
  this.GHOST_WALL = "g"
  this.PATH       = "p"
  this.FOOD       = "f"
  this.PACMAN     = "P"
  this.GHOST      = "G"

  constructor: (options = {})->
    mapIndex = options.mapIndex || 0
    @matrix = MAPS_MATRIX[mapIndex]
    Map.tileHeight = Math.floor(window.innerHeight / @matrix.length)
    Map.tileWidth = Map.tileHeight
    Map.wallPadding = Map.tileHeight / 2
    @width  = @matrix[0].length * Map.tileWidth
    @height = @matrix.length    * Map.tileHeight
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
        x = j * Map.tileWidth
        y = i * Map.tileHeight
        tile = @tiles[i][j]

        if tile.isWall(wallType)
          startX = if tile.isWallLeftCorner(wallType)  then (x + Map.wallPadding)                   else x
          endX   = if tile.isWallRightCorner(wallType) then (x + Map.tileWidth - Map.wallPadding)  else (x + Map.tileWidth)
          startY = if tile.isWallUpCorner(wallType)    then (y + Map.wallPadding)                   else y
          endY   = if tile.isWallDownCorner(wallType)  then (y + Map.tileHeight - Map.wallPadding) else (y + Map.tileHeight)

          if tile.above()?.isPath()
            _y = y + Map.wallPadding + 0.5
            context.moveTo startX, _y
            context.lineTo endX, _y

          if tile.right()?.isPath()
            _x = x + Map.tileWidth - Map.wallPadding - 0.5
            context.moveTo _x, startY
            context.lineTo _x, endY

          if tile.below()?.isPath()
            _y = y + Map.tileHeight - Map.wallPadding - 0.5
            context.moveTo startX, _y
            context.lineTo endX, _y

          if tile.left()?.isPath()
            _x = x + Map.wallPadding + 0.5
            context.moveTo _x, startY
            context.lineTo _x, endY

          if (tile.above()?.isWall(wallType) or not tile.above()?) and (tile.right()?.isWall(wallType) or not tile.right()?) and (tile.below()?.isWall(wallType) or not tile.below()?) and (tile.left()?.isWall(wallType) or not tile.left()?)
            if tile.aboveRight()?.isPath()
              context.moveTo (x + Map.tileWidth), (y + Map.wallPadding + 0.5)
              context.lineTo (x + Map.tileWidth - Map.wallPadding - 0.5), (y + Map.wallPadding + 0.5)
              context.lineTo (x + Map.tileWidth - Map.wallPadding - 0.5), y

            if tile.belowRight()?.isPath()
              context.moveTo (x + Map.tileWidth), (y + Map.tileHeight - Map.wallPadding - 0.5)
              context.lineTo (x + Map.tileWidth - Map.wallPadding - 0.5), (y + Map.tileHeight - Map.wallPadding - 0.5)
              context.lineTo (x + Map.tileWidth - Map.wallPadding - 0.5), (y + Map.tileHeight)

            if tile.belowLeft()?.isPath()
              context.moveTo x, (y + Map.tileHeight - Map.wallPadding - 0.5)
              context.lineTo (x + Map.wallPadding + 0.5), (y + Map.tileHeight - Map.wallPadding - 0.5)
              context.lineTo (x + Map.wallPadding + 0.5), (y + Map.tileHeight)

            if tile.aboveLeft()?.isPath()
              context.moveTo x, (y + Map.wallPadding + 0.5)
              context.lineTo (x + Map.wallPadding + 0.5), (y + Map.wallPadding + 0.5)
              context.lineTo (x + Map.wallPadding + 0.5), y

  drawGrid: (context) ->
    context.beginPath()
    context.lineWidth = 1
    for array, i in @matrix
      for value, j in array
        x = j * Map.tileWidth
        y = i * Map.tileHeight

        context.moveTo x, y + Map.tileHeight + 0.5
        context.lineTo x + Map.tileWidth, y + Map.tileHeight + 0.5
        context.moveTo x + Map.tileWidth + 0.5, y
        context.lineTo x + Map.tileWidth + 0.5, y + Map.tileHeight

        context.closePath()
        context.strokeStyle = "#444"
        context.stroke()

        context.font = "bold 12px sans-serif"
        context.textBaseline = "middle"
        context.fillStyle = "#FFF"

        if j is 0
          context.textAlign = "left"
          context.fillText i, x, y + (Map.tileHeight / 2)

        if i is 0
          context.textAlign = "center"
          context.fillText j, x + (Map.tileWidth / 2), y + 6

  drawTilesType: (context) ->
    context.font = "normal 12px menlo"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillStyle = "#FFF"

    for array, i in @matrix
      for value, j in array
        value = "p" if value is "f" or value is "P"
        value = "g" if value is "G"
        x = (j * Map.tileWidth) + (Map.tileWidth / 2)
        y = (i * Map.tileHeight) + (Map.tileHeight / 2)

        context.fillText value, x, y
