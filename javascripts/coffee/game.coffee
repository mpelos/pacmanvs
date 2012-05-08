class Game
  MAX_FPS = 60

  constructor: ->
    @map = new Map
    @pacman = @map.entities.players[0]

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
    food.draw(@context.player) for food in @map.entities.foods
    player.draw(@context.player) for player in @map.entities.players
    this.drawFps()

  handleKey: (event) =>
    switch event.which
      when 37 then @pacman.turnLeft()  # left arrow
      when 38 then @pacman.turnUp()    # up arrow
      when 39 then @pacman.turnRight() # right arrow
      when 40 then @pacman.turnDown()  # down arrow

  loop: (delay) ->
    setTimeout this.tick, delay

  tick: =>
    startTime = new Date
    this.update()
    this.draw()
    endTime = new Date

    delay = (1000/MAX_FPS) - (endTime - startTime)
    this.loop(delay)
