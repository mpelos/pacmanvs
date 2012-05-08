var Collider, Coordinate, Cronometer, Direction, Entity, Food, Game, Ghost, MAPS_MATRIX, Map, Pacman, Player, Rectangle, Tile,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Collider = (function() {

  function Collider(entities) {
    this.entities = entities;
  }

  Collider.prototype.makeCollisions = function() {
    var entity, player, tile, _i, _len, _ref, _results;
    _ref = this.entities.players;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      _results.push((function() {
        var _j, _len2, _ref2, _results2;
        _ref2 = player.currentTiles();
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          tile = _ref2[_j];
          _results2.push((function() {
            var _k, _len3, _ref3, _results3;
            _ref3 = tile.entities;
            _results3 = [];
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              entity = _ref3[_k];
              if (entity !== player) {
                if (player.isIntersected(entity)) {
                  _results3.push(player.collidesWith(entity));
                } else {
                  _results3.push(void 0);
                }
              }
            }
            return _results3;
          })());
        }
        return _results2;
      })());
    }
    return _results;
  };

  return Collider;

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
    if (typeof direction === "string") {
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
    } else if (direction instanceof Coordinate) {
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
    } else if (typeof direction === "number") {
      return direction;
    } else {
      return null;
    }
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
    this.boundingBox = new Rectangle(this.position, Map.TILE_WIDTH, Map.TILE_HEIGHT);
  }

  Entity.prototype.currentTiles = function(positions) {
    var i, j, position, tiles, _i, _len;
    if (positions == null) positions = this.boundingBox.toArray();
    if (!(positions instanceof Array)) positions = [positions];
    tiles = [];
    for (_i = 0, _len = positions.length; _i < _len; _i++) {
      position = positions[_i];
      i = Math.floor(position.y / Map.TILE_HEIGHT);
      j = Math.floor(position.x / Map.TILE_WIDTH);
      tiles.push(this.map.tiles[i][j]);
    }
    return _.uniq(tiles);
  };

  Entity.prototype.excludeFromTiles = function() {
    var entity, tile, tileEntities, _i, _j, _len, _len2, _ref, _ref2, _results;
    _ref = this.currentTiles();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      tileEntities = [];
      _ref2 = tile.entities;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        entity = _ref2[_j];
        if (entity !== this) tileEntities.push(entity);
      }
      _results.push(tile.entities = tileEntities);
    }
    return _results;
  };

  Entity.prototype.includeIntoTiles = function() {
    var tile, _i, _len, _ref, _results;
    _ref = this.currentTiles();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      _results.push(tile.entities.push(this));
    }
    return _results;
  };

  Entity.prototype.isIntersected = function(other) {
    return this.boundingBox.isIntersected(other.boundingBox);
  };

  Entity.prototype.drawBoundingBox = function(context) {
    context.lineWidth = 2;
    context.strokeStyle = "red";
    return context.strokeRect(this.boundingBox.topLeft().x, this.boundingBox.topLeft().y, this.boundingBox.width, this.boundingBox.height);
  };

  return Entity;

})();

Food = (function(_super) {

  __extends(Food, _super);

  function Food(x, y, map) {
    this.map = map;
    Food.__super__.constructor.apply(this, arguments);
    this.width = Math.ceil(Map.TILE_WIDTH / 10);
    this.height = Math.ceil(Map.TILE_HEIGHT / 10);
    this.boundingBox = new Rectangle(this.position, this.width, this.height);
  }

  Food.prototype.draw = function(context) {
    context.fillStyle = "#FFF";
    context.beginPath();
    return context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
  };

  return Food;

})(Entity);

Game = (function() {
  var MAX_FPS;

  MAX_FPS = 60;

  function Game() {
    this.tick = __bind(this.tick, this);
    this.handleKey = __bind(this.handleKey, this);
    var canvas, name, _i, _len, _ref;
    this.map = new Map;
    this.pacman = this.map.entities.players[0];
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
    if (this.framesCounter == null) this.framesCounter = 0;
    if (this.fps == null) this.fps = MAX_FPS;
    if (this.fpsCronometer == null) this.fpsCronometer = new Cronometer;
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
    _ref = this.map.entities.foods;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      food = _ref[_i];
      food.draw(this.context.player);
    }
    _ref2 = this.map.entities.players;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      player = _ref2[_j];
      player.draw(this.context.player);
    }
    return this.drawFps();
  };

  Game.prototype.handleKey = function(event) {
    switch (event.which) {
      case 37:
        return this.pacman.turnLeft();
      case 38:
        return this.pacman.turnUp();
      case 39:
        return this.pacman.turnRight();
      case 40:
        return this.pacman.turnDown();
    }
  };

  Game.prototype.loop = function(delay) {
    return setTimeout(this.tick, delay);
  };

  Game.prototype.tick = function() {
    var delay, endTime, startTime;
    startTime = new Date;
    this.update();
    this.draw();
    endTime = new Date;
    delay = (1000 / MAX_FPS) - (endTime - startTime);
    return this.loop(delay);
  };

  return Game;

})();

Map = (function() {

  Map.TILE_WIDTH = 20;

  Map.TILE_HEIGHT = 20;

  Map.WALL_PADDING = 10;

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
          this.entities.players.push(new Ghost(x, y, this, "#FF3100"));
        }
      }
    }
    this.foodCounter = this.entities.foods.length;
  }

  Map.prototype.draw = function(context) {
    var array, endX, endY, i, j, startX, startY, tile, value, x, y, _len, _len2, _ref, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _x, _y;
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
          if (i === 0) {
            context.textAlign = "center";
            _results2.push(context.fillText(j, x + (Map.TILE_WIDTH / 2), y + 6));
          } else {
            _results2.push(void 0);
          }
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

Player = (function(_super) {

  __extends(Player, _super);

  function Player(x, y, map) {
    this.map = map;
    Player.__super__.constructor.apply(this, arguments);
    this.startPosition = _.clone(this.position);
    this.direction = new Direction("left");
    this.intentDirection = new Direction;
    this.animationIndex = 0;
    this.speed = 6;
  }

  Player.prototype.calculateDisplacement = function(gameFps) {
    return this.displacement = (this.speed * (Map.TILE_WIDTH + Map.TILE_HEIGHT) / 2) / gameFps;
  };

  Player.prototype.tilesAhead = function(direction) {
    var position, positionsAhead, _i, _len, _ref;
    if (direction == null) direction = this.direction;
    positionsAhead = [];
    _ref = this.boundingBox.toArray();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      position = _ref[_i];
      position.x += this.displacement * direction.toCoordinate().x;
      position.y += this.displacement * direction.toCoordinate().y;
      positionsAhead.push(position);
    }
    return this.currentTiles(positionsAhead);
  };

  Player.prototype.canMove = function(direction) {
    if (direction == null) direction = this.direction;
    return !_.any(this.tilesAhead(direction), function(tile) {
      return tile.isWall();
    });
  };

  Player.prototype.turnLeft = function() {
    return this.intentDirection.set("left");
  };

  Player.prototype.turnRight = function() {
    return this.intentDirection.set("right");
  };

  Player.prototype.turnUp = function() {
    return this.intentDirection.set("up");
  };

  Player.prototype.turnDown = function() {
    return this.intentDirection.set("down");
  };

  Player.prototype.canChangeDirection = function() {
    return this.canMove(this.intentDirection);
  };

  Player.prototype.updateDirection = function() {
    if ((this.intentDirection.angle != null) && this.canChangeDirection()) {
      this.direction.set(this.intentDirection.angle);
      this.intentDirection.set(null);
    }
    return this.direction;
  };

  Player.prototype.updatePosition = function() {
    var previousPosition, tileCenter;
    this.excludeFromTiles();
    if (this.canMove()) {
      previousPosition = _.clone(this.position);
      this.position.x += this.direction.toCoordinate().x * this.displacement;
      this.position.y += this.direction.toCoordinate().y * this.displacement;
      tileCenter = this.currentTiles(this.position)[0].centerCoordinate();
      if (tileCenter.betweenAxis(this.position, previousPosition) || !this.canMove()) {
        this.position.change(tileCenter.x, tileCenter.y);
      }
      delete previousPosition;
    }
    this.includeIntoTiles();
    return this.position;
  };

  Player.prototype.update = function(gameFps) {
    this.calculateDisplacement(gameFps);
    this.updateDirection();
    return this.updatePosition();
  };

  Player.prototype.collidesWith = function(entity) {};

  Player.prototype.draw = function(context) {};

  Player.prototype.drawPosition = function(context) {
    context.font = "bold 12px sans-serif";
    context.textAlign = "center";
    context.fillStyle = "#FFF";
    return context.fillText("(" + this.position.x + ", " + this.position.y + ")", this.position.x, this.position.y - Map.TILE_HEIGHT);
  };

  return Player;

})(Entity);

Ghost = (function(_super) {

  __extends(Ghost, _super);

  function Ghost(x, y, map, color) {
    this.map = map;
    this.color = color;
    Ghost.__super__.constructor.apply(this, arguments);
  }

  Ghost.prototype.drawEyeBall = function(context, x, y, radius) {
    context.beginPath();
    context.fillStyle = "#FFF";
    context.moveTo(x, y);
    context.bezierCurveTo(x - (radius * 3 / 8), y, x - (radius * 3 / 8), y + (radius * 6 / 8), x, y + (radius * 6 / 8));
    context.bezierCurveTo(x + (radius * 3 / 8), y + (radius * 6 / 8), x + (radius * 3 / 8), y, x, y);
    return context.fill();
  };

  Ghost.prototype.drawPupil = function(context, x, y, radius) {
    context.beginPath();
    context.fillStyle = "#3000FF";
    context.arc(x, y, radius * 1 / 8, 0, Math.PI * 2, false);
    return context.fill();
  };

  Ghost.prototype.draw = function(context) {
    var animations, radius,
      _this = this;
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2;
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.position.x, this.position.y, radius, 0, Math.PI, true);
    context.stroke();
    context.fill();
    context.fillRect(this.position.x - radius, this.position.y - 1, radius * 2, (radius * 2 / 3) + 1);
    context.strokeRect(this.position.x - radius, this.position.y - 1, radius * 2, (radius * 2 / 3) + 1);
    if (this.direction.toString() === "left") {
      this.drawEyeBall(context, this.position.x - (radius * 5 / 8), this.position.y - (radius * 4 / 8), radius);
      this.drawEyeBall(context, this.position.x + (radius * 1 / 8), this.position.y - (radius * 4 / 8), radius);
      this.drawPupil(context, this.position.x - (radius * 6 / 8), this.position.y - (radius * 1 / 8), radius);
      this.drawPupil(context, this.position.x, this.position.y - (radius * 1 / 8), radius);
    } else if (this.direction.toString() === "right") {
      this.drawEyeBall(context, this.position.x - (radius * 1 / 8), this.position.y - (radius * 4 / 8), radius);
      this.drawEyeBall(context, this.position.x + (radius * 5 / 8), this.position.y - (radius * 4 / 8), radius);
      this.drawPupil(context, this.position.x, this.position.y - (radius * 1 / 8), radius);
      this.drawPupil(context, this.position.x + (radius * 6 / 8), this.position.y - (radius * 1 / 8), radius);
    } else if (this.direction.toString() === "up") {
      this.drawEyeBall(context, this.position.x - (radius * 3 / 8), this.position.y - (radius * 7 / 8), radius);
      this.drawEyeBall(context, this.position.x + (radius * 3 / 8), this.position.y - (radius * 7 / 8), radius);
      this.drawPupil(context, this.position.x - (radius * 3 / 8), this.position.y - (radius * 6 / 8), radius);
      this.drawPupil(context, this.position.x + (radius * 3 / 8), this.position.y - (radius * 6 / 8), radius);
    } else if (this.direction.toString() === "down") {
      this.drawEyeBall(context, this.position.x - (radius * 3 / 8), this.position.y - (radius * 4 / 8), radius);
      this.drawEyeBall(context, this.position.x + (radius * 3 / 8), this.position.y - (radius * 4 / 8), radius);
      this.drawPupil(context, this.position.x - (radius * 3 / 8), this.position.y + (radius * 1 / 8), radius);
      this.drawPupil(context, this.position.x + (radius * 3 / 8), this.position.y + (radius * 1 / 8), radius);
    }
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.position.x - radius, this.position.y + (radius * 2 / 3));
    animations = [];
    animations[0] = function() {
      var cpx, cpy;
      cpx = _this.position.x - (radius * 2 / 3);
      cpy = _this.position.y + (radius * 1.2);
      context.bezierCurveTo(cpx, cpy, cpx, cpy, _this.position.x - (radius * 1 / 3), _this.position.y + (radius * 2 / 3));
      cpx = _this.position.x;
      cpy = _this.position.y + (radius * 1.2);
      context.bezierCurveTo(cpx, cpy, cpx, cpy, _this.position.x + (radius * 1 / 3), _this.position.y + (radius * 2 / 3));
      cpx = _this.position.x + (radius * 2 / 3);
      cpy = _this.position.y + (radius * 1.2);
      context.bezierCurveTo(cpx, cpy, cpx, cpy, _this.position.x + radius, _this.position.y + (radius * 2 / 3));
      context.lineTo(_this.position.x - radius, _this.position.y + (radius * 2 / 3));
      context.stroke();
      return context.fill();
    };
    animations[1] = function() {
      var cpx, cpy;
      context.lineTo(_this.position.x - radius, _this.position.y + radius);
      context.lineTo(_this.position.x - (radius * 2 / 3), _this.position.y + (radius * 2 / 3));
      cpx = _this.position.x - (radius * 1 / 6);
      cpy = _this.position.y + (radius * 1.2);
      context.bezierCurveTo(cpx, cpy, cpx, cpy, _this.position.x - (radius * 1 / 6), _this.position.y + (radius * 2 / 3));
      context.lineTo(_this.position.x + (radius * 1 / 6), _this.position.y + (radius * 2 / 3));
      cpx = _this.position.x + (radius * 1 / 6);
      context.bezierCurveTo(cpx, cpy, cpx, cpy, _this.position.x + (radius * 2 / 3), _this.position.y + (radius * 2 / 3));
      context.lineTo(_this.position.x + radius, _this.position.y + radius);
      context.lineTo(_this.position.x + radius, _this.position.y + (radius * 2 / 3));
      context.lineTo(_this.position.x - radius, _this.position.y + (radius * 2 / 3));
      context.stroke();
      return context.fill();
    };
    if (typeof animationTime === "undefined" || animationTime === null) {
      animationTime = new Cronometer;
    }
    if (animationTime.spentMiliseconds() >= 200 && this.canMove()) {
      this.animationIndex += 1;
      if (animations[this.animationIndex] == null) this.animationIndex = 0;
      delete animationTime;
    } else if (!this.canMove()) {
      this.animationIndex = 0;
    }
    return animations[this.animationIndex]();
  };

  return Ghost;

})(Player);

Pacman = (function(_super) {

  __extends(Pacman, _super);

  function Pacman() {
    Pacman.__super__.constructor.apply(this, arguments);
  }

  Pacman.prototype.collidesWith = function(entity) {
    if (entity instanceof Food) return this.collidesWithFood(entity);
  };

  Pacman.prototype.collidesWithFood = function(food) {
    food.excludeFromTiles();
    food.position.change(null, null);
    return this.map.foodCounter -= 1;
  };

  Pacman.prototype.draw = function(context) {
    var animations, radius,
      _this = this;
    radius = (Map.TILE_WIDTH + (Map.WALL_PADDING / 2)) / 2;
    context.beginPath();
    context.fillStyle = "#FF0";
    animations = new Array;
    animations[0] = function() {
      context.arc(_this.position.x, _this.position.y, radius, _this.direction.angle + Math.PI * 0.3, _this.direction.angle + Math.PI * 1.3, false);
      context.fill();
      context.beginPath();
      context.arc(_this.position.x, _this.position.y, radius, _this.direction.angle + Math.PI * 0.7, _this.direction.angle + Math.PI * 1.7, false);
      return context.fill();
    };
    animations[1] = function() {
      context.arc(_this.position.x, _this.position.y, radius, _this.direction.angle + Math.PI * 0.2, _this.direction.angle + Math.PI * 1.2, false);
      context.fill();
      context.beginPath();
      context.arc(_this.position.x, _this.position.y, radius, _this.direction.angle + Math.PI * 0.8, _this.direction.angle + Math.PI * 1.8, false);
      return context.fill();
    };
    animations[2] = function() {
      context.arc(_this.position.x, _this.position.y, radius, _this.direction.angle + Math.PI * 0.1, _this.direction.angle + Math.PI * 1.1, false);
      context.fill();
      context.beginPath();
      context.arc(_this.position.x, _this.position.y, radius, _this.direction.angle + Math.PI * 0.9, _this.direction.angle + Math.PI * 1.9, false);
      return context.fill();
    };
    animations[3] = function() {
      context.arc(_this.position.x, _this.position.y, radius, 0, Math.PI * 2, false);
      return context.fill();
    };
    animations[4] = animations[2];
    animations[5] = animations[1];
    animations[6] = animations[0];
    if (typeof animationTime === "undefined" || animationTime === null) {
      animationTime = new Cronometer;
    }
    if (animationTime.spentMiliseconds() >= 15 && this.canMove()) {
      this.animationIndex += 1;
      if (animations[this.animationIndex] == null) this.animationIndex = 0;
      delete animationTime;
    } else if (!this.canMove()) {
      this.animationIndex = 1;
    }
    return animations[this.animationIndex]();
  };

  return Pacman;

})(Player);

Rectangle = (function() {

  function Rectangle(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  Rectangle.prototype.topLeft = function() {
    return new Coordinate(this.position.x - this.width / 2, this.position.y - this.height / 2);
  };

  Rectangle.prototype.topRight = function() {
    return new Coordinate(this.position.x + this.width / 2 - 0.5, this.position.y - this.height / 2);
  };

  Rectangle.prototype.bottomRight = function() {
    return new Coordinate(this.position.x + this.width / 2 - 0.5, this.position.y + this.height / 2 - 0.5);
  };

  Rectangle.prototype.bottomLeft = function() {
    return new Coordinate(this.position.x - this.width / 2, this.position.y + this.height / 2 - 0.5);
  };

  Rectangle.prototype.toArray = function() {
    return [this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft()];
  };

  Rectangle.prototype.isIntersected = function(other) {
    var isIntersectOnXAxis, isIntersectOnYAxis, _ref, _ref2, _ref3, _ref4;
    isIntersectOnXAxis = (this.topLeft().x <= (_ref = other.topLeft().x) && _ref <= this.topRight().x) || (this.topLeft().x <= (_ref2 = other.topRight().x) && _ref2 <= this.topRight().x);
    isIntersectOnYAxis = (this.topRight().y <= (_ref3 = other.topRight().y) && _ref3 <= this.bottomRight().y) || (this.topRight().y <= (_ref4 = other.bottomRight().y) && _ref4 <= this.bottomRight().y);
    return isIntersectOnXAxis && isIntersectOnYAxis;
  };

  return Rectangle;

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
