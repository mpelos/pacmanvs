class Direction
  constructor: (direction) ->
    @angle = this.parse(direction)

  parse: (direction) ->
    if typeof direction is "string"
      angle =  switch direction.toLowerCase()
        when "right" then 0
        when "up"    then Math.PI * 0.5
        when "left"  then Math.PI
        when "down"  then Math.PI * 1.5
    else if typeof direction is "coordinate"
      angle = switch direction.toString()
        when "1, 0"  then 0
        when "0, -1" then Math.PI * 0.5
        when "-1, 0" then Math.PI
        when "0, 1"  then Math.PI * 1.5
    else
      angle = direction

    return angle

  set: (direction) ->
    @angle = this.parse(direction)

  toCoordinate: ->
    switch @angle
      when 0             then new Coordinate(1, 0)
      when Math.PI * 0.5 then new Coordinate(0, -1)
      when Math.PI       then new Coordinate(-1, 0)
      when Math.PI * 1.5 then new Coordinate(0, 1)

  toString: ->
    switch @angle
      when 0             then "right"
      when Math.PI * 0.5 then "up"
      when Math.PI       then "left"
      when Math.PI * 1.5 then "down"
