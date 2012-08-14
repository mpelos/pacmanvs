class PacmanRenderer extends PlayerRenderer
  constructor: (@player, @context) ->
    super
    @frames = new Array
    @frames[0] = =>
      @context.arc 0, 0, @radius, 0, Math.PI * 2, true
    @frames[1] = =>
      @context.arc 0, 0, @radius, Math.PI * 0.1, Math.PI * 1.9, false
    @frames[2] = =>
      @context.arc 0, 0, @radius, Math.PI * 0.2, Math.PI * 1.8, false
    @frames[3] = =>
      @context.arc 0, 0, @radius, Math.PI * 0.3, Math.PI * 1.7, false

    @aliveFrames = [
      @frames[3]
      @frames[2]
      @frames[1]
      @frames[0]
      @frames[1]
      @frames[2]
      @frames[3]
    ]

  draw: ->
    @context.beginPath()
    @context.fillStyle = "#FF0"
    @context.save()
    @context.translate @player.position.x, @player.position.y
    @context.rotate @player.direction.angle

    if @player.frozen
      @frames[0]()
    else unless @player.canMove()
      @frames[2]()
    else if @player.isAlive()
      frames = @aliveFrames

      @animationTime ?= new Timer
      if @animationTime.spentMiliseconds() >= 15
        @frame += 1
        @frame = 0 unless frames[@frame]?
        delete @animationTime

      frames[@frame]()

    @context.lineTo -(@radius / 4), 0
    @context.fill()
    @context.restore()
