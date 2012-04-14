class Player
  constructor: (@x, @y) ->
    @startX = @x
    @startY = @y

  draw: (context) ->
    radius = (TILE_WIDTH + (WALL_PADDING / 2)) / 2
    context.beginPath()
    context.arc @x, @y, radius, 0, Math.PI * 2, false
    context.closePath()
    context.strokeStyle = "#FFFF00"
    context.stroke()
    context.fillStyle = "#FFFF00"
    context.fill()
