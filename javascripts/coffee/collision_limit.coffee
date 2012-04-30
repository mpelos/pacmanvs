class CollisionLimit
  constructor: (@position, @width, @height) ->

  verticesPositions: ->
    new Array(
      new Coordinate(@position.x - @width / 2, @position.y - @height / 2),             # top-left
      new Coordinate(@position.x + @width / 2 - 0.5, @position.y - @height / 2),       # top-right
      new Coordinate(@position.x + @width / 2 - 0.5, @position.y + @height / 2 - 0.5), # bottom-right
      new Coordinate(@position.x - @width / 2, @position.y + @height / 2 - 0.5)        # bottom-left
    )
