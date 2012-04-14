(function() {
  var Game, Map, PACMAN, PATH, Player, TILE_HEIGHT, TILE_WIDTH, Tile, WALL, WALL_PADDING;
  Game = (function() {
    function Game() {}
    Game.prototype.init = function() {
      var array, i, j, mapMatrix, value, x, y, _len, _len2;
      mapMatrix = [[WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PACMAN, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]];
      this.canvas = document.getElementById("pacman_canvas");
      this.canvas.width = mapMatrix[0].length * TILE_WIDTH;
      this.canvas.height = mapMatrix.length * TILE_HEIGHT;
      this.context = this.canvas.getContext("2d");
      for (i = 0, _len = mapMatrix.length; i < _len; i++) {
        array = mapMatrix[i];
        for (j = 0, _len2 = array.length; j < _len2; j++) {
          value = array[j];
          x = (j * TILE_WIDTH) + (TILE_WIDTH / 2);
          y = (i * TILE_HEIGHT) + (TILE_HEIGHT / 2);
          if (value === PACMAN) {
            this.pacman = new Player(x, y);
            mapMatrix[i][j] = PATH;
          }
        }
      }
      return this.map = new Map(mapMatrix);
    };
    Game.prototype.update = function() {
      return console.log("Update");
    };
    Game.prototype.draw = function() {
      this.map.draw(this.context);
      return this.pacman.draw(this.context);
    };
    return Game;
  })();
  WALL = 1;
  PATH = 0;
  PACMAN = 3;
  TILE_WIDTH = 20;
  TILE_HEIGHT = 20;
  WALL_PADDING = 6;
  window.onload = function() {
    var game;
    game = new Game;
    game.init();
    return setInterval(function() {
      game.update();
      return game.draw();
    }, 6);
  };
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
    function Map(matrix) {
      this.matrix = matrix;
    }
    Map.prototype.draw = function(context) {
      var array, endX, endY, i, j, startX, startY, tile, value, x, y, _len, _len2, _ref, _x, _y;
      context.beginPath();
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
              context.moveTo(startX, _y);
              context.lineTo(endX, _y);
            }
            if (tile.right().isPath()) {
              _x = x + TILE_WIDTH - WALL_PADDING - 0.5;
              context.moveTo(_x, startY);
              context.lineTo(_x, endY);
            }
            if (tile.below().isPath()) {
              _y = y + TILE_HEIGHT - WALL_PADDING - 0.5;
              context.moveTo(startX, _y);
              context.lineTo(endX, _y);
            }
            if (tile.left().isPath()) {
              _x = x + WALL_PADDING + 0.5;
              context.moveTo(_x, startY);
              context.lineTo(_x, endY);
            }
            if (tile.above().isWall() && tile.right().isWall() && tile.below().isWall() && tile.left().isWall()) {
              if (tile.aboveRight().isPath()) {
                context.moveTo(x + TILE_WIDTH, y + WALL_PADDING + 0.5);
                context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y + WALL_PADDING + 0.5);
                context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y);
              }
              if (tile.belowRight().isPath()) {
                context.moveTo(x + TILE_WIDTH, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                context.lineTo(x + TILE_WIDTH - WALL_PADDING - 0.5, y + TILE_HEIGHT);
              }
              if (tile.belowLeft().isPath()) {
                context.moveTo(x, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                context.lineTo(x + WALL_PADDING + 0.5, y + TILE_HEIGHT - WALL_PADDING - 0.5);
                context.lineTo(x + WALL_PADDING + 0.5, y + TILE_HEIGHT);
              }
              if (tile.aboveLeft().isPath()) {
                context.moveTo(x, y + WALL_PADDING + 0.5);
                context.lineTo(x + WALL_PADDING + 0.5, y + WALL_PADDING + 0.5);
                context.lineTo(x + WALL_PADDING + 0.5, y);
              }
            }
          }
        }
      }
      context.closePath();
      context.strokeStyle = "#03F";
      return context.stroke();
    };
    return Map;
  })();
  Player = (function() {
    function Player(x, y) {
      this.x = x;
      this.y = y;
      this.startX = this.x;
      this.startY = this.y;
    }
    Player.prototype.draw = function(context) {
      var radius;
      radius = (TILE_WIDTH + (WALL_PADDING / 2)) / 2;
      context.beginPath();
      context.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
      context.closePath();
      context.strokeStyle = "#FFFF00";
      context.stroke();
      context.fillStyle = "#FFFF00";
      return context.fill();
    };
    return Player;
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
