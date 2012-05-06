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

  toArray: ->
    [this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft()]

  isIntersected: (other) ->
    isIntersectOnXAxis = this.topLeft().x <= other.topLeft().x  <= this.topRight().x or
                         this.topLeft().x <= other.topRight().x <= this.topRight().x

    isIntersectOnYAxis = this.topRight().y <= other.topRight().y    <= this.bottomRight().y or
                         this.topRight().y <= other.bottomRight().y <= this.bottomRight().y

    isIntersectOnXAxis and isIntersectOnYAxis
