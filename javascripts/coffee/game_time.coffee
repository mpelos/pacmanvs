class GameTime
  constructor: ->
    @initial = new Date

  spentMiliseconds: ->
    new Date - @initial

  spentSeconds: ->
    this.spentMiliseconds() / 1000
