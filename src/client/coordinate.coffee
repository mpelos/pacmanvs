class Coordinate
  constructor: (@x, @y) ->

  set: ->
    if arguments[0] instanceof Coordinate
      position = arguments[0]
      @x = position.x
      @y = position.y
    else
      @x = arguments[0]
      @y = arguments[1]

  betweenAxisX: (x1, x2) ->
    x1 < @x < x2 or x1 > @x > x2

  betweenAxisY: (y1, y2) ->
    y1 < @y < y2 or y1 > @y > y2

  betweenAxis: (coordinate1, coordinate2) ->
    this.betweenAxisX(coordinate1.x, coordinate2.x) or this.betweenAxisY(coordinate1.y, coordinate2.y)

  toString: ->
    "#{@x}, #{@y}"
