'use strict';

var connectHelper = require('../scripts/DatabaseHelper');

function checkExistAccount(UserName, callback) {
    var queryString = `SELECT * FROM users WHERE UserName = '${UserName}'`;

    connectHelper.queryString(queryString, callback);
}

function addNewAccount(UserName, Password, Status, Level, callback) {
    var queryString = `INSERT INTO users(UserId, UserName, Password, Status, Level) VALUES ('', '${UserName}', '${Password}', '${Status}', '${Level}')`;
    
    connectHelper.queryString(queryString, callback);
}

module.exports = {
    checkExistAccount: checkExistAccount,
    addNewAccount: addNewAccount
}