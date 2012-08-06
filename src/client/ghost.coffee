class Ghost extends Player
  constructor: (x, y, @map, options) ->
    super
    @color = options.color
    @status = "vulnerable"

  canMove: (direction = @direction) ->
    not _.any(this.tilesAhead(direction), (tile) -> tile.isWall())

  draw: (context) ->
    @renderer ?= new GhostRenderer(this, context)

    @animationTime ?= new Cronometer
    if @animationTime.spentMiliseconds() >= 200 and not @frozen and this.canMove()
      @frame += 1
      @frame = 0 unless animations[@frame]?
      delete @animationTime
    else if @frozen or not this.canMove()
      @frame = 0

    @renderer.draw(@frame)
