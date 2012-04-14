class Tile
  INVALID = "Invalid tile"

  constructor: (@map, @i, @j) ->

  current: ->
    if @map.matrix[@i]? and @map.matrix[@i][@j]?
      @map.matrix[@i][@j]
    else
      INVALID

  above: ->
    new Tile(@map, @i - 1, @j)

  aboveRight: ->
    new Tile(@map, @i - 1, @j + 1)

  right: ->
    new Tile(@map, @i, @j + 1)

  belowRight: ->
    new Tile(@map, @i + 1, @j + 1)

  below: ->
    new Tile(@map, @i + 1, @j)

  belowLeft: ->
    new Tile(@map, @i + 1, @j - 1)

  left: ->
    new Tile(@map, @i, @j - 1)

  aboveLeft: ->
    new Tile(@map, @i - 1, @j - 1)

  isWall: ->
    this.current() is WALL or this.current() is INVALID

  isPath: ->
    if this.current() isnt INVALID
      this.current() is PATH

  isWallUpCorner: ->
    this.above().isPath() and this.below().isWall()

  isWallRightCorner: ->
    this.right().isPath() and this.left().isWall()

  isWallDownCorner: ->
    this.below().isPath() and this.above().isWall()

  isWallLeftCorner: ->
    this.left().isPath() and this.right().isWall()
