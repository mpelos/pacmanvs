class Food extends Entity
  constructor: (x, y, @map) ->
    super
    @width = Math.ceil(Map.tileWidth / 10)
    @height = Math.ceil(Map.tileHeight / 10)
    @boundingBox = new Rectangle(@position, @width, @height)
    @eated = false

  getEaten: ->
    @eated = true

  draw: (context) ->
    unless @eated
      context.fillStyle = "#FFF"
      context.beginPath()
      context.fillRect(@position.x - (@width / 2), @position.y - (@height / 2), @width, @height)

  reset: ->
    @eated = false
    this.includeIntoTiles()
