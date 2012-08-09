class Pacman extends Player
  collidesWith: (entity) ->
    this.collidesWithFood(entity) if entity instanceof Food

  collidesWithFood: (food) ->
    food.excludeFromTiles()
    food.position.change(null, null)
    @map.foodCounter -= 1

  draw: (context) ->
    @renderer ?= new PacmanRenderer(this, context)
    @renderer.draw()
