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
    @characters = @map.entities.characters
    @foods = @map.entities.foods
    @collider = new Collider(@map.entities)
    @fpsTimer = new Timer(1000)
    this.delay(2000) # Freeze game for 2 seconds
    this.loop()      # starts the game loop

  calculateFps: ->
    @framesCounter ?= 0
    @fps ?= MAX_FPS

    if @fpsTimer.timeOver()
      @fpsTimer.reset()
      @fps = @framesCounter
      @framesCounter = 0

    @framesCounter += 1
    @fps

  draw: ->
    @canvas.player.width = @canvas.player.width # clear player canvas
    food.draw(@context.player) for food in @foods
    player.draw(@context.player) for player in @characters
    this.drawMessage()

  handleKey: (event) =>
    switch event.which
      when 37 then @player.turnLeft()  # left arrow
      when 38 then @player.turnUp()    # up arrow
      when 39 then @player.turnRight() # right arrow
      when 40 then @player.turnDown()  # down arrow

  setPlayerCharacter: (characterCode) =>
    @player = @characters[characterCode]

  setMessage: (message) =>
    @message = message

  play: ->
    @status = "running"
    @message = ""
    character.unfreeze() for character in @characters

  freeze: ->
    @status = "frozen"
    @message = "Wait"
    character.freeze() for character in @characters

  delay: (time) ->
    @delayTimer ?= new Timer(time)
    @delayTimer.setTime(time) if time
    if @delayTimer.timeOver() then this.play() else this.freeze()

  isFrozen: ->
    @status is "frozen"

  update: ->
    this.calculateFps()
    this.delay() if this.isFrozen()
    character.update(@fps) for character in @characters
    @collider.makeCollisions()

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
      context.fillText @message.toUpperCase(), x, y

  loop: ->
    requestAnimationFrame this.tick

  tick: =>
    this.update()
    this.draw()
    this.loop()
