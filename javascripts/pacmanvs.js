(function() {
  var PATH, WALL, i, j, level, levelLine, tileHeight, tileWidth, transposedLevel, value, wallPadding, _len, _len2;
  WALL = 1;
  PATH = 0;
  level = [[WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, WALL, WALL, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL, WALL, PATH, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, PATH, WALL], [WALL, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, PATH, WALL], [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]];
  transposedLevel = [];
  for (i = 0, _len = level.length; i < _len; i++) {
    levelLine = level[i];
    transposedLevel[i] = [];
    for (j = 0, _len2 = levelLine.length; j < _len2; j++) {
      value = levelLine[j];
      transposedLevel[i][j] = level[j][i];
    }
  }
  tileWidth = 20;
  tileHeight = 20;
  wallPadding = 0;
  jQuery(function($) {
    var canvas, context, i, j, levelLine, value, x, y, _len3, _len4, _x, _y;
    canvas = document.getElementById("pacman_canvas");
    canvas.width = level[0].length * tileWidth;
    canvas.height = level.length * tileHeight;
    context = canvas.getContext("2d");
    context.strokeStyle = "#03F";
    for (i = 0, _len3 = level.length; i < _len3; i++) {
      levelLine = level[i];
      for (j = 0, _len4 = levelLine.length; j < _len4; j++) {
        value = levelLine[j];
        x = j * tileWidth;
        y = i * tileHeight;
        if (value === WALL) {
          if (i !== 0 && level[i - 1][j] === PATH) {
            _y = y + wallPadding + 0.5;
            context.moveTo(x, _y);
            context.lineTo(x + tileWidth, _y);
          }
          if (level[i][j + 1] === PATH) {
            _x = x + tileWidth - wallPadding - 0.5;
            context.moveTo(_x, y);
            context.lineTo(_x, y + tileHeight);
          }
          if (i !== level.length - 1 && level[i + 1][j] === PATH) {
            _y = y + tileHeight - wallPadding - 0.5;
            context.moveTo(x, _y);
            context.lineTo(x + tileWidth, _y);
          }
          if (level[i][j - 1] === PATH) {
            _x = x + wallPadding + 0.5;
            context.moveTo(_x, y);
            context.lineTo(_x, y + tileHeight);
          }
        }
      }
    }
    context.stroke();
    return context.width = context.width;
  });
}).call(this);
