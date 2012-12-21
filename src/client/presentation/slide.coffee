class Slide
  constructor: (@presentation) ->
    @context = @presentation.context
    @map = @presentation.map
    @current = 0
    @slides = this.slides()

  next: ->
    @current += 1 if @slides[@current + 1]
    @slides[@current]()

  previous: ->
    @current -= 1 if @slides[@current - 1]
    @slides[@current]()

  deleteGame: ->
    if @game
      @game.tick = -> false
      delete @game if @game

  writeTitle: (text, options = {}) ->
    fontSize = if options.fontSize then Map.tileWidth * options.fontSize else Map.tileWidth * 2.8

    @context.map.beginPath()
    @context.map.font = "bold #{fontSize}px sans-serif"
    @context.map.lineWidth = 2
    @context.map.textAlign = "center"
    @context.map.strokeStyle = "#03F"
    @context.map.fillStyle = "#FFF"
    @context.map.fillText text, @map.width / 2, Map.tileHeight * 4
    @context.map.closePath()

  writeText: (text, tileRow) ->
    @context.map.beginPath()
    @context.map.font = "#{Map.tileWidth * 1.4}px sans-serif"
    @context.map.textAlign = "start"
    @context.map.fillStyle = "#EEE"
    @context.map.fillText text, 0, Map.tileHeight * tileRow
    @context.map.closePath()

  draw: ->
    @slides[@current]()

  drawIntegratorImage: (n = 1) ->
    image = document.getElementById("integration_#{n}")
    imageWidth  = Map.tileWidth  * 32
    imageHeight = imageWidth * 0.75
    @context.map.drawImage image, (@map.width / 2) - (imageWidth / 2), Map.tileHeight * 6, imageWidth, imageHeight

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
      this.writeTitle "Javascript"

    slides[2] = =>
      @slides[1]()
      this.writeText "● Implementado nativamente em todos os", 7
      this.writeText "navegadores", 9
      browsersImage = document.getElementsByClassName("browsers")[0]
      imageWidth  = Map.tileWidth  * 14
      imageHeight = Map.tileHeight * 14
      @context.map.drawImage browsersImage, (@map.width / 2) - (imageWidth / 2), Map.tileHeight * 8, imageWidth, imageHeight

    slides[3] = =>
      @slides[2]()
      this.writeText "● Multi-plataforma", 23

    slides[4] = =>
      @slides[3]()
      this.writeText "● Usado para interação com HTML", 27

    slides[5] = =>
      this.writeTitle "HTML 5 Canvas"

    slides[6] = =>
      @slides[5]()
      this.writeText "● Elemento para renderização gráfica", 9

    slides[7] = =>
      @slides[6]()
      this.writeText "● Manipulado utlizando a linguagem", 14
      this.writeText "Javascript", 16

    slides[8] = =>
      @slides[7]()
      this.writeText "● Abriu portas para o desenvolvimento de", 21
      this.writeText "jogos utilizando Javascript", 23

    slides[9] = =>
      this.writeTitle "Jogos para Navegadores", { fontSize: 2.3 }

    slides[10] = =>
      @slides[9]()
      this.writeText "● Grande parcela dos jogos são", 10
      this.writeText "desenvolvidos utilizando Adobe Flash", 12

    slides[11] = =>
      @slides[10]()
      this.writeText "● Quantidade de jogos desenvolvidos com", 17
      this.writeText "Javascript aumentam com a evolução do", 19
      this.writeText "HTML 5", 21

    slides[12] = =>
      this.writeTitle "Projeto Proposto"

    slides[13] = =>
      @slides[12]()
      textHeight = Map.tileHeight * 10

      @context.map.beginPath()
      @context.map.font = "bold #{Map.tileWidth * 4.8}px sans-serif"
      @context.map.textAlign = "center"
      @context.map.textBaseline = "middle"
      @context.map.fillStyle = "#FFF"
      @context.map.lineWidth = 4
      # @context.map.fillText "P A C M A N", @map.width / 2, textHeiht
      # @context.map.strokeText "P A C M A N", @map.width / 2, textHeight

      @context.map.textAlign = "left"
      @context.map.strokeText "P", 0, textHeight

      @ghost1 ?= new BasicPlayer(Map.tileWidth * 6.5, textHeight, { direction: "right", color: "#F81F17" })
      @ghostRenderer1 ?= new GhostRenderer(@context.player, @ghost1, { radius: Map.tileWidth * 2 })
      @ghost1.draw(@ghostRenderer1)

      @pacman ?= new BasicPlayer(Map.tileWidth * 11.3, textHeight, { direction: "right" })
      @pacmanRenderer ?= new PacmanRenderer(@context.player, @pacman, { radius: Map.tileWidth * 2 })
      @pacman.draw(@pacmanRenderer)

      @context.map.strokeText "M", Map.tileWidth * 14.2, textHeight

      @ghost2 ?= new BasicPlayer(Map.tileWidth * 21.2, textHeight, { direction: "left", color: "#FACE26" })
      @ghostRenderer2 ?= new GhostRenderer(@context.player, @ghost2, { radius: Map.tileWidth * 2 })
      @ghost1.draw(@ghostRenderer2)

      @context.map.strokeText "N", Map.tileWidth * 24.4, textHeight

      @context.map.closePath()

      @writeText "● Desenvolvido em Javascript", 18
      @writeText "● Interação multiplayer", 22

    slides[14] = =>
      @writeTitle "Ferramentas Utilizadas", { fontSize: 2.5 }

    slides[15] = =>
      @slides[14]()
      @writeText "● Javascript: Linguagem de programação", 9
      @writeText "utilizada", 11

    slides[16] = =>
      @slides[15]()
      @writeText "● Canvas do HTML 5: Renderização de", 14
      @writeText "gráficos", 16

    slides[17] = =>
      @slides[16]()
      @writeText "● Coffeescript: Melhor sintaxe para o", 19
      @writeText "Javascript", 21

    slides[18] = =>
      @slides[17]()
      @writeText "● Node.js: Javascript no servidor", 24

    slides[19] = =>
      @writeTitle "Javascript"

    slides[20] = =>
      @slides[19]()
      @writeText "● Criada pela Netscape em 1995", 9

    slides[21] = =>
      @slides[20]()
      @writeText "● Nomes: Mocha, Livescript e finalmente", 13
      @writeText "Javascript", 15

    slides[22] = =>
      @slides[21]()
      @writeText "● Linguagem destinada a web", 19

    slides[23] = =>
      @slides[22]()
      @writeText "● Simples e Versátil", 23

    slides[24] = =>
      @writeTitle "HTML 5 Canvas"

    slides[25] = =>
      @slides[24]()
      @writeText "● Criado pela Apple em 2004 para", 8
      @writeText "implementar widgets do Dashboard", 10

    slides[26] = =>
      @slides[25]()
      @writeText "● Posteriormente implementado nos", 13
      @writeText "navegadores Firefox Opera e Safari", 15

    slides[27] = =>
      @slides[26]()
      @writeText "● Marcador que permite desenhar gráficos", 18
      @writeText "utilizando a linguagem Javascript", 20

    slides[28] = =>
      @slides[27]()
      @writeText "● Possível renderizar textos, imagens, ", 23
      @writeText "aplicar cores, rotações, transparências, ", 25
      @writeText "manipulação de pixels, vários tipos de linhas", 27
      @writeText "e curvas, etc", 29

    slides[29] = =>
      @writeTitle "Coffeescript"

    slides[30] = =>
      @slides[29]()
      @writeText "● Linguagem que quando compilada gera", 8
      @writeText "Javascript", 10

    slides[31] = =>
      @slides[30]()
      @writeText "● Torna a sintaxe do Javascript mais limpa", 13

    slides[32] = =>
      @slides[31]()
      @writeText "● Sintaxe inspirada nas linguagens Ruby e", 16
      @writeText "Python", 18

    slides[33] = =>
      @slides[32]()
      @writeText "● Sem necessidade de chaves e ponto e", 21
      @writeText "vírgula", 23

    slides[34] = =>
      @slides[33]()
      @writeText "● Pode-se usar qualquer biblioteca", 26
      @writeText "Javascript", 28

    slides[35] = =>
      @writeTitle "Node.js"

    slides[36] = =>
      @slides[35]()
      @writeText "● Criada por Ryan Dalh em 2009", 9

    slides[37] = =>
      @slides[36]()
      @writeText "● Utiliza Javascript para Servidor", 13

    slides[38] = =>
      @slides[37]()
      @writeText "● Linguagem não obstrutiva", 17

    slides[39] = =>
      @slides[38]()
      @writeText "● Perfeita para jogos com interação", 21
      @writeText "multi-jogador em tempo real", 23

    slides[40] = =>
      @writeTitle "Implementação"
      @writeText "● Loop principal", 8
      @writeText "● Mapa", 11
      @writeText "● Entidades", 14
      @writeText "● Personagens", 17
      @writeText "● Renderizador de Personagens", 20
      @writeText "● Integração", 23

    slides[41] = =>
      @writeTitle "Loop Principal"

    slides[42] = =>
      @slides[41]()
      @writeText "● Necessário para que haja animação e", 8
      @writeText "interação", 10

    slides[43] = =>
      @slides[42]()
      @writeText "● Atualização (verificar colisões, alterar", 14
      @writeText "direção e deslocar as personagens, etc)", 16

    slides[44] = =>
      @slides[43]()
      @writeText "● Apagar e desenhar", 20

    slides[45] = =>
      this.deleteGame()
      @presentation.resume()
      @slides[44]()
      @writeText "● 60 interações por segundo", 24

    slides[46] = =>
      @presentation.pause()
      this.deleteGame()

      timeout = setTimeout =>
        @game ?= new Game
        clearTimeout timeout
      , 100

    slides[47] = =>
      @presentation.pause()
      this.deleteGame()

      timeout = setTimeout =>
        @game ?= new Game

        for character in @game.characters
          character.calculateDisplacement = -> false
          character.displacement = 1

        @game.message = ""
        @game.delayTimer.timeOver = -> true
        @game.tick = =>
          @game.update()
          @game.draw()
          @game.map.draw(@context.map)
          setTimeout =>
            @presentation.clearAllCanvas()
            setTimeout (=> @game.loop()), 200
          , 800

        clearTimeout timeout
      , 100

    slides[48] = =>
      this.deleteGame()
      @presentation.resume()
      this.writeTitle "Mapa"

    slides[49] = =>
      @presentation.map.draw(@context.map)

    slides[50] = =>
      @presentation.map.drawTilesType(@context.map)

    slides[51] = =>
      @presentation.map.draw(@context.map)
      @presentation.map.drawTilesType(@context.map)

    slides[52] = =>
      this.deleteGame()
      @presentation.resume()
      @presentation.map.draw(@context.map)
      @presentation.map.drawGrid(@context.map)

    slides[53] = =>
      this.deleteGame()
      @presentation.pause()

      timeout = setTimeout =>
        @game ?= new Game

        pacman = @game.pacman
        tile = @game.map.tiles[2][14]
        pacman.direction.set "down"
        pacman.position.set tile.centerCoordinate()
        pacman.canMove = -> true

        @game.draw = =>
          @presentation.clearAllCanvas()
          pacman.draw @context.player
          pacman.drawPosition @context.player

        clearTimeout timeout
      , 100

    slides[54] = =>
      this.deleteGame()
      @presentation.pause()

      timeout = setTimeout =>
        @game ?= new Game

        pacman = @game.pacman
        tile = @game.map.tiles[14][2]
        pacman.direction.set "right"
        pacman.position.set tile.centerCoordinate()
        pacman.canMove = -> true

        @game.draw = =>
          @presentation.clearAllCanvas()
          pacman.draw @context.player
          pacman.drawPosition @context.player

        clearTimeout timeout
      , 100

    slides[55] = =>
      this.deleteGame()
      @presentation.resume()
      this.writeTitle "Entidades"
      this.writeText "● São entidades: personagens (Pacman", 9
      this.writeText "e fantasmas) e comida", 11
      this.writeText "● Toda entidade possui uma cordenada X,", 16
      this.writeText "Y e uma área de limite", 18

    slides[56] = =>
      @presentation.pause()

      timeout = setTimeout =>
        @game ?= new Game

        @game.draw = =>
          @game.canvas.player.width = @game.canvas.player.width # clear player canvas
          food.draw(@context.player) for food in @game.foods
          player.draw(@context.player) for player in @game.characters

          entities = @game.characters.concat @game.map.remainingFoods()
          entity.drawBoundingBox(@context.player) for entity in entities

        clearTimeout timeout
      , 100

    slides[57] = =>
      this.deleteGame()
      delete @angle if @angle
      @presentation.resume()
      this.writeTitle "Personagens"
      this.writeText "● Possuem área delimitadora, posição,", 9
      this.writeText "direção, velocidade e deslocamento", 11
      this.writeText "● Direção definida pelo jogador", 15
      this.writeText "● Fórmula de deslocamento:", 19
      this.writeText "deslocamento = velocidade / fps", 21
      this.writeText "● Fórmula de movimentação:", 25
      this.writeText "posição(x,y) + (direção(x,y) * deslocamento)", 27

    slides[58] = =>
      this.writeTitle "Renderizador de Personagens", { fontSize: 1.9 }

    slides[59] = =>
      @slides[58]()
      @angle ?= 0.3
      @angle += 0.01 if @angle < 1.7

      radius = Map.tileWidth * 4
      x = @map.width / 2
      y = Map.tileHeight * 15

      @context.map.beginPath()
      @context.map.strokeStyle = "#FF0"
      @context.map.arc x, y, radius, Math.PI * 0.3, Math.PI * @angle, false
      @context.map.stroke()
      @context.map.closePath()

    slides[60] = =>
      delete @angle if @angle
      @slides[58]()

      radius = Map.tileWidth * 4
      x = @map.width / 2
      y = Map.tileHeight * 15

      @context.map.beginPath()
      @context.map.save()
      @context.map.translate x, y
      @context.map.strokeStyle = "#FF0"
      @context.map.arc 0, 0, radius, Math.PI * 0.3, Math.PI * 1.7, false
      @context.map.lineTo -(radius / 4), 0
      @context.map.stroke()
      @context.map.restore()
      @context.map.closePath()

    slides[61] = =>
      @slides[58]()
      radius = Map.tileWidth * 4
      x = @map.width / 2
      y = Map.tileHeight * 15

      @context.map.beginPath()
      @context.map.save()
      @context.map.translate x, y
      @context.map.fillStyle = "#FF0"
      @context.map.arc 0, 0, radius, Math.PI * 0.3, Math.PI * 1.7, false
      @context.map.lineTo -(radius / 4), 0
      @context.map.fill()
      @context.map.restore()
      @context.map.closePath()

    slides[62] = =>
      delete @ghost if @ghost
      delete @ghostRenderer if @ghostRenderer
      @slides[58]()

    slides[63] = =>
      @slides[58]()

      x = @map.width / 2
      y = Map.tileHeight * 15
      radius = Map.tileWidth * 4
      @ghost ?= new BasicPlayer(x, y, { direction: "right", color: "#F81F17" })
      @ghostRenderer ?= new GhostRenderer(@context.player, @ghost, { radius: radius })
      @ghostRenderer.drawEyeBalls()

    slides[64] = =>
      @slides[58]()

      x = @map.width / 2
      y = Map.tileHeight * 15
      radius = Map.tileWidth * 4
      @ghost ?= new BasicPlayer(x, y, { direction: "right", color: "#F81F17" })
      @ghostRenderer ?= new GhostRenderer(@context.player, @ghost, { radius: radius })
      @ghostRenderer.drawEyeBalls()
      @ghostRenderer.drawPupils()

    slides[65] = =>
      @slides[58]()

      x = @map.width / 2
      y = Map.tileHeight * 15
      radius = Map.tileWidth * 4
      @ghost ?= new BasicPlayer(x, y, { direction: "right", color: "#F81F17" })
      @ghostRenderer ?= new GhostRenderer(@context.player, @ghost, { radius: radius })
      @ghostRenderer.drawBody(@ghost.color)
      @ghostRenderer.drawEyeBalls()
      @ghostRenderer.drawPupils()

    slides[66] = =>
      @slides[58]()

      x = @map.width / 2
      y = Map.tileHeight * 15
      radius = Map.tileWidth * 4
      @ghost ?= new BasicPlayer(x, y, { direction: "right", color: "#F81F17" })
      @ghostRenderer ?= new GhostRenderer(@context.player, @ghost, { radius: radius })
      @ghost.draw(@ghostRenderer)

    slides[67] = =>
      this.writeTitle "Visão Geral"

    slides[68] = =>
      @slides[67]()
      this.drawIntegratorImage(1)

    slides[69] = =>
      @slides[67]()
      this.drawIntegratorImage(2)

    slides[70] = =>
      @slides[67]()
      this.drawIntegratorImage(3)

    slides[71] = =>
      @slides[67]()
      this.drawIntegratorImage(4)

    slides[72] = =>
      @slides[67]()
      this.drawIntegratorImage(5)

    slides[73] = =>
      @slides[67]()
      this.drawIntegratorImage(6)

    slides[74] = =>
      @slides[67]()
      this.drawIntegratorImage(7)

    slides[75] = =>
      @slides[67]()
      this.drawIntegratorImage(8)

    slides[76] = =>
      @slides[67]()
      this.drawIntegratorImage(9)

    slides[77] = =>
      @slides[67]()
      this.drawIntegratorImage(10)

    slides
