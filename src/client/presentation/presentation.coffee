class Presentation
  MAX_FPS = 60

  constructor: ->
    @map = new Map({ mapIndex: 1 })
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
    @slide = new Slide(@context, @map)
    this.loop() # starts the loop

  handleKey: (e) =>
    # 37: left arrow
    # 39: right arrow
    # 13: enter

    switch e.which
      when 39 or 13 then @slide.next()
      when 37       then @slide.previous()

  update: ->

  draw: ->
    for type, canvas of @canvas
      canvas.width = canvas.width

    @slide.draw()

  loop: ->
    requestAnimationFrame this.tick

  tick: =>
    this.update()
    this.draw()
    this.loop()
