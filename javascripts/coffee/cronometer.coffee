class Cronometer
  constructor: ->
    @startTime = new Date

  spentMiliseconds: ->
    new Date - @startTime

  spentSeconds: ->
    this.spentMiliseconds() / 1000
