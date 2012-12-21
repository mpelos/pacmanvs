class BasicPlayer
  constructor: (x, y, options = {}) ->
    @position = new Coordinate(x, y)
    options.direction ?= "left"
    @direction = new Direction(options.direction)
    @status = options.status || "alive"
    @frozen = options.frozen || false
    @color = options.color || "#FFF"

  isAlive: ->
    @status is "alive"

  isDead: ->
    @status is "dead"

  canMove: ->
    true

  draw: (renderer) ->
    renderer.draw()
