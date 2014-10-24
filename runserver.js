#!/usr/bin/env node

var express = require('express');

var app = express();
var PORT = 8889;

app.use(express.static(__dirname + '/static'));

app.listen(PORT, function () {
	console.log('listening on ' + PORT);
});
