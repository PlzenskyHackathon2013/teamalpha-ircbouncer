var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

var Web = function(bouncer){
	this.bouncer = bouncer
	self = this

	bouncer.on("message", function(server, channel, sender, message){
		var clients = io.sockets.clients(); // This returns an array with all connected clients

		for ( i = 0; i < clients.length; i++ ) {
    		clients[i].emit('event', { data: message });
		}
	});

	self.start = function(){
		server.listen(8080);
	}

}

module.exports = Web;