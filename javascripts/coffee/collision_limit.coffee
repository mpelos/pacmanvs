class CollisionLimit
  constructor: (@position, @width, @height) ->

  verticesPositions: ->
    new Array(
      new Coordinate(@position.x - @width / 2, @position.y - @height / 2),
      new Coordinate(@position.x + @width / 2 - 0.5, @position.y - @height / 2),
      new Coordinate(@position.x + @width / 2 - 0.5, @position.y + @height / 2 - 0.5),
      new Coordinate(@position.x - @width / 2, @position.y + @height / 2 - 0.5)
    )
