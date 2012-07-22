{exec, spawn} = require "child_process"

task "watch", "Generate the javascript output when changes are detected", ->
  watch = exec "coffee -j app.js -cwb src/server/*"
  watch.stdout.on "data", (data) -> process.stdout.write data

  watch = exec "coffee -j public/javascripts/pacmanvs.js -cwb src/client/*"
  watch.stdout.on "data", (data) -> process.stdout.write data

task "build", "Generate the javascript output", ->
  exec "coffee -j app.js -cb src/server/*"
  exec "coffee -j public/javascripts/pacmanvs.js -cb src/client/*"
