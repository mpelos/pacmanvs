class Game
  MAX_FPS = 60

  constructor: ->
    @map = new Map
    @pacman = @map.entities.players.first()

    @canvas = {}
    @context = {}
    for canvas in $("canvas")
      name = canvas.id.replace("_canvas", "")
      @canvas[name] = document.getElementById(canvas.id)
      @canvas[name].width  = @map.matrix[0].length * Map.TILE_WIDTH
      @canvas[name].height = @map.matrix.length    * Map.TILE_HEIGHT
      @context[name] = @canvas[name].getContext("2d")

    @map.draw(@context.map)
    @collider = new Collider(@map.entities)
    this.loop(1000/MAX_FPS) # starts the game loop

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
    @pacman.update(@fps)
    @collider.makeCollisions()

  draw: ->
    @canvas.player.width = @canvas.player.width # clear player canvas
    player.draw(@context.player) for player in @map.entities.players
    food.draw(@context.player) for food in @map.entities.foods
    this.drawFps()

  handleKey: (event) =>
    switch event.which
      when 37 then @pacman.intentDirection.set("left")  # left arrow
      when 38 then @pacman.intentDirection.set("up")    # up arrow
      when 39 then @pacman.intentDirection.set("right") # right arrow
      when 40 then @pacman.intentDirection.set("down")  # down arrow

  loop: (initialDelay) ->
    @delay ?= initialDelay

    setTimeout( =>
      startTime = new Date
      this.update()
      this.draw()
      endTime = new Date

      @delay = (1000/MAX_FPS) - (endTime - startTime)
      this.loop()
    @delay)
