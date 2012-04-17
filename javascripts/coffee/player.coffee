class Player
  constructor: (x, y) ->
    @position = new Coordinate(x, y)
    @startPosition = @position
    @direction = new Coordinate(-1, 0) # Initial direction: left

  move: (x, y) ->
    @position.x += @direction.x
    @position.y += @direction.y

  setDirection: (direction) ->
    switch direction
      when "left"   then @direction.change(-1, 0)
      when "up"     then @direction.change(0, -1)
      when "right"  then @direction.change(1, 0)
      when "bottom" then @direction.change(0, 1)

  draw: (context) ->
    # draw the pacman position
    context.font = "bold 12px sans-serif"
    context.textAlign = "center"
    context.fillStyle = "#FFF"
    context.fillText ("(" + @position.x + ", " + @position.y + ")"), @position.x, (@position.y - TILE_HEIGHT)

    radius = (TILE_WIDTH + (WALL_PADDING / 2)) / 2
    context.beginPath()
    context.arc @position.x, @position.y, radius, 0, Math.PI * 2, false
    context.closePath()
    context.strokeStyle = "#FF0"
    context.stroke()
    context.fillStyle = "#FF0"
    context.fill()
