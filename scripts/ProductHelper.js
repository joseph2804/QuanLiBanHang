'use strict';

var DatabaseHelper = require('../scripts/DatabaseHelper');

function getProducts(callback) {
    DatabaseHelper.queryString('SELECT * FROM products', function (err, result) {
        callback(err, result);
    });
}

function getProductById(productId, callback) {
    DatabaseHelper.queryString(`SELECT * FROM products WHERE ProductId = '${productId}'`, function (err, result) {
        callback(err, result);
    });
}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById
}
