'use strict';

var express = require('express');
var server = express.Router();
var ProductHelper = require('../scripts/ProductHelper');

server.get('/', function (req, res) {
    ProductHelper.getProducts( function (err, result) {
        if(err) {
            return res.json({
                error: true,
                message: err.message
            });
            console.log(result);
        }
        else res.render('products', {
            products: result
        });
    });
});

server.get('/detail', function (req, res) {
    res.render('detail');
})


module.exports = server;
