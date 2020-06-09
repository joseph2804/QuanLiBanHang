'use strict';

var express = require('express');
var server = express.Router();
var LoginHelper = require('../scripts/ProductHelper');
var RegisterHelper = require('../scripts/RegisterHelper');

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
        if (result[0].Level === 1)
            res.redirect('/admin');

        res.redirect('/home');
    });
});

server.get('/register', function (req, res) {
    res.render('register');
});

server.post('/login', function (req, res) {
    var redirectTo = req.session.redirectTo || '/account';

    if (LoginHelper.getCurrentCustomer(req))
        return res.redirect(redirectTo);

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

        var account = new AccountModel(result[0]);

        req.session.User = {
            email: email,
            id: account.id,
            name: account.name,
            isAdmin: account.isAdmin
        };

        LoginHelper.checkAdminRole(account.email, function (err, result) {
            if (!err && result.length > 0) req.session.User.isAdmin = !!result[0].Level;

            return res.json({
                error: false,
                redirect: redirectTo
            });
        });
    });
});

server.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) return res.send(err);
    });

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