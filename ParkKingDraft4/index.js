var currentUsername,currentEmail,currentFirstname,currentLastname,currentCustomerType,currentID,currentPicture;
var customer = require('./Customer.js');

//NPM REQUIRE
var express = require('express');
const app = express();
// var auth = require('passport-local-authenticate');
var bodyParser = require('body-parser');
//create temp storage
const multer = require('multer');
//auto delete image after upload
const autoReap  = require('multer-autoreap');
var fs = require('fs');

//tedious section
var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//authentication section
passport = require('passport');
LocalStrategy = require('passport-local');

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
// auth.hash('password', function(err, hashed) {
//   console.log(hashed.hash); // Hashed password
//   console.log(hashed.salt); // Salt
// });
//
// auth.hash('password', function(err, hashed) {
//   auth.verify('password', hashed, function(err, verified) {
//     console.log(verified); // True, passwords match
//   });
// });
// auth.hash('password', function(err, hashed) {
//   auth.verify('password2', hashed, function(err, verified) {
//     console.log(verified); // False, passwords don't match
//   });
// });

    function insert_newCustomer(connection,customer_info,done,newUserMysql){
    var request = new Request("INSERT INTO dbo.Customer (FirstName,LastName,Email,Username,Password,customerType,studentID,professorID,NationalID,CustomerPicture,Reserveable) values (@firstName,@lastName,@email,@username,@password,@occupation,@studentID,@professorID,@CitizenID,@profilePic,@reserveAble)",
    //CustomerPicture,profilePic
        function (err, rowCount, rows){
            if(err){
                connection.release();
                return done(err);
            }else{
                connection.release();
                return done(null, newUserMysql);
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

                        insert_newCustomer(connection,customer_info,done,newUserMysql);
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
                        return done(null, login_request);
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

function generateTokenID(){
  const uuidv4 = require('uuid/v4');
  var tokenID = uuidv4();
  return tokenID;
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
    // res.send({username: req.user[0]});
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user[0],function(data){
        currentPicture = data;
        res.render('home', {currentUsername: req.user[0],currentPicture: currentPicture});
      })
    });
    // res.render('home',{username: req.user[0],userPicmenu: req.user[10]});
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

    res.render('reserve',{userPicmenu: req.user[10]});
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
app.get('/userinfo', loggedIn, function(req, res){

   // res.render('userinfo', {
   //   currentUser: req.user ,
   //   currentUserID: checkUserType(req.user[5]),
   //   userPicmenu: req.user[10],
   //   username: req.user[0]
   // });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getEmail(connection,req.user[0],function(data){
       console.log(data);
       currentEmail = data;
     })
     customer.getFirstname(connection,req.user[0],function(data){
       console.log(data);
       currentFirstname = data;
     })
     customer.getLastname(connection,req.user[0],function(data){
       console.log(data);
       currentLastname = data;
     })
     customer.getCustomerType(connection,req.user[0],function(data){
       console.log(data);
       currentCustomerType = data;
     })
     customer.getCustomerPicture(connection,req.user[0],function(data){
       console.log(data);
       currentPicture = data;
       res.render('userinfo', {currentUsername: req.user[0],currentEmail:currentEmail,currentFirstname:currentFirstname,currentLastname:currentLastname,currentCustomerType:currentCustomerType,currentID:customer.getID(req.user),currentPicture:currentPicture});
     })
     // res.render('userinfo', {current: currentUser, currentUser: req.user,currentUserID: checkUserType(req.user),userPicmenu: req.user[10],username: req.user[0]});
   });
});


app.get('/edituserinfo', loggedIn, function(req, res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    currentUser = new customer(connection,req.user[0]);
    console.log(currentUser.firstname);
    // customer.getFirstname(connection,req.user[0],function(data){
    //   console.log(data);
    //   currentUser = data;
    // })
  });
  res.render('edituserinfo', {current: currentUser,
                              currentUser: req.user,
                              currentUserID: checkUserType(req.user),
                              userPicmenu: req.user[10],
                              username: req.user[0]
            });
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

// function Reserve(floor,slot,buildingName,plateNumber,username,QRin,QRout,Timein,Timepout,reserveid,haspaid){
//   var request = new Request(
//       "INSERT INTO dbo.Reserve(PlateNumber,Username,Floor,Slot,BuildingName,QRCodeIn,QRCodeOut,Time_In,Time_Out,reserveID,hasPaid) VALUES ()",
//       function(err, rowCount, rows){
//
//           if(err){
//               connection.release();
//               res.redirect('/reserve');
//           }else{
//               var reserveId = generateTokenID();
//               console.log('Spot available : '+ buildingState);
//               Reserve(buildingState[0], buildingState[1], buildingState[2], buildingState[3], buildingState[4], null, null, null, null, reserveId, 0);
//
//               setUserReservable(username,0);
//               setParkingSpotOccupied(floor, slot, buidlingname, 1);
//               arriveTimeout = countdownTimer(60*30);
//               res.redirect('/showqr')
//           }
//           connection.release();
//   });
//   request.addParameter('PlateNumber',TYPES.VarChar,car[0]);
//   request.addParameter('Username',TYPES.VarChar,car[1]);
//   request.addParameter('Building',TYPES.VarChar,parking[3]);
//   request.addParameter('Floor',TYPES.VarChar,car[1]);
//   request.addParameter('Slot',TYPES.VarChar,car[1]);
//   request.addParameter('BuildingName',TYPES.VarChar,car[1]);
//   request.addParameter('Username',TYPES.VarChar,car[1]);
//   request.addParameter('Username',TYPES.VarChar,car[1]);
//   request.addParameter('Username',TYPES.VarChar,car[1]);
//   request.addParameter('Username',TYPES.VarChar,car[1]);
//   request.addParameter('Username',TYPES.VarChar,car[1]);
//   PlateNumber varchar(255),
// Username varchar(255),
// Floor varchar(255),
// Slot varchar(255),
// BuildingName varchar(255),
// QRCodeIn varchar(255),
// QRCodeOut varchar(255),
// Time_In varchar(255),
// Time_Out varchar(255),
// reserveID varchar(255),
// hasPaid bit,
//
//   var buildingState =[];
//   request.on('row', function (columns) {
//       columns.forEach(function(column) {
//           buildingState.push(column.value);
//       });
//       //console.log(login_request + 'info');
//   });
//
//   request.on('Done',function(err, rowCount, rows){
//   });
//
//   connection.execSql(request);
// }
app.post('/reserve',function(req,res){

  // function reserveSpot(platenumber, username, floor, slot, buildingname){
  //   if(getUserReservable(username) == 1 && (getParkingSpotOccupied(floor, slot, buildingname) == 0 || getParkingSpotSensor(floor, slot, buildingname) == 0)){
  //     //create reserve ID
  //     var reserveid = generateTokenID();
  //     //insert reserve
  //     Reserve(platenumber, username, floor, slot, buildingname, null, null, null, null, reserveid, 0);
  //     setUserReservable(username,0);
  //     setParkingSpotOccupied(floor, slot, buidlingname, 1);
  //     arriveTimeout = countdownTimer(60*30);
  //   }
  // }
  // var car=['5555','x'];
  // var parkingSpot=['01','0001','buildingPoli'];
  //
  // pool.acquire(function (err, connection) {
  //     if (err) {
  //         console.error(err);
  //         connection.release();
  //         return;
  //     }
  //     if(req.user[11]='0'){
  //         console.log('your accout is decline to reserve')
  //         connection.release();
  //         res.redirect('/home');
  //     }
  //     var request = new Request(
  //         "SELECT Floor,MIN(Slot),BuildingName,isFull,Sensor,PlateNumber,Username FROM dbo.ParkingSpot,dbo.Car WHERE dbo.ParkingSpot.isfull='0' AND dbo.ParkingSpot.Sensor='0',dbo.Car.PlateNumber = @PlateNumber,dbo.Car.Username = @Username",
  //         function(err, rowCount, rows){
  //
  //             if(err){
  //                 connection.release();
  //                 res.redirect('/reserve');
  //             }else{
  //                 var reserveId = generateTokenID();
  //                 console.log('Spot available : '+ buildingState);
  //                 Reserve(buildingState[0], buildingState[1], buildingState[2], buildingState[3], buildingState[4], null, null, null, null, reserveId, 0);
  //
  //                 setUserReservable(username,0);
  //                 setParkingSpotOccupied(floor, slot, buidlingname, 1);
  //                 arriveTimeout = countdownTimer(60*30);
  //                 res.redirect('/showqr')
  //             }
  //             connection.release();
  //     });
  //     request.addParameter('PlateNumber',TYPES.VarChar,car[0]);
  //     request.addParameter('Username',TYPES.VarChar,car[1]);
  //     request.addParameter('Building',TYPES.VarChar,parking[3]);
  //
  //     var buildingState =[];
  //     request.on('row', function (columns) {
  //         columns.forEach(function(column) {
  //             buildingState.push(column.value);
  //         });
  //         //console.log(login_request + 'info');
  //     });
  //
  //     request.on('Done',function(err, rowCount, rows){
  //     });
  //
  //     connection.execSql(request);
      //_login(req, username, password, done, );
      res.render('/reserve');
  // });
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
                  connection.release();
                  res.redirect('/carregister');
              }else{
                  console.log('Car added!!!');
                  connection.release();
                  res.redirect('/home')
              }

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
