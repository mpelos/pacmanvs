class PacmanRenderer extends PlayerRenderer
  draw: ->
    @context.beginPath()
    @context.fillStyle = "#FF0"
    @context.save()
    @context.translate @player.position.x, @player.position.y
    @context.rotate @player.direction.angle

    if @frozen
      @context.arc @player.position.x, @player.position.y, @radius, 0, Math.PI * 2, false
      @context.fill()
    else
      frames = new Array
      frames[0] = =>
        @context.arc 0, 0, @radius, 0, Math.PI * 2, true
      frames[1] = =>
        @context.arc 0, 0, @radius, Math.PI * 0.1, Math.PI * 1.9, false
      frames[2] = =>
        @context.arc 0, 0, @radius, Math.PI * 0.2, Math.PI * 1.8, false
      frames[3] = =>
        @context.arc 0, 0, @radius, Math.PI * 0.3, Math.PI * 1.7, false

      aliveFrames = [
        frames[3]
        frames[2]
        frames[1]
        frames[0]
        frames[1]
        frames[2]
        frames[3]
      ]

      @animationTime ?= new Timer
      if @player.frozen or not @player.canMove()
        @frame = 1
      else if @animationTime.spentMiliseconds() >= 15 and @player.canMove()
        @frame += 1
        @frame = 0 unless aliveFrames[@frame]?
        delete @animationTime

      aliveFrames[@frame]()
      @context.lineTo -(@radius / 4), 0
      @context.fill()
      @context.restore()
