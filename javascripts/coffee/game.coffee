class Game
  FPS = 60

  init: ->
    @canvas = {}
    @context = {}
    for canvas in $("canvas")
      name = canvas.id.replace("_canvas", "")
      @canvas[name] = document.getElementById(canvas.id)
      @canvas[name].width  = Map.MATRIX[0].length * Map.TILE_WIDTH
      @canvas[name].height = Map.MATRIX.length    * Map.TILE_HEIGHT
      @context[name] = @canvas[name].getContext("2d")

    for array, i in Map.MATRIX
      for value, j in array
        x = (j * Map.TILE_WIDTH) + (Map.TILE_WIDTH / 2)
        y = (i * Map.TILE_HEIGHT) + (Map.TILE_HEIGHT / 2)

        if value is Map.PACMAN
          @pacman = new Player(x, y)
          Map.MATRIX[i][j] = Map.PATH

    @map = new Map(Map.MATRIX)
    @map.draw(@context.map)
    @map.drawGrid(@context.map)

    this.loop() # starts the game loop

  update: ->
    i = Math.floor(@pacman.position.x / Map.TILE_WIDTH)
    j = Math.floor(@pacman.position.y / Map.TILE_HEIGHT)
    pacmanTile = new Tile(@map, i, j)
    @pacman.move()

  draw: ->
    @canvas.player.width = @canvas.player.width
    @pacman.draw(@context.player)
    @pacman.drawPosition(@context.player)

  handleKey: (event) =>
    switch event.which
      when 37 then @pacman.setDirection("left")   # left arrow
      when 38 then @pacman.setDirection("up")     # up arrow
      when 39 then @pacman.setDirection("right")  # right arrow
      when 40 then @pacman.setDirection("bottom") # down arrow

  loop: ->
    setInterval( =>
      this.update()
      this.draw()
    1000/FPS)
