var isScan;
var obb = {isScan: isScan};
//require Customer.js file
const customer = require('./Customer.js');
var currentCustomer = new customer.createCustomer();
//require Car.js file
var car = require('./Car.js');
var currentCar = new car.createCar();
//require ParkingSpot.js file
var totalArtsFreeSpot,totalPoliFreeSpot,lowestFloorArts,lowestSlotArts,lowestFloorPoli,lowestSlotPoli;
const parkingspot = require('./ParkingSpot.js');
//require Building.js file
var artsCapacity, poliCapacity;
//require Reserve.js file
const reserve = require('./Reserve.js');
var currentReserve = new reserve.createReserve();
//require TransactionReceipt.js file
const transaction = require('./TransactionReceipt.js');
var currentTransaction = new transaction.createTransaction();
var currentReceipt = new transaction.createReceipt();


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
    resave: false,
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
// ALL TIMER IS IN SECOND(TO CHANGE TO MINUTES CHANGE /1000 TO /60000)
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
    if (currentCustomer.customerReservable == 1) {
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

//GET CURRENT TIME
function getCurrentTime(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
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

app.get('/getthisusername', function(req, res){
  res.send(req.user);
});

//ROUTES TO HOME2
app.get('/home2',loggedIn, function(req, res){
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user[0],async function(data){
        currentCustomer.currentPicture = data;
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
        currentCar.currentPlateNumber = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarBrand(connection,req.user[0],function(data){
        currentCar.currentBrand = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarModel(connection,req.user[0],function(data){
        currentCar.currentModel = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarColor(connection,req.user[0],function(data){
        currentCar.currentColor = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarPicture(connection,req.user[0],function(data){
        currentCar.currentCarPicture = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateProvince(connection,req.user[0],function(data){
        currentCar.currentPlateProvince = data;

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
                            currentPicture: currentCustomer.currentPicture,
                            reservePlatenumber: currentReserve.reservePlatenumber});
        // ====================================================================
      });
    });
});

//ROUTE TO HOME
app.get('/reserveStatus', function(req, res){
  console.log(currentReserve.reserveStatus);
  res.send({
    reserveStatus: currentReserve.reserveStatus
  });
});
app.get('/home',loggedIn, async function(req, res){
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user[0],function(data){
        currentCustomer.customerReservable = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user[0],async function(data){
        currentCustomer.currentPicture = data;
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
        currentCar.currentPlateNumber = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarBrand(connection,req.user[0],function(data){
        currentCar.currentBrand = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarModel(connection,req.user[0],function(data){
        currentCar.currentModel = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarColor(connection,req.user[0],function(data){
        currentCar.currentColor = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarPicture(connection,req.user[0],function(data){
        currentCar.currentCarPicture = data;
      });
    });
    await sleep(1000);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateProvince(connection,req.user[0],function(data){
        currentCar.currentPlateProvince = data;

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
                            currentPicture: currentCustomer.currentPicture,
                            reservePlatenumber: currentReserve.reservePlatenumber,
                            reserveBuildingname:currentReserve.reserveBuildingname,
                            reserveStatus:currentReserve.reserveStatus
                            });
        // ====================================================================
      });
    });

    //------------------------------------------------------------------------------------------------------------//
    //------------------------------------------------------------------------------------------------------------//
    feeRate = feeRate(currentCustomer.currentCustomerType);
    setInterval(async function() {
      console.log('Please wait for check-in/check-out');
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        reserve.getTimeIn(connection,currentReserve.reserveId,function(data){
          currentReserve.reserveTimein = data;
        });
      });
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        reserve.getTimeOut(connection,currentReserve.reserveId,function(data){
          currentReserve.reserveTimeout= data;
        });
      });
      await sleep(100);
      if(currentReserve.reserveTimein != check && currentReserve.reserveTimeout == check){
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
            }
            reserve.getQRCodeIn(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveQRin = data;
            });
          });
          if(currentReserve.reserveQRin == currentReserve.reserveId && currentReserve.reserveStatus != "Checked In" && currentReserve.qrCode == currentReserve.reserveQRin){
              startUserTimer();
              currentReserve.reserveStatus = "Checked In";
              isScan = true;
          }
      }else if(currentReserve.reserveTimeout != check){
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
            }
            reserve.getQRCodeOut(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveQRout = data;
            });
          });
          if(currentReserve.reserveQRout == currentTransaction.transactionId && currentReserve.reserveStatus != "Checked Out" && currentReserve.qrCode == currentReserve.reserveQRout){
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              currentReserve.reserveIsfull = 0;
              parkingspot.setIsFull(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,0);

            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              currentCustomer.customerReservable = 1;
              customer.setReservable(connection,req.user[0],1);
            });
            currentReserve.reserveStatus = "Checked Out";
            isScan = false;
          }
        }
      currentTransaction.totaltime = parseInt(stopwatch.read()/1000);
      currentTransaction.parkingFee = parseInt((currentTransaction.totaltime * feeRate) + currentTransaction.addedFee);
      console.log(currentTransaction.totaltime);
      console.log(currentTransaction.parkingFee);
      console.log(currentReserve.reserveTimein);
      console.log(currentReserve.reserveTimeout);
    },1000);
});

app.get('/getTimeandFee', function(req, res){
  var mins, hours;
  if(currentTransaction.totaltime/60>=1){
    hours = Math.floor(currentTransaction.totaltime/60);
    mins = currentTransaction.totaltime-(hours*60);
  } else {
    hours = 0;
    mins = currentTransaction.totaltime;
  }
  res.send({
    mins: mins,
    hours: hours,
    parkingFee: currentTransaction.parkingFee
  });
});

//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
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
      currentCustomer.cancelTime = data;
      res.render('reserve', {currentCarPicture: currentCar.currentCarPicture,
                             currentPlateNumber: currentCar.currentPlateNumber,
                             currentUsername: req.user[0],
                             currentPicture:currentCustomer.currentPicture,
                             cancelTime:currentCustomer.cancelTime});
    });
  });
});

//ROUTE TO QR CODE PAGE
app.get('/showqr', loggedIn,hasReserved,function(req, res){
  res.render('showqr', {qrCode: currentReserve.qrCode,
                        currentUsername: req.user[0],
                        currentPicture: currentCustomer.currentPicture,
                        isScan: isScan});
});

app.route('/getScan').get(function(req, res, next){
  res.json(obb);
});

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
    parkingspot.getMapLocation(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,function(data){
      currentReserve.reserveMap = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarBrand(connection,req.user[0],currentReserve.reservePlatenumber,function(data){
      currentReserve.reserveBrand = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarModel(connection,req.user[0],currentReserve.reservePlatenumber,function(data){
      currentReserve.reserveModel = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarColor(connection,req.user[0],currentReserve.reservePlatenumber,function(data){
      currentReserve.reserveColor = data;
    })
  });
  await sleep(500)
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarPicture(connection,req.user[0],currentReserve.reservePlatenumber,function(data){
      currentReserve.reserveCarPicture = data;
      // ====================================================================
      //RENDERING STATUS PAGE
      res.render('status', {reservePlatenumber:currentReserve.reservePlatenumber,
                          reserveBuildingname:currentReserve.reserveBuildingname,
                          reserveFloor:currentReserve.reserveFloor,
                          reserveSlot:currentReserve.reserveSlot,
                          reserveMap:currentReserve.reserveMap,
                          reserveBrand:currentReserve.reserveBrand,
                          reserveModel:currentReserve.reserveModel,
                          reserveColor:currentReserve.reserveColor,
                          reserveCarPicture:currentReserve.reserveCarPicture,
                          currentUsername: req.user[0],
                          currentPicture: currentCustomer.currentPicture,
                          reserveStatus:currentReserve.reserveStatus});
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
       currentCustomer.currentEmail = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getFirstname(connection,req.user[0],function(data){
       currentCustomer.currentFirstname = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getLastname(connection,req.user[0],function(data){
       currentCustomer.currentLastname = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getCustomerType(connection,req.user[0],function(data){
       currentCustomer.currentCustomerType = data;
     })
   });
   await sleep(500);
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     transaction.getAllTransaction(connection,req.user[0],function(data){
       currentTransaction.totalTransaction = data;
     })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllFee(connection,req.user[0],function(data){
         currentReceipt.receiptFee = data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllDate(connection,req.user[0],function(data){
         currentReceipt.receiptDate= data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllTotalTime(connection,req.user[0],function(data){
         currentReceipt.receiptTotaltime = data;
       })
   });
   await sleep(500);
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllBuilding(connection,req.user[0],function(data){
         currentReceipt.receiptBuilding = data;
         // ====================================================================
         //RENDER USERINFO PAGE
         res.render('userinfo', {
                                 //USER INFO
                                 currentUsername:req.user[0],
                                 currentPicture:currentCustomer.currentPicture,
                                 currentEmail:currentCustomer.currentEmail,
                                 currentCustomerType:currentCustomer.currentCustomerType,
                                 currentID:customer.getID(req.user),
                                 currentFirstname:currentCustomer.currentFirstname,
                                 currentLastname:currentCustomer.currentLastname,
                                 //CAR INFO
                                 currentCarPicture: currentCar.currentCarPicture,
                                 currentBrand:currentCar.currentBrand,
                                 currentColor:currentCar.currentColor,
                                 currentModel:currentCar.currentModel,
                                 currentPlateNumber:currentCar.currentPlateNumber,
                                 currentPlateProvince:currentCar.currentPlateProvince,
                                 //RECEIPT INFO
                                 totalTransaction:currentTransaction.totalTransaction,
                                 receiptFee:currentReceipt.receiptFee,
                                 receiptDate:currentReceipt.receiptDate,
                                 receiptTotaltime:currentReceipt.receiptTotaltime,
                                 receiptBuilding:currentReceipt.receiptBuilding});
          // ====================================================================
       });
   });
});

//ROUTE TO EDIT USER
app.get('/edituserinfo', loggedIn, function(req, res){
      res.render('edituserinfo', {currentUsername: req.user[0],
                             currentEmail:currentCustomer.currentEmail,
                             currentFirstname:currentCustomer.currentFirstname,
                             currentLastname:currentCustomer.currentLastname,
                             currentPicture:currentCustomer.currentPicture
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
  currentReserve.reservePlatenumber = req.body.plateNumber;
  currentReserve.reserveBuildingname = req.body.buildingName;
  console.log(currentReserve.reservePlatenumber);
  console.log(currentReserve.reserveBuildingname);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user[0],function(data){
        currentCustomer.customerReservable = data;
        console.log(currentCustomer.customerReservable);
      });

  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getLowestFloor(connection,currentReserve.reserveBuildingname,function(data){
        currentReserve.reserveFloor = data;
        console.log(currentReserve.reserveFloor);
      });
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getLowestSlot(connection,currentReserve.reserveBuildingname,function(data){
        currentReserve.reserveSlot = data;
        console.log(currentReserve.reserveSlot);
      });
  });
  //wait for update request
  await sleep(500);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getIsFull(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,function(data){
        currentReserve.reserveIsfull = data;
        console.log(currentReserve.reserveIsfull);
      });
  });
  if(currentCustomer.customerReservable == 0 || currentReserve.reserveIsfull == 1){
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
        currentReserve.reserveId = generateTokenID();
        currentReserve.qrCode = currentReserve.reserveId;
        obb = {isScan: isScan};
        reserve.Reserve(connection,currentReserve.reservePlatenumber,req.user[0], currentReserve.reserveFloor, currentReserve.reserveSlot,currentReserve.reserveBuildingname, currentReserve.reserveId);
        console.log('Reserve finished');
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentReserve.reserveIsfull = 1;
        parkingspot.setIsFull(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,1);
        console.log('set parking spot occupied');
    });
    await sleep(200);
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentCustomer.customerReservable = 0;
        customer.setReservable(connection, req.user[0],0);
        console.log('set user reservable');
        currentReserve.reserveStatus = "Reserved";
        res.render('showqr', {
            qrCode:currentReserve.qrCode,
            currentUsername: req.user[0],
            currentPicture: currentCustomer.currentPicture,
            message: 'You have made a reservation. Use this QR Code to enter the parking lot.'
          });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCancel(connection,req.user[0],function(data){
        currentCustomer.cancelTime = data;
      })
    });
    sleep(1000*60*30).then(() => {
      if(currentReserve.reserveTimein == check){
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          reserve.removeReserve(connection,currentReserve.reserveId);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentCustomer.customerReservable = 1;
          customer.setReservable(connection,req.user[0],1);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentCustomer.cancelTime++;
          customer.setCancel(connection,req.user[0],currentCustomer.cancelTime);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentReserve.reserveIsfull = 0;
          parkingspot.setIsFull(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,0);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          if(currentCustomer.cancelTime > 5){
              console.log('Too much cancellation, you are banned');
              currentCustomer.customerReservable = 0;
              customer.setReservable(connection,req.user[0],0);
          }
          currentReserve.reserveStatus = "Cancelled from reserve time out"
          currentReserve.reservePlatenumber = "--"
          currentReserve.reserveBuildingname = "--"
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
      currentCustomer.cancelTime = data;
    })
  });
  if(currentReserve.reserveTimein != check){
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
        reserve.removeReserve(connection,currentReserve.reserveId);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentCustomer.customerReservable = 1;
        customer.setReservable(connection,req.user[0],1);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentCustomer.cancelTime++;
        customer.setCancel(connection,req.user[0],currentCustomer.cancelTime);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentReserve.reserveIsfull = 0;
        parkingspot.setIsFull(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,0);
    });
    await sleep(500);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,currentReserve.reserveBuildingname,async function(data){
        if(currentReserve.reserveBuildingname = "buildingArts"){
          totalArtsFreeSpot = data;
        }else{
          totalPoliFreeSpot = data;
        }
      })
    });
    await sleep(10);
    currentReserve.reserveStatus = "Cancelled"
    currentReserve.reservePlatenumber = "--"
    currentReserve.reserveBuildingname = "--"
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        if(currentCustomer.cancelTime > 5){
            console.log('Too much cancel, you are banned');
            currentCustomer.customerReservable = 0;
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
                            currentPicture: currentCustomer.currentPicture,
                            reservePlatenumber: currentReserve.reservePlatenumber,
                            reserveBuildingname:currentReserve.reserveBuildingname,
                            reserveStatus:currentReserve.reserveStatus})
    });
  }
});

//SENSORCHECK
//PAY POST REQUEST
app.post('/pay',loggedIn,async function(req,res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    reserve.getTimeIn(connection,currentReserve.reserveId,function(data){
      currentReserve.reserveTimein = data;
    });
  });
  await sleep(100);
  if(currentReserve.reserveTimein != check){
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      reserve.setHasPaid(connection,currentReserve.reserveId,1);
      currentReserve.reserveStatus = "Paid"
    });
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      currentTransaction.transactionId = generateTokenID();
      currentReserve.qrCode = currentTransaction.transactionId;
      isScan = false;
      obb = {isScan: isScan};
      currentTransaction.totaltime = stopUserTimer();
      currentTransaction.parkingFee = parseInt((currentTransaction.totaltime * feeRate) + currentTransaction.addedFee);
      if(currentTransaction.exceedCheckoutTime == true){
        currentTransaction.addedFee = 0;
        currentTransaction.exceedCheckoutTime = false;
      }
      currentTransaction.paymentmethod = 'Kbank';
      currentTransaction.date = transaction.getCurrentDate();
      transaction.Transaction(connection,currentReserve.reservePlatenumber,req.user[0],currentReserve.reserveFloor,currentReserve.reserveSlot,currentReserve.reserveBuildingname,currentTransaction.transactionId,currentTransaction.parkingFee,currentTransaction.paymentmethod,currentTransaction.totaltime,currentTransaction.date);
      res.render('showqr', {qrCode:currentReserve.qrCode,currentUsername: req.user[0],currentPicture: currentCustomer.currentPicture});
  });
    sleep(1000*60*15).then(() => {
      currentTransaction.exceedCheckoutTime = true;
      if(currentReserve.reserveTimeout == check){
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentReserve.reserveStatus = "Reserve from payment time out"
          currentReserve.reserveId = generateTokenID();
          reserve.Reserve(connection,currentReserve.reservePlatenumber,req.user[0], currentReserve.reserveFloor, currentReserve.reserveSlot,currentReserve.reserveBuildingname, currentReserve.reserveId);
          console.log('re reserved');
        });
        sleep(200).then(() => {
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
              return;
          }
            currentReserve.reserveTimein = getCurrentTime();
            reserve.setTimeIn(connection,currentReserve.reserveId,currentReserve.reserveTimein);
            console.log('set timein');
          });
        });
        currentTransaction.addedFee = parseInt(15 * feeRate);
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
      currentCar.currentPlateNumber.push(car_info.platenumber);
      currentCar.currentBrand.push(car_info.carbrand);
      currentCar.currentModel.push(car_info.carmodel);
      currentCar.currentColor.push(car_info.carcolor);
      currentCar.currentPlateProvince.push(car_info.plateprovince);
      currentCar.currentCarPicture.push(car_info.carpicture);
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
      car.removeCar(connection,req.user[0],currentCar.currentPlateNumber[id]);
      delete currentCar.currentPlateNumber[id];
      delete currentCar.currentBrand[id];
      delete currentCar.currentModel[id];
      delete currentCar.currentColor[id];
      delete currentCar.currentCarPicture[id];
      delete currentCar.currentPlateProvince[id];
      currentCar.currentPlateNumber = currentCar.currentPlateNumber.filter(function( element ) {
        return element !== undefined;
      });
      currentCar.currentBrand = currentCar.currentBrand.filter(function( element ) {
        return element !== undefined;
      });
      currentCar.currentModel = currentCar.currentModel.filter(function( element ) {
        return element !== undefined;
      });
      currentCar.currentColor = currentCar.currentColor.filter(function( element ) {
        return element !== undefined;
      });
      currentCar.currentCarPicture = currentCar.currentCarPicture.filter(function( element ) {
        return element !== undefined;
      });
      currentCar.currentPlateProvince = currentCar.currentPlateProvince.filter(function( element ) {
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
        currentReceipt.receiptPaymentmethod = data;
      })
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      reserve.getAllTimeIn(connection,req.user[0],function(data){
        currentReceipt.receiptTimeIn = data;
      })
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      reserve.getAllTimeOut(connection,req.user[0],function(data){
        currentReceipt.receiptTimeOut = data;
      })
  });
  await sleep(500);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      transaction.getAllPlateNumber(connection,req.user[0],function(data){
        currentReceipt.receiptPlatenumber = data;
        res.render('receipt', {currentFirstname:currentCustomer.currentFirstname,
                               currentLastname:currentCustomer.currentLastname,
                               totalTransaction:currentTransaction.totalTransaction[id],
                               receiptFee:currentReceipt.receiptFee[id],
                               receiptDate:currentReceipt.receiptDate[id],
                               receiptTotaltime:currentReceipt.receiptTotaltime[id],
                               receiptBuilding:currentReceipt.receiptBuilding[id],
                               receiptPaymentmethod:currentReceipt.receiptPaymentmethod[id],
                               receiptTimeIn:currentReceipt.receiptTimeIn[id],
                               receiptTimeOut:currentReceipt.receiptTimeOut[id],
                               receiptPlatenumber:currentReceipt.receiptPlatenumber[id]
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
      var encode_image = currentCustomer.currentPicture;
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
    currentCustomer.currentEmail = edited_info.email;
    currentCustomer.currentFirstname = edited_info.firstname;
    currentCustomer.currentLastname = edited_info.lastname;
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    customer.getCustomerPicture(connection,req.user[0],async function(data){
      currentCustomer.currentPicture = data;
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
  var scannedQR = req.body.data;
  console.log(scannedQR);
  if(scannedQR == currentReserve.reserveId){
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      currentReserve.reserveQRin = scannedQR;
      reserve.setQRCodeIn(connection,currentReserve.reserveId,currentReserve.reserveQRin);
    });

    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      currentReserve.reserveTimein = getCurrentTime();
      reserve.setTimeIn(connection,currentReserve.reserveId,currentReserve.reserveTimein);
    });
  }else if(scannedQR == currentTransaction.transactionId){
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      currentReserve.reserveQRout = scannedQR;
      reserve.setQRCodeOut(connection,currentReserve.reserveId,currentReserve.reserveQRout);
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      currentReserve.reserveTimeout = getCurrentTime();
      reserve.setTimeOut(connection,currentReserve.reserveId,currentReserve.reserveTimeout);
    });
  }
});

app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
