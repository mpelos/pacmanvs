class CollisionLimit
  constructor: (@position, @width, @height) ->

  verticesPositions: ->
    new Array(
      new Coordinate(@position.x - @width / 2, @position.y - @height / 2),             # top-left
      new Coordinate(@position.x + @width / 2 - 0.5, @position.y - @height / 2),       # top-right
      new Coordinate(@position.x + @width / 2 - 0.5, @position.y + @height / 2 - 0.5), # bottom-right
      new Coordinate(@position.x - @width / 2, @position.y + @height / 2 - 0.5)        # bottom-left
    )

  intersectOnXAxis: (otherCollisionLimit) ->
    otherCollisionLimit.verticesPositions().some (position) =>
      this.verticesPositions()[0].x < position.x < this.verticesPositions()[1].x

  intersectOnYAxis: (otherCollisionLimit) ->
    otherCollisionLimit.verticesPositions().some (position) =>
      this.verticesPositions()[1].y < position.y < this.verticesPositions()[2].y

  collidesWith: (otherCollisionLimit) ->
    this.intersectOnXAxis(otherCollisionLimit) and this.intersectOnYAxis(otherCollisionLimit)
