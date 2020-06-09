'use strict';

var express = require('express');
var server = express.Router();
var ProductHelper = require('../scripts/ProductHelper');

server.get('/', function(req, res, next) {
    ProductHelper.getProducts(function (err, result) {
        if(err)
            return res.json({
                error: true,
                message: err.message
            });
        res.render('home', {
            products: result
        });
    });
    
});

module.exports = server;
