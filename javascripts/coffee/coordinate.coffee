class Coordinate
  constructor: (@x, @y) ->

  change: (x, y) ->
    @x = x
    @y = y

  toString: ->
    "#{@x}, #{@y}"
