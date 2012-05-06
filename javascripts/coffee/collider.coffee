class Collider
  constructor: (@entities) ->

  makeCollisions: ->
    for player in @entities.players
      for tile in player.currentTiles()
        for entity in tile.entities when entity isnt player
          player.collidesWith(entity) if player.isIntersected(entity)
