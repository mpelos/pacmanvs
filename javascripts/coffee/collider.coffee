class Collider
  constructor: (@entities) ->

  collisionBetween: (player, entity) ->
    player.boundingBox.isIntersected(entity.boundingBox)

  makeCollisions: ->
    for player in @entities.players
      for tile in player.currentTiles()
        for entity in tile.entities when entity isnt player
          player.collidesWith(entity) if this.collisionBetween(player, entity)
