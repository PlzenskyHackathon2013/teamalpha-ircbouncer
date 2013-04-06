var events = require('events');
var util = require('util');

var Bouncer = function(){

	self = this;
	events.EventEmitter.call(self);

	self.send_message = null;
	self.clients = {};

	self.addClient = function(name, client){
		self.clients[name] = client;
		self.clients[name].on('message', self.on_message);
	};

	self.on_message = function(type, server, from, to, message){
		self.emit('message', type, server, from, to, message);
	};

};

util.inherits(Bouncer, events.EventEmitter);

exports.Bouncer = Bouncer;