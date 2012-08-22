class Collider
  constructor: (@entities) ->

  makeCollisions: ->
    for player in @entities.characters
      for tile in player.currentTiles()
        if tile
          for entity in tile.entities when entity isnt player
            player.collidesWith(entity) if player.isIntersected(entity)
