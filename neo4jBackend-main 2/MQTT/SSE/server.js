'use strict';
const connect = require("connect");
const app = connect();

const httpServer = require('http').createServer(app);

const SseChannel = require('sse-channel');
const dateChannel = new SseChannel();

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
 res.setHeader("Connection", "keep-alive");
 res.setHeader("Cache-Control", "no-cache");
 res.setHeader("Content-Type", "text/event-stream");
 next();
});

app.use(function(req, res) {
 if (req.url.indexOf('/events/datetime') === 0) {
  dateChannel.addClient(req, res);
 } else {
  res.writeHead(404);
  res.end();
 }
});

setInterval(function broadcastDate() {
 dateChannel.send((new Date()).toISOString());
}, 10000);


httpServer.listen(7000, function() {
 console.log('Serwer HTTP działa na pocie 7000');
});