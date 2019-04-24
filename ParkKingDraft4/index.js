var isScan;
var obb = {isScan: isScan};
//require Customer.js file
var currentUsername,currentEmail,currentFirstname,currentLastname,currentCustomerType,currentID,currentPicture,cancelTime,customerReservable;
const customer = require('./Customer.js');
//require Car.js file
var currentPlateNumber=[],currentBrand=[],currentModel=[],currentColor=[],currentCarPicture=[],currentPlateProvince=[];
var car = require('./Car.js');
//require ParkingSpot.js file
var totalArtsFreeSpot,totalPoliFreeSpot,lowestFloorArts,lowestSlotArts,lowestFloorPoli,lowestSlotPoli;
const parkingspot = require('./ParkingSpot.js');
//require Building.js file
var artsCapacity, poliCapacity;
const building = require('./Building.js');
//require Reserve.js file
var exceedReservetime = false;
var reserveStatus = "Not Reserved",reservePlatenumber = "--",reserveBrand,reserveModel,reserveColor,reserveCarPicture,reserveBuildingname = "--",reserveFloor,reserveSlot,reserveMap,reserveId,reserveIsfull,reserveCheckIn,reserveCheckOut,reserveTimein,reserveTimeout,reserveQRin,reserveQRout;
const reserve = require('./Reserve.js');
var qrCode;
//require TransactionReceipt.js file
var exceedCheckoutTime = false;
var transactionId,totaltime,parkingFee,paymentmethod,date,totalTransaction=[];
const transaction = require('./TransactionReceipt.js');

var receiptFee,receiptTotaltime,receiptBuilding,receiptDate,receiptFirstname,receiptLastname,receiptTimeIn,receiptTimeOut,receiptPaymentmethod,receiptPlatenumber;

//NPM REQUIRE
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
//create temp storage
const multer = require('multer');
const imager = require('multer-imager');
//auto delete image after upload
const autoReap  = require('multer-autoreap');
const fs = require('fs');
const path = require('path');
var flash = require('connect-flash-plus');

//tedious section
const Connection = require('tedious').Connection;
const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
const TYPES =require('tedious').TYPES;

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
  };

//var connection = new Connection(config);
var pool = new ConnectionPool(poolConfig, config);

pool.on('error', function(err) {
    console.error(err);
});

//===================================================================================================================================================

//APP CONFIG
app.set('view engine', 'ejs');
app.use(autoReap);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "Fuck You",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

//Send shits to all pages
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // res.locals.failure = req.flash('failure');
    next();
});

app.use(passport.initialize());
app.use(passport.session());
//===================================================================================================================================================
// Passport Module
//===================================================================================================================================================

//for login session
passport.serializeUser(function(user, done) {
        console.log('serializer');
        //console.log(user[0]);
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
                    if(err){
                        connection.release();
                        return done(err);
                    }
                    //console.log(deserializing);
                    done(err, deserializing);
                    connection.release();
                }
            );
            //set parameterized query
            request.addParameter('username',TYPES.VarChar,user);
            var deserializing = [];
            request.on('row', function (columns) {
                columns.forEach(function(column) {
                    deserializing.push(column.value);
                });
                //console.log(deserializing);
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
            var encode_image;
            if(!req.file || !req.file.path){
              var encode_image = null;
            }else{
              var pathName = path.join(__dirname,req.file.path);
              var img = fs.readFileSync(pathName);
              encode_image = img.toString('base64');
            }
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
              Cancel:0,
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
                        console.log('this username is already taken');
                        connection.release();
                        return done(null, false);
                    }else {

                        console.log('this username doesnot taken')
                        // if there is no user with that email
                        // create the use
                        var newUserMysql = new Object();

                        newUserMysql.username = username;
                        newUserMysql.password = password;

                        customer.insert_newCustomer(connection,customer_info,done,newUserMysql);
                         // use the generateHash function in our user model
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
                'SELECT * FROM dbo.Customer WHERE Username = @username',
                function(err, rowCount, rows){
                    console.log(username);
                    console.log(rowCount);
                    console.log('number of row returned')

                    if(err){
                        //connection.release();
                        connection.release();
                        return done(err);
                    }
                    if(rows == null){
                        console.log('loginMessage', 'No user found.');
                        connection.release();
                        //connection.release();
                        return done(null, false);
                          // req.flash is the way to set flashdata using connect-flash
                    }else if (!(login_request[1] == password)){
                        console.log('loginMessage', 'Oops! Wrong password.');
                        connection.release();
                        //connection.release();
                        return done(null, false);
                         // create the loginMessage and save it to session as flashdata
                    }else{
                        console.log('logged in!!!');

                        console.log(login_request[0])
                        // var UserImage = new Image();
                        //  UserImage.src = 'data:image/png;base64,'+imgPhase;
                        connection.release();
                        return done(null, login_request);
                    }
            });
            request.addParameter('username',TYPES.VarChar,req.body.username);
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

//===================================================================================================================================================
// Operation
//===================================================================================================================================================
var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();
//start user's timer
function startUserTimer(){
  stopwatch.start();
}
//stop the stopwatch
function stopUserTimer(){
  var totalTime = parseInt(stopwatch.stop()/1000);
  stopwatch.reset();
  return totalTime;
}
// //check log-in state
function loggedInBoolean(req) {
    if (req.user) {
        return true;
    } else {
        return false;
    }
}

//Middlware check if the user is loggedIn
function loggedIn(req, res, next) {
    if (req.user) {
        console.log('user in login state');
        console.log('name : '+req.user[1] )
        return next();
    } else {
        console.log('user not login');
        res.redirect('/login');
    }
}

// Middleware Check if the user has already reaserved return next()
function hasReserved(req, res, next) {
    if (customerReservable == 1) {
      res.redirect('/reserve');
    }else{
      return next();
    }
}

//Calculate the fee rate
var feeRate
var check = "initialize";
function feeRate(customerType){
  if(customerType = 'Student'){
    return (10/60);
  }else if(customerType = 'Professor'){
    return (5/60);
  }else{
    return (15/60);
  }
}

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

//UUID GENERATOR
function generateTokenID(){
  const uuidv4 = require('uuid/v4');
  var tokenID = uuidv4();
  return tokenID;
}

//TIMEOUT FUNCTION
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    })
}

//=======================================================
// ROUTES
//=======================================================
//ROUTE TO HOME PAGE
app.get('/',loggedIn, function(req, res){
    res.redirect('/home');
});
//LOGGING OUT
app.get('/logout',loggedIn,function(req, res){
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/login');
});

//ROUTES TO HOME2
app.get('/home2',loggedIn, function(req, res){
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user[0],async function(data){
        currentPicture = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalSpot(connection,'buildingArts',async function(data){
        artsCapacity = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalSpot(connection,'buildingPoli',async function(data){
        poliCapacity = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,'buildingArts',async function(data){
        totalArtsFreeSpot = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,'buildingPoli',async function(data){
        totalPoliFreeSpot = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestFloor(connection,'buildingArts',async function(data){
        lowestFloorArts = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestSlot(connection,'buildingArts',async function(data){
        lowestSlotArts = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestFloor(connection,'buildingPoli',async function(data){
        lowestFloorPoli = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestSlot(connection,'buildingPoli',async function(data){
        lowestSlotPoli = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateNumber(connection,req.user[0],function(data){
        currentPlateNumber = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarBrand(connection,req.user[0],function(data){
        currentBrand = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarModel(connection,req.user[0],function(data){
        currentModel = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarColor(connection,req.user[0],function(data){
        currentColor = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarPicture(connection,req.user[0],function(data){
        currentCarPicture = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateProvince(connection,req.user[0],function(data){
        currentPlateProvince = data;

        // ====================================================================
        // rendering home page
        res.render('home2', {lowestFloorArts:lowestFloorArts,
                            lowestSlotArts:lowestSlotArts,
                            artsCapacity:artsCapacity,
                            poliCapacity:poliCapacity,
                            lowestFloorPoli:lowestFloorPoli,
                            lowestSlotPoli:lowestSlotPoli,
                            totalArtsFreeSpot:totalArtsFreeSpot,
                            totalPoliFreeSpot:totalPoliFreeSpot,
                            currentUsername: req.user[0],
                            currentPicture: currentPicture,
                            reservePlatenumber: reservePlatenumber});
        // ====================================================================
      });
    });
});

//ROUTE TO HOME
app.get('/home',loggedIn, async function(req, res){
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user[0],function(data){
        customerReservable = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user[0],async function(data){
        currentPicture = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalSpot(connection,'buildingArts',async function(data){
        artsCapacity = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalSpot(connection,'buildingPoli',async function(data){
        poliCapacity = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,'buildingArts',async function(data){
        totalArtsFreeSpot = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,'buildingPoli',async function(data){
        totalPoliFreeSpot = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestFloor(connection,'buildingArts',async function(data){
        lowestFloorArts = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestSlot(connection,'buildingArts',async function(data){
        lowestSlotArts = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestFloor(connection,'buildingPoli',async function(data){
        lowestFloorPoli = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getLowestSlot(connection,'buildingPoli',async function(data){
        lowestSlotPoli = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateNumber(connection,req.user[0],function(data){
        currentPlateNumber = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarBrand(connection,req.user[0],function(data){
        currentBrand = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarModel(connection,req.user[0],function(data){
        currentModel = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarColor(connection,req.user[0],function(data){
        currentColor = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarPicture(connection,req.user[0],function(data){
        currentCarPicture = data;
      });
    });
    await sleep(100);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateProvince(connection,req.user[0],function(data){
        currentPlateProvince = data;

        // ====================================================================
        // rendering home page
        res.render('home', {lowestFloorArts:lowestFloorArts,
                            lowestSlotArts:lowestSlotArts,
                            artsCapacity:artsCapacity,
                            poliCapacity:poliCapacity,
                            lowestFloorPoli:lowestFloorPoli,
                            lowestSlotPoli:lowestSlotPoli,
                            totalArtsFreeSpot:totalArtsFreeSpot,
                            totalPoliFreeSpot:totalPoliFreeSpot,
                            currentUsername: req.user[0],
                            currentPicture: currentPicture,
                            reservePlatenumber: reservePlatenumber,
                            reserveBuildingname:reserveBuildingname,
                            reserveStatus:reserveStatus
                            });
        // ====================================================================
      });
    });
});

//ROUTES TO REGISTER PAGE
app.get('/register', function(req, res){
    res.render('register');
});

//ROUTE TO LOGIN PAGE
app.get('/login', function(req, res){
    res.render('login');
});

//ROUTE TO CAR REGISTER PAGE
app.get('/carregister',loggedIn, function(req, res){
    res.render('carregister');
});

//ROUTE TO RESERVE PAGE
app.get('/reserve',loggedIn, function(req, res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    customer.getCancel(connection,req.user[0],function(data){
      cancelTime = data;
      res.render('reserve', {currentCarPicture: currentCarPicture,
                             currentPlateNumber: currentPlateNumber,
                             currentUsername: req.user[0],
                             currentPicture:currentPicture,
                             cancelTime:cancelTime});
    });
  });
});

//ROUTE TO QR CODE PAGE
app.get('/showqr', loggedIn,hasReserved, async function(req, res){
  res.render('showqr', {qrCode: qrCode,
                        currentUsername: req.user[0],
                        currentPicture: currentPicture,
                        isScan: isScan});
  setInterval(async function() {
    console.log('Please wait for check-in/check-out');
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      reserve.getTimeIn(connection,reserveId,function(data){
        reserveTimein = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      reserve.getTimeOut(connection,reserveId,function(data){
        reserveTimeout= data;
      });
    });
    await sleep(500);
    if(reserveTimein != check && reserveTimeout == check){
        pool.acquire(function (err, connection) {
          if (err) {
            console.error(err);
            connection.release();
          }
          reserve.getQRCodeIn(connection,reserveId,function(data){
              reserveQRin = data;
          });
        });
        if(reserveQRin == reserveId){
            startUserTimer();
            reserveStatus = "Checked In"
        }
    }else if(reserveTimeout != check){
        pool.acquire(function (err, connection) {
          if (err) {
            console.error(err);
            connection.release();
          }
          reserve.getQRCodeOut(connection,reserveId,function(data){
              reserveQRout = data;
          });
        });
        if(reserveQRout == transactionId){
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
            }
            reserveIsfull = 0;
            parkingspot.setIsFull(connection,reserveBuildingname,reserveFloor,reserveSlot,0);

          });
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
            }
            customerReservable = 1;
            customer.setReservable(connection,req.user[0],1);
          });
          reserveStatus = "Checked Out"
        }
      }
  },5000);
});

app.route('/getScan').get(function(req, res, next){
  res.json(obb);
});

// const Instascan = require('instascan');
// import React, { Component } from 'react'
// import QrReader from 'react-qr-reader'

app.get('/scanner', function(req,res){
  res.render('scanner');
});

//ROUTE TO STATUS
app.get('/status', loggedIn,hasReserved, async function(req, res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    parkingspot.getMapLocation(connection,reserveBuildingname,reserveFloor,reserveSlot,function(data){
      reserveMap = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarBrand(connection,req.user[0],reservePlatenumber,function(data){
      reserveBrand = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarModel(connection,req.user[0],reservePlatenumber,function(data){
      reserveModel = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarColor(connection,req.user[0],reservePlatenumber,function(data){
      reserveColor = data;
    })
  });
  await sleep(500)
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarPicture(connection,req.user[0],reservePlatenumber,function(data){
      reserveCarPicture = data;
      // ====================================================================
      //RENDERING STATUS PAGE
      res.render('status', {reservePlatenumber:reservePlatenumber,
                          reserveBuildingname:reserveBuildingname,
                          reserveFloor:reserveFloor,
                          reserveSlot:reserveSlot,
                          reserveMap:reserveMap,
                          reserveBrand:reserveBrand,
                          reserveModel:reserveModel,
                          reserveColor:reserveColor,
                          reserveCarPicture:reserveCarPicture,
                          currentUsername: req.user[0],
                          currentPicture: currentPicture,
                          reserveStatus:reserveStatus});
        // ====================================================================
    });
  });
});

//ROUTE TO USER INFO
app.get('/userinfo', loggedIn, async function(req, res){
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getEmail(connection,req.user[0],function(data){
       currentEmail = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getFirstname(connection,req.user[0],function(data){
       currentFirstname = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getLastname(connection,req.user[0],function(data){
       currentLastname = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getCustomerType(connection,req.user[0],function(data){
       currentCustomerType = data;
     })
   });
   (1000);
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     transaction.getAllTransaction(connection,req.user[0],function(data){
       totalTransaction = data;
     })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllFee(connection,req.user[0],function(data){
         receiptFee = data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllDate(connection,req.user[0],function(data){
         receiptDate= data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllTotalTime(connection,req.user[0],function(data){
         receiptTotaltime = data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllBuilding(connection,req.user[0],function(data){
         receiptBuilding = data;
         // ====================================================================
         //RENDER USERINFO PAGE
         res.render('userinfo', {
                                 //USER INFO
                                 currentUsername:req.user[0],
                                 currentPicture:currentPicture,
                                 currentEmail:currentEmail,
                                 currentCustomerType:currentCustomerType,
                                 currentID:customer.getID(req.user),
                                 currentFirstname:currentFirstname,
                                 currentLastname:currentLastname,
                                 //CAR INFO
                                 currentCarPicture: currentCarPicture,
                                 currentBrand:currentBrand,
                                 currentColor:currentColor,
                                 currentModel:currentModel,
                                 currentPlateNumber:currentPlateNumber,
                                 currentPlateProvince:currentPlateProvince,
                                 //RECEIPT INFO
                                 totalTransaction:totalTransaction,
                                 receiptFee:receiptFee,
                                 receiptDate:receiptDate,
                                 receiptTotaltime:receiptTotaltime,
                                 receiptBuilding:receiptBuilding});
          // ====================================================================
       });
   });
});

//ROUTE TO EDIT USER
app.get('/edituserinfo', loggedIn, function(req, res){
      res.render('edituserinfo', {currentUsername: req.user[0],
                             currentEmail:currentEmail,
                             currentFirstname:currentFirstname,
                             currentLastname:currentLastname,
                             currentPicture:currentPicture
                           });

});

//ROUTE TO RECEIPT PAGE
app.get('/receipt',loggedIn, function(req, res){
    res.render('receipt');
});

// ====================================================================
//POST ROUTES
// ====================================================================
//MAKING RESERVATION
//ADD SENSOR CHECK
app.post('/reserve',loggedIn,async function(req, res){
  reservePlatenumber = req.body.plateNumber;
  reserveBuildingname = req.body.buildingName;
  console.log(reservePlatenumber);
  console.log(reserveBuildingname);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user[0],function(data){
        customerReservable = data;
        console.log(customerReservable);
      });

  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getLowestFloor(connection,reserveBuildingname,function(data){
        reserveFloor = data;
        console.log(reserveFloor);
      });
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getLowestSlot(connection,reserveBuildingname,function(data){
        reserveSlot = data;
        console.log(reserveSlot);
      });
  });
  //wait for update request
  await sleep(200);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getIsFull(connection,reserveBuildingname,reserveFloor,reserveSlot,function(data){
        reserveIsfull = data;
        console.log(reserveIsfull);
      });
  });
  if(customerReservable == 0 || reserveIsfull == 1){
    console.log('your accout is decline to reserve');
    req.flash('error', 'Your account cannot reserve.');
    res.redirect('/home');
  }
  else{
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        reserveId = generateTokenID();
        qrCode = reserveId;
        isScan = true;
        obb = {isScan: isScan};
        reserve.Reserve(connection,reservePlatenumber,req.user[0], reserveFloor, reserveSlot,reserveBuildingname, reserveId);
        console.log('Reserve finished');
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        reserveIsfull = 1;
        parkingspot.setIsFull(connection,reserveBuildingname,reserveFloor,reserveSlot,1);
        console.log('set parking spot occupied');
    });
    await sleep(100);
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        customerReservable = 0;
        customer.setReservable(connection, req.user[0],0);
        console.log('set user reservable');
        reserveStatus = "Reserved";
        res.render('showqr', {
            qrCode:qrCode,
            currentUsername: req.user[0],
            currentPicture: currentPicture,
            message: 'You have made a reservation. Use this QR Code to enter the parking lot.'
          });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCancel(connection,req.user[0],function(data){
        cancelTime = data;
      })
    });
    sleep(1000*60*30).then(() => {
      exceedReservetime = true;
      if(reserveTimein == check){
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          reserve.removeReserve(connection,reserveId);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          customerReservable = 1;
          customer.setReservable(connection,req.user[0],1);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          cancelTime++;
          customer.setCancel(connection,req.user[0],cancelTime);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          reserveIsfull = 0;
          parkingspot.setIsFull(connection,reserveBuildingname,reserveFloor,reserveSlot,0);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          if(cancelTime > 5){
              console.log('Too much cancellation, you are banned');
              customerReservable = 0;
              customer.setReservable(connection,req.user[0],0);
          }
          reserveStatus = "Not Reserved"
          reservePlatenumber = "--"
          reserveBuildingname = "--"
      });
      }
    });
  }
});

//CANCELING THE RESERVATION
app.post('/cancel',loggedIn,async function(req,res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    customer.getCancel(connection,req.user[0],function(data){
      cancelTime = data;
    })
  });
  if(exceedReservetime == true){
      console.log('You cannot cancel the reservation');
      req.flash('error', 'You cannot cancel the reservation');
      res.redirect('/home');
  }else{
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        reserve.removeReserve(connection,reserveId);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        customerReservable = 1;
        customer.setReservable(connection,req.user[0],1);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        cancelTime++;
        customer.setCancel(connection,req.user[0],cancelTime);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        reserveIsfull = 0;
        parkingspot.setIsFull(connection,reserveBuildingname,reserveFloor,reserveSlot,0);
    });
    await sleep(500);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,reserveBuildingname,async function(data){
        if(reserveBuildingname = "buildingArts"){
          totalArtsFreeSpot = data;
        }else{
          totalPoliFreeSpot = data;
        }
      })
    });
    await sleep(10);
    reserveStatus = "Cancelled"
    reservePlatenumber = "--"
    reserveBuildingname = "--"
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        if(cancelTime > 5){
            console.log('Too much cancel, you are banned');
            customerReservable = 0;
            customer.setReservable(connection,req.user[0],0);
            req.flash('error', 'You are banned from resserving because you cancel more than 5 times.');
        }
        req.flash('success', 'Your reservation is cancelled.');
        res.render('home',{lowestFloorArts:lowestFloorArts,
                            lowestSlotArts:lowestSlotArts,
                            artsCapacity:artsCapacity,
                            poliCapacity:poliCapacity,
                            lowestFloorPoli:lowestFloorPoli,
                            lowestSlotPoli:lowestSlotPoli,
                            totalArtsFreeSpot:totalArtsFreeSpot,
                            totalPoliFreeSpot:totalPoliFreeSpot,
                            currentUsername: req.user[0],
                            currentPicture: currentPicture,
                            reservePlatenumber: reservePlatenumber,
                            reserveBuildingname:reserveBuildingname,
                            reserveStatus:reserveStatus})
    });
  }
});

//not finished wait for check in/out, SENSORCHECK
//PAY POST REQUEST
app.post('/pay',loggedIn,async function(req,res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    reserve.getTimeIn(connection,reserveId,function(data){
      reserveTimein = data;
    });
  });
  await sleep(100);
  if(reserveTimein != check){
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      reserve.setHasPaid(connection,reserveId,1);
      reserveStatus = "Paid"
    });
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      transactionId = generateTokenID();
      qrCode = transactionId;
      isScan = false;
      obb = {isScan: isScan};
      totaltime = stopUserTimer();
      feeRate = feeRate(currentCustomerType);
      parkingFee = parseInt(totaltime * feeRate);
      if(exceedCheckoutTime == true){
        parkingFee += parseInt(15 * feeRate);
      }
      paymentmethod = 'Kbank';
      date = transaction.getCurrentDate();
      transaction.Transaction(connection,reservePlatenumber,req.user[0],reserveFloor,reserveSlot,reserveBuildingname,transactionId,parkingFee,paymentmethod,totaltime,date);
      res.render('showqr', {qrCode:qrCode,currentUsername: req.user[0],currentPicture: currentPicture});
  });
    sleep(1000*60*15).then(() => {
      exceedCheckoutTime = true;
      if(reserveTimeout == check){
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          reserveId = generateTokenID();
          reserve.Reserve(connection,reservePlatenumber,req.user[0], reserveFloor, reserveSlot,reserveBuildingname, reserveId);
          console.log('re reserved');
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          reserveTimein = functions.getCurrentTime();
          reserve.setTimeIn(connection,reserveId,reserveTimein);
          console.log('set timein');
      });
        startUserTimer();
      }
    });
  }else{
  res.redirect('status');
  }
});

//CAR REGISTER POST REQUEST
app.post('/carregister',loggedIn,upload.single('carPic'),function(req,res){
  console.log('Trying to add car');
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      var encode_image;
      if(!req.file || !req.file.path){
        var encode_image = null;
      }else{
        var pathName = path.join(__dirname,req.file.path);
        var img = fs.readFileSync(pathName);
        encode_image = img.toString('base64');
      }
      var car_info = {
        platenumber:req.body.plateNumber,
        carbrand:req.body.carBrand,
        carmodel:req.body.carModel,
        carcolor:req.body.carColor,
        plateprovince:req.body.province,
        carpicture:encode_image,
      };
      //console.log(car_info);
      car.insert_newCar(connection,car_info,req.user[0]);
      currentPlateNumber.push(car_info.platenumber);
      currentBrand.push(car_info.carbrand);
      currentModel.push(car_info.carmodel);
      currentColor.push(car_info.carcolor);
      currentPlateProvince.push(car_info.plateprovince);
      currentCarPicture.push(car_info.carpicture);
      res.redirect('/userinfo');
  });
  req.flash('success', 'Your car has been added.')
},autoReap);

//DELETE CAR POST REQUEST
app.post('/deletecar/:id',loggedIn, function(req,res){
  var id = req.params.id;
  pool.acquire(async function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      car.removeCar(connection,req.user[0],currentPlateNumber[id]);
      delete currentPlateNumber[id];
      delete currentBrand[id];
      delete currentModel[id];
      delete currentColor[id];
      delete currentCarPicture[id];
      delete currentPlateProvince[id];
      currentPlateNumber = currentPlateNumber.filter(function( element ) {
        return element !== undefined;
      });
      currentBrand = currentBrand.filter(function( element ) {
        return element !== undefined;
      });
      currentModel = currentModel.filter(function( element ) {
        return element !== undefined;
      });
      currentColor = currentColor.filter(function( element ) {
        return element !== undefined;
      });
      currentCarPicture = currentCarPicture.filter(function( element ) {
        return element !== undefined;
      });
      currentPlateProvince = currentPlateProvince.filter(function( element ) {
        return element !== undefined;
      });
      req.flash('success', 'Your car has been deleted');
      res.redirect('/userinfo');
  });

},autoReap);

//RECEIPT POST REQUEST
app.post('/receipt/:id',loggedIn,async function(req,res){
  var id = req.params.id;
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      transaction.getAllPaymentMethod(connection,req.user[0],function(data){
        receiptPaymentmethod = data;
      })
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      reserve.getAllTimeIn(connection,req.user[0],function(data){
        receiptTimeIn = data;
      })
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      reserve.getAllTimeOut(connection,req.user[0],function(data){
        receiptTimeOut = data;
      })
  });
  await sleep(100);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      transaction.getAllPlateNumber(connection,req.user[0],function(data){
        receiptPlatenumber = data;
        res.render('receipt', {currentFirstname:currentFirstname,
                               currentLastname:currentLastname,
                               totalTransaction:totalTransaction[id],
                               receiptFee:receiptFee[id],
                               receiptDate:receiptDate[id],
                               receiptTotaltime:receiptTotaltime[id],
                               receiptBuilding:receiptBuilding[id],
                               receiptPaymentmethod:receiptPaymentmethod[id],
                               receiptTimeIn:receiptTimeIn[id],
                               receiptTimeOut:receiptTimeOut[id],
                               receiptPlatenumber:receiptPlatenumber[id]
                             });
      })
  });
});

//EDIT USER POST REQUEST
app.post('/edituserinfo',loggedIn,upload.single('profilePic'),function(req,res){
  console.log('Trying to edit profile');
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    var encode_image;
    if(!req.file || !req.file.path){
      var encode_image = currentPicture;
    }else{
      var pathName = path.join(__dirname,req.file.path);
      var img = fs.readFileSync(pathName);
      encode_image = img.toString('base64');
    }
    var edited_info = {
      email : req.body.email,
      firstname : req.body.firstName,
      lastname : req.body.lastName,
      CustomerPicture: encode_image,
    };
    customer.editCustomer(connection,req.user[0],edited_info);
    currentEmail = edited_info.email;
    currentFirstname = edited_info.firstname;
    currentLastname = edited_info.lastname;
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    customer.getCustomerPicture(connection,req.user[0],async function(data){
      currentPicture = data;
        res.redirect('/userinfo');
    })
  });
  req.flash('success', 'Your information has been changed.');

},autoReap);

//LOGIN
app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/home',
    successFlash: 'Successfully logged in',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password',
    session: true
}));

//REGISTER
app.post('/register', upload.single('profilePic'),passport.authenticate('local-signup' ,{
    successRedirect: '/login',
    // successFlash: 'You are registered! Please login.',
    failureRedirect: '/register',
    failureFlash: true,
    session: false
}));

app.post('/qrcode', function(req, res){
  console.log(req.body.data);
});

app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
