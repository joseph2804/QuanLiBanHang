'use strict';

var connectHelper = require('../scripts/DatabaseHelper');

function checkInput(userName, password, callback) {
    var queryString = `SELECT * FROM user WHERE UserName = '${userName}' AND Password = '${password}'`;

    connectHelper.queryString(queryString, callback);
};

module.exports = {
    checkInput: checkInput
}
