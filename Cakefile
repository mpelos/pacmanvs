{exec, spawn} = require "child_process"

task "watch", "Generate the javascript output when changes are detected", ->
  watch = exec "coffee -j public/javascripts/pacmanvs.js -cwb src/client/*"
  watch.stdout.on "data", (data) -> process.stdout.write data
