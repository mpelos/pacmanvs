class Presentation
  MAX_FPS = 60

  constructor: ->
    @map = new Map
    @canvas = {}
    @context = {}
    for canvas in $("canvas")
      name = canvas.id.replace("_canvas", "")
      @canvas[name] = document.getElementById(canvas.id)
      @canvas[name].width  = @map.matrix[0].length * Map.tileWidth
      @canvas[name].height = @map.matrix.length    * Map.tileHeight
      @context[name] = @canvas[name].getContext("2d")

    @map.draw(@context.map)
    @fpsTimer = new Timer(1000)
    @slide = new Slide(this)
    @status = "running"
    this.loop() # starts the loop

  handleKey: (e) =>
    # 37: left arrow
    # 39: right arrow
    # 13: enter

    switch e.which
      when 39 or 13 then @slide.next()
      when 37       then @slide.previous()

  pause: ->
    @status = "paused"
    this.clearAllCanvas()

  paused: ->
    @status is "paused"

  resume: ->
    this.loop() unless this.running()
    @status = "running"

  running: ->
    @status is "running"

  update: ->

  clearAllCanvas: ->
    for type, canvas of @canvas
      canvas.width = canvas.width

  draw: ->
    this.clearAllCanvas()
    @slide.draw()

  loop: ->
    requestAnimationFrame this.tick

  tick: =>
    this.update()
    this.draw()
    this.loop() if this.running()
