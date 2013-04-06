var events = require('events');
var util = require('util');

var Bouncer = function(){

	events.EventEmitter.call(this);
	var self = this;

	self.clients = {};

	self.addClient = function(name, client){
		console.log(self);
		console.log(this);
		console.log(self.clients);
		self.clients[name] = client;
		self.clients[name].on('message', self.on_message);
	};

	self.on_message = function(type, server, from, to, message){
		self.emit('message', type, server, from, to, message);
	};

	self.send_message = function(name, to, message){
		self.clients[name].send_message(to, message);
	};

};

util.inherits(Bouncer, events.EventEmitter);

exports.Bouncer = Bouncer;