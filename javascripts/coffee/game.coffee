class Game
  FPS = 60

  constructor: ->
    @map = new Map

  init: ->
    for array, i in @map.matrix
      for value, j in array
        tile = new Tile(@map, i, j)
        x = tile.centerCoordinate().x
        y = tile.centerCoordinate().y

        if value is Map.PACMAN
          @map.matrix[i][j] = Map.PATH
          @pacman = new Player(@map, x, y)

    @canvas = {}
    @context = {}
    for canvas in $("canvas")
      name = canvas.id.replace("_canvas", "")
      @canvas[name] = document.getElementById(canvas.id)
      @canvas[name].width  = @map.matrix[0].length * Map.TILE_WIDTH
      @canvas[name].height = @map.matrix.length    * Map.TILE_HEIGHT
      @context[name] = @canvas[name].getContext("2d")

    @map.draw(@context.map)
    @map.drawGrid(@context.map)

    this.loop() # starts the game loop

  update: ->
    @pacman.move()

  draw: ->
    @canvas.player.width = @canvas.player.width # clear player canvas
    @pacman.draw(@context.player)
    @pacman.drawPosition(@context.player)

  handleKey: (event) =>
    switch event.which
      when 37 then @pacman.setDirection("left")   # left arrow
      when 38 then @pacman.setDirection("up")     # up arrow
      when 39 then @pacman.setDirection("right")  # right arrow
      when 40 then @pacman.setDirection("bottom") # down arrow

  loop: ->
    setTimeout( =>
      this.update()
      this.draw()
      this.loop()
    1000/FPS)
