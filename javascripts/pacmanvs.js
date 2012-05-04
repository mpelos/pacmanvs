(function() {
  var Collider, CollisionLimit, Coordinate, Cronometer, Direction, Entity, Food, Game, MAPS_MATRIX, Map, Player, Tile;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Collider = (function() {
    function Collider(entities) {
      this.entities = entities;
    }
    Collider.prototype.intersectionOnXAxis = function(player, entity) {
      var _ref, _ref2, _ref3, _ref4;
      return (player.collisionLimit.verticesPositions()[0].x <= (_ref = entity.collisionLimit.verticesPositions()[0].x) && _ref <= player.collisionLimit.verticesPositions()[1].x) || (player.collisionLimit.verticesPositions()[0].x <= (_ref2 = entity.collisionLimit.verticesPositions()[1].x) && _ref2 <= player.collisionLimit.verticesPositions()[1].x) || (entity.collisionLimit.verticesPositions()[0].x <= (_ref3 = player.collisionLimit.verticesPositions()[0].x) && _ref3 <= entity.collisionLimit.verticesPositions()[1].x) || (entity.collisionLimit.verticesPositions()[0].x <= (_ref4 = player.collisionLimit.verticesPositions()[1].x) && _ref4 <= entity.collisionLimit.verticesPositions()[1].x);
    };
    Collider.prototype.intersectionOnYAxis = function(player, entity) {
      var _ref, _ref2, _ref3, _ref4;
      return (player.collisionLimit.verticesPositions()[1].y <= (_ref = entity.collisionLimit.verticesPositions()[1].y) && _ref <= player.collisionLimit.verticesPositions()[2].y) || (player.collisionLimit.verticesPositions()[1].y <= (_ref2 = entity.collisionLimit.verticesPositions()[2].y) && _ref2 <= player.collisionLimit.verticesPositions()[2].y) || (entity.collisionLimit.verticesPositions()[1].y <= (_ref3 = player.collisionLimit.verticesPositions()[1].y) && _ref3 <= entity.collisionLimit.verticesPositions()[2].y) || (entity.collisionLimit.verticesPositions()[1].y <= (_ref4 = player.collisionLimit.verticesPositions()[2].y) && _ref4 <= entity.collisionLimit.verticesPositions()[2].y);
    };
    Collider.prototype.collisionBetween = function(player, entity) {
      return this.intersectionOnXAxis(player, entity) && this.intersectionOnYAxis(player, entity);
    };
    Collider.prototype.makeCollisions = function() {
      var entity, player, _i, _len, _ref, _results;
      _ref = this.entities.players;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = player.currentTile().entities;
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            entity = _ref2[_j];
            _results2.push(entity !== player && this.collisionBetween(player, entity) ? player.collidesWith(entity) : void 0);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    return Collider;
  })();
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
      } else if (direction instanceof Coordinate) {
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
  Entity = (function() {
    function Entity(x, y, map) {
      this.map = map;
      this.position = new Coordinate(x, y);
      this.collisionLimit = new CollisionLimit(this.position, Map.TILE_WIDTH, Map.TILE_HEIGHT);
    }
    Entity.prototype.currentTile = function(referencePoint) {
      var i, j;
      if (referencePoint == null) {
        referencePoint = this.position;
      }
      i = Math.floor(referencePoint.y / Map.TILE_HEIGHT);
      j = Math.floor(referencePoint.x / Map.TILE_WIDTH);
      return this.map.tiles[i][j];
    };
    Entity.prototype.excludeFromTile = function() {
      var entity, i, tileEntities, _len, _ref;
      tileEntities = [];
      _ref = this.currentTile().entities;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        entity = _ref[i];
        if (entity !== this) {
          tileEntities.push(entity);
        }
      }
      return this.currentTile().entities = tileEntities;
    };
    return Entity;
  })();
  Food = (function() {
    __extends(Food, Entity);
    function Food(x, y, map) {
      this.map = map;
      Food.__super__.constructor.apply(this, arguments);
      this.width = Math.ceil(Map.TILE_WIDTH / 10);
      this.height = Math.ceil(Map.TILE_HEIGHT / 10);
      this.collisionLimit = new CollisionLimit(this.position, this.width, this.height);
    }
    Food.prototype.draw = function(context) {
      context.fillStyle = "#FFF";
      context.beginPath();
      return context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    };
    return Food;
  })();
  Game = (function() {
    var MAX_FPS;
    MAX_FPS = 60;
    function Game() {
      this.handleKey = __bind(this.handleKey, this);      var canvas, name, _i, _len, _ref;
      this.map = new Map;
      this.pacman = this.map.entities.players.first();
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
      this.map.draw(this.context.map);
      this.collider = new Collider(this.map.entities);
      this.loop(1000 / MAX_FPS);
    }
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
      this.pacman.update(this.fps);
      return this.collider.makeCollisions();
    };
    Game.prototype.draw = function() {
      var food, player, _i, _j, _len, _len2, _ref, _ref2;
      this.canvas.player.width = this.canvas.player.width;
      _ref = this.map.entities.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.draw(this.context.player);
      }
      _ref2 = this.map.entities.foods;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        food = _ref2[_j];
        food.draw(this.context.player);
      }
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
    Game.prototype.loop = function(initialDelay) {
      var _ref;
            if ((_ref = this.delay) != null) {
        _ref;
      } else {
        this.delay = initialDelay;
      };
      return setTimeout(__bind(function() {
        var endTime, startTime;
        startTime = new Date;
        this.update();
        this.draw();
        endTime = new Date;
        this.delay = (1000 / MAX_FPS) - (endTime - startTime);
        return this.loop();
      }, this), this.delay);
    };
    return Game;
  })();
  Map = (function() {
    Map.TILE_WIDTH = 20;
    Map.TILE_HEIGHT = 20;
    Map.WALL_PADDING = 6;
    Map.WALL = "w";
    Map.PATH = "p";
    Map.FOOD = "f";
    Map.PACMAN = "P";
    function Map() {
      var array, food, i, j, value, x, y, _len, _len2, _ref;
      this.matrix = MAPS_MATRIX[0];
      this.width = this.matrix[0].length * Map.TILE_WIDTH;
      this.height = this.matrix.length * Map.TILE_HEIGHT;
      this.tiles = [];
      this.entities = {
        players: [],
        foods: []
      };
      _ref = this.matrix;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        array = _ref[i];
        this.tiles[i] = [];
        for (j = 0, _len2 = array.length; j < _len2; j++) {
          value = array[j];
          this.tiles[i][j] = new Tile(this, i, j, value);
          x = this.tiles[i][j].centerCoordinate().x;
          y = this.tiles[i][j].centerCoordinate().y;
          if (value === Map.FOOD) {
            food = new Food(x, y, this);
            this.tiles[i][j].type = Map.PATH;
            this.tiles[i][j].entities.push(food);
            this.entities.foods.push(food);
          }
          if (value === Map.PACMAN) {
            this.tiles[i][j].type = Map.PATH;
            this.entities.players.push(new Player(x, y, this));
          }
        }
      }
      this.foodCounter = this.entities.foods.length;
    }
    Map.prototype.draw = function(context) {
      var array, endX, endY, i, j, startX, startY, tile, value, x, y, _len, _len2, _ref, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _x, _y;
      this.drawGrid(context);
      context.beginPath();
      _ref = this.matrix;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        array = _ref[i];
        for (j = 0, _len2 = array.length; j < _len2; j++) {
          value = array[j];
          x = j * Map.TILE_WIDTH;
          y = i * Map.TILE_HEIGHT;
          tile = this.tiles[i][j];
          if (tile.isWall()) {
            startX = tile.isWallLeftCorner() ? x + Map.WALL_PADDING : x;
            endX = tile.isWallRightCorner() ? x + Map.TILE_WIDTH - Map.WALL_PADDING : x + Map.TILE_WIDTH;
            startY = tile.isWallUpCorner() ? y + Map.WALL_PADDING : y;
            endY = tile.isWallDownCorner() ? y + Map.TILE_HEIGHT - Map.WALL_PADDING : y + Map.TILE_HEIGHT;
            if ((_ref2 = tile.above()) != null ? _ref2.isPath() : void 0) {
              _y = y + Map.WALL_PADDING + 0.5;
              context.moveTo(startX, _y);
              context.lineTo(endX, _y);
            }
            if ((_ref3 = tile.right()) != null ? _ref3.isPath() : void 0) {
              _x = x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5;
              context.moveTo(_x, startY);
              context.lineTo(_x, endY);
            }
            if ((_ref4 = tile.below()) != null ? _ref4.isPath() : void 0) {
              _y = y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5;
              context.moveTo(startX, _y);
              context.lineTo(endX, _y);
            }
            if ((_ref5 = tile.left()) != null ? _ref5.isPath() : void 0) {
              _x = x + Map.WALL_PADDING + 0.5;
              context.moveTo(_x, startY);
              context.lineTo(_x, endY);
            }
            if ((((_ref6 = tile.above()) != null ? _ref6.isWall() : void 0) || !(tile.above() != null)) && (((_ref7 = tile.right()) != null ? _ref7.isWall() : void 0) || !(tile.right() != null)) && (((_ref8 = tile.below()) != null ? _ref8.isWall() : void 0) || !(tile.below() != null)) && (((_ref9 = tile.left()) != null ? _ref9.isWall() : void 0) || !(tile.left() != null))) {
              if ((_ref10 = tile.aboveRight()) != null ? _ref10.isPath() : void 0) {
                context.moveTo(x + Map.TILE_WIDTH, y + Map.WALL_PADDING + 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y + Map.WALL_PADDING + 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y);
              }
              if ((_ref11 = tile.belowRight()) != null ? _ref11.isPath() : void 0) {
                context.moveTo(x + Map.TILE_WIDTH, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.TILE_WIDTH - Map.WALL_PADDING - 0.5, y + Map.TILE_HEIGHT);
              }
              if ((_ref12 = tile.belowLeft()) != null ? _ref12.isPath() : void 0) {
                context.moveTo(x, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.WALL_PADDING + 0.5, y + Map.TILE_HEIGHT - Map.WALL_PADDING - 0.5);
                context.lineTo(x + Map.WALL_PADDING + 0.5, y + Map.TILE_HEIGHT);
              }
              if ((_ref13 = tile.aboveLeft()) != null ? _ref13.isPath() : void 0) {
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
  MAPS_MATRIX = [];
  MAPS_MATRIX[0] = [['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['p', 'p', 'p', 'p', 'p', 'p', 'f', 'p', 'p', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'p', 'p', 'f', 'p', 'p', 'p', 'p', 'p', 'p'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'p', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'p', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w'], ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'P', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'w'], ['w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w'], ['w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w'], ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w', 'w', 'f', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'f', 'w'], ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'], ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']];
  jQuery(function($) {
    var game;
    game = new Game;
    $(".wrapper").css({
      "width": "" + game.map.width + "px",
      "height": "" + game.map.height + "px"
    });
    return $(document).bind("keydown", game.handleKey);
  });
  Player = (function() {
    __extends(Player, Entity);
    function Player(x, y, map) {
      this.map = map;
      Player.__super__.constructor.apply(this, arguments);
      this.startPosition = Object.clone(this.position);
      this.direction = new Direction("left");
      this.intentDirection = new Direction;
      this.animationIndex = 0;
      this.speed = 80;
    }
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
      return this.map.tiles[i][j];
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
    Player.prototype.updateDirection = function() {
      if ((this.intentDirection.angle != null) && this.canChangeDirection()) {
        this.direction.set(this.intentDirection.angle);
        this.intentDirection.set(null);
      }
      return this.direction;
    };
    Player.prototype.updatePosition = function(gameFps) {
      var displacement, previousPosition, tileCenter;
      this.excludeFromTile();
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
      }
      this.currentTile().entities.push(this);
      return this.position;
    };
    Player.prototype.update = function(gameFps) {
      this.updateDirection();
      return this.updatePosition(gameFps);
    };
    Player.prototype.collidesWith = function(entity) {
      if (entity instanceof Food) {
        return this.collidesWithFood(entity);
      }
    };
    Player.prototype.collidesWithFood = function(food) {
      food.excludeFromTile();
      food.position.change(null, null);
      return this.map.foodCounter -= 1;
    };
    Player.prototype.draw = function(context) {
      var animations, radius;
      this.drawPosition(context);
      radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2;
      context.beginPath();
      context.fillStyle = "#FF0";
      animations = new Array;
      animations[0] = __bind(function() {
        context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.3, this.direction.angle + Math.PI * 1.3, false);
        context.fill();
        context.beginPath();
        context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.7, this.direction.angle + Math.PI * 1.7, false);
        return context.fill();
      }, this);
      animations[1] = __bind(function() {
        context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.2, this.direction.angle + Math.PI * 1.2, false);
        context.fill();
        context.beginPath();
        context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.8, this.direction.angle + Math.PI * 1.8, false);
        return context.fill();
      }, this);
      animations[2] = __bind(function() {
        context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.1, this.direction.angle + Math.PI * 1.1, false);
        context.fill();
        context.beginPath();
        context.arc(this.position.x, this.position.y, radius, this.direction.angle + Math.PI * 0.9, this.direction.angle + Math.PI * 1.9, false);
        return context.fill();
      }, this);
      animations[3] = __bind(function() {
        context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2, false);
        return context.fill();
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
    Player.prototype.drawPosition = function(context) {
      context.font = "bold 12px sans-serif";
      context.textAlign = "center";
      context.fillStyle = "#FFF";
      return context.fillText("(" + this.position.x + ", " + this.position.y + ")", this.position.x, this.position.y - Map.TILE_HEIGHT);
    };
    return Player;
  })();
  Tile = (function() {
    function Tile(map, i, j, type) {
      this.map = map;
      this.i = i;
      this.j = j;
      this.type = type;
      this.entities = [];
    }
    Tile.prototype.centerCoordinate = function() {
      var x, y;
      x = (this.j * Map.TILE_WIDTH) + (Map.TILE_WIDTH / 2);
      y = (this.i * Map.TILE_HEIGHT) + (Map.TILE_HEIGHT / 2);
      return new Coordinate(x, y);
    };
    Tile.prototype.above = function() {
      var _ref;
      return (_ref = this.map.tiles[this.i - 1]) != null ? _ref[this.j] : void 0;
    };
    Tile.prototype.aboveRight = function() {
      var _ref;
      return (_ref = this.map.tiles[this.i - 1]) != null ? _ref[this.j + 1] : void 0;
    };
    Tile.prototype.right = function() {
      return this.map.tiles[this.i][this.j + 1];
    };
    Tile.prototype.belowRight = function() {
      var _ref;
      return (_ref = this.map.tiles[this.i + 1]) != null ? _ref[this.j + 1] : void 0;
    };
    Tile.prototype.below = function() {
      var _ref;
      return (_ref = this.map.tiles[this.i + 1]) != null ? _ref[this.j] : void 0;
    };
    Tile.prototype.belowLeft = function() {
      var _ref;
      return (_ref = this.map.tiles[this.i + 1]) != null ? _ref[this.j - 1] : void 0;
    };
    Tile.prototype.left = function() {
      return this.map.tiles[this.i][this.j - 1];
    };
    Tile.prototype.aboveLeft = function() {
      var _ref;
      return (_ref = this.map.tiles[this.i - 1]) != null ? _ref[this.j - 1] : void 0;
    };
    Tile.prototype.isWall = function() {
      return this.type === Map.WALL;
    };
    Tile.prototype.isPath = function() {
      return this.type === Map.PATH;
    };
    Tile.prototype.isWallUpCorner = function() {
      var _ref, _ref2;
      return ((_ref = this.above()) != null ? _ref.isPath() : void 0) && ((_ref2 = this.below()) != null ? _ref2.isWall() : void 0);
    };
    Tile.prototype.isWallRightCorner = function() {
      var _ref, _ref2;
      return ((_ref = this.right()) != null ? _ref.isPath() : void 0) && ((_ref2 = this.left()) != null ? _ref2.isWall() : void 0);
    };
    Tile.prototype.isWallDownCorner = function() {
      var _ref, _ref2;
      return ((_ref = this.below()) != null ? _ref.isPath() : void 0) && ((_ref2 = this.above()) != null ? _ref2.isWall() : void 0);
    };
    Tile.prototype.isWallLeftCorner = function() {
      var _ref, _ref2;
      return ((_ref = this.left()) != null ? _ref.isPath() : void 0) && ((_ref2 = this.right()) != null ? _ref2.isWall() : void 0);
    };
    return Tile;
  })();
}).call(this);
