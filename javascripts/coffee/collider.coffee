class Collider
  constructor: (@entities) ->

  intersectionOnXAxis: (player, entity) ->
    player.collisionLimit.verticesPositions()[0].x <= entity.collisionLimit.verticesPositions()[0].x <= player.collisionLimit.verticesPositions()[1].x or
    player.collisionLimit.verticesPositions()[0].x <= entity.collisionLimit.verticesPositions()[1].x <= player.collisionLimit.verticesPositions()[1].x or
    entity.collisionLimit.verticesPositions()[0].x <= player.collisionLimit.verticesPositions()[0].x <= entity.collisionLimit.verticesPositions()[1].x or
    entity.collisionLimit.verticesPositions()[0].x <= player.collisionLimit.verticesPositions()[1].x <= entity.collisionLimit.verticesPositions()[1].x

  intersectionOnYAxis: (player, entity) ->
    player.collisionLimit.verticesPositions()[1].y <= entity.collisionLimit.verticesPositions()[1].y <= player.collisionLimit.verticesPositions()[2].y or
    player.collisionLimit.verticesPositions()[1].y <= entity.collisionLimit.verticesPositions()[2].y <= player.collisionLimit.verticesPositions()[2].y or
    entity.collisionLimit.verticesPositions()[1].y <= player.collisionLimit.verticesPositions()[1].y <= entity.collisionLimit.verticesPositions()[2].y or
    entity.collisionLimit.verticesPositions()[1].y <= player.collisionLimit.verticesPositions()[2].y <= entity.collisionLimit.verticesPositions()[2].y

  collisionBetween: (player, entity) ->
    this.intersectionOnXAxis(player, entity) and this.intersectionOnYAxis(player, entity)

  makeCollisions: ->
    for player in @entities.players
      for entity in player.currentTile().entities
        if entity isnt player and this.collisionBetween(player, entity)
          player.collidesWith(entity)
