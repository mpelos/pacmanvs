class Player
  constructor: (x, y, @map, @context) ->
    @position = new Coordinate(x, y)
    @startPosition = @position
    @direction = new Direction("left")
    @intentDirection = new Direction
    @collisionLimit = new CollisionLimit(@position, Map.TILE_WIDTH, Map.TILE_HEIGHT)
    @animationIndex = 0

  currentTile: (referencePoint = @position) ->
    i = Math.floor(referencePoint.y / Map.TILE_HEIGHT)
    j = Math.floor(referencePoint.x / Map.TILE_WIDTH)
    new Tile(@map, i, j)

  lookAhead: (referencePoint = @position, direction = @direction) ->
    referencePoint.x += 1 * direction.toCoordinate().x
    referencePoint.y += 1 * direction.toCoordinate().y
    i = this.currentTile(referencePoint).i
    j = this.currentTile(referencePoint).j
    new Tile(@map, i, j)

  canChangeDirection: ->
    @collisionLimit.verticesPositions().every (position) =>
      this.lookAhead(position, @intentDirection).isPath()

  canMove: ->
    @collisionLimit.verticesPositions().every (position) =>
      this.lookAhead(position).isPath()

  move: (x, y) ->
    if @intentDirection.angle? and this.canChangeDirection()
      @direction.set(@intentDirection.angle)
      @intentDirection.set(null)

    if this.canMove()
      @position.x += @direction.toCoordinate().x
      @position.y += @direction.toCoordinate().y

  draw: ->
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    @context.beginPath()
    @context.fillStyle = "#FF0"

    animations = new Array
    animations[0] = =>
      @context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.3, @direction.angle + Math.PI * 1.3, false
      @context.fill()
      @context.beginPath()
      @context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.7, @direction.angle + Math.PI * 1.7, false
      @context.fill()
    animations[1] = =>
      @context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.2, @direction.angle + Math.PI * 1.2, false
      @context.fill()
      @context.beginPath()
      @context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.8, @direction.angle + Math.PI * 1.8, false
      @context.fill()
    animations[2] = =>
      @context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.1, @direction.angle + Math.PI * 1.1, false
      @context.fill()
      @context.beginPath()
      @context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.9, @direction.angle + Math.PI * 1.9, false
      @context.fill()
    animations[3] = =>
      @context.arc @position.x, @position.y, radius, 0, Math.PI * 2, false
      @context.fill()
    animations[4] = animations[2]
    animations[5] = animations[1]
    animations[6] = animations[0]

    if this.canMove()
      @animationIndex += 1

    animations.at(@animationIndex)()

  drawPosition: ->
    @context.font = "bold 12px sans-serif"
    @context.textAlign = "center"
    @context.fillStyle = "#FFF"
    @context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.TILE_HEIGHT)
