(function() {
  var CollisionLimit, Coordinate, Cronometer, Direction, Game, Map, Player, Tile;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CollisionLimit = (function() {
    function CollisionLimit(position, width, height) {
      this.position = position;
      this.width = width;
      this.height = height;
    }
    CollisionLimit.prototype.verticesPositions = function() {
      return new Array(new Coordinate(this.position.x - this.width / 2, this.position.y - this.height / 2), new Coordinate(this.position.x + this.width / 2 - 0.5, this.position.y - this.height / 2), new Coordinate(this.position.x + this.width / 2 - 0.5, this.position.y + this.height / 2 - 0.5), new Coordinate(this.position.x - this.width / 2, this.position.y + this.height / 2 - 0.5));
    };
    return CollisionLimit;
  })();
  Coordinate = (function() {
    function Coordinate(x, y) {
      this.x = x;
      this.y = y;
    }
    Coordinate.prototype.change = function(x, y) {
      this.x = x;
      return this.y = y;
    };
    Coordinate.prototype.betweenAxisX = function(x1, x2) {
      var _ref, _ref2;
      return (x1 < (_ref = this.x) && _ref < x2) || (x1 > (_ref2 = this.x) && _ref2 > x2);
    };
    Coordinate.prototype.betweenAxisY = function(y1, y2) {
      var _ref, _ref2;
      return (y1 < (_ref = this.y) && _ref < y2) || (y1 > (_ref2 = this.y) && _ref2 > y2);
    };
    Coordinate.prototype.betweenAxis = function(coordinate1, coordinate2) {
      return this.betweenAxisX(coordinate1.x, coordinate2.x) || this.betweenAxisY(coordinate1.y, coordinate2.y);
    };
    Coordinate.prototype.toString = function() {
      return "" + this.x + ", " + this.y;
    };
    return Coordinate;
  })();
  Cronometer = (function() {
    function Cronometer() {
      this.startTime = new Date;
    }
    Cronometer.prototype.spentMiliseconds = function() {
      return new Date - this.startTime;
    };
    Cronometer.prototype.spentSeconds = function() {
      return this.spentMiliseconds() / 1000;
    };
    return Cronometer;
  })();
  Direction = (function() {
    function Direction(direction) {
      this.angle = this.parse(direction);
    }
    Direction.prototype.parse = function(direction) {
      var angle;
      if (typeof direction === "string") {
        angle = (function() {
          switch (direction.toLowerCase()) {
            case "right":
              return 0;
            case "down":
              return Math.PI * 0.5;
            case "left":
              return Math.PI;
            case "up":
              return Math.PI * 1.5;
          }
        })();
      } else if (typeof direction === "coordinate") {
        angle = (function() {
          switch (direction.toString()) {
            case "1, 0":
              return 0;
            case "0, -1":
              return Math.PI * 0.5;
            case "-1, 0":
              return Math.PI;
            case "0, 1":
              return Math.PI * 1.5;
          }
        })();
      } else if (typeof direction === "number") {
        angle = direction;
      } else {
        angle = null;
      }
      return angle;
    };
    Direction.prototype.set = function(direction) {
      return this.angle = this.parse(direction);
    };
    Direction.prototype.toCoordinate = function() {
      switch (this.angle) {
        case 0:
          return new Coordinate(1, 0);
        case Math.PI * 0.5:
          return new Coordinate(0, 1);
        case Math.PI:
          return new Coordinate(-1, 0);
        case Math.PI * 1.5:
          return new Coordinate(0, -1);
      }
    };
    Direction.prototype.toString = function() {
      switch (this.angle) {
        case 0:
          return "right";
        case Math.PI * 0.5:
          return "down";
        case Math.PI:
          return "left";
        case Math.PI * 1.5:
          return "up";
      }
    };
    return Direction;
  })();
  Game = (function() {
    var MAX_FPS;
    MAX_FPS = 60;
    function Game() {
      this.handleKey = __bind(this.handleKey, this);      this.map = new Map;
      this.delay = 1000 / MAX_FPS;
    }
    Game.prototype.init = function() {
      var array, canvas, i, j, name, tile, value, x, y, _i, _len, _len2, _len3, _ref, _ref2;
      this.canvas = {};
      this.context = {};
      _ref = $("canvas");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        canvas = _ref[_i];
        name = canvas.id.replace("_canvas", "");
        this.canvas[name] = document.getElementById(canvas.id);
        this.canvas[name].width = this.map.matrix[0].length * Map.TILE_WIDTH;
        this.canvas[name].height = this.map.matrix.length * Map.TILE_HEIGHT;
        this.context[name] = this.canvas[name].getContext("2d");
      }
      _ref2 = this.map.matrix;
      for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
        array = _ref2[i];
        for (j = 0, _len3 = array.length; j < _len3; j++) {
          value = array[j];
          tile = new Tile(this.map, i, j);
          x = tile.centerCoordinate().x;
          y = tile.centerCoordinate().y;
          if (value === Map.FOOD) {
            this.map.matrix[i][j] = Map.PATH;
          }
          if (value === Map.PACMAN) {
            this.map.matrix[i][j] = Map.PATH;
            this.pacman = new Player(x, y, this.map, this.context.player, this);
          }
        }
      }
      this.map.draw(this.context.map);
      this.map.drawGrid(this.context.map);
      this.gameTime = new Cronometer;
      return this.loop();
    };
    Game.prototype.calculateFps = function() {
      var _ref, _ref2, _ref3;
            if ((_ref = this.framesCounter) != null) {
        _ref;
      } else {
        this.framesCounter = 0;
      };
            if ((_ref2 = this.fps) != null) {
        _ref2;
      } else {
        this.fps = MAX_FPS;
      };
            if ((_ref3 = this.fpsCronometer) != null) {
        _ref3;
      } else {
        this.fpsCronometer = new Cronometer;
      };
      if (!(this.fpsCronometer.spentMiliseconds() < 1000)) {
        delete this.fpsCronometer;
        this.fps = this.framesCounter;
        this.framesCounter = 0;
      }
      this.framesCounter += 1;
      return this.fps;
    };
    Game.prototype.drawFps = function() {
      this.context.player.font = "bold 12px sans-serif";
      this.context.player.textAlign = "right";
      this.context.player.fillStyle = "#FFF";
      return this.context.player.fillText("" + this.fps + " FPS", this.canvas.map.width - 5, this.canvas.map.height - 5);
    };
    Game.prototype.update = function() {
      this.calculateFps();
      return this.pacman.move(this.fps);
    };
    Game.prototype.draw = function() {
      this.canvas.player.width = this.canvas.player.width;
      this.pacman.draw();
      this.pacman.drawPosition();
      return this.drawFps();
    };
    Game.prototype.handleKey = function(event) {
      switch (event.which) {
        case 37:
          return this.pacman.intentDirection.set("left");
        case 38:
          return this.pacman.intentDirection.set("up");
        case 39:
          return this.pacman.intentDirection.set("right");
        case 40:
          return this.pacman.intentDirection.set("down");
      }
    };
    Game.prototype.loop = function() {
      return setTimeout(__bind(function() {
        var endTime, startTime;
        startTime = new Date;
        this.update();
        this.draw();
        this.loop();
        endTime = new Date;
        return this.delay = (1000 / MAX_FPS) - (endTime - startTime);
      }, this), this.delay);
    };
    return Game;
  })();
  Map = (function() {
    var P, f, p, w;
    Map.TILE_WIDTH = 20;
    Map.TILE_HEIGHT = 20;
    Map.WALL_PADDING = 6;
    Map.WALL = w = 1;
    Map.PATH = p = 0;
    Map.FOOD = f = 3;
    Map.PACMAN = P = 9;
    function Map() {
      this.matrix = [[w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w], [w, f, f, f, f, f, f, f, f, f, f, f, f, w, w, f, f, f, f, f, f, f, f, f, f, f, f, w], [w, f, w, w, w, w, f, w, w, w, w, w, f, w, w, f, w, w, w, w, w, f, w, w, w, w, f, w], [w, f, w, w, w, w, f, w, w, w, w, w, f, w, w, f, w, w, w, w, w, f, w, w, w, w, f, w], [w, f, w, w, w, w, f, w, w, w, w, w, f, w, w, f, w, w, w, w, w, f, w, w, w, w, f, w], [w, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, w], [w, f, w, w, w, w, f, w, w, f, w, w, w, w, w, w, w, w, f, w, w, f, w, w, w, w, f, w], [w, f, w, w, w, w, f, w, w, f, w, w, w, w, w, w, w, w, f, w, w, f, w, w, w, w, f, w], [w, f, f, f, f, f, f, w, w, f, f, f, f, w, w, f, f, f, f, w, w, f, f, f, f, f, f, w], [w, w, w, w, w, w, f, w, w, w, w, w, p, w, w, p, w, w, w, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, w, w, w, p, w, w, p, w, w, w, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, p, p, p, p, p, p, p, p, p, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, w, w, w, w, w, w, w, w, p, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, w, w, w, w, w, w, w, w, p, w, w, f, w, w, w, w, w, w], [p, p, p, p, p, p, f, p, p, p, w, w, w, w, w, w, w, w, p, p, p, f, p, p, p, p, p, p], [w, w, w, w, w, w, f, w, w, p, w, w, w, w, w, w, w, w, p, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, w, w, w, w, w, w, w, w, p, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, p, p, p, p, p, p, p, p, p, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, w, w, w, w, w, w, w, w, p, w, w, f, w, w, w, w, w, w], [w, w, w, w, w, w, f, w, w, p, w, w, w, w, w, w, w, w, p, w, w, f, w, w, w, w, w, w], [w, f, f, f, f, f, f, f, f, f, f, f, f, w, w, f, f, f, f, f, f, f, f, f, f, f, f, w], [w, f, w, w, w, w, f, w, w, w, w, w, f, w, w, f, w, w, w, w, w, f, w, w, w, w, f, w], [w, f, w, w, w, w, f, w, w, w, w, w, f, w, w, f, w, w, w, w, w, f, w, w, w, w, f, w], [w, f, f, f, w, w, f, f, f, f, f, f, f, f, P, f, f, f, f, f, f, f, w, w, f, f, f, w], [w, w, w, f, w, w, f, w, w, f, w, w, w, w, w, w, w, w, f, w, w, f, w, w, f, w, w, w], [w, w, w, f, w, w, f, w, w, f, w, w, w, w, w, w, w, w, f, w, w, f, w, w, f, w, w, w], [w, f, f, f, f, f, f, w, w, f, f, f, f, w, w, f, f, f, f, w, w, f, f, f, f, f, f, w], [w, f, w, w, w, w, w, w, w, w, w, w, f, w, w, f, w, w, w, w, w, w, w, w, w, w, f, w], [w, f, w, w, w, w, w, w, w, w, w, w, f, w, w, f, w, w, w, w, w, w, w, w, w, w, f, w], [w, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, w], [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]];
      this.width = this.matrix[0].length * Map.TILE_WIDTH;
      this.height = this.matrix.length * Map.TILE_HEIGHT;
    }
    Map.prototype.draw = function(context) {
      var array, endX, endY, i, j, startX, startY, tile, value, x, y, _len, _len2, _ref, _x, _y;
      context.beginPath();
      _ref = this.matrix;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        array = _ref[i];
        for (j = 0, _len2 = array.length; j < _len2; j++) {
          value = array[j];
          x = j * Map.TILE_WIDTH;
          y = i * Map.TILE_HEIGHT;
          tile = new Tile(this, i, j);
          if (tile.isWall()) {
            startX = tile.isWallLeftCorner() ? x + Map.WALL_PADDING : x;
            endX = tile.isWallRightCorner() ? x + Map.TILE_WIDTH - Map.WALL_PADDING : x + Map.TILE_WIDTH;
            startY = tile.isWallUpCorner() ? y + Map.WALL_PADDING : y;
            endY = tile.isWallDownCorner() ? y + Map.TILE_HEIGHT - Map.WALL_PADDING : y + Map.TILE_HEIGHT;
            if (tile.above().isPath()) {
              _y = y + Map.WALL_PADDING + 0.5;
              context.moveTo(startX, _y);
              context.lineTo(endX, _y);
            }
            if (tile.right().isPath()) {
              _x = x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5;
              context.moveTo(_x, startY);
              context.lineTo(_x, endY);
            }
            if (tile.below().isPath()) {
              _y = y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5;
              context.moveTo(startX, _y);
              context.lineTo(endX, _y);
            }
            if (tile.left().isPath()) {
              _x = x + Map.WALL_PADDING + 0.5;
              context.moveTo(_x, startY);
              context.lineTo(_x, endY);
            }
            if (tile.above().isWall() && tile.right().isWall() && tile.below().isWall() && tile.left().isWall()) {
              if (tile.aboveRight().isPath()) {
                context.moveTo(x + Map.TILE_WIDTH, y + Map.WALL_PADDING + 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y + Map.WALL_PADDING + 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y);
              }
              if (tile.belowRight().isPath()) {
                context.moveTo(x + Map.TILE_WIDTH, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y + Map.TILE_HEIGHT);
              }
              if (tile.belowLeft().isPath()) {
                context.moveTo(x, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.WALL_PADDING + 0.5, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.WALL_PADDING + 0.5, y + Map.TILE_HEIGHT);
              }
              if (tile.aboveLeft().isPath()) {
                context.moveTo(x, y + Map.WALL_PADDING + 0.5);
                context.lineTo(x + Map.WALL_PADDING + 0.5, y + Map.WALL_PADDING + 0.5);
                context.lineTo(x + Map.WALL_PADDING + 0.5, y);
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
            x = j * Map.TILE_WIDTH;
            y = i * Map.TILE_HEIGHT;
            context.moveTo(x, y + Map.TILE_HEIGHT + 0.5);
            context.lineTo(x + Map.TILE_WIDTH, y + Map.TILE_HEIGHT + 0.5);
            context.moveTo(x + Map.TILE_WIDTH + 0.5, y);
            context.lineTo(x + Map.TILE_WIDTH + 0.5, y + Map.TILE_HEIGHT);
            context.closePath();
            context.strokeStyle = "#444";
            context.stroke();
            context.font = "bold 12px sans-serif";
            context.textBaseline = "middle";
            context.fillStyle = "#FFF";
            if (j === 0) {
              context.textAlign = "left";
              context.fillText(i, x, y + (Map.TILE_HEIGHT / 2));
            }
            _results2.push(i === 0 ? (context.textAlign = "center", context.fillText(j, x + (Map.TILE_WIDTH / 2), y + 6)) : void 0);
          }
          return _results2;
        })());
      }
      return _results;
    };
    return Map;
  })();
  jQuery(function($) {
    var game;
    game = new Game;
    $(".wrapper").css({
      "width": "" + game.map.width + "px",
      "height": "" + game.map.height + "px"
    });
    $(document).bind("keydown", game.handleKey);
    return game.init();
  });
  Player = (function() {
    function Player(x, y, map, context) {
      this.map = map;
      this.context = context;
      this.position = new Coordinate(x, y);
      this.startPosition = Object.clone(this.position);
      this.direction = new Direction("left");
      this.intentDirection = new Direction;
      this.collisionLimit = new CollisionLimit(this.position, Map.TILE_WIDTH, Map.TILE_HEIGHT);
      this.animationIndex = 0;
      this.speed = 60;
    }
    Player.prototype.currentTile = function(referencePoint) {
      var i, j;
      if (referencePoint == null) {
        referencePoint = this.position;
      }
      i = Math.floor(referencePoint.y / Map.TILE_HEIGHT);
      j = Math.floor(referencePoint.x / Map.TILE_WIDTH);
      return new Tile(this.map, i, j);
    };
    Player.prototype.lookAhead = function(referencePoint, direction) {
      var i, j;
      if (referencePoint == null) {
        referencePoint = this.position;
      }
      if (direction == null) {
        direction = this.direction;
      }
      referencePoint.x += 1 * direction.toCoordinate().x;
      referencePoint.y += 1 * direction.toCoordinate().y;
      i = this.currentTile(referencePoint).i;
      j = this.currentTile(referencePoint).j;
      return new Tile(this.map, i, j);
    };
    Player.prototype.canChangeDirection = function() {
      return this.collisionLimit.verticesPositions().every(__bind(function(position) {
        return this.lookAhead(position, this.intentDirection).isPath();
      }, this));
    };
    Player.prototype.canMove = function() {
      return this.collisionLimit.verticesPositions().every(__bind(function(position) {
        return this.lookAhead(position).isPath();
      }, this));
    };
    Player.prototype.move = function(gameFps) {
      var displacement, previousPosition, tileCenter;
      if ((this.intentDirection.angle != null) && this.canChangeDirection()) {
        this.direction.set(this.intentDirection.angle);
        this.intentDirection.set(null);
      }
      if (this.canMove()) {
        displacement = this.speed / gameFps;
        previousPosition = Object.clone(this.position);
        this.position.x += this.direction.toCoordinate().x * displacement;
        this.position.y += this.direction.toCoordinate().y * displacement;
        tileCenter = this.currentTile().centerCoordinate();
        if (tileCenter.betweenAxis(this.position, previousPosition) || !this.canMove()) {
          this.position.change(tileCenter.x, tileCenter.y);
        }
        delete previousPosition;
        return this.position;
      }
    };
    Player.prototype.draw = function() {
      var animations, radius;
      radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2;
      this.context.beginPath();
      this.context.fillStyle = "#FF0";
      animations = new Array;
      animations[0] = __bind(function() {
        this.context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.3, this.direction.angle + Math.PI * 1.3, false);
        this.context.fill();
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.7, this.direction.angle + Math.PI * 1.7, false);
        return this.context.fill();
      }, this);
      animations[1] = __bind(function() {
        this.context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.2, this.direction.angle + Math.PI * 1.2, false);
        this.context.fill();
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.8, this.direction.angle + Math.PI * 1.8, false);
        return this.context.fill();
      }, this);
      animations[2] = __bind(function() {
        this.context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.1, this.direction.angle + Math.PI * 1.1, false);
        this.context.fill();
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.9, this.direction.angle + Math.PI * 1.9, false);
        return this.context.fill();
      }, this);
      animations[3] = __bind(function() {
        this.context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2, false);
        return this.context.fill();
      }, this);
      animations[4] = animations[2];
      animations[5] = animations[1];
      animations[6] = animations[0];
            if (typeof animationTime !== "undefined" && animationTime !== null) {
        animationTime;
      } else {
        animationTime = new Cronometer;
      };
      if (animationTime.spentMiliseconds() >= 15 && this.canMove()) {
        this.animationIndex += 1;
        delete animationTime;
      } else if (!this.canMove()) {
        this.animationIndex = 1;
      }
      return animations.at(this.animationIndex)();
    };
    Player.prototype.drawPosition = function() {
      this.context.font = "bold 12px sans-serif";
      this.context.textAlign = "center";
      this.context.fillStyle = "#FFF";
      return this.context.fillText("(" + this.position.x + ", " + this.position.y + ")", this.position.x, this.position.y - Map.TILE_HEIGHT);
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
    Tile.prototype.centerCoordinate = function() {
      var x, y;
      x = (this.j * Map.TILE_WIDTH) + (Map.TILE_WIDTH / 2);
      y = (this.i * Map.TILE_HEIGHT) + (Map.TILE_HEIGHT / 2);
      return new Coordinate(x, y);
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
      return this.current() === Map.WALL || this.current() === INVALID;
    };
    Tile.prototype.isPath = function() {
      if (this.current() !== INVALID) {
        return this.current() === Map.PATH;
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
