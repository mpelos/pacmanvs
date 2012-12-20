class Entity
  constructor: (x, y, @map) ->
    @position = new Coordinate(x, y)
    @initialPosition = new Coordinate(x, y)
    @boundingBox = new Rectangle(@position, Map.tileWidth, Map.tileHeight)

  currentTiles: (positions = @boundingBox.toArray()) ->
    positions = [positions] unless positions instanceof Array
    tiles = []
    for position in positions
      i = Math.floor(position.y / Map.tileHeight)
      j = Math.floor(position.x / Map.tileWidth)
      tiles.push(@map.tiles[i][j])

    _.uniq(tiles)

  excludeFromTiles: ->
    for tile in this.currentTiles()
      if tile
        tileEntities = []
        for entity in tile.entities
          tileEntities.push(entity) if entity isnt this

        tile.entities = tileEntities

  includeIntoTiles: ->
    tile?.entities.push(this) for tile in this.currentTiles()

  isIntersected: (other) ->
    @boundingBox.isIntersected(other.boundingBox)

  drawBoundingBox: (context) ->
    context.lineWidth = 2
    context.strokeStyle = "red"
    context.strokeRect @boundingBox.topLeft().x, @boundingBox.topLeft().y, @boundingBox.width, @boundingBox.height

  reset: ->
