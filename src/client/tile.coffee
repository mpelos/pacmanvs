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

  isWall: (wallType = Map.WALL) ->
    @type is wallType

  isPath: ->
    @type is Map.PATH

  isWallUpCorner: (wallType = Map.WALL) ->
    this.above()?.isPath() and this.below()?.isWall(wallType)

  isWallRightCorner: (wallType = Map.WALL) ->
    this.right()?.isPath() and this.left()?.isWall(wallType)

  isWallDownCorner: (wallType = Map.WALL) ->
    this.below()?.isPath() and this.above()?.isWall(wallType)

  isWallLeftCorner: (wallType = Map.WALL) ->
    this.left()?.isPath() and this.right()?.isWall(wallType)
