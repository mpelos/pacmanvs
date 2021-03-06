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
    @pacman = @characters[0]
    @foods = @map.entities.foods
    @pacmanLifes = 3
    @collider = new Collider(@map.entities)
    @fpsTimer = new Timer(1000)
    @message = "Wait" # Initial game message
    this.drawPacmanLifes()
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

  handleKey: (event, characterCode = @characters.indexOf(@player)) =>
    player = @characters[characterCode]
    keyCode = if player is @player then event.which else event

    if player is @player and _.contains([37..40], keyCode)
      socket.emit("keyPress", keyCode, @characters.indexOf(@player))

    switch keyCode
      when 37 then player.turnLeft()  # left arrow
      when 38 then player.turnUp()    # up arrow
      when 39 then player.turnRight() # right arrow
      when 40 then player.turnDown()  # down arrow

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
    character.freeze() for character in @characters

  end: (winner) ->
    @status = "ended"
    @message = "#{winner} won"
    this.drawPacmanLifes()

  isFrozen: ->
    @status is "frozen"

  ended: ->
    @status is "ended"

  delay: (time, callback) ->
    @delayTimer ?= new Timer(time)
    @delayTimer.setTime(time) if time
    @delayCallback = callback if callback

    if @delayTimer.timeOver()
      this.play()

      if @delayCallback
        @delayCallback()
        delete @delayCallback
    else
      this.freeze()

  reset: ->
    character.reset() for character in @characters
    @message = "Wait" # Initial game message
    this.drawPacmanLifes()
    this.delay(2000) # Freeze game for 2 seconds

  update: ->
    this.calculateFps()
    this.delay() if this.isFrozen()

    if @map.remainingFoods().length is 0
      this.end("pacman")
    else if @pacman.isAlive()
      character.update(@fps) for character in @characters
      @collider.makeCollisions()
    else if @pacman.gotCaught() and not this.isFrozen()
      this.delay 2000, -> @pacman.die()
    else if @pacman.isDead()
      @endMatchTimer ?= new Timer(4000)

      if @endMatchTimer.timeOver()
        delete @endMatchTimer
        @pacmanLifes -= 1

        if @pacmanLifes > 0
          this.reset()
        else
          this.end("ghosts")

  draw: ->
    @canvas.player.width = @canvas.player.width # clear player canvas
    food.draw(@context.player) for food in @foods
    player.draw(@context.player) for player in @characters
    this.drawMessage()

  drawPacmanLifes: ->
    @canvas.life.width = @canvas.life.width # clear life canvas
    @pacmanRenderer ?= new PacmanRenderer(@context.life)
    @pacmanRenderer.drawLifes(@pacmanLifes)

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

  drawFps: ->
    @context.player.font = "bold 12px sans-serif"
    @context.player.textAlign = "right"
    @context.player.fillStyle = "#FFF"
    @context.player.fillText "#{@fps} FPS", (@canvas.map.width - 5), (@canvas.map.height - 5)

  loop: ->
    requestAnimationFrame this.tick

  tick: =>
    this.update()
    this.draw()
    this.loop() unless this.ended()
