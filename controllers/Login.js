'use strict';

var express = require('express');
var server = express.Router();
var LoginHelper = require('../scripts/ProductHelper');

server.get('/', function (req, res) {

    res.render('login');
});

server.post('/login', function (req, res) {

    var reqData = req.body;
    var email = reqData.email;
    var password = reqData.password;

    if (!email || !password)
        return res.json({
            error: true,
            message: 'Chưa nhập tài khoản & mật khẩu'
        });

    LoginHelper.checkInput(email, password, function (err, result) {
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
        if(result[0].Level === 1)
            res.redirect('/admin');
        
        res.redirect('/home');
    });
});

module.exports = server;