(function() {
  var Coordinate, Game, Map, PACMAN, PATH, Player, TILE_HEIGHT, TILE_WIDTH, Tile, WALL, WALL_PADDING;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Coordinate = (function() {
    function Coordinate(x, y) {
      this.x = x;
      this.y = y;
    }
    Coordinate.prototype.change = function(x, y) {
      this.x = x;
      return this.y = y;
    };
    return Coordinate;
  })();
  Game = (function() {
    function Game() {
      this.handleKey = __bind(this.handleKey, this);
    }
    Game.prototype.init = function() {
      var array, canvas, i, j, mapMatrix, name, value, x, y, _i, _len, _len2, _len3, _ref;
      mapMatrix = [[WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PACMAN, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]];
      this.canvas = {};
      this.context = {};
      _ref = $("canvas");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        canvas = _ref[_i];
        name = canvas.id.replace("_canvas", "");
        this.canvas[name] = document.getElementById(canvas.id);
        this.canvas[name].width = mapMatrix[0].length * TILE_WIDTH;
        this.canvas[name].height = mapMatrix.length * TILE_HEIGHT;
        this.context[name] = this.canvas[name].getContext("2d");
      }
      for (i = 0, _len2 = mapMatrix.length; i < _len2; i++) {
        array = mapMatrix[i];
        for (j = 0, _len3 = array.length; j < _len3; j++) {
          value = array[j];
          x = (j * TILE_WIDTH) + (TILE_WIDTH / 2);
          y = (i * TILE_HEIGHT) + (TILE_HEIGHT / 2);
          if (value === PACMAN) {
            this.pacman = new Player(x, y);
            mapMatrix[i][j] = PATH;
          }
        }
      }
      this.map = new Map(mapMatrix);
      this.map.draw(this.context.map);
      return this.map.drawGrid(this.context.map);
    };
    Game.prototype.update = function() {
      var i, j, pacmanTile;
      i = Math.floor(this.pacman.position.x / TILE_WIDTH);
      j = Math.floor(this.pacman.position.y / TILE_HEIGHT);
      pacmanTile = new Tile(this.map, i, j);
      return this.pacman.move();
    };
    Game.prototype.draw = function() {
      this.canvas.player.width = this.canvas.player.width;
      this.pacman.draw(this.context.player);
      return this.pacman.drawPosition(this.context.player);
    };
    Game.prototype.handleKey = function(event) {
      switch (event.which) {
        case 37:
          return this.pacman.setDirection("left");
        case 38:
          return this.pacman.setDirection("up");
        case 39:
          return this.pacman.setDirection("right");
        case 40:
          return this.pacman.setDirection("bottom");
      }
    };
    return Game;
  })();
  WALL = 1;
  PATH = 0;
  PACMAN = 3;
  TILE_WIDTH = 20;
  TILE_HEIGHT = 20;
  WALL_PADDING = 6;
  jQuery(function($) {
    var game;
    game = new Game;
    $(document).bind("keydown", game.handleKey);
    game.init();
    return setInterval(function() {
      game.update();
      return game.draw();
    }, 30);
  });
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
          context.font = "bold 12px sans-serif";
          context.fillStyle = "#FFF";
          if (j === 0) {
            context.fillText(i, x, y);
          }
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
    Map.prototype.drawGrid = function(context) {
      var array, i, j, value, x, y, _len, _ref, _results;
      context.beginPath();
      _ref = this.matrix;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        array = _ref[i];
        _results.push((function() {
          var _len2, _results2;
          _results2 = [];
          for (j = 0, _len2 = array.length; j < _len2; j++) {
            value = array[j];
            x = j * TILE_WIDTH;
            y = i * TILE_HEIGHT;
            context.moveTo(x, y + TILE_HEIGHT + 0.5);
            context.lineTo(x + TILE_WIDTH, y + TILE_HEIGHT + 0.5);
            context.moveTo(x + TILE_WIDTH + 0.5, y);
            context.lineTo(x + TILE_WIDTH + 0.5, y + TILE_HEIGHT);
            context.closePath();
            context.strokeStyle = "#444";
            _results2.push(context.stroke());
          }
          return _results2;
        })());
      }
      return _results;
    };
    return Map;
  })();
  Player = (function() {
    function Player(x, y) {
      this.position = new Coordinate(x, y);
      this.startPosition = this.position;
      this.direction = new Coordinate(-1, 0);
    }
    Player.prototype.move = function(x, y) {
      this.position.x += this.direction.x;
      return this.position.y += this.direction.y;
    };
    Player.prototype.setDirection = function(direction) {
      switch (direction) {
        case "left":
          return this.direction.change(-1, 0);
        case "up":
          return this.direction.change(0, -1);
        case "right":
          return this.direction.change(1, 0);
        case "bottom":
          return this.direction.change(0, 1);
      }
    };
    Player.prototype.draw = function(context) {
      var radius;
      radius = (TILE_WIDTH + (WALL_PADDING / 2)) / 2;
      context.beginPath();
      context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2, false);
      context.closePath();
      context.strokeStyle = "#FF0";
      context.stroke();
      context.fillStyle = "#FF0";
      return context.fill();
    };
    Player.prototype.drawPosition = function(context) {
      context.font = "bold 12px sans-serif";
      context.textAlign = "center";
      context.fillStyle = "#FFF";
      return context.fillText("(" + this.position.x + ", " + this.position.y + ")", this.position.x, this.position.y - TILE_HEIGHT);
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
