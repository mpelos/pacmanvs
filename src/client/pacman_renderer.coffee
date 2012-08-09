class PacmanRenderer extends PlayerRenderer
  draw: ->
    @context.beginPath()
    @context.fillStyle = "#FF0"

    if @frozen
      @context.arc @player.position.x, @player.position.y, @radius, 0, Math.PI * 2, false
      @context.fill()
    else
      frames = new Array
      frames[0] = =>
        @context.arc @player.position.x, @player.position.y, @radius, @player.direction.angle + Math.PI * 0.3, @player.direction.angle + Math.PI * 1.3, false
        @context.fill()
        @context.beginPath()
        @context.arc @player.position.x, @player.position.y, @radius, @player.direction.angle + Math.PI * 0.7, @player.direction.angle + Math.PI * 1.7, false
        @context.fill()
      frames[1] = =>
        @context.arc @player.position.x, @player.position.y, @radius, @player.direction.angle + Math.PI * 0.2, @player.direction.angle + Math.PI * 1.2, false
        @context.fill()
        @context.beginPath()
        @context.arc @player.position.x, @player.position.y, @radius, @player.direction.angle + Math.PI * 0.8, @player.direction.angle + Math.PI * 1.8, false
        @context.fill()
      frames[2] = =>
        @context.arc @player.position.x, @player.position.y, @radius, @player.direction.angle + Math.PI * 0.1, @player.direction.angle + Math.PI * 1.1, false
        @context.fill()
        @context.beginPath()
        @context.arc @player.position.x, @player.position.y, @radius, @player.direction.angle + Math.PI * 0.9, @player.direction.angle + Math.PI * 1.9, false
        @context.fill()
      frames[3] = =>
        @context.arc @player.position.x, @player.position.y, @radius, 0, Math.PI * 2, false
        @context.fill()
      frames[4] = frames[2]
      frames[5] = frames[1]
      frames[6] = frames[0]

      @animationTime ?= new Timer
      if @player.frozen or not @player.canMove()
        @frame = 1
      else if @animationTime.spentMiliseconds() >= 15 and @player.canMove()
        @frame += 1
        @frame = 0 unless frames[@frame]?
        delete @animationTime

      frames[@frame]()

