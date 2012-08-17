class PacmanRenderer extends PlayerRenderer
  constructor: (@player, @context) ->
    super
    @animationTimer = new Timer(30)
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

    if not @player.frozen
      frames = switch @player.status
        when "alive" then @aliveFrames
        when "dead"  then @frames

      if @animationTimer.timeOver()
        @frame += 1
        @frame = 0 unless frames[@frame]?
        @animationTimer.reset()

      @frame = 1 if @player.isAlive() and not @player.canMove()
      frames[@frame]()

    else
      @frames[0]()

    @context.lineTo -(@radius / 4), 0
    @context.fill()
    @context.restore()
