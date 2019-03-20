//NPM REQUIRE
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

//APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//===================================================================================================================================================
//          Passport Module
//===================================================================================================================================================

    passport.serializeUser(function(user, done) {
        console.log('serializer');
        console.log(user);
        done(null, user[0]);
    });
    passport.deserializeUser(function(user, done) {
      console.log('deserializer')
        connection.on('connect',function(err){
            if(err){
                console.log(err);
            }else{
            }
        });
        deserializer(user,done);

    });
    function deserializer(username,done){
        var request = new Request(
            "SELECT * FROM dbo.Customer WHERE Username = @username",
            function(err,rows){
                //done(err,rows[0]);
            }
        );
        //set parameterized query
        request.addParameter('email',TYPES.VarChar,username[0]);
        var deserializing = [];
        request.on('row', function (columns) {
            columns.forEach(function(column) {
                deserializing.push(column.value);
            });
            //console.log(deserializing);
        });

        request.on('requestCompleted', function (err,rows) {
            // Next SQL statement.
            done(err, deserializing);
        });

        connection.execSql(request);
    }
    //passport model use for registeration
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        //console.log('check 00');
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username,password,done) {
        console.log('check 01');
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.on('connect',function(err){
            if(err){
                console.log(err);
                //connection.close();
            }else{
                console.log('check 02');
            }
        });
        _signup(req,username,password,done);

        //res.redirect('/login');
    }));
    function _signup(req,username,password,done){
        console.log('Sign-up requested')
        var customer_info = {
          username :req.body.username,
          password : req.body.password,
          passwordCheck : req.body.passwordConfirmation,
          email : req.body.email,
          fname : req.body.firstName,
          lname : req.body.lastName,
          occupation: req.body.occupation,
          studentID: req.body.studentID,
          professorID: req.body.professorID,
          guestID: req.body.NationalID,
          CustomerPicture: req.body.profilePic,
        };
        var request = new Request(
            "SELECT * FROM dbo.Customer WHERE Username = @username",
            function (err, rowCount, rows){
                console.log(rows);
                console.log("above row object");
                if (err){
                    console.log("signup error");
                    return done(err);
                }
                if (customer_info.password!=customer_info.passwordCheck){
                    console.log('password does not match');
                    return done(null,false);
                }
                if (rows.length != 0) {
                    console.log('this email is already taken');
                    return done(null, false);
                }else {

                    console.log('this email doesnot taken')
                    // if there is no user with that email
                    // create the use
                    var newUserMysql = new Object();

                    newUserMysql.username = username;
                    newUserMysql.password = password; // use the generateHash function in our user model

                    newUserMysql.id = rows.insertId;

                    insert_newCustomer(customer_info,done)
				            return done(null, newUserMysql);
                }
            }
        );
        //set parameterized query
        request.addParameter('username',TYPES.VarChar,customer_info.username);
        request.addParameter('password',TYPES.VarChar,customer_info.password);

        request.on('requestCompleted', function () {

        });

        connection.execSql(request);

    }
    function insert_newCustomer(customer_info,done){
        var request = new Request("INSERT INTO dbo.Customer (FirstName,LastName,Email,Username,Password,customerType,studentID,professorID,NationalID) values (@firstName,@lastName,@email,@username,@password,@occupation,@studentID,@professorID,@CitizenID)",
        //CystomerPicture,profilePic
            function (err, rowCount, rows){
                if(err){
                    done(err);
                }else{

                }
            });

        request.addParameter('firstName',TYPES.VarChar,customer_info.fname);
        request.addParameter('lastName',TYPES.VarChar,customer_info.lname);
        request.addParameter('email',TYPES.VarChar,customer_info.email);
        request.addParameter('username',TYPES.VarChar,customer_info.username);
        request.addParameter('password',TYPES.VarChar,customer_info.password);
        request.addParameter('occupation',TYPES.VarChar,customer_info.occupation);
        request.addParameter('studentID',TYPES.VarChar,customer_info.studentID);
        request.addParameter('professorID',TYPES.VarChar,customer_info.professorID);
        request.addParameter('CitizenID',TYPES.VarChar,customer_info.guestID);
        //request.addParameter('profilePic',TYPES.image,customer_info.CustomerPicture);

        request.on('requestCompleted', function (){
        //connection.close();
        //error here
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
    function(req,username,password,done) {
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
            console.log('log-in requested');
            var request = new Request(
                "SELECT * FROM dbo.customer WHERE Username = @username Or Email = @username",
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
                console.log(login_request + 'info');
            });

            request.on('Done',function(err, rowCount, rows){
                console.log(loggedInBoolean());
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
//===================================================================================================================================================
// Operation
//===================================================================================================================================================

//check log-in state
function loggedInBoolean(req) {
    if (req.user.authenticated) {
        return true;
    } else {
        return false;
    }
}
function loggedIn(req, res, next) {
    if (req.user) {
        console.log('user in login state');
        return next();
    } else {
        console.log('user not login');
        res.redirect('/home');
    }
}
// app.get('/orders', loggedIn, function(req, res, next) {
//     // req.user - will exist
//     // load user orders and render them
// });


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

//ROUTE TO LOGIN PAGE
app.get('/login', function(req, res){
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
app.get('/userinfo',loggedIn, function(req, res){
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
    session: true,
}));
app.post('/register',passport.authenticate('local-signup' , {
    successRedirect: '/login',
    failureRedirect: '/register',
    session: false
}));



app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
