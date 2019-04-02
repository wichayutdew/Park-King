var username1;
var currentUser;
var customer = require('./Customer.js');
//NPM REQUIRE
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
//create temp storage
const multer = require('multer');
//auto delete image after upload
const autoReap  = require('multer-autoreap');
var fs = require('fs');
var getterSetter = require('./getterSetter.js');

//tedious section
var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//authentication section
passport = require('passport');
LocalStrategy = require('passport-local');

//check user TYPE
var userID
function checkUserType(user) {
  if(user="Student")
  userID=user[6];
  else if (user="Professor")
  userID=user[7];
  else userID=user[8];
  return userID;
}


//===================================================================================================================================================
var poolConfig = {
    min: 0,
    max: 64,
    log: true,
};
//azure database connection config
var config = {
    server: 'parking.database.windows.net',
      //useColumnNames: true,
    database: 'Park_King',
    userName: 'thee',
    password: 'OtoroLover420',
    options: {
      encrypt: true,
      database: 'Park_King',
      rowCollectionOnRequestCompletion: true,
      rowCollectionOnDone: true
    },
	  // authentication: {
    //   type: 'azure-active-directory-password',
    //   options: {
    //     database: 'Park_King',
    //     userName: 'Theetouch.J@student.chula.ac.th',
    //     password: '7ac19pn8',
    //
    //   }
    // }
  };

//var connection = new Connection(config);
var pool = new ConnectionPool(poolConfig, config);

pool.on('error', function(err) {
    console.error(err);
});

// pool.acquire(function (err, connection) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//
//     //use the connection as normal
//     var request = new Request('select 42', function(err, rowCount) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//
//         console.log('rowCount: ' + rowCount);
//
//         //release the connection back to the pool when finished
//         connection.release();
//     });
//
//     request.on('row', function(columns) {
//         console.log('value: ' + columns[0].value);
//     });
//
//     connection.execSql(request);
// });
//===================================================================================================================================================

//APP CONFIG
app.set('view engine', 'ejs');
app.use(autoReap);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
//===================================================================================================================================================
// Passport Module
//===================================================================================================================================================


    function insert_newCustomer(connection,customer_info,done){
    var request = new Request("INSERT INTO dbo.Customer (FirstName,LastName,Email,Username,Password,customerType,studentID,professorID,NationalID,CustomerPicture,Reserveable) values (@firstName,@lastName,@email,@username,@password,@occupation,@studentID,@professorID,@CitizenID,@profilePic,@reserveAble)",
    //CustomerPicture,profilePic
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
    request.addParameter('profilePic',TYPES.VarChar,customer_info.CustomerPicture);
    request.addParameter('reserveAble',TYPES.Bit,customer_info.Reserveable);


    request.on('requestCompleted', function (){
    //connection.close();
    //error here
    })
    connection.execSql(request);
}

    //for login session
    passport.serializeUser(function(user, done) {
        console.log('serializer');
        //console.log(user);
        done(null, user[0]);
    });
    passport.deserializeUser(function(user, done) {
        console.log('deserializer')
        pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
              return;
            }
            var request = new Request(
                "SELECT * FROM dbo.Customer WHERE Username = @username",
                function(err,rows){
                    connection.release();
                }
            );
            //set parameterized query
            request.addParameter('username',TYPES.VarChar,user[0]);
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
          });
    });

    //passport model use for registeration
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        //console.log('check 00');
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username,password,done) {
        //console.log('check 01');
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Sign-up requested')
            //var IMG = base64_encode(req.body.profilePic);
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            //console.log(encode_image);

            // var finalImg = {
            //      contentType: req.file.mimetype,
            //      image:  new Buffer(encode_image, 'base64')
            // };
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
              CustomerPicture: encode_image,
              Reserveable: 1,
            };
            var request = new Request(
                "SELECT * FROM dbo.Customer WHERE Username = @username",
                function (err, rowCount, rows){
                    //console.log(rows);
                    //console.log("above row object");
                    if (err){
                        console.log("signup error");
                        connection.release();
                        return done(err);
                    }
                    if (customer_info.password!=customer_info.passwordCheck){
                        console.log('password does not match');
                        connection.release();
                        return done(null,false);
                    }
                    if (rows.length != 0) {
                        console.log('this email is already taken');
                        connection.release();
                        return done(null, false);
                    }else {

                        console.log('this email doesnot taken')
                        // if there is no user with that email
                        // create the use
                        var newUserMysql = new Object();

                        newUserMysql.username = username;
                        newUserMysql.password = password; // use the generateHash function in our user model

                        newUserMysql.id = rows.insertId;

                        insert_newCustomer(connection,customer_info,done)
                        connection.release();
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
        });
        //_signup(req,username,password,done);

        //res.redirect('/login');
    }));
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
        pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('log-in requested');
            var request = new Request(
                'SELECT * FROM dbo.Customer WHERE Username = @username Or Email = @username',
                function(err, rowCount, rows){
                    console.log(username);
                    console.log(rowCount);

                    console.log('number of row returned')
                    connection.release();
                    if(err){
                        //connection.release();
                        return done(err);
                    }
                    if(rows == null){
                        console.log('loginMessage', 'No user found.');
                        //connection.release();
                        return done(null, false);
                          // req.flash is the way to set flashdata using connect-flash
                    }else if (!(login_request[1] == password)){
                        console.log('loginMessage', 'Oops! Wrong password.');
                        //connection.release();
                        return done(null, false);
                         // create the loginMessage and save it to session as flashdata
                    }else{
                        console.log('logged in!!!');
                        // var UserImage = new Image();
                        //  UserImage.src = 'data:image/png;base64,'+imgPhase;
                        done(null, login_request);
                    }

                    connection.release();
            });
            request.addParameter('username',TYPES.VarChar,username);
            var login_request = [];
            request.on('row', function (columns) {
                columns.forEach(function(column) {
                    login_request.push(column.value);
                });
                //console.log(login_request + 'info');
            });

            request.on('Done',function(err, rowCount, rows){
                console.log(loggedInBoolean());
            });

            connection.execSql(request);
            //_login(req, username, password, done, );
        });

        // connection.on('connect',function(err){
        //     if(err){
        //         console.log(err);
        //     }else{
        //     }
        // });

    }));

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
    if (req.user) {
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
        res.redirect('/login');
    }
}

// loggedIn using example
// app.get('/orders', loggedIn, function(req, res, next) {
//     // req.user - will exist
//     // load user orders and render them
// });

// SET STORAGE
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, './upload-express');
},
filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
}
});

const upload = multer({
storage: storage,
//limits: {fileSize: 1024 * 1024 * 5}
});

//retrive image from database,imgPhase is a string retrive from database
//
// var UserImage = new Image();
// UserImage.src = 'data:image/png;base64,'+imgPhase;


//=======================================================
// ROUTES
//=======================================================

//ROUTE TO HOME PAGE
app.get('/',loggedIn, function(req, res){
    res.redirect('/home');
});

app.get('/home',loggedIn, function(req, res){
    // var username = [];
    // pool.acquire(function (err, connection) {
    //     if (err) {
    //         console.error(err);
    //         connection.release();
    //         return;
    //     }
    //     username = getterSetter.test(connection,req.user[0]);
    //     //let username = getterSetter.getUserUsername(connection,req.user[0]);
    //     //console.log(username.getUserUsername());
    //     // var output = username.getUserUsername();
    //     console.log(username);
    //res.send({username: req.user[0]});
    res.render('home',{currentUser: currentUser, username: req.user[0],userPicmenu: req.user[10]});
    // });
});

app.get('/register', function(req, res){
    res.render('register');
    //res.sendFile(__dirname + '/register.ejs');
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
app.get('/reserve',loggedIn, function(req, res){
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

   res.render('userinfo', {
     currentUser: req.user ,
     currentUserID: checkUserType(req.user[5]),
     userPicmenu: req.user[10]
   });

   // res.render('userinfo', {currentUser: req.user ,currentUserID: checkUserType(req.user[5])});

});
app.get('/userinfo2', function(req, res){
   res.render('userinfo2');
});

//ROUTE TO TEMPORARY PAGE
app.get('/temp', function(req, res){
    res.render('temp');
});
app.get('/statustemp', function(req, res){
    res.render('statusTemp');
});

app.get('/receipt', function(req, res){
    res.render('receipt');
});
app.post('/reserve',function(req,res){

// <<<<<<< HEAD
//
//
// =======
});
app.post('/carregister',loggedIn,upload.single('carPic'),function(req,res){
  console.log('Trying to add car');
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString('base64');
      //use the connection as normal
      var request = new Request(
          'INSERT INTO dbo.Car(PlateNumber,Username,CarBrand,CarModel,CarPicture,CarColor) VALUES (@PlateNumber,@Username,@CarBrand,@CarModel,@CarPicture,@CarColor)',
          function(err, rowCount, rows){

              if(err){
                  //connection.release();
                  res.redirect('/carregister');
              }else{
                  console.log('Car added!!!');
                  res.redirect('/home')
              }
              connection.release();
      });
      request.addParameter('PlateNumber',TYPES.VarChar,req.body.plateNumber);
      request.addParameter('Username',TYPES.VarChar,req.user[0]);
      request.addParameter('CarBrand',TYPES.VarChar,req.body.carBrand);
      request.addParameter('CarModel',TYPES.VarChar,req.body.Model);
      request.addParameter('CarPicture',TYPES.VarChar,encode_image);
      request.addParameter('CarColor',TYPES.VarChar,req.body.carColor);

      request.on('Done',function(err, rowCount, rows){
      });

      connection.execSql(request);
      //_login(req, username, password, done, );
  });
},autoReap);
// >>>>>>> b8693e7c98f35b92f8a568b867f2dc52d97c4815
//when login button click
app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    session: true,
}));
app.post('/register', upload.single('profilePic'),passport.authenticate('local-signup' ,{
    successRedirect: '/login',
    failureRedirect: '/register',
    session: false
}),autoReap);

app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
