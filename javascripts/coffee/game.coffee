class Game
  MAX_FPS = 60

  constructor: ->
    @map = new Map
    @delay = 1000 / MAX_FPS

  init: ->
    @canvas = {}
    @context = {}
    for canvas in $("canvas")
      name = canvas.id.replace("_canvas", "")
      @canvas[name] = document.getElementById(canvas.id)
      @canvas[name].width  = @map.matrix[0].length * Map.TILE_WIDTH
      @canvas[name].height = @map.matrix.length    * Map.TILE_HEIGHT
      @context[name] = @canvas[name].getContext("2d")

    @foods = []
    for array, i in @map.matrix
      for value, j in array
        tile = new Tile(@map, i, j)
        x = tile.centerCoordinate().x
        y = tile.centerCoordinate().y

        if value is Map.FOOD
          @map.matrix[i][j] = Map.PATH
          @foods.add(new Food(x, y, @map, @context.player, this))

        if value is Map.PACMAN
          @map.matrix[i][j] = Map.PATH
          @pacman = new Player(x, y, @map, @context.player, this)

    @map.draw(@context.map)
    @map.drawGrid(@context.map)

    this.loop() # starts the game loop

  calculateFps: ->
    @framesCounter ?= 0
    @fps ?= MAX_FPS

    @fpsCronometer ?= new Cronometer
    unless @fpsCronometer.spentMiliseconds() < 1000
      delete @fpsCronometer
      @fps = @framesCounter
      @framesCounter = 0

    @framesCounter += 1
    @fps

  drawFps: ->
    @context.player.font = "bold 12px sans-serif"
    @context.player.textAlign = "right"
    @context.player.fillStyle = "#FFF"
    @context.player.fillText "#{@fps} FPS", (@canvas.map.width - 5), (@canvas.map.height - 5)

  update: ->
    this.calculateFps()
    @pacman.update(this)

  draw: ->
    @canvas.player.width = @canvas.player.width # clear player canvas
    @foods.each (food) -> food.draw()
    @pacman.draw()
    @pacman.drawPosition()
    this.drawFps()

  handleKey: (event) =>
    switch event.which
      when 37 then @pacman.intentDirection.set("left")  # left arrow
      when 38 then @pacman.intentDirection.set("up")    # up arrow
      when 39 then @pacman.intentDirection.set("right") # right arrow
      when 40 then @pacman.intentDirection.set("down")  # down arrow

  loop: ->
    setTimeout( =>
      startTime = new Date
      this.update()
      this.draw()
      this.loop()
      endTime = new Date
      @delay = (1000/MAX_FPS) - (endTime - startTime)
    @delay)
