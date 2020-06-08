'use strict';

var DatabaseHelper = require('../scripts/DatabaseHelper');

function getProducts(callback) {
    DatabaseHelper.queryString('SELECT * FROM products ORDER BY ID DESC', function (err, result) {
        callback(err, result);
    });
}

module.exports = {
    getProducts: getProducts
}
