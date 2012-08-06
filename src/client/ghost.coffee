class Ghost extends Player
  constructor: (x, y, @map, options) ->
    super
    @color = options.color
    @status = "alive"

  canMove: (direction = @direction) ->
    not _.any(this.tilesAhead(direction), (tile) -> tile.isWall())

  draw: (context) ->
    @renderer ?= new GhostRenderer(this, context)
    @renderer.draw()
