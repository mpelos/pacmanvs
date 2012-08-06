{exec, spawn} = require "child_process"

# Order matters
files = [
  "request_animation_frame",
  "cronometer",
  "coordinate",
  "direction",
  "rectangle",
  "entity",
  "food",
  "player",
  "pacman",
  "ghost",
  "player_renderer"
  "ghost_renderer",
  "tile",
  "maps_matrix",
  "map",
  "collider",
  "game",
  "pacmanvs"
]

clientSource = ""
for file in files
  clientSource += " src/client/#{file}.coffee"

task "watch", "Generate the javascript output when changes are detected", ->
  watch = exec "coffee -j app.js -cwb src/server/*"
  watch.stdout.on "data", (data) -> process.stdout.write data

  watch = exec "coffee -j public/javascripts/pacmanvs.js -cwb #{clientSource}"
  watch.stdout.on "data", (data) -> process.stdout.write data

task "build", "Generate the javascript output", ->
  exec "coffee -j app.js -cb src/server/*"
  exec "coffee -j public/javascripts/pacmanvs.js -cb #{clientSource}"
