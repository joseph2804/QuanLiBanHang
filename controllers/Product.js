'use strict';

var express = require('express');
var server = express.Router();
var ProductHelper = require('../scripts/ProductHelper');

server.get('/', function (req, res) {
    ProductHelper.getProducts(function (err, result) {
        if (err) {
            return res.json({
                error: true,
                message: err.message
            });
        } else res.render('products', {
            products: result
        });
    });
});

server.get('/detail', function (req, res) {
    var productId = req.query.productId;
    ProductHelper.getProductById(productId, function (err, result) {
        if (err)
            return res.json({
                error: true,
                message: err.message
            });
        console.log(result);
        res.render('detail', {
            product: result
        });
    });

})


module.exports = server;