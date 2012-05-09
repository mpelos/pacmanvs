{exec, spawn} = require "child_process"

task "watch", "Generate the javascript output when changes are detected", ->
  watch = exec "coffee -j javascripts/pacmanvs.js -cwb javascripts/coffee/"
  watch.stdout.on "data", (data) -> process.stdout.write data
