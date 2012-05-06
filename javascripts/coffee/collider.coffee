class Collider
  constructor: (@entities) ->

  intersectionOnXAxis: (player, entity) ->
    player.collisionLimit.topLeft().x <= entity.collisionLimit.topLeft().x  <= player.collisionLimit.topRight().x or
    player.collisionLimit.topLeft().x <= entity.collisionLimit.topRight().x <= player.collisionLimit.topRight().x or
    entity.collisionLimit.topLeft().x <= player.collisionLimit.topLeft().x  <= entity.collisionLimit.topRight().x or
    entity.collisionLimit.topLeft().x <= player.collisionLimit.topRight().x <= entity.collisionLimit.topRight().x

  intersectionOnYAxis: (player, entity) ->
    player.collisionLimit.topRight().y <= entity.collisionLimit.topRight().y    <= player.collisionLimit.bottomRight().y or
    player.collisionLimit.topRight().y <= entity.collisionLimit.bottomRight().y <= player.collisionLimit.bottomRight().y or
    entity.collisionLimit.topRight().y <= player.collisionLimit.topRight().y    <= entity.collisionLimit.bottomRight().y or
    entity.collisionLimit.topRight().y <= player.collisionLimit.bottomRight().y <= entity.collisionLimit.bottomRight().y

  collisionBetween: (player, entity) ->
    this.intersectionOnXAxis(player, entity) and this.intersectionOnYAxis(player, entity)

  makeCollisions: ->
    for player in @entities.players
      for tile in player.currentTiles()
        for entity in tile.entities when entity isnt player
          player.collidesWith(entity) if this.collisionBetween(player, entity)
