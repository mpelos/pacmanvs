class GhostRenderer extends PlayerRenderer
  draw: ->
    this.drawBody()
    this.drawBottomBody()

    if @player.status is "alive" or status is "dead"
      this.drawEyeBalls()
      this.drawPupils()

  drawEyeBalls: ->
    if @player.direction.toString() is "left"
      this.drawEyeBall @player.position.x - (@radius * 5/8), @player.position.y - (@radius * 4/8)
      this.drawEyeBall @player.position.x + (@radius * 1/8), @player.position.y - (@radius * 4/8)

    else if @player.direction.toString() is "right"
      this.drawEyeBall @player.position.x - (@radius * 1/8), @player.position.y - (@radius * 4/8)
      this.drawEyeBall @player.position.x + (@radius * 5/8), @player.position.y - (@radius * 4/8)

    else if @player.direction.toString() is "up"
      this.drawEyeBall @player.position.x - (@radius * 3/8), @player.position.y - (@radius * 7/8)
      this.drawEyeBall @player.position.x + (@radius * 3/8), @player.position.y - (@radius * 7/8)

    else if @player.direction.toString() is "down"
      this.drawEyeBall @player.position.x - (@radius * 3/8), @player.position.y - (@radius * 4/8)
      this.drawEyeBall @player.position.x + (@radius * 3/8), @player.position.y - (@radius * 4/8)

  drawEyeBall: (x, y) ->
    @context.beginPath()
    @context.fillStyle = "#FFF"
    @context.moveTo x, y
    @context.bezierCurveTo x - (@radius * 3/8), y,
                           x - (@radius * 3/8), y + (@radius * 6/8)
                           x, y + (@radius * 6/8)

    @context.bezierCurveTo x + (@radius * 3/8), y + (@radius * 6/8),
                           x + (@radius * 3/8), y,
                           x, y

    @context.fill()

  drawPupils: ->
    if @player.direction.toString() is "left"
      this.drawPupil @player.position.x - (@radius * 6/8), @player.position.y - (@radius * 1/8)
      this.drawPupil @player.position.x, @player.position.y - (@radius * 1/8)

    else if @player.direction.toString() is "right"
      this.drawPupil @player.position.x, @player.position.y - (@radius * 1/8)
      this.drawPupil @player.position.x + (@radius * 6/8), @player.position.y - (@radius * 1/8)

    else if @player.direction.toString() is "up"
      this.drawPupil @player.position.x - (@radius * 3/8), @player.position.y - (@radius * 6/8)
      this.drawPupil @player.position.x + (@radius * 3/8), @player.position.y - (@radius * 6/8)

    else if @player.direction.toString() is "down"
      this.drawPupil @player.position.x - (@radius * 3/8), @player.position.y + (@radius * 1/8)
      this.drawPupil @player.position.x + (@radius * 3/8), @player.position.y + (@radius * 1/8)

  drawPupil: (x, y) ->
    @context.beginPath()
    @context.fillStyle = "#3000FF"
    @context.arc x, y, @radius * 1/8, 0, Math.PI * 2, false
    @context.fill()

  drawBody: ->
    @context.fillStyle = @player.color
    @context.strokeStyle = @player.color
    @context.beginPath()
    @context.arc @player.position.x, @player.position.y, @radius, 0, Math.PI, true
    @context.stroke()
    @context.fill()
    @context.fillRect @player.position.x - @radius, @player.position.y - 1, @radius * 2, (@radius * 2/3) + 1
    @context.strokeRect @player.position.x - @radius, @player.position.y - 1, @radius * 2, (@radius * 2/3) + 1

  drawBottomBody: () ->
    @context.strokeStyle = @player.color
    @context.fillStyle = @player.color
    @context.beginPath()
    @context.moveTo @player.position.x - @radius, @player.position.y + (@radius * 2/3)

    bottomBodyFrames = []
    bottomBodyFrames[0] = =>
      cpx = @player.position.x - (@radius * 2/3)
      cpy = @player.position.y + (@radius * 1.2)
      @context.bezierCurveTo cpx, cpy, cpx, cpy, @player.position.x - (@radius * 1/3), @player.position.y + (@radius * 2/3)
      cpx = @player.position.x
      cpy = @player.position.y + (@radius * 1.2)
      @context.bezierCurveTo cpx, cpy, cpx, cpy, @player.position.x + (@radius * 1/3), @player.position.y + (@radius * 2/3)
      cpx = @player.position.x + (@radius * 2/3)
      cpy = @player.position.y + (@radius * 1.2)
      @context.bezierCurveTo cpx, cpy, cpx, cpy, @player.position.x + @radius, @player.position.y + (@radius * 2/3)
      @context.lineTo @player.position.x - @radius, @player.position.y + (@radius * 2/3)

    bottomBodyFrames[1] = =>
      @context.lineTo @player.position.x - @radius, @player.position.y + @radius
      @context.lineTo @player.position.x - (@radius * 2/3), @player.position.y + (@radius * 2/3)
      cpx = @player.position.x - (@radius * 1/6)
      cpy = @player.position.y + (@radius * 1.2)
      @context.bezierCurveTo cpx, cpy, cpx, cpy, @player.position.x - (@radius * 1/6), @player.position.y + (@radius * 2/3)
      @context.lineTo @player.position.x + (@radius * 1/6), @player.position.y + (@radius * 2/3)
      cpx = @player.position.x + (@radius * 1/6)
      @context.bezierCurveTo cpx, cpy, cpx, cpy, @player.position.x + (@radius * 2/3), @player.position.y + (@radius * 2/3)
      @context.lineTo @player.position.x + @radius, @player.position.y + @radius
      @context.lineTo @player.position.x + @radius, @player.position.y + (@radius * 2/3)
      @context.lineTo @player.position.x - @radius, @player.position.y + (@radius * 2/3)

    @animationTime ?= new Timer
    if @animationTime.spentMiliseconds() >= 200 and not @player.frozen and @player.canMove()
      @frame += 1
      @frame = 0 unless frames[@frame]?
      delete @animationTime
    else if @frozen or not @player.canMove()
      @frame = 0

    bottomBodyFrames[@frame]()
    @context.stroke()
    @context.fill()
