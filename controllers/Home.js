'use strict';

var express = require('express');
var server = express.Router();

server.get('/', function(req, res, next) {
    res.render('home');
});

module.exports = server;
