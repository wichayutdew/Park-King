//setup express(web app listener), body-parser, tedious(for database connection!!)
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//tedious section
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;
//authentication section
passport = require('passport');
LocalStrategy = require('passport-local');

//===================================================================================================================================================

//azure database connection config
var config = {
    server: 'parking.database.windows.net',
    options:{
      encrypt: true,
      database: 'Park_King',
      rowCollectionOnRequestCompletion: true,
      rowCollectionOnDone: true,},
      //useColumnNames: true,
	authentication: {
    type: 'default',
    options: {
      database: 'Park_King',
      userName: 'thee',
      password: 'OtoroLover420',

    }
  }
  };

var connection = new Connection(config);

//===================================================================================================================================================

//defualt config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(CookieParser());
//===================================================================================================================================================
//          Passport Config
//===================================================================================================================================================

    passport.serializeUser(function(user, done) {
        done(null, user[4]);
    });
    passport.deserializeUser(function(id, done) {
        connection.on('connect',function(err){
            if(err){
                console.log(err);
            }else{
            }
        });
        deserializer(id,done);

    });
    function deserializer(email,done){
        var request = new Request(
            "SELECT * FROM dbo.Customer WHERE Username = @email",
            function(err,rows){
                //done(err,rows[0]);
            }
        );
        //set parameterized query
        request.addParameter('email',TYPES.VarChar,email);
        var deserializing = [];
        request.on('row', function (columns) {
            columns.forEach(function(column) {
                deserializing.push(column.value);
            });
            //console.log(deserializing);
        });

        request.on('requestCompleted', function (err,rows) {
            // Next SQL statement.
            done(err, deserializing[0]);
        });

        connection.execSql(request);
    }
    //passport model use for registeration
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.on('connect',function(err){
            if(err){
                console.log(err);
                //connection.close();
            }else{

            }
        });
        _signup(req,email,password,done);

        //res.redirect('/login');
    }));
    function _signup(req,email,password,done){
        console.log('Sign-up requested')
        var customer_info = {email :email,password : password,name : req.body.username, fname : req.body.firstName, lname : req.body.lastName}
        var request = new Request(
            "SELECT * FROM dbo.customer WHERE email = @email",
            function (err, rowCount, rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length != 0) {
                    return done(null, false);
                    console.log('this email is already taken');
                }else {

                    console.log('this email doesnot taken')
                    // if there is no user with that email
                    // create the use
                    var newUserMysql = new Object();

                    newUserMysql.email    = email;
                    newUserMysql.password = password; // use the generateHash function in our user model

                    newUserMysql.id = rows.insertId;

                    insert_newCustomer(customer_info,done)
				    return done(null, newUserMysql);
                }
            }
        );
        //set parameterized query
        request.addParameter('email',TYPES.VarChar,req.body.email);
        request.addParameter('password',TYPES.VarChar,req.body.password);

        request.on('requestCompleted', function () {

        });

        connection.execSql(request);

    }
    function insert_newCustomer(customer_info,done){
        var request = new Request("INSERT INTO dbo.customer (email, password, username, first_Name, last_Name) values (@email,@password,@username,@firstName,@lastName)",
            function (err, rowCount, rows){
                if(err){
                    done(err);
                }else{

                }
            });
        request.addParameter('email',TYPES.VarChar,customer_info.email);
        request.addParameter('password',TYPES.VarChar,customer_info.password);
        request.addParameter('username',TYPES.VarChar,customer_info.name);
        request.addParameter('firstName',TYPES.VarChar,customer_info.fname);
        request.addParameter('lastName',TYPES.VarChar,customer_info.lname);

        request.on('requestCompleted', function (){
        //connection.close();
        })
        connection.execSql(request);
    }
    //passport model use for login
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // callback with email and password from our form

        console.log('trying to login');
        connection.on('connect',function(err){
            if(err){
                console.log(err);
            }else{
            }
        });
        _login(req, username, password, done);

    }));
    function _login(req, username, password, done){
        console.log('log-in session...');
        var request = new Request(
            "SELECT * FROM dbo.customer WHERE userName = @username Or email = @username",
            function(err, rowCount, rows){
                console.log(username);
                console.log(rowCount);
                //console.log(rows);
                console.log(rows);

                console.log('returned rows are above')
                if(err){
                    return done(err);
                }
                if(rows == null){
                    console.log('loginMessage', 'No user found.');
                    return done(null, false);
                      // req.flash is the way to set flashdata using connect-flash
                }else if (!(login_request[1] == password)){
                    console.log('loginMessage', 'Oops! Wrong password.');
                    return done(null, false);
                     // create the loginMessage and save it to session as flashdata
                }else{
                    console.log('logged in!!!');
                    return done(null, login_request);
                }
        });
        request.addParameter('username',TYPES.VarChar,username);
        var login_request = [];
        request.on('row', function (columns) {
            columns.forEach(function(column) {
                login_request.push(column.value);
            });
            console.log(login_request);
        });

        request.on('Done',function(err, rowCount, rows){

        });

        connection.execSql(request);
    }
app.use(require('express-session')({
    secret: "Fuck You",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//passportConfig(passport);


//===================================================================================================================================================
//          Application section
//===================================================================================================================================================


//FIRST PAGE - HOME
app.get('/', function(req, res){
    res.redirect('home');
});
//ROUTE TO HOME PAGE
app.get('/home',function(req,res){
    res.render('home');
});
//ROUTE TO REGISTER PAGE
app.get('/register', function(req, res){
    res.render('register');
});
//ROUTE TO LOGIN PAGE
app.get('/login',function(req,res){
    res.render('login');
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
//ROUTE TO TEMPORARY PAGE
app.get('/temp', function(req, res){
    res.render('temp');
});


//when login button click
app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    session: false
  }));
app.post('/register',passport.authenticate('local-signup' , {
    successRedirect: '/login',
    failureRedirect: '/register',
    session: false
  }));

app.listen(3000, process.env.IP, function(){
    console.log('port 3000.....');
});
