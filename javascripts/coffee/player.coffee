class Player extends Entity
  constructor: (x, y, @map) ->
    super
    @startPosition = _.clone(@position)
    @direction = new Direction("left")
    @intentDirection = new Direction
    @animationIndex = 0
    @speed = 6 # tiles per second

  calculateDisplacement: (gameFps) ->
    @displacement = (@speed * (Map.TILE_WIDTH + Map.TILE_HEIGHT) / 2) / gameFps

  tilesAhead: (direction = @direction) ->
    positionsAhead = []
    for position in @boundingBox.toArray()
      position.x += @displacement * direction.toCoordinate().x
      position.y += @displacement * direction.toCoordinate().y
      positionsAhead.push(position)

    this.currentTiles(positionsAhead)

  canMove: (direction = @direction) ->
    not _.any(this.tilesAhead(direction), (tile) -> tile.isWall())

  canChangeDirection: ->
    this.canMove(@intentDirection)

  updateDirection: ->
    if @intentDirection.angle? and this.canChangeDirection()
      @direction.set(@intentDirection.angle)
      @intentDirection.set(null)

    @direction

  updatePosition: () ->
    this.excludeFromTiles()

    if this.canMove()
      previousPosition = _.clone(@position)

      @position.x += @direction.toCoordinate().x * @displacement
      @position.y += @direction.toCoordinate().y * @displacement

      # ensure that the player always pass through the center of the tile
      tileCenter = this.currentTiles(@position)[0].centerCoordinate()
      if tileCenter.betweenAxis(@position, previousPosition) or not this.canMove()
        @position.change(tileCenter.x, tileCenter.y)

      delete previousPosition

    this.includeIntoTiles()
    @position

  update: (gameFps) ->
    this.calculateDisplacement(gameFps)
    this.updateDirection()
    this.updatePosition()

  collidesWith: (entity) ->

  draw: (context) ->

  drawPosition: (context) ->
    context.font = "bold 12px sans-serif"
    context.textAlign = "center"
    context.fillStyle = "#FFF"
    context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.TILE_HEIGHT)
