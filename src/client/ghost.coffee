class Ghost extends Player
  constructor: (x, y, @map, options) ->
    super
    @color = options.color

  canMove: (direction = @direction) ->
    not _.any(this.tilesAhead(direction), (tile) -> tile.isWall())

  collidesWith: (entity) ->
    this.collidesWithPacman(entity) if entity instanceof Pacman

  collidesWithPacman: (pacman) ->
    pacman.getCaught()

  draw: (context) ->
    @renderer ?= new GhostRenderer(this, context)
    @renderer.draw()
