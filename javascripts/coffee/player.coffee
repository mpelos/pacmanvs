class Player extends Entity
  constructor: (x, y, @map, @context) ->
    super
    @startPosition = Object.clone(@position)
    @direction = new Direction("left")
    @intentDirection = new Direction
    @animationIndex = 0
    @speed = 80 # pixels per second

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

  updateDirection: ->
    if @intentDirection.angle? and this.canChangeDirection()
      @direction.set(@intentDirection.angle)
      @intentDirection.set(null)

    @direction

  updatePosition: (gameFps) ->
    if this.canMove()
      displacement = @speed / gameFps
      previousPosition = Object.clone(@position)

      @position.x += @direction.toCoordinate().x * displacement
      @position.y += @direction.toCoordinate().y * displacement

      # ensure that the player always pass through the center of the tile
      tileCenter = this.currentTile().centerCoordinate()
      if tileCenter.betweenAxis(@position, previousPosition) or not this.canMove()
        @position.change(tileCenter.x, tileCenter.y)

      delete previousPosition

    @position

  eatFood: (game) ->
    for food, i in game.foods
      if @collisionLimit.collidesWith food.collisionLimit
        foodIndex = i

    game.foods.removeAt(foodIndex)

  update: (game) ->
    this.updateDirection()
    this.updatePosition(game.fps)
    this.eatFood(game)

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

    animationTime ?= new Cronometer
    if animationTime.spentMiliseconds() >= 15 and this.canMove()
      @animationIndex += 1
      delete animationTime
    else if not this.canMove()
      @animationIndex = 1

    animations.at(@animationIndex)()

  drawPosition: ->
    @context.font = "bold 12px sans-serif"
    @context.textAlign = "center"
    @context.fillStyle = "#FFF"
    @context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.TILE_HEIGHT)
