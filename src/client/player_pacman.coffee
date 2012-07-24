class Pacman extends Player
  collidesWith: (entity) ->
    this.collidesWithFood(entity) if entity instanceof Food

  collidesWithFood: (food) ->
    food.excludeFromTiles()
    food.position.change(null, null)
    @map.foodCounter -= 1

  draw: (context) ->
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    context.beginPath()
    context.fillStyle = "#FF0"

    if @isFrozen
      context.arc @position.x, @position.y, radius, 0, Math.PI * 2, false
      context.fill()
    else
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
      
      @animationTime ?= new Cronometer
      if @animationTime.spentMiliseconds() >= 15 and this.canMove()
        @animationIndex += 1
        @animationIndex = 0 unless animations[@animationIndex]?
        delete @animationTime
      else if not this.canMove()
        @animationIndex = 1
      
      animations[@animationIndex]()
