var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
  res.sendfile('./public/index.html');
});

var Web = function(bouncer){
	this.bouncer = bouncer
	self = this

	bouncer.on("message", function(type, server, channel, sender, message){
		var clients = io.sockets.clients(); // This returns an array with all connected clients

		for ( i = 0; i < clients.length; i++ ) {
    		clients[i].emit('event', { message: message, type: type, server: server, channel: channel, sender: sender });
		}
	});

	self.start = function(){
		server.listen(process.env.OPENSHIFT_INTERNAL_PORT, process.env.OPENSHIFT_INTERNAL_IP);
	}

}

module.exports = Web;