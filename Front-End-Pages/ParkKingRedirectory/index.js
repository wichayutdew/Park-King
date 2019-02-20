//NPM REQUIRE
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


//=======================================================
//ROUTES
//=======================================================

//ROUTE TO HOME PAGE
app.get('/', function(req, res){
    res.redirect('/home');
});
app.get('/home', function(req, res){
    res.render('home');
});

//ROUTE TO USER REGISTER PAGE
app.get('/register', function(req, res){
    res.render('register');
});

//ROUTE TO CAR REGISTER PAGE
app.get('/carregister', function(req, res){
    res.render('carregister');
});

//ROUTE TO RESERVE PAGE
app.get('/reserve', function(req, res){
    res.render('reserve');
});

//ROUTE TO QR CODE PAGE
app.get('/showqr', function(req, res){
    res.render('showqr');
});

//ROUTE TO STATUS
app.get('/status', function(req, res){
    res.render('status');
});

//ROUTE TO USER INFO
app.get('/userinfo', function(req, res){
   res.render('userinfo');
});

//ROUTE TO LOGIN PAGE
app.get('/login', function(req, res){
    res.render('login');
});



app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
