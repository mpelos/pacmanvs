{exec, spawn} = require "child_process"

# Order matters
files = [
  "request_animation_frame",
  "timer",
  "coordinate",
  "direction",
  "rectangle",
  "entity",
  "food",
  "player",
  "pacman",
  "ghost",
  "player_renderer"
  "pacman_renderer"
  "ghost_renderer",
  "tile",
  "maps_matrix",
  "map",
  "collider",
  "game"
]

gameFiles = files.concat(["pacmanvs"])

presentationFiles = [
  "basic_player"
  "slide",
  "presentation",
  "initializer"
]

clientSource = ""
for file in gameFiles
  clientSource += " src/client/#{file}.coffee"

presentationSource = ""
for file in files
  presentationSource += " src/client/#{file}.coffee"
for file in presentationFiles
  presentationSource += " src/client/presentation/#{file}.coffee"

task "watch", "Generate the javascript output when changes are detected", ->
  watch = exec "coffee -j app.js -cwb src/server/*"
  watch.stdout.on "data", (data) -> process.stdout.write data

  watch = exec "coffee -j public/javascripts/pacmanvs.js -cwb #{clientSource}"
  watch.stdout.on "data", (data) -> process.stdout.write data

  watch = exec "coffee -j public/javascripts/presentation.js -cwb #{presentationSource}"
  watch.stdout.on "data", (data) -> process.stdout.write data

task "build", "Generate the javascript output", ->
  exec "coffee -j app.js -cb src/server/*"
  exec "coffee -j public/javascripts/pacmanvs.js -cb #{clientSource}"
  exec "coffee -j public/javascripts/presentation.js -cb #{presentationSource}"
