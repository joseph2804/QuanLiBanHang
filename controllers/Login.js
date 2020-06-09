'use strict';

var express = require('express');
var server = express.Router();
var LoginHelper = require('../scripts/LoginHelper');
var RegisterHelper = require('../scripts/RegisterHelper');

server.get('/', function (req, res) {

    res.render('login');
});

server.post('/login', function (req, res) {

    var reqData = req.body;
    var username = reqData.username;
    var password = reqData.password;

    if (!username || !password)
        return res.json({
            error: true,
            message: 'Chưa nhập tài khoản & mật khẩu'
        });

    LoginHelper.checkInput(username, password, function (err, result) {
        if (err)
            return res.json({
                error: true,
                message: err.message
            });

        if (result.length === 0)
            return res.json({
                error: true,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        if (result[0].Level === 1)
            res.redirect('/admin');

        res.redirect('/home');
    });
});

server.get('/register', function (req, res) {
    res.render('register');
});

server.get('/logout', function (req, res) {
    res.redirect('/login');
});

server.post('/registration', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var redirectTo = '/home';

    RegisterHelper.checkExistAccount(username, function (err, result) {
        if (err)
            return res.json({
                error: true,
                message: err.message
            });

        if (result.length > 0)
            return res.json({
                error: true,
                message: 'Username đã tồn tại'
            });

        RegisterHelper.addNewAccount(username, password, 1, 0, function (err, result) {
            if (err)
                return res.json({
                    error: true,
                    message: err.message
                });
            return res.json({
                error: false,
                redirect: redirectTo
            });
        });
    });

});

module.exports = server;