#!/bin/env node

var Bouncer = require('./lib/bouncer.js'),
    IrcClient = require('./lib/irc_client'),
    Web = require('./lib/webClient.js');

var bouncer = new Bouncer.Bouncer();

var irc_client = new IrcClient.IrcClient("second", "second.ph", "A-Team", {'channels': ["#PH"]});
bouncer.addClient("second", irc_client);

var web = new Web(bouncer);
web.start();