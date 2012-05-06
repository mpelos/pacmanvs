class Entity
  constructor: (x, y, @map) ->
    @position = new Coordinate(x, y)
    @boundingBox = new Rectangle(@position, Map.TILE_WIDTH, Map.TILE_HEIGHT)

  currentTiles: (positions = @boundingBox.toArray()) ->
    positions = [positions] unless positions instanceof Array
    tiles = []
    for position in positions
      i = Math.floor(position.y / Map.TILE_HEIGHT)
      j = Math.floor(position.x / Map.TILE_WIDTH)
      tiles.push(@map.tiles[i][j])

    _.uniq(tiles)

  excludeFromTiles: ->
    for tile in this.currentTiles()
      tileEntities = []
      for entity in tile.entities
        tileEntities.push(entity) if entity isnt this

      tile.entities = tileEntities

  includeIntoTiles: ->
    tile.entities.push(this) for tile in this.currentTiles()

  isIntersected: (other) ->
    @boundingBox.isIntersected(other.boundingBox)
