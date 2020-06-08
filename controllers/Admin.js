'use strict';

var express = require('express');
var server = express.Router();

server.get('/', function (req, res) {
    res.render('admin');
});
module.exports = server;