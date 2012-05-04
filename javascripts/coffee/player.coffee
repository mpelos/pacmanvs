class Player extends Entity
  constructor: (x, y, @map) ->
    super
    @startPosition = _.clone(@position)
    @direction = new Direction("left")
    @intentDirection = new Direction
    @animationIndex = 0
    @speed = 80 # pixels per second

  calculateDisplacement: (gameFps) ->
    @displacement = @speed / gameFps

  tilesAhead: (direction = @direction) ->
    positionsAhead = []
    for position in @collisionLimit.verticesPositions()
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
    this.collidesWithFood(entity) if entity instanceof Food

  collidesWithFood: (food) ->
    food.excludeFromTiles()
    food.position.change(null, null)
    @map.foodCounter -= 1

  draw: (context) ->
    this.drawPosition(context)
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    context.beginPath()
    context.fillStyle = "#FF0"

    animations = new Array
    animations[0] = =>
      context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.3, @direction.angle + Math.PI * 1.3, false
      context.fill()
      context.beginPath()
      context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.7, @direction.angle + Math.PI * 1.7, false
      context.fill()
    animations[1] = =>
      context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.2, @direction.angle + Math.PI * 1.2, false
      context.fill()
      context.beginPath()
      context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.8, @direction.angle + Math.PI * 1.8, false
      context.fill()
    animations[2] = =>
      context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.1, @direction.angle + Math.PI * 1.1, false
      context.fill()
      context.beginPath()
      context.arc @position.x, @position.y, radius, @direction.angle + Math.PI * 0.9, @direction.angle + Math.PI * 1.9, false
      context.fill()
    animations[3] = =>
      context.arc @position.x, @position.y, radius, 0, Math.PI * 2, false
      context.fill()
    animations[4] = animations[2]
    animations[5] = animations[1]
    animations[6] = animations[0]

    animationTime ?= new Cronometer
    if animationTime.spentMiliseconds() >= 15 and this.canMove()
      @animationIndex += 1
      @animationIndex = 0 unless animations[@animationIndex]?
      delete animationTime
    else if not this.canMove()
      @animationIndex = 1

    animations[@animationIndex]()

  drawPosition: (context) ->
    context.font = "bold 12px sans-serif"
    context.textAlign = "center"
    context.fillStyle = "#FFF"
    context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.TILE_HEIGHT)
