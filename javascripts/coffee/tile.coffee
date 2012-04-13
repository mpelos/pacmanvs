class Tile
  INVALID_TILE = "Invalid Tile"

  constructor: (@map, @i, @j) ->

  current: ->
    if @map.matrix[@i]? and @map.matrix[@i][@j]?
      @map.matrix[@i][@j]
    else
      INVALID_TILE

  above: ->
    new Tile(@map, @i - 1, @j)

  right: ->
    new Tile(@map, @i, @j + 1)

  below: ->
    new Tile(@map, @i + 1, @j)

  left: ->
    new Tile(@map, @i, @j - 1)

  isWall: ->
    if this.current isnt INVALID_TILE
      this.current() is WALL

  isPath: ->
    if this.current isnt INVALID_TILE
      this.current()is PATH
