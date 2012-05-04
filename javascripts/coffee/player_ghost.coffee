class Ghost extends Player
  drawEyeBall: (context, x, y) ->
    context.beginPath()
    context.fillStyle = "#FFF"
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2
    context.moveTo x, y
    context.bezierCurveTo x - (radius * 3/8), y,
                          x - (radius * 3/8), y + (radius * 6/8)
                          x, y + (radius * 6/8)

    context.bezierCurveTo x + (radius * 3/8), y + (radius * 6/8),
                          x + (radius * 3/8), y,
                          x, y

    context.fill()


  draw: (context) ->
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2

    # Body
    context.fillStyle = "#FF3100"
    context.strokeStyle = "#FF3100"
    context.beginPath()
    context.arc @position.x, @position.y, radius, 0, Math.PI, true
    context.stroke()
    context.fill()
    context.fillRect @position.x - radius, @position.y - 1, radius * 2, radius / 2 + 1
    context.strokeRect @position.x - radius, @position.y - 1, radius * 2, radius / 2 + 1
    context.beginPath()
    context.moveTo @position.x - radius, @position.y + (radius / 2)
    cpx = @position.x - (radius * 2/3)
    cpy = @position.y + radius
    context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x - (radius * 1/3), @position.y + (radius / 2)
    cpx = @position.x
    cpy = @position.y + radius
    context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x + (radius * 1/3), @position.y + (radius / 2)
    cpx = @position.x + (radius * 2/3)
    cpy = @position.y + radius
    context.bezierCurveTo cpx, cpy, cpx, cpy, @position.x + radius, @position.y + (radius / 2)
    context.lineTo @position.x - radius, @position.y + (radius / 2)
    context.stroke()
    context.fill()

    # Eyes
    this.drawEyeBall(context, @position.x - (radius * 5/8), @position.y - (radius * 4/8))
    this.drawEyeBall(context, @position.x + (radius * 1/8), @position.y - (radius * 4/8))

    context.beginPath()
    context.fillStyle = "#3000FF"
    context.arc @position.x - (radius * 6/8), @position.y - (radius * 1/8), radius * 1/8, 0, Math.PI * 2, false
    context.arc @position.x, @position.y - (radius * 1/8), radius * 1/8, 0, Math.PI * 2, false
    context.fill()
