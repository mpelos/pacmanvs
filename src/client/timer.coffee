class Timer
  constructor: (@time) ->
    @startTime = new Date

  spentTime: ->
    new Date - @startTime

  timeOver: ->
    this.spentTime() >= @time

  reset: ->
    @startTime = new Date
