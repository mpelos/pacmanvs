class Rectangle
  constructor: (@position, @width, @height) ->

  topLeft: ->
    new Coordinate(@position.x - @width / 2, @position.y - @height / 2)

  topRight: ->
    new Coordinate(@position.x + @width / 2 - 0.5, @position.y - @height / 2)

  bottomRight: ->
    new Coordinate(@position.x + @width / 2 - 0.5, @position.y + @height / 2 - 0.5)

  bottomLeft: ->
    new Coordinate(@position.x - @width / 2, @position.y + @height / 2 - 0.5)

  verticesPositions: ->
    [this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft()]
