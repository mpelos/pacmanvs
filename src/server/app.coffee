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
io.sockets.on "connection", (socket) ->
  sockets.push socket

  socket.on "disconnect", ->
    socketIndex = sockets.indexOf socket
    sockets.splice socketIndex, 1

app.get "/", (request, response) ->
  response.render "index"

port = process.env.PORT || 3000
app.listen port, ->
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
