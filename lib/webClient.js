var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static("./public"));

var Web = function(bouncer){
	this.bouncer = bouncer
	self = this

	io.sockets.on('connection', function (socket) {
		socket.on('message', function(message){
			bouncer.send_message("second", "#PH", message);
		});
	});

	bouncer.on("message", function(type, server, channel, sender, message){
		var clients = io.sockets.clients();
		for ( i = 0; i < clients.length; i++ ) {
    		clients[i].emit('event', { message: message, type: type, server: server, channel: channel, sender: sender });
		}
	});

	self.start = function(){
		server.listen(process.env.OPENSHIFT_INTERNAL_PORT, process.env.OPENSHIFT_INTERNAL_IP);
	}

}

module.exports = Web;