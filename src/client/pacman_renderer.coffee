class PacmanRenderer extends PlayerRenderer
  constructor: (@context, @player) ->
    super
    @frame = 3
    @frames = [
      => @context.arc 0, 0, @radius, 0, Math.PI * 2, true
      => @context.arc 0, 0, @radius, Math.PI * 0.1, Math.PI * 1.9, false
      => @context.arc 0, 0, @radius, Math.PI * 0.2, Math.PI * 1.8, false
      => @context.arc 0, 0, @radius, Math.PI * 0.3, Math.PI * 1.7, false
      => @context.arc 0, 0, @radius, Math.PI * 0.4, Math.PI * 1.6, false
      => @context.arc 0, 0, @radius, Math.PI * 0.5, Math.PI * 1.5, false
      => @context.arc 0, 0, @radius, Math.PI * 0.6, Math.PI * 1.4, false
      => @context.arc 0, 0, @radius, Math.PI * 0.7, Math.PI * 1.3, false
      => @context.arc 0, 0, @radius, Math.PI * 0.8, Math.PI * 1.2, false
      => @context.arc 0, 0, @radius, Math.PI * 0.9, Math.PI * 1.1, false
      => @context.arc 0, 0, @radius, Math.PI, Math.PI, false
    ]

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

    if @player.isDead()
      @dyingAnimationTimer ?= new Timer(60)
      if @dyingAnimationTimer.timeOver()
        @frame += 1 if @frames[@frame + 1]?
        delete @dyingAnimationTimer

      @frames[@frame]()

    else
      unless @player.frozen
        @aliveAnimationTimer ?= new Timer(30)
        if @aliveAnimationTimer.timeOver()
          @frame += 1
          @frame = 0 unless @aliveFrames[@frame]?
          delete @aliveAnimationTimer

        @frame = 1 if @player.isAlive() and not @player.canMove()

      @aliveFrames[@frame]()

    @context.lineTo -(@radius / 4), 0
    @context.fill()
    @context.restore()

  drawLifes: (lifes) ->
    y = (Map.tileHeight * MAPS_MATRIX[0].length) - @radius
    _.times lifes, (n) =>
      x = (Map.tileWidth * MAPS_MATRIX[0][0].length) - (n * Map.tileWidth) - @radius
      @context.save()
      @context.translate x, y
      @context.scale 0.65, 0.65
      @context.beginPath()
      @context.fillStyle = "#FF0"
      @frames[2]()
      @context.lineTo -(@radius / 4), 0
      @context.fill()
      @context.restore()

  reset: ->
    @frame = 3
