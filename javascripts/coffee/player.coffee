class Player
  constructor: (x, y, @map, @context) ->
    @position = new Coordinate(x, y)
    @startPosition = @position
    @direction = new Coordinate(-1, 0) # Initial direction: left
    @intentDirection = new Coordinate(null, null)
    @collisionLimit = new CollisionLimit(@position, Map.TILE_WIDTH, Map.TILE_HEIGHT)

  setDirection: (direction) ->
    switch direction
      when "left"   then @intentDirection.change(-1, 0)
      when "up"     then @intentDirection.change(0, -1)
      when "right"  then @intentDirection.change(1, 0)
      when "bottom" then @intentDirection.change(0, 1)

  currentTile: (referencePoint = @position) ->
    i = Math.floor(referencePoint.y / Map.TILE_HEIGHT)
    j = Math.floor(referencePoint.x / Map.TILE_WIDTH)
    new Tile(@map, i, j)

  lookAhead: (referencePoint = @position, direction = @direction) ->
    referencePoint.x += 1 * direction.x
    referencePoint.y += 1 * direction.y
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
    if @intentDirection.x? and @intentDirection.y? and this.canChangeDirection()
      @direction.x = @intentDirection.x
      @direction.y = @intentDirection.y
      @intentDirection.change(null, null)

    if this.canMove()
      @position.x += @direction.x
      @position.y += @direction.y

  draw: ->
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    @context.beginPath()
    @context.arc @position.x, @position.y, radius, 0, Math.PI * 2, false
    @context.closePath()
    @context.strokeStyle = "#FF0"
    @context.stroke()
    @context.fillStyle = "#FF0"
    @context.fill()

  drawPosition: ->
    @context.font = "bold 12px sans-serif"
    @context.textAlign = "center"
    @context.fillStyle = "#FFF"
    @context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.TILE_HEIGHT)
