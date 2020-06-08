var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var server = express();

var home = require('./controllers/Home');
var login = require('./controllers/Login');
var product = require('./controllers/Product');
var admin = require('./controllers/Admin');
var account = require('./controllers/Account');

server.use(express.static(__dirname + '/client'));
server.use(cors());
server.set('view engine', 'ejs');
server.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);
server.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 300000 }}));

server.listen(process.env.PORT || 3001, function () {
    console.log('Server listening on port 3001!');
});

server.use('/home', home);
server.use('/login', login);
server.use('/product', product);
server.use('/admin', admin);
server.use('/account', account);

server.get('/', function(req, res) {
    return res.redirect('/home');
});
