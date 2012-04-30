class Food extends Entity
  draw: ->
    width = Math.ceil(Map.TILE_WIDTH / 10)
    height = Math.ceil(Map.TILE_HEIGHT / 10)
    @context.fillStyle = "#FFF"
    @context.beginPath()
    @context.fillRect(@position.x - (width / 2), @position.y - (height / 2), width, height)
