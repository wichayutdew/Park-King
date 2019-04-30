var totalArtsFreeSpot,totalPoliFreeSpot,lowestFloorArts,lowestSlotArts,lowestFloorPoli,lowestSlotPoli;
var isScan;
var obb = {isScan: isScan};
var check = "initialize";

//require .js file
const customer = require('./Customer.js');
var car = require('./Car.js');
const parkingspot = require('./ParkingSpot.js');
var artsCapacity, poliCapacity;
const reserve = require('./Reserve.js');
const transaction = require('./TransactionReceipt.js');
var Stopwatch = require('statman-stopwatch');

var currentCustomer = [];
var currentCar = [];
var currentReserve = [];
var currentTransaction = [];
var currentReceipt = [];
var stopwatch = [];

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
        done(null, user[0]);
    });
passport.deserializeUser(function(user, done) {
        console.log('deserializer');
        var deserializing = [];
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
          }
          customer.getHasStopWatch(connection,user,function(data){
            deserializing.push(data);
          });
        });
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
                    done(err, deserializing);
                    connection.release();
                }
            );
            //set parameterized query
            request.addParameter('username',TYPES.VarChar,user);
            request.on('row', function (columns) {
                columns.forEach(function(column) {
                    deserializing.push(column.value);
                });
            });
            connection.execSql(request);
          });
    });

//passport model use for registeration
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username,password,done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Sign-up requested')
            var encode_image;
            if(!req.file || !req.file.path){
              var encode_image = null;
            }else{
              var pathName = path.join(__dirname,req.file.path);
              var img = fs.readFileSync(pathName);
              encode_image = img.toString('base64');
            }
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
                        console.log('this username does not taken')
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
    }));
//passport model use for login
passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username,password,done) {
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
                        connection.release();
                        return done(err);
                    }
                    if(rows == null){
                        console.log('loginMessage', 'No user found.');
                        connection.release();
                        return done(null, false);
                    }else if (!(login_request[1] == password)){
                        console.log('loginMessage', 'Oops! Wrong password.');
                        connection.release();
                        return done(null, false);
                    }else{
                        console.log('logged in!!!');
                        console.log(login_request[0])
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
            });
            request.on('Done',function(err, rowCount, rows){
                console.log(loggedInBoolean());
            });
            connection.execSql(request);
        });
    }));

//===================================================================================================================================================
// Operation
//===================================================================================================================================================
// ALL TIMER IS IN SECOND(TO CHANGE TO MINUTES CHANGE /1000 TO /60000)

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
    if (currentCustomer[req.user[0]].customerReservable == 1) {
      res.redirect('/reserve');
    }else{
      return next();
    }
}

//Calculate the fee rate
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

function createstopwatch(){
  var tempstopwatch = new Stopwatch();
  var tempCustomer = new customer.createCustomer();
  currentCustomer.push(tempCustomer);
  var tempCar = new car.createCar();
  currentCar.push(tempCar);
  var tempReserve = new reserve.createReserve();
  currentReserve.push(tempReserve);
  var tempTransaction = new transaction.createTransaction();
  currentTransaction.push(tempTransaction);
  var tempReceipt = new transaction.createReceipt();
  currentReceipt.push(tempReceipt);
  var stopwatchLength = stopwatch.push(tempstopwatch);
  return stopwatchLength-1;
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

//ROUTE TO HOME
app.get('/home',loggedIn, async function(req, res){
    if(req.user[0] == null){
    var tempIndex = createstopwatch();
    console.log('stopwatch Rightnow: '+stopwatch);
    console.log('stopwatchIndex: '+tempIndex);
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      req.user[0] = tempIndex;
      customer.setHasStopWatch(connection,req.user[1],req.user[0]);
    });
  }
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user[1],function(data){
        currentCustomer[req.user[0]].customerReservable = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user[1],async function(data){
        currentCustomer[req.user[0]].currentPicture = data;
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
      car.getAllPlateNumber(connection,req.user[1],function(data){
        currentCar[req.user[0]].currentPlateNumber = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarBrand(connection,req.user[1],function(data){
        currentCar[req.user[0]].currentBrand = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarModel(connection,req.user[1],function(data){
        currentCar[req.user[0]].currentModel = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarColor(connection,req.user[1],function(data){
        currentCar[req.user[0]].currentColor = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarPicture(connection,req.user[1],function(data){
        currentCar[req.user[0]].currentCarPicture = data;
      });
    });
    await sleep(1000);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateProvince(connection,req.user[1],function(data){
        currentCar[req.user[0]].currentPlateProvince = data;

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
                            currentUsername: req.user[1],
                            currentPicture: currentCustomer[req.user[0]].currentPicture,
                            reservePlatenumber: currentReserve[req.user[0]].reservePlatenumber,
                            reserveBuildingname:currentReserve[req.user[0]].reserveBuildingname,
                            reserveStatus:currentReserve[req.user[0]].reserveStatus
                            });
        // ====================================================================
      });
    });
    //------------------------------------------------------------------------------------------------------------//
    //------------------------------------------------------------------------------------------------------------//
    currentReserve[req.user[0]].feeRate = feeRate(currentCustomer[req.user[0]].currentCustomerType);
    setInterval(async function() {
      console.log('Please wait for check-in/check-out');
      pool.acquire(function (err, connection) {
          if (err) {
            console.error(err);
            connection.release();
          }
          reserve.getTimeIn(connection,currentReserve[req.user[0]].reserveId,function(data){
            currentReserve[req.user[0]].reserveTimein = data;
          });
        });
      pool.acquire(function (err, connection) {
          if (err) {
            console.error(err);
            connection.release();
          }
          reserve.getTimeOut(connection,currentReserve[req.user[0]].reserveId,function(data){
            currentReserve[req.user[0]].reserveTimeout= data;
          });
        });
      pool.acquire(function (err, connection) {
          if (err) {
            console.error(err);
            connection.release();
          }
          reserve.getReserveStatus(connection,currentReserve[req.user[0]].reserveId,function(data){
            currentReserve[req.user[0]].reserveStatus = data;
            console.log("Check Status = " + currentReserve[req.user[0]].reserveStatus);
          });
      });
      await sleep(500);
      if(currentReserve[req.user[0]].reserveTimein != check && currentReserve[req.user[0]].reserveTimeout == check && currentReserve[req.user[0]].reserveStatus == "Reserved"){
          pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getQRCodeIn(connection,currentReserve[req.user[0]].reserveId,function(data){
                  currentReserve[req.user[0]].reserveQRin = data;
              });
            });
          if(currentReserve[req.user[0]].reserveQRin == currentReserve[req.user[0]].reserveId && currentReserve[req.user[0]].reserveStatus != "Checked In"){
                console.log("Checking In");
                stopwatch[req.user[0]].start();
                pool.acquire(function (err, connection) {
                    if (err) {
                        console.error(err);
                        connection.release();
                        return;
                    }
                    currentReserve[req.user[0]].reserveStatus = "Checked In";
                    reserve.setReserveStatus(connection,currentReserve[req.user[0]].reserveId,"Checked In");
                    console.log("Checked in Status = " + currentReserve[req.user[0]].reserveStatus);
                });
                isScan = true;
            }
      }else if(currentReserve[req.user[0]].reserveTimeout != check && currentReserve[req.user[0]].reserveTimeout != null && currentReserve[req.user[0]].reserveStatus == "Paid"){
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getQRCodeOut(connection,currentReserve[req.user[0]].reserveId,function(data){
                  currentReserve[req.user[0]].reserveQRout = data;
              });
            });
            if(currentReserve[req.user[0]].reserveQRout == currentTransaction[req.user[0]].transactionId && currentReserve[req.user[0]].reserveStatus != "Checked Out"){
              console.log("Checking Out");
              pool.acquire(function (err, connection) {
                if (err) {
                  console.error(err);
                  connection.release();
                }
                currentReserve[req.user[0]].reserveIsfull = 0;
                parkingspot.setIsFull(connection,currentReserve[req.user[0]].reserveBuildingname,currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,0);

              });
              pool.acquire(function (err, connection) {
                if (err) {
                  console.error(err);
                  connection.release();
                }
                currentCustomer[req.user[0]].customerReservable = 1;
                customer.setReservable(connection,req.user[1],1);
              });
              pool.acquire(function (err, connection) {
                  if (err) {
                      console.error(err);
                      connection.release();
                      return;
                  }
                  currentReserve[req.user[0]].reserveStatus = "Checked Out";
                  reserve.setReserveStatus(connection,currentReserve[req.user[0]].reserveId,"Checked Out");
                  console.log("Status = " + currentReserve[req.user[0]].reserveStatus);
              });
              isScan = false;
            }
      }
      currentReserve[req.user[0]].currentTime = parseInt(stopwatch[req.user[0]].read()/1000);
      currentReserve[req.user[0]].currentFee = parseInt(currentReserve[req.user[0]].currentTime * currentReserve[req.user[0]].feeRate);
      console.log(currentReserve[req.user[0]].currentTime);
      console.log(currentReserve[req.user[0]].currentFee);
      console.log(currentReserve[req.user[0]].reserveTimein);
      console.log(currentReserve[req.user[0]].reserveTimeout);
    },1000);
});

app.get('/getTimeandFee', function(req, res){
  var mins, hours;
  if(currentReserve[req.user[0]].currentTime/60>=1){
    hours = Math.floor(currentReserve[req.user[0]].currentTime/60);
    mins = currentReserve[req.user[0]].currentTime-(hours*60);
  } else {
    hours = 0;
    mins = currentReserve[req.user[0]].currentTime;
  }
  res.send({
    mins: mins,
    hours: hours,
    parkingFee: currentReserve[req.user[0]].currentFee
  });
});
app.get('/getReserveStatus', function(req, res){
  pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      reserve.getReserveStatus(connection,currentReserve.reserveId,function(data){
        currentReserve.reserveStatus = data;
        console.log("Check Status = " + currentReserve.reserveStatus);
      });
      res.send(currentReserve.reserveStatus);
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
    customer.getCancel(connection,req.user[1],function(data){
      currentCustomer[req.user[0]].cancelTime = data;
      res.render('reserve', {currentCarPicture: currentCar[req.user[0]].currentCarPicture,
                             currentPlateNumber: currentCar[req.user[0]].currentPlateNumber,
                             currentUsername: req.user[1],
                             currentPicture:currentCustomer[req.user[0]].currentPicture,
                             cancelTime:currentCustomer[req.user[0]].cancelTime});
    });
  });
});

//ROUTE TO QR CODE PAGE
app.get('/showqr', loggedIn,hasReserved,function(req, res){
  if(currentReserve[req.user[0]].reserveStatus == "Paid"){
    res.render('showqr', {qrCode: currentTransaction[req.user[0]].qrCode,
                          currentUsername: currentCustomer[req.user[0]].currentUsername,
                          currentPicture: currentCustomer[req.user[0]].currentPicture,
                          isScan: isScan});
  }else{
    res.render('showqr', {qrCode: currentReserve[req.user[0]].qrCode,
                          currentUsername: currentCustomer[req.user[0]].currentUsername,
                          currentPicture: currentCustomer[req.user[0]].currentPicture,
                          isScan: isScan});
  }

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
    parkingspot.getMapLocation(connection,currentReserve[req.user[0]].reserveBuildingname,currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,function(data){
      currentReserve[req.user[0]].reserveMap = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarBrand(connection,req.user[1],currentReserve[req.user[0]].reservePlatenumber,function(data){
      currentReserve[req.user[0]].reserveBrand = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarModel(connection,req.user[1],currentReserve[req.user[0]].reservePlatenumber,function(data){
      currentReserve[req.user[0]].reserveModel = data;
    })
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarColor(connection,req.user[1],currentReserve[req.user[0]].reservePlatenumber,function(data){
      currentReserve[req.user[0]].reserveColor = data;
    })
  });
  await sleep(500)
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    car.getCarPicture(connection,req.user[1],currentReserve[req.user[0]].reservePlatenumber,function(data){
      currentReserve[req.user[0]].reserveCarPicture = data;
      // ====================================================================
      //RENDERING STATUS PAGE
      res.render('status', {reservePlatenumber:currentReserve[req.user[0]].reservePlatenumber,
                          reserveBuildingname:currentReserve[req.user[0]].reserveBuildingname,
                          reserveFloor:currentReserve[req.user[0]].reserveFloor,
                          reserveSlot:currentReserve[req.user[0]].reserveSlot,
                          reserveMap:currentReserve[req.user[0]].reserveMap,
                          reserveBrand:currentReserve[req.user[0]].reserveBrand,
                          reserveModel:currentReserve[req.user[0]].reserveModel,
                          reserveColor:currentReserve[req.user[0]].reserveColor,
                          reserveCarPicture:currentReserve[req.user[0]].reserveCarPicture,
                          currentUsername: req.user[1],
                          currentPicture: currentCustomer[req.user[0]].currentPicture,
                          reserveStatus:currentReserve[req.user[0]].reserveStatus});
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
     customer.getEmail(connection,req.user[1],function(data){
       currentCustomer[req.user[0]].currentEmail = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getFirstname(connection,req.user[1],function(data){
       currentCustomer[req.user[0]].currentFirstname = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getLastname(connection,req.user[1],function(data){
       currentCustomer[req.user[0]].currentLastname = data;
     })
   });
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     customer.getCustomerType(connection,req.user[1],function(data){
       currentCustomer[req.user[0]].currentCustomerType = data;
     })
   });
   await sleep(500);
   pool.acquire(function (err, connection) {
     if (err) {
       console.error(err);
       connection.release();
     }
     transaction.getAllTransaction(connection,req.user[1],function(data){
       currentReceipt[req.user[0]].totalTransaction = data;
     })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllFee(connection,req.user[1],function(data){
         currentReceipt[req.user[0]].receiptFee = data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllDate(connection,req.user[1],function(data){
         currentReceipt[req.user[0]].receiptDate= data;
       })
   });
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllTotalTime(connection,req.user[1],function(data){
         currentReceipt[req.user[0]].receiptTotaltime = data;
       })
   });
   await sleep(500);
   pool.acquire(function (err, connection) {
       if (err) {
           console.error(err);
           connection.release();
       }
       transaction.getAllBuilding(connection,req.user[1],function(data){
         currentReceipt[req.user[0]].receiptBuilding = data;
         // ====================================================================
         //RENDER USERINFO PAGE
         res.render('userinfo', {
                                 //USER INFO
                                 currentUsername:req.user[1],
                                 currentPicture:currentCustomer[req.user[0]].currentPicture,
                                 currentEmail:currentCustomer[req.user[0]].currentEmail,
                                 currentCustomerType:currentCustomer[req.user[0]].currentCustomerType,
                                 currentID:customer.getID(req.user),
                                 currentFirstname:currentCustomer[req.user[0]].currentFirstname,
                                 currentLastname:currentCustomer[req.user[0]].currentLastname,
                                 //CAR INFO
                                 currentCarPicture: currentCar[req.user[0]].currentCarPicture,
                                 currentBrand:currentCar[req.user[0]].currentBrand,
                                 currentColor:currentCar[req.user[0]].currentColor,
                                 currentModel:currentCar[req.user[0]].currentModel,
                                 currentPlateNumber:currentCar[req.user[0]].currentPlateNumber,
                                 currentPlateProvince:currentCar[req.user[0]].currentPlateProvince,
                                 //RECEIPT INFO
                                 totalTransaction:currentReceipt[req.user[0]].totalTransaction,
                                 receiptFee:currentReceipt[req.user[0]].receiptFee,
                                 receiptDate:currentReceipt[req.user[0]].receiptDate,
                                 receiptTotaltime:currentReceipt[req.user[0]].receiptTotaltime,
                                 receiptBuilding:currentReceipt[req.user[0]].receiptBuilding});
          // ====================================================================
       });
   });
});

//ROUTE TO EDIT USER
app.get('/edituserinfo', loggedIn, function(req, res){
      res.render('edituserinfo', {currentUsername: req.user[1],
                             currentEmail:currentCustomer[req.user[0]].currentEmail,
                             currentFirstname:currentCustomer[req.user[0]].currentFirstname,
                             currentLastname:currentCustomer[req.user[0]].currentLastname,
                             currentPicture:currentCustomer[req.user[0]].currentPicture
                           });

});

//ROUTE TO RECEIPT PAGE
app.get('/receipt',loggedIn, function(req, res){
    res.render('receipt');
});

app.get('/payment',loggedIn,function(req,res){
  res.render('payment');
})

// ====================================================================
//POST ROUTES
// ====================================================================
//MAKING RESERVATION
//ADD SENSOR CHECK
app.post('/reserve',loggedIn,async function(req, res){
  currentReserve[req.user[0]].reservePlatenumber = req.body.plateNumber;
  currentReserve[req.user[0]].reserveBuildingname = req.body.buildingName;
  console.log(currentReserve[req.user[0]].reservePlatenumber);
  console.log(currentReserve[req.user[0]].reserveBuildingname);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user[1],function(data){
        currentCustomer[req.user[0]].customerReservable = data;
        console.log(currentCustomer[req.user[0]].customerReservable);
      });

  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getLowestFloor(connection,currentReserve[req.user[0]].reserveBuildingname,function(data){
        currentReserve[req.user[0]].reserveFloor = data;
        console.log(currentReserve[req.user[0]].reserveFloor);
      });
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      parkingspot.getLowestSlot(connection,currentReserve[req.user[0]].reserveBuildingname,function(data){
        currentReserve[req.user[0]].reserveSlot = data;
        console.log(currentReserve[req.user[0]].reserveSlot);
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
      parkingspot.getIsFull(connection,currentReserve[req.user[0]].reserveBuildingname,currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,function(data){
        currentReserve[req.user[0]].reserveIsfull = data;
        console.log(currentReserve[req.user[0]].reserveIsfull);
      });
  });
  if(currentCustomer[req.user[0]].customerReservable == 0 || currentReserve[req.user[0]].reserveIsfull == 1){
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
        currentReserve[req.user[0]].reserveId = generateTokenID();
        currentReserve[req.user[0]].qrCode = [currentReserve[req.user[0]].reserveId,req.user[1]];
        obb = {isScan: isScan};
        reserve.Reserve(connection,currentReserve[req.user[0]].reservePlatenumber,req.user[1], currentReserve[req.user[0]].reserveFloor, currentReserve[req.user[0]].reserveSlot,currentReserve[req.user[0]].reserveBuildingname, currentReserve[req.user[0]].reserveId);
        console.log('Reserve finished');
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentReserve[req.user[0]].reserveIsfull = 1;
        parkingspot.setIsFull(connection,currentReserve[req.user[0]].reserveBuildingname,currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,1);
        console.log('set parking spot occupied');
    });
    await sleep(200);
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentCustomer[req.user[0]].customerReservable = 0;
        customer.setReservable(connection, req.user[1],0);
        console.log('set user reservable');

        res.render('showqr', {
            qrCode:currentReserve[req.user[0]].qrCode,
            currentUsername: req.user[1],
            currentPicture: currentCustomer[req.user[0]].currentPicture,
            message: 'You have made a reservation. Use this QR Code to enter the parking lot.'
          });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCancel(connection,req.user[1],function(data){
        currentCustomer[req.user[0]].cancelTime = data;
      })
    });
    sleep(1000*60*30).then(() => {
      if(currentReserve[req.user[0]].reserveTimein == check){
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          reserve.removeReserve(connection,currentReserve[req.user[0]].reserveId);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentCustomer[req.user[0]].customerReservable = 1;
          customer.setReservable(connection,req.user[1],1);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentCustomer[req.user[0]].cancelTime++;
          customer.setCancel(connection,req.user[1],currentCustomer[req.user[0]].cancelTime);
      });
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          currentReserve[req.user[0]].reserveIsfull = 0;
          parkingspot.setIsFull(connection,currentReserve[req.user[0]].reserveBuildingname,currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,0);
      });
        if(currentCustomer[req.user[0]].cancelTime > 5){
          pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }
          console.log('Too much cancellation, you are banned');
          currentCustomer[req.user[0]].customerReservable = 0;
          customer.setReservable(connection,req.user[1],0);
          currentReserve[req.user[0]].reservePlatenumber = "--"
          currentReserve[req.user[0]].reserveBuildingname = "--"
        });
          pool.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                connection.release();
                return;
            }
            currentReserve[req.user[0]].reserveStatus = "Cancelled from reserve time out"
            reserve.setReserveStatus(connection,currentReserve[req.user[0]].reserveId,"Cancelled from reserve time out");
        });
        }
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
    customer.getCancel(connection,req.user[1],function(data){
      currentCustomer[req.user[0]].cancelTime = data;
    })
  });
  if(currentReserve[req.user[0]].reserveTimein != check){
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
        reserve.removeReserve(connection,currentReserve[req.user[0]].reserveId);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentCustomer[req.user[0]].customerReservable = 1;
        customer.setReservable(connection,req.user[1],1);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentCustomer[req.user[0]].cancelTime++;
        customer.setCancel(connection,req.user[1],currentCustomer[req.user[0]].cancelTime);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentReserve[req.user[0]].reserveIsfull = 0;
        parkingspot.setIsFull(connection,currentReserve[req.user[0]].reserveBuildingname,currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,0);
    });
    await sleep(500);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      parkingspot.getTotalFreeSpot(connection,currentReserve[req.user[0]].reserveBuildingname,async function(data){
        if(currentReserve[req.user[0]].reserveBuildingname = "buildingArts"){
          totalArtsFreeSpot = data;
        }else{
          totalPoliFreeSpot = data;
        }
      })
    });
    await sleep(10);
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentReserve[req.user[0]].reserveStatus = "Cancelled";
        reserve.setReserveStatus(connection,currentReserve[req.user[0]].reserveId,"Cancelled");
    });
    currentReserve[req.user[0]].reservePlatenumber = "--"
    currentReserve[req.user[0]].reserveBuildingname = "--"
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        if(currentCustomer[req.user[0]].cancelTime > 5){
            console.log('Too much cancel, you are banned');
            currentCustomer[req.user[0]].customerReservable = 0;
            customer.setReservable(connection,req.user[1],0);
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
                            currentUsername: req.user[1],
                            currentPicture: currentCustomer[req.user[0]].currentPicture,
                            reservePlatenumber: currentReserve[req.user[0]].reservePlatenumber,
                            reserveBuildingname:currentReserve[req.user[0]].reserveBuildingname,
                            reserveStatus:currentReserve[req.user[0]].reserveStatus})
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
    reserve.getTimeIn(connection,currentReserve[req.user[0]].reserveId,function(data){
      currentReserve[req.user[0]].reserveTimein = data;
    });
  });
  await sleep(100);
  if(currentReserve[req.user[0]].reserveTimein != check){
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      reserve.setHasPaid(connection,currentReserve[req.user[0]].reserveId,1);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        currentReserve[req.user[0]].reserveStatus = "Paid"
        reserve.setReserveStatus(connection,currentReserve[req.user[0]].reserveId,"Paid");
    });
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      currentTransaction[req.user[0]].transactionId = generateTokenID();
      currentTransaction[req.user[0]].qrCode = [currentTransaction[req.user[0]].transactionId,req.user[1]];
      isScan = false;
      obb = {isScan: isScan};
      currentTransaction[req.user[0]].totaltime = parseInt(stopwatch[req.user[0]].stop()/1000);
      stopwatch[req.user[0]].reset();
      currentTransaction[req.user[0]].parkingFee = parseInt((currentTransaction[req.user[0]].totaltime * currentReserve[req.user[0]].feeRate) + currentTransaction[req.user[0]].addedFee);
      if(currentTransaction[req.user[0]].exceedCheckoutTime == true){
        currentTransaction[req.user[0]].addedFee = 0;
        currentTransaction[req.user[0]].exceedCheckoutTime = false;
      }

      currentTransaction[req.user[0]].date = transaction.getCurrentDate();
      transaction.Transaction(connection,currentReserve[req.user[0]].reservePlatenumber,req.user[1],currentReserve[req.user[0]].reserveFloor,currentReserve[req.user[0]].reserveSlot,currentReserve[req.user[0]].reserveBuildingname,currentTransaction[req.user[0]].transactionId,currentTransaction[req.user[0]].parkingFee,null,currentTransaction[req.user[0]].totaltime,currentTransaction[req.user[0]].date);
      res.redirect('/payment');
    });
    sleep(1000*60*15).then(() => {
      currentTransaction[req.user[0]].exceedCheckoutTime = true;
      if(currentReserve[req.user[0]].reserveTimeout == check){
        pool.acquire(function (err, connection) {
          if (err) {
              console.error(err);
              connection.release();
              return;
          }

          currentReserve[req.user[0]].reserveId = generateTokenID();
          reserve.Reserve(connection,currentReserve[req.user[0]].reservePlatenumber,req.user[1], currentReserve[req.user[0]].reserveFloor, currentReserve[req.user[0]].reserveSlot,currentReserve[req.user[0]].reserveBuildingname, currentReserve[req.user[0]].reserveId);
          console.log('re reserved');
        });
        sleep(200).then(() => {
          pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
                  return;
              }
              currentReserve[req.user[0]].reserveStatus = "Reserve from payment time out";
              reserve.setReserveStatus(connection,currentReserve[req.user[0]].reserveId,"Reserve from payment time out");
          });
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
              return;
          }
            currentReserve[req.user[0]].reserveTimein = getCurrentTime();
            reserve.setTimeIn(connection,currentReserve[req.user[0]].reserveId,currentReserve[req.user[0]].reserveTimein);
            console.log('set timein');
          });
        });
        pool.acquire(function (err, connection) {
          if (err) {
            console.error(err);
            connection.release();
            return;
          }
          currentTransaction[req.user[0]].addedFee = parseInt(15 * currentReserve[req.user[0]].feeRate);
          transaction.setAddedFee(connection,currentTransaction[req.user[0]].transactionId,currentTransaction[req.user[0]].addedFee);
        });
        stopwatch[req.user[0]].start();
      }
    });
  }else{
    res.redirect('status');
  }
});

app.post('/paymentaction',loggedIn,async function(req, res){
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    currentTransaction[req.user[0]].paymentmethod = req.body.paymentChoice;
    transaction.setPaymentMethod(connection,currentTransaction[req.user[0]].transactionId,currentTransaction[req.user[0]].paymentmethod);
    res.render('showqr', {qrCode:currentTransaction[req.user[0]].qrCode,
                          currentUsername: req.user[1],
                          currentPicture: currentCustomer[req.user[0]].currentPicture
                        });
  });
})
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
      car.insert_newCar(connection,car_info,req.user[1]);
      currentCar[req.user[0]].currentPlateNumber.push(car_info.platenumber);
      currentCar[req.user[0]].currentBrand.push(car_info.carbrand);
      currentCar[req.user[0]].currentModel.push(car_info.carmodel);
      currentCar[req.user[0]].currentColor.push(car_info.carcolor);
      currentCar[req.user[0]].currentPlateProvince.push(car_info.plateprovince);
      currentCar[req.user[0]].currentCarPicture.push(car_info.carpicture);
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
      car.removeCar(connection,req.user[1],currentCar[req.user[0]].currentPlateNumber[id]);
      delete currentCar[req.user[0]].currentPlateNumber[id];
      delete currentCar[req.user[0]].currentBrand[id];
      delete currentCar[req.user[0]].currentModel[id];
      delete currentCar[req.user[0]].currentColor[id];
      delete currentCar[req.user[0]].currentCarPicture[id];
      delete currentCar[req.user[0]].currentPlateProvince[id];
      currentCar[req.user[0]].currentPlateNumber = currentCar[req.user[0]].currentPlateNumber.filter(function( element ) {
        return element !== undefined;
      });
      currentCar[req.user[0]].currentBrand = currentCar[req.user[0]].currentBrand.filter(function( element ) {
        return element !== undefined;
      });
      currentCar[req.user[0]].currentModel = currentCar[req.user[0]].currentModel.filter(function( element ) {
        return element !== undefined;
      });
      currentCar[req.user[0]].currentColor = currentCar[req.user[0]].currentColor.filter(function( element ) {
        return element !== undefined;
      });
      currentCar[req.user[0]].currentCarPicture = currentCar[req.user[0]].currentCarPicture.filter(function( element ) {
        return element !== undefined;
      });
      currentCar[req.user[0]].currentPlateProvince = currentCar[req.user[0]].currentPlateProvince.filter(function( element ) {
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
      transaction.getAllPaymentMethod(connection,req.user[1],function(data){
        currentReceipt[req.user[0]].receiptPaymentmethod = data;
      })
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      reserve.getAllTimeIn(connection,req.user[1],function(data){
        currentReceipt[req.user[0]].receiptTimeIn = data;
      })
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      reserve.getAllTimeOut(connection,req.user[1],function(data){
        currentReceipt[req.user[0]].receiptTimeOut = data;
      })
  });
  await sleep(500);
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      transaction.getAllPlateNumber(connection,req.user[1],function(data){
        currentReceipt[req.user[0]].receiptPlatenumber = data;
        res.render('receipt', {currentFirstname:currentCustomer[req.user[0]].currentFirstname,
                               currentLastname:currentCustomer[req.user[0]].currentLastname,
                               totalTransaction:currentReceipt[req.user[0]].totalTransaction[id],
                               receiptFee:currentReceipt[req.user[0]].receiptFee[id],
                               receiptDate:currentReceipt[req.user[0]].receiptDate[id],
                               receiptTotaltime:currentReceipt[req.user[0]].receiptTotaltime[id],
                               receiptBuilding:currentReceipt[req.user[0]].receiptBuilding[id],
                               receiptPaymentmethod:currentReceipt[req.user[0]].receiptPaymentmethod[id],
                               receiptTimeIn:currentReceipt[req.user[0]].receiptTimeIn[id],
                               receiptTimeOut:currentReceipt[req.user[0]].receiptTimeOut[id],
                               receiptPlatenumber:currentReceipt[req.user[0]].receiptPlatenumber[id]
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
      var encode_image = currentCustomer[req.user[0]].currentPicture;
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
    customer.editCustomer(connection,req.user[1],edited_info);
    currentCustomer[req.user[0]].currentEmail = edited_info.email;
    currentCustomer[req.user[0]].currentFirstname = edited_info.firstname;
    currentCustomer[req.user[0]].currentLastname = edited_info.lastname;
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    customer.getCustomerPicture(connection,req.user[1],async function(data){
      currentCustomer[req.user[0]].currentPicture = data;
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
    failureRedirect: '/register',
    failureFlash: true,
    session: false
}));

app.post('/qrcode',async function(req, res){
  var scannedQR = req.body.data;
  var qr = scannedQR.split(",");
  console.log("Scanned QR " + qr[0]);
  console.log("Username " + qr[1]);
  var reserveID, transactionID;
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    reserve.getReserveID(connection,qr[1],function(data){
      reserveID = data;
      console.log("Reserve ID" +reserveID);
    });
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    transaction.getTransactionID(connection,qr[1],function(data){
      transactionID = data;
      console.log("TransactionID" + transactionID);
    })
  });
  await sleep(200);
  if(qr[0] == reserveID){
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      reserve.setQRCodeIn(connection,reserveID,qr[0]);
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      var reserveTimein = getCurrentTime();
      reserve.setTimeIn(connection,reserveID,reserveTimein);
    });
  }else if(qr[0]  == transactionID){
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      reserve.setQRCodeOut(connection,reserveID,qr[0]);
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      var reserveTimeout = getCurrentTime();
      reserve.setTimeOut(connection,reserveID,reserveTimeout);
    });
  }
});

app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
