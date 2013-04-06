var events = require('events');
var util = require('util');
var irc = require('irc');

var IrcClient = function(server, address, nick, options){

	events.EventEmitter.call(this);
	self = this;
	
	self.server = server;
	self.connection = new irc.Client(address, nick, options);

	self.connection.on('message', function(from, to, message){
		self.emit('message', 'irc', server, from, to, message);
	});

	self.send_message = function(to, message){
		self.connection.say(to, message);
	};

};

util.inherits(IrcClient, events.EventEmitter);

exports.IrcClient = IrcClient;