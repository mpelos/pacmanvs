(function() {
  var Map, PATH, TILE_HEIGHT, TILE_WIDTH, Tile, WALL, matrix;
  WALL = 1;
  PATH = 0;
  TILE_WIDTH = 20;
  TILE_HEIGHT = 20;
  matrix = [[WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]];
  jQuery(function($) {
    var canvas, context, map;
    canvas = document.getElementById("pacman_canvas");
    canvas.width = matrix[0].length * TILE_WIDTH;
    canvas.height = matrix.length * TILE_HEIGHT;
    context = canvas.getContext("2d");
    context.strokeStyle = "#03F";
    map = new Map(context, matrix);
    return map.draw();
  });
  Array.prototype.all = function(conditionalFunction) {
    var result, value, _i, _len;
    result = true;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      value = this[_i];
      if (typeof conditionalFunction === "function") {
        value = conditionalFunction(value);
      }
      if (!value) {
        result = false;
        break;
      }
    }
    return result;
  };
  Array.prototype.any = function(conditionalFunction) {
    var result, value, _i, _len;
    result = false;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      value = this[_i];
      if (typeof conditionalFunction === "function") {
        value = conditionalFunction(value);
      }
      if (value) {
        result = true;
        break;
      }
    }
    return result;
  };
  Map = (function() {
    function Map(context, matrix) {
      this.context = context;
      this.matrix = matrix;
    }
    Map.prototype.matrix = function() {
      return this.matrix;
    };
    Map.prototype.draw = function() {
      var array, i, j, tile, value, x, y, _len, _len2, _ref, _x, _y;
      _ref = this.matrix;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        array = _ref[i];
        for (j = 0, _len2 = array.length; j < _len2; j++) {
          value = array[j];
          x = j * TILE_WIDTH;
          y = i * TILE_HEIGHT;
          tile = new Tile(this, i, j);
          if (tile.isWall()) {
            if (tile.above().isPath()) {
              _y = y + 0.5;
              this.context.moveTo(x, _y);
              this.context.lineTo(x + TILE_WIDTH, _y);
            }
            if (tile.right().isPath()) {
              _x = x + TILE_WIDTH - 0.5;
              this.context.moveTo(_x, y);
              this.context.lineTo(_x, y + TILE_HEIGHT);
            }
            if (tile.below().isPath()) {
              _y = y + TILE_HEIGHT - 0.5;
              this.context.moveTo(x, _y);
              this.context.lineTo(x + TILE_WIDTH, _y);
            }
            if (tile.left().isPath()) {
              _x = x + 0.5;
              this.context.moveTo(_x, y);
              this.context.lineTo(_x, y + TILE_HEIGHT);
            }
          }
        }
      }
      return this.context.stroke();
    };
    return Map;
  })();
  Tile = (function() {
    var INVALID_TILE;
    INVALID_TILE = "Invalid Tile";
    function Tile(map, i, j) {
      this.map = map;
      this.i = i;
      this.j = j;
    }
    Tile.prototype.current = function() {
      if ((this.map.matrix[this.i] != null) && (this.map.matrix[this.i][this.j] != null)) {
        return this.map.matrix[this.i][this.j];
      } else {
        return INVALID_TILE;
      }
    };
    Tile.prototype.above = function() {
      return new Tile(this.map, this.i - 1, this.j);
    };
    Tile.prototype.right = function() {
      return new Tile(this.map, this.i, this.j + 1);
    };
    Tile.prototype.below = function() {
      return new Tile(this.map, this.i + 1, this.j);
    };
    Tile.prototype.left = function() {
      return new Tile(this.map, this.i, this.j - 1);
    };
    Tile.prototype.isWall = function() {
      if (this.current !== INVALID_TILE) {
        return this.current() === WALL;
      }
    };
    Tile.prototype.isPath = function() {
      if (this.current !== INVALID_TILE) {
        return this.current() === PATH;
      }
    };
    return Tile;
  })();
}).call(this);
