class Tile
  INVALID = "Invalid tile"

  constructor: (@i, @j) ->

  current: ->
    if Map.MATRIX[@i]? and Map.MATRIX[@i][@j]?
      Map.MATRIX[@i][@j]
    else
      INVALID

  above: ->
    new Tile(@i - 1, @j)

  aboveRight: ->
    new Tile(@i - 1, @j + 1)

  right: ->
    new Tile(@i, @j + 1)

  belowRight: ->
    new Tile(@i + 1, @j + 1)

  below: ->
    new Tile(@i + 1, @j)

  belowLeft: ->
    new Tile(@i + 1, @j - 1)

  left: ->
    new Tile(@i, @j - 1)

  aboveLeft: ->
    new Tile(@i - 1, @j - 1)

  isWall: ->
    this.current() is Map.WALL or this.current() is INVALID

  isPath: ->
    if this.current() isnt INVALID
      this.current() is Map.PATH

  isWallUpCorner: ->
    this.above().isPath() and this.below().isWall()

  isWallRightCorner: ->
    this.right().isPath() and this.left().isWall()

  isWallDownCorner: ->
    this.below().isPath() and this.above().isWall()

  isWallLeftCorner: ->
    this.left().isPath() and this.right().isWall()
