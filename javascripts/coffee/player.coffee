class Player
  constructor: (@map, x, y) ->
    @position = new Coordinate(x, y)
    @startPosition = @position
    @direction = new Coordinate(-1, 0) # Initial direction: left
    @directionIntent = new Coordinate

  setDirection: (direction) ->
    switch direction
      when "left"   then @direction.change(-1, 0)
      when "up"     then @direction.change(0, -1)
      when "right"  then @direction.change(1, 0)
      when "bottom" then @direction.change(0, 1)

  currentTile: ->
    x = @position.x - (@direction.x * (Map.TILE_WIDTH / 2))
    y = @position.y - (@direction.y * (Map.TILE_HEIGHT / 2))
    x -= 1 if @direction.x < 0 and @direction.y is 0
    y -= 1 if @direction.y < 0 and @direction.x is 0
    i = Math.floor(y / Map.TILE_HEIGHT)
    j = Math.floor(x / Map.TILE_WIDTH)
    new Tile(@map, i, j)

  tileAhead: ->
    i = this.currentTile().i + @direction.y
    j = this.currentTile().j + @direction.x
    new Tile(@map, i, j)

  canMove: ->
    if @direction.x isnt 0
      isAxisCenter = @position.y is this.currentTile().centerCoordinate().y
    else
      isAxisCenter = @position.x is this.currentTile().centerCoordinate().x

    this.tileAhead().isPath() and isAxisCenter

  move: (x, y) ->
    if this.canMove()
      @position.x += @direction.x
      @position.y += @direction.y

  draw: (context) ->
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    context.beginPath()
    context.arc @position.x, @position.y, radius, 0, Math.PI * 2, false
    context.closePath()
    context.strokeStyle = "#FF0"
    context.stroke()
    context.fillStyle = "#FF0"
    context.fill()

  drawPosition: (context) ->
    context.font = "bold 12px sans-serif"
    context.textAlign = "center"
    context.fillStyle = "#FFF"
    context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - Map.TILE_HEIGHT)
