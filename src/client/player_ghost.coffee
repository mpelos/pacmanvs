class Ghost extends Player
  constructor: (x, y, @map, options) ->
    super
    @color = options.color

  canMove: (direction = @direction) ->
    not _.any(this.tilesAhead(direction), (tile) -> tile.isWall())

  drawEyeBall: (context, x, y, radius) ->
    context.beginPath()
    context.fillStyle = "#FFF"
    context.moveTo x, y
    context.bezierCurveTo x - (radius * 3/8), y,
                          x - (radius * 3/8), y + (radius * 6/8)
                          x, y + (radius * 6/8)

    context.bezierCurveTo x + (radius * 3/8), y + (radius * 6/8),
                          x + (radius * 3/8), y,
                          x, y

    context.fill()

  drawPupil: (context, x, y, radius) ->
    context.beginPath()
    context.fillStyle = "#3000FF"
    context.arc x, y, radius * 1/8, 0, Math.PI * 2, false
    context.fill()

  draw: (context) ->
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2

    # Body
    context.fillStyle = @color
    context.strokeStyle = @color
    context.beginPath()
    context.arc @position.x, @position.y, radius, 0, Math.PI, true
    context.stroke()
    context.fill()
    context.fillRect @position.x - radius, @position.y - 1, radius * 2, (radius * 2/3) + 1
    context.strokeRect @position.x - radius, @position.y - 1, radius * 2, (radius * 2/3) + 1

    # Eyes
    if @direction.toString() is "left"
      this.drawEyeBall context, @position.x - (radius * 5/8), @position.y - (radius * 4/8), radius
      this.drawEyeBall context, @position.x + (radius * 1/8), @position.y - (radius * 4/8), radius
      this.drawPupil context, @position.x - (radius * 6/8), @position.y - (radius * 1/8), radius
      this.drawPupil context, @position.x, @position.y - (radius * 1/8), radius

    else if @direction.toString() is "right"
      this.drawEyeBall context, @position.x - (radius * 1/8), @position.y - (radius * 4/8), radius
      this.drawEyeBall context, @position.x + (radius * 5/8), @position.y - (radius * 4/8), radius
      this.drawPupil context, @position.x, @position.y - (radius * 1/8), radius
      this.drawPupil context, @position.x + (radius * 6/8), @position.y - (radius * 1/8), radius

    else if @direction.toString() is "up"
      this.drawEyeBall context, @position.x - (radius * 3/8), @position.y - (radius * 7/8), radius
      this.drawEyeBall context, @position.x + (radius * 3/8), @position.y - (radius * 7/8), radius
      this.drawPupil context, @position.x - (radius * 3/8), @position.y - (radius * 6/8), radius
      this.drawPupil context, @position.x + (radius * 3/8), @position.y - (radius * 6/8), radius

    else if @direction.toString() is "down"
      this.drawEyeBall context, @position.x - (radius * 3/8), @position.y - (radius * 4/8), radius
      this.drawEyeBall context, @position.x + (radius * 3/8), @position.y - (radius * 4/8), radius
      this.drawPupil context, @position.x - (radius * 3/8), @position.y + (radius * 1/8), radius
      this.drawPupil context, @position.x + (radius * 3/8), @position.y + (radius * 1/8), radius

    # bottom body
    context.strokeStyle = @color
    context.fillStyle = @color
    context.beginPath()
    context.moveTo @position.x - radius, @position.y + (radius * 2/3)

    animations = []
    animations[0] = =>
      cpx = @position.x - (radius * 2/3)
      cpy = @position.y + (radius * 1.2)
      context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x - (radius * 1/3), @position.y + (radius * 2/3)
      cpx = @position.x
      cpy = @position.y + (radius * 1.2)
      context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x + (radius * 1/3), @position.y + (radius * 2/3)
      cpx = @position.x + (radius * 2/3)
      cpy = @position.y + (radius * 1.2)
      context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x + radius, @position.y + (radius * 2/3)
      context.lineTo @position.x - radius, @position.y + (radius * 2/3)
      context.stroke()
      context.fill()
    animations[1] = =>
      context.lineTo @position.x - radius, @position.y + radius
      context.lineTo @position.x - (radius * 2/3), @position.y + (radius * 2/3)
      cpx = @position.x - (radius * 1/6)
      cpy = @position.y + (radius * 1.2)
      context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x - (radius * 1/6), @position.y + (radius * 2/3)
      context.lineTo @position.x + (radius * 1/6), @position.y + (radius * 2/3)
      cpx = @position.x + (radius * 1/6)
      context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x + (radius * 2/3), @position.y + (radius * 2/3)
      context.lineTo @position.x + radius, @position.y + radius
      context.lineTo @position.x + radius, @position.y + (radius * 2/3)
      context.lineTo @position.x - radius, @position.y + (radius * 2/3)
      context.stroke()
      context.fill()

    @animationTime ?= new Cronometer
    if @animationTime.spentMiliseconds() >= 200 and not @frozen and this.canMove()
      @animationIndex += 1
      @animationIndex = 0 unless animations[@animationIndex]?
      delete @animationTime
    else if @frozen or not this.canMove()
      @animationIndex = 0

    animations[@animationIndex]()
