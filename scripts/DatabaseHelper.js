'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'quanlibanhang',
    charset: 'utf8_unicode_ci'
});

function queryString(queryString, callback) {
    connection.query(queryString, function (err, result) {
        callback(err, result);
    });
};

module.exports = {
    queryString: queryString
}
