class Tile
  constructor: (@map, @i, @j, @type) ->
    @entities = []

  centerCoordinate: ->
    x = (@j * Map.TILE_WIDTH) + (Map.TILE_WIDTH / 2)
    y = (@i * Map.TILE_HEIGHT) + (Map.TILE_HEIGHT / 2)
    new Coordinate(x, y)

  above: ->
    @map.tiles[@i - 1]?[@j]

  aboveRight: ->
    @map.tiles[@i - 1]?[@j + 1]

  right: ->
    @map.tiles[@i][@j + 1]

  belowRight: ->
    @map.tiles[@i + 1]?[@j + 1]

  below: ->
    @map.tiles[@i + 1]?[@j]

  belowLeft: ->
    @map.tiles[@i + 1]?[@j - 1]

  left: ->
    @map.tiles[@i][@j - 1]

  aboveLeft: ->
    @map.tiles[@i - 1]?[@j - 1]

  isWall: ->
    @type is Map.WALL

  isPath: ->
    @type is Map.PATH

  isWallUpCorner: ->
    this.above()?.isPath() and this.below()?.isWall()

  isWallRightCorner: ->
    this.right()?.isPath() and this.left()?.isWall()

  isWallDownCorner: ->
    this.below()?.isPath() and this.above()?.isWall()

  isWallLeftCorner: ->
    this.left()?.isPath() and this.right()?.isWall()
