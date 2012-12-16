express = require "express"
socket  = require "socket.io"
sugar   = require "sugar"

app = module.exports = express.createServer()
io = socket.listen(app)

app.configure ->
  app.set "views", "#{__dirname}/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static("#{__dirname}/public")

app.configure "development", ->
  app.use express.errorHandler({ dumpExceptions: true, showStack: true })
  app.set "websocket_url", "http://localhost:#{process.env.PORT || 3000}"

app.configure "production", ->
  app.use express.errorHandler()
  app.set "websocket_url", "http://pacmanvs.herokuapp.com"
  io.set "transports", ["xhr-polling"]

sockets = []
characterCodes = [0, 1, 2, 3, 4]
io.sockets.on "connection", (socket) ->
  sockets.push socket
  socket.characterCode = characterCodes.shift()
  socket.emit "character", socket.characterCode

  socket.on "disconnect", ->
    characterCodes.push(socket.characterCode)
    characterCodes.sort()
    sockets.remove socket

  socket.on "keyPress", (keyCode, characterCode) ->
    socket.broadcast.emit "playerKeyPress", keyCode, characterCode

app.get "/", (request, response) ->
  response.render "index"

port = process.env.PORT || 3000
app.listen port, ->
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
