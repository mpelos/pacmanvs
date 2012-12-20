class Slide
  constructor: (@context, @map) ->
    @current = 0
    @slides = this.slides()

  next: ->
    @current += 1
    @slides[@current]()

  previous: ->
    @current -= 1
    @slides[@current]()

  writeTitle: (text) ->
    @context.map.beginPath()
    @context.map.font = "#{Map.tileWidth * 2.8}px sans-serif"
    @context.map.lineWidth = 2
    @context.map.textAlign = "center"
    @context.map.strokeStyle = "#03F"
    @context.map.strokeText text, @map.width / 2, Map.tileHeight * 4
    @context.map.closePath()

  writeText: (text, tileRow) ->
    @context.map.beginPath()
    @context.map.font = "#{Map.tileWidth * 1.4}px sans-serif"
    @context.map.textAlign = "start"
    @context.map.fillStyle = "#FFF"
    @context.map.fillText text, 0, Map.tileHeight * tileRow
    @context.map.closePath()

  draw: ->
    @slides[@current]()

  slides: ->
    slides = []
    slides[0] = =>
      @context.map.beginPath()
      @context.map.font = "#{Map.tileWidth * 2.8}px sans-serif"
      @context.map.textAlign = "center"
      @context.map.fillStyle = "#FFF"
      @context.map.strokeStyle = "#03F"
      @context.map.lineWidth = 2
      @context.map.strokeText "JAVASCRIPT", @map.width / 2, Map.tileHeight * 7
      @context.map.strokeText "PARA", @map.width / 2, Map.tileHeight * 12
      @context.map.strokeText "DESENVOLVIMENTO", @map.width / 2, Map.tileHeight * 17
      @context.map.strokeText "DE JOGOS", @map.width / 2, Map.tileHeight * 22
      @context.map.closePath()

      @context.map.beginPath()
      @context.map.font = "#{Map.tileWidth * 1.4}px sans-serif"
      @context.map.fillText "Marcelo Munhoz Pélos", @map.width / 2, Map.tileHeight * 27
      @context.map.closePath()

    slides[1] = =>
      this.writeTitle "JAVASCRIPT"

    slides[2] = =>
      @slides[1]()
      this.writeText "● Implementado nativamente em todos os", 7
      this.writeText "navegadores;", 9
      browsersImage = document.getElementsByClassName("browsers")[0]
      imageWidth  = Map.tileWidth  * 14
      imageHeight = Map.tileHeight * 14
      @context.map.drawImage browsersImage, (@map.width / 2) - (imageWidth / 2), Map.tileHeight * 8, imageWidth, imageHeight

    slides[3] = =>
      @slides[2]()
      this.writeText "● Multi-plataforma;", 23

    slides[4] = =>
      @slides[3]()
      this.writeText "● Usado para interação com HTML.", 27

    slides
