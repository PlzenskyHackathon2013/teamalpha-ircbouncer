#!/bin/env node

var Bouncer = require('./lib/bouncer.js'),
    IrcClient = require('./lib/irc_client'),
    Web = require('./lib/web.js');

var bouncer = new Bouncer.Bouncer();

var irc_client = new IrcClient.IrcClient("second", "second.ph", "A-Team", {'channels': ["#PH"]});
bouncer.addClient(irc_client);

var web = new Web.Web(bouncer);
web.start();