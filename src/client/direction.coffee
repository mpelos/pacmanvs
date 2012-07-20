class Direction
  constructor: (direction) ->
    @angle = this.parse(direction)

  parse: (direction) ->
    if typeof direction is "string"
      switch direction.toLowerCase()
        when "right" then 0
        when "down"  then Math.PI * 0.5
        when "left"  then Math.PI
        when "up"    then Math.PI * 1.5
    else if direction instanceof Coordinate
      switch direction.toString()
        when "1, 0"  then 0
        when "0, -1" then Math.PI * 0.5
        when "-1, 0" then Math.PI
        when "0, 1"  then Math.PI * 1.5
    else if typeof direction is "number"
      direction
    else
      null

  set: (direction) ->
    @angle = this.parse(direction)

  toCoordinate: ->
    switch @angle
      when 0             then new Coordinate(1, 0)
      when Math.PI * 0.5 then new Coordinate(0, 1)
      when Math.PI       then new Coordinate(-1, 0)
      when Math.PI * 1.5 then new Coordinate(0, -1)

  toString: ->
    switch @angle
      when 0             then "right"
      when Math.PI * 0.5 then "down"
      when Math.PI       then "left"
      when Math.PI * 1.5 then "up"
