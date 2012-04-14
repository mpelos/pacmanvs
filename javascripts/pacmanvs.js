(function() {
  var Map, PATH, TILE_HEIGHT, TILE_WIDTH, Tile, WALL, WALL_PADDING, matrix;
  WALL = 1;
  PATH = 0;
  TILE_WIDTH = 20;
  TILE_HEIGHT = 20;
  WALL_PADDING = 3;
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
      var array, endX, endY, i, j, startX, startY, tile, value, x, y, _len, _len2, _ref, _x, _y;
      this.context.beginPath();
      _ref = this.matrix;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        array = _ref[i];
        for (j = 0, _len2 = array.length; j < _len2; j++) {
          value = array[j];
          x = j * TILE_WIDTH;
          y = i * TILE_HEIGHT;
          tile = new Tile(this, i, j);
          if (tile.isWall()) {
            startX = tile.isWallLeftCorner() ? x + WALL_PADDING : x;
            endX = tile.isWallRightCorner() ? x + TILE_WIDTH - WALL_PADDING : x + TILE_WIDTH;
            startY = tile.isWallUpCorner() ? y + WALL_PADDING : y;
            endY = tile.isWallDownCorner() ? y + TILE_HEIGHT - WALL_PADDING : y + TILE_HEIGHT;
            if (tile.above().isPath()) {
              _y = y + WALL_PADDING + 0.5;
              this.context.moveTo(startX, _y);
              this.context.lineTo(endX, _y);
            }
            if (tile.right().isPath()) {
              _x = x + TILE_WIDTH - WALL_PADDING - 0.5;
              this.context.moveTo(_x, startY);
              this.context.lineTo(_x, endY);
            }
            if (tile.below().isPath()) {
              _y = y + TILE_HEIGHT - WALL_PADDING - 0.5;
              this.context.moveTo(startX, _y);
              this.context.lineTo(endX, _y);
            }
            if (tile.left().isPath()) {
              _x = x + WALL_PADDING + 0.5;
              this.context.moveTo(_x, startY);
              this.context.lineTo(_x, endY);
            }
            if (tile.above().isWall() && tile.right().isWall() && tile.below().isWall() && tile.left().isWall()) {
              if (tile.aboveRight().isPath()) {
                this.context.moveTo(x + TILE_WIDTH, y + WALL_PADDING + 0.5);
                this.context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y + WALL_PADDING + 0.5);
                this.context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y);
              }
              if (tile.belowRight().isPath()) {
                this.context.moveTo(x + TILE_WIDTH, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                this.context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                this.context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y + TILE_HEIGHT);
              }
              if (tile.belowLeft().isPath()) {
                this.context.moveTo(x, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                this.context.lineTo(x + WALL_PADDING + 0.5, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                this.context.lineTo(x + WALL_PADDING + 0.5, y + TILE_HEIGHT);
              }
              if (tile.aboveLeft().isPath()) {
                this.context.moveTo(x, y + WALL_PADDING + 0.5);
                this.context.lineTo(x + WALL_PADDING + 0.5, y + WALL_PADDING + 0.5);
                this.context.lineTo(x + WALL_PADDING + 0.5, y);
              }
            }
          }
        }
      }
      return this.context.stroke();
    };
    return Map;
  })();
  Tile = (function() {
    var INVALID;
    INVALID = "Invalid tile";
    function Tile(map, i, j) {
      this.map = map;
      this.i = i;
      this.j = j;
    }
    Tile.prototype.current = function() {
      if ((this.map.matrix[this.i] != null) && (this.map.matrix[this.i][this.j] != null)) {
        return this.map.matrix[this.i][this.j];
      } else {
        return INVALID;
      }
    };
    Tile.prototype.above = function() {
      return new Tile(this.map, this.i - 1, this.j);
    };
    Tile.prototype.aboveRight = function() {
      return new Tile(this.map, this.i - 1, this.j + 1);
    };
    Tile.prototype.right = function() {
      return new Tile(this.map, this.i, this.j + 1);
    };
    Tile.prototype.belowRight = function() {
      return new Tile(this.map, this.i + 1, this.j + 1);
    };
    Tile.prototype.below = function() {
      return new Tile(this.map, this.i + 1, this.j);
    };
    Tile.prototype.belowLeft = function() {
      return new Tile(this.map, this.i + 1, this.j - 1);
    };
    Tile.prototype.left = function() {
      return new Tile(this.map, this.i, this.j - 1);
    };
    Tile.prototype.aboveLeft = function() {
      return new Tile(this.map, this.i - 1, this.j - 1);
    };
    Tile.prototype.isWall = function() {
      return this.current() === WALL || this.current() === INVALID;
    };
    Tile.prototype.isPath = function() {
      if (this.current() !== INVALID) {
        return this.current() === PATH;
      }
    };
    Tile.prototype.isWallUpCorner = function() {
      return this.above().isPath() && this.below().isWall();
    };
    Tile.prototype.isWallRightCorner = function() {
      return this.right().isPath() && this.left().isWall();
    };
    Tile.prototype.isWallDownCorner = function() {
      return this.below().isPath() && this.above().isWall();
    };
    Tile.prototype.isWallLeftCorner = function() {
      return this.left().isPath() && this.right().isWall();
    };
    return Tile;
  })();
}).call(this);
