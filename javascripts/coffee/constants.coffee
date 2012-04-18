class Map
  this.TILE_WIDTH   = 20
  this.TILE_HEIGHT  = 20
  this.WALL_PADDING = 6

  this.WALL         = 1
  this.PATH         = 0
  this.PACMAN       = 3

  w = this.WALL
  p = this.PATH
  o = this.PACMAN
  this.MATRIX = [
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
    [w, p, p, p, p, p, p, p, p, p, p, p, p, w, w, p, p, p, p, p, p, p, p, p, p, p, p, w],
    [w, p, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, p, w],
    [w, p, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, p, w],
    [w, p, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, p, w],
    [w, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, w],
    [w, p, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, p, w],
    [w, p, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, p, w],
    [w, p, p, p, p, p, p, w, w, p, p, p, p, w, w, p, p, p, p, w, w, p, p, p, p, p, p, w],
    [w, w, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, p, p, p, p, p, p, p, p, p, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w],
    [p, p, p, p, p, p, p, p, p, p, w, w, w, w, w, w, w, w, p, p, p, p, p, p, p, p, p, p],
    [w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, p, p, p, p, p, p, p, p, p, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w],
    [w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w],
    [w, p, p, p, p, p, p, p, p, p, p, p, p, w, w, p, p, p, p, p, p, p, p, p, p, p, p, w],
    [w, p, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, p, w],
    [w, p, w, w, w, w, p, w, w, w, w, w, p, w, w, p, w, w, w, w, w, p, w, w, w, w, p, w],
    [w, p, p, p, w, w, p, p, p, p, p, p, p, p, o, p, p, p, p, p, p, p, w, w, p, p, p, w],
    [w, w, w, p, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, p, w, w, w],
    [w, w, w, p, w, w, p, w, w, p, w, w, w, w, w, w, w, w, p, w, w, p, w, w, p, w, w, w],
    [w, p, p, p, p, p, p, w, w, p, p, p, p, w, w, p, p, p, p, w, w, p, p, p, p, p, p, w],
    [w, p, w, w, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, w, w, p, w],
    [w, p, w, w, w, w, w, w, w, w, w, w, p, w, w, p, w, w, w, w, w, w, w, w, w, w, p, w],
    [w, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, w],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]
  ]
