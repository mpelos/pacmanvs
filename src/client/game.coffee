class Game
  MAX_FPS = 60

  constructor: ->
    @map = new Map
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
    @message = "WAIT"
    this.loop(1000/MAX_FPS) # starts the game loop

  calculateFps: ->
    @framesCounter ?= 0
    @fps ?= MAX_FPS

    @fpsTimer ?= new Timer
    unless @fpsTimer.spentMiliseconds() < 1000
      delete @fpsTimer
      @fps = @framesCounter
      @framesCounter = 0

    @framesCounter += 1
    @fps

  drawFps: ->
    @context.player.font = "bold 12px sans-serif"
    @context.player.textAlign = "right"
    @context.player.fillStyle = "#FFF"
    @context.player.fillText "#{@fps} FPS", (@canvas.map.width - 5), (@canvas.map.height - 5)

  drawMessage: ->
    if @message
      x = 14 * Map.TILE_WIDTH
      y = (17 * Map.TILE_HEIGHT) + (Map.TILE_HEIGHT / 2)
      context = @context.player
      context.font = "bold #{Map.TILE_HEIGHT}px sans-serif"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillStyle = "#FDFB4A"
      context.fillText @message, x, y

  update: ->
    this.calculateFps()
    player.update(@fps) for player in @map.entities.players
    @collider.makeCollisions()

  draw: ->
    @canvas.player.width = @canvas.player.width # clear player canvas
    food.draw(@context.player) for food in @map.entities.foods
    player.draw(@context.player) for player in @map.entities.players
    this.drawFps()
    this.drawMessage()

  handleKey: (event) =>
    switch event.which
      when 37 then @player.turnLeft()  # left arrow
      when 38 then @player.turnUp()    # up arrow
      when 39 then @player.turnRight() # right arrow
      when 40 then @player.turnDown()  # down arrow

  handleCharacter: (characterCode) =>
    @player = @map.entities.players[characterCode]

  handleMessage: (message) =>
    @message = message

  handleStatus: (status) =>
    if status == "running"
      @message = ""
      player.unfreeze() for player in @map.entities.players
    else if status == "frozen"
      @message = "WAIT"
      player.freeze() for player in @map.entities.players

  loop: ->
    requestAnimationFrame this.tick

  tick: =>
    startTime = new Date
    this.update()
    this.draw()
    endTime = new Date

    this.loop()
