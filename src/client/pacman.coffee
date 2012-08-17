class Pacman extends Player
  collidesWith: (entity) ->
    this.collidesWithFood(entity) if entity instanceof Food

  collidesWithFood: (food) ->
    food.excludeFromTiles()
    food.position.change(null, null)
    @map.foodCounter -= 1

  getCaught: ->
    if this.isAlive()
      @status = "caught"
      this.freeze()

  gotCaught: ->
    @status is "caught"

  die: ->
    if this.gotCaught()
      @status = "dead"
      @renderer.frame = 0
      this.unfreeze()

  isDead: ->
    @status is "dead"

  update: (gameFps) ->
    this.calculateDisplacement(gameFps)

    if not @frozen and not this.isDead()
      this.updateDirection()
      this.updatePosition()

  draw: (context) ->
    @renderer ?= new PacmanRenderer(this, context)
    @renderer.draw()
