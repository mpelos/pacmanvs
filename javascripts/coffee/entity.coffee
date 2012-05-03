class Entity
  constructor: (x, y, @map) ->
    @position = new Coordinate(x, y)
    @collisionLimit = new CollisionLimit(@position, Map.TILE_WIDTH, Map.TILE_HEIGHT)

  currentTile: (referencePoint = @position) ->
    i = Math.floor(referencePoint.y / Map.TILE_HEIGHT)
    j = Math.floor(referencePoint.x / Map.TILE_WIDTH)
    @map.tiles[i][j]
