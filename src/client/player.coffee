class Player extends Entity
  constructor: (x, y, @map, options = {}) ->
    super
    options.direction ?= "left"
    @direction = new Direction(options.direction)
    @initialDirection = new Direction(options.direction)
    @intentDirection = new Direction
    @speed = 6 # tiles per second
    @frozen = true
    @status = "alive"

  calculateDisplacement: (gameFps) ->
    @displacement = if @frozen then 0 else ((@speed * (Map.tileWidth + Map.tileHeight) / 2) / gameFps)

  tilesAhead: (direction = @direction) ->
    positionsAhead = []
    for position in @boundingBox.toArray()
      position.x += @displacement * direction.toCoordinate().x
      position.y += @displacement * direction.toCoordinate().y
      positionsAhead.push(position)

    this.currentTiles(positionsAhead)

  canMove: (direction = @direction) ->
    not _.any this.tilesAhead(direction), (tile) ->
      tile?.isWall() or tile?.isGhostWall()

  turnLeft:  -> @intentDirection.set "left"
  turnRight: -> @intentDirection.set "right"
  turnUp:    -> @intentDirection.set "up"
  turnDown:  -> @intentDirection.set "down"

  canChangeDirection: ->
    this.canMove(@intentDirection) and _.any(this.tilesAhead(@intentDirection), (tile) -> !!tile)

  updateDirection: ->
    if @intentDirection.angle? and this.canChangeDirection()
      @direction.set(@intentDirection.angle)
      @intentDirection.set(null)

    @direction

  updatePosition: ->
    this.excludeFromTiles()

    if _.all(this.currentTiles(), (tile) -> !tile)
      @position.x -= @map.width - Map.tileWidth / 10
      if @position.x < 0
        @position.x = parseInt(@position.x.toString().replace("-", ""))
      else
        @position.x -= Map.tileWidth
    else if this.canMove()
      @previousPosition = _.clone(@position)

      @position.x += @direction.toCoordinate().x * @displacement
      @position.y += @direction.toCoordinate().y * @displacement

      # ensure that the player always pass through the center of the tile
      tileCenter = this.currentTiles(@position)[0]?.centerCoordinate()
      if tileCenter?.betweenAxis(@position, @previousPosition) or not this.canMove()
        @position.set(tileCenter.x, tileCenter.y)

      delete @previousPosition

    this.includeIntoTiles()
    @position

  freeze: ->
    @frozen = true

  unfreeze: ->
    @frozen = false

  live: ->
    @status = "alive"

  isAlive: ->
    @status is "alive"

  isDead: ->
    @status is "dead"

  collidesWith: (entity) ->

  update: (gameFps) ->
    this.calculateDisplacement(gameFps)

    unless @frozen
      this.updateDirection()
      this.updatePosition()

  draw: (context) ->

  drawPosition: (context) ->
    context.font = "bold 12px sans-serif"
    context.textAlign = "center"
    context.fillStyle = "#FFF"
    context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.tileHeight)

  reset: ->
    this.excludeFromTiles()
    @position.set(@initialPosition)
    @direction.set(@initialDirection)
    @renderer.reset()
    this.includeIntoTiles()
    this.live()
