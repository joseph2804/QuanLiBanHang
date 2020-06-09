'use strict';

var connectHelper = require('../scripts/DatabaseHelper');

function checkInput(userName, password, callback) {
    var queryString = `SELECT * FROM users WHERE UserName = '${userName}' AND Password = '${password}'`;

    connectHelper.queryString(queryString, callback);
};

module.exports = {
    checkInput: checkInput
}
