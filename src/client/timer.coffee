class Timer
  constructor: (@time) ->
    @startTime = new Date

  spentTime: ->
    new Date - @startTime

  timeOver: ->
    this.spentTime() >= @time

  setTime: (time) ->
    @time = time
    this.reset()

  reset: ->
    @startTime = new Date
