var isScan;
var obb = {isScan: isScan};

//require internal JS file
const customer = require('./Customer.js');
// var currentCustomer = new customer.createCustomer();
var car = require('./Car.js');
//require ParkingSpot.js file
var totalArtsFreeSpot,
    totalPoliFreeSpot,
    lowestFloorArts,
    lowestSlotArts,
    lowestFloorPoli,
    lowestSlotPoli;
const parkingspot = require('./ParkingSpot.js');
//require Building.js file
var artsCapacity, poliCapacity;
//require Reserve.js file
const reserve = require('./Reserve.js');
//require TransactionReceipt.js file
const transaction = require('./TransactionReceipt.js');


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

//Serializer and Deserializer
passport.serializeUser(function(user, done) {
        console.log('serializer');
        //console.log(user[0]);
        done(null, user[0]);
    });
function createDeserializer() {
       this.currentCustomer = null;
       this.currentCar = null;
       this.currentReserve = null;
       this.currentTransaction = null;
       this.currentReceipt = null;
       this.stopwatch = null;
    }
passport.deserializeUser(async function(user, done) {
            console.log('deserializer')
            var deserializing = new createDeserializer();
            var currentCustomer = new customer.createCustomer();
            var currentCar = new car.createCar();
            var currentReserve = new reserve.createReserve();
            var currentTransaction = new transaction.createTransaction();
            var currentReceipt = new transaction.createReceipt();
            var stopwatch = new Stopwatch();
            //CUSTOMER INFORMATION
            currentCustomer.currentUsername = user;
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getEmail(connection,user,function(data){
                currentCustomer.currentEmail = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getFirstname(connection,user,function(data){
                currentCustomer.currentFirstname = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getLastname(connection,user,function(data){
                currentCustomer.currentLastname = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getCustomerType(connection,user,function(data){
                currentCustomer.currentCustomerType = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getStudentID(connection,user,function(data){
                currentCustomer.studentID = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getProfessorID(connection,user,function(data){
                currentCustomer.professorID = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getNationalID(connection,user,function(data){
                currentCustomer.nationalID = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getCustomerPicture(connection,user,function(data){
                currentCustomer.currentPicture = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getCancel(connection,user,function(data){
                currentCustomer.cancelTime = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                  console.error(err);
                  connection.release();
              }
              customer.getReservable(connection,user,function(data){
                currentCustomer.customerReservable = data;
              });
            });
            //CAR INFORMATION
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getAllPlateNumber(connection,user,function(data){
                currentCar.currentPlateNumber = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getAllCarBrand(connection,user,function(data){
                currentCar.currentBrand = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getAllCarModel(connection,user,function(data){
                currentCar.currentModel = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getAllCarColor(connection,user,function(data){
                currentCar.currentColor = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getAllCarPicture(connection,user,function(data){
                currentCar.currentCarPicture = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getAllPlateProvince(connection,user,function(data){
                currentCar.currentPlateProvince = data;
              });
            });
            //RESERVE INFORMATION
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getReserveID(connection,user,function(data){
                currentReserve.reserveId = data;
              });
            });
            await sleep(500);
            currentReserve.qrCode = [currentReserve.reserveId,currentCustomer.currentUsername];
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getReserveStatus(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveStatus = data;
              });
            });
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
                currentReserve.reserveTimeout = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getQRCodeIn(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveQRin = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getQRCodeOut(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveQRout = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getPlateNumber(connection,currentReserve.reserveId,function(data){
                currentReserve.reservePlatenumber = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getFloor(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveFloor = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getSlot(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveSlot = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getBuildingname(connection,currentReserve.reserveId,function(data){
                currentReserve.reserveBuildingname = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getCurrentFee(connection,currentReserve.reserveId,function(data){
                currentReserve.currentFee = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getCurrentTime(connection,currentReserve.reserveId,function(data){
                currentReserve.currentTime = data;
              });
            });
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
              parkingspot.getIsFull(connection,currentReserve.reserveBuildingname,currentReserve.reserveFloor,currentReserve.reserveSlot,function(data){
                currentReserve.reserveIsfull = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getCarBrand(connection,currentCustomer.currentUsername,currentReserve.reservePlatenumber,function(data){
                currentReserve.reserveBrand = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getCarModel(connection,currentCustomer.currentUsername,currentReserve.reservePlatenumber,function(data){
                currentReserve.reserveModel = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getCarColor(connection,currentCustomer.currentUsername,currentReserve.reservePlatenumber,function(data){
                currentReserve.reserveColor = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              car.getCarPicture(connection,currentCustomer.currentUsername,currentReserve.reservePlatenumber,function(data){
                currentReserve.reserveCarPicture = data;
              })
            });
            //TRANSACTION INFORMATION
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getTransactionID(connection,user,function(data){
                currentTransaction.transactionId = data;
              })
            });
            currentTransaction.qrCode = [currentTransaction.transactionId,currentCustomer.currentUsername];
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getTotalTime(connection,currentTransaction.transactionId,function(data){
                currentTransaction.totaltime = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getFee(connection,currentTransaction.transactionId,function(data){
                currentTransaction.parkingFee = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getPaymentMethod(connection,currentTransaction.transactionId,function(data){
                currentTransaction.paymentmethod = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getDate(connection,currentTransaction.transactionId,function(data){
                currentTransaction.date = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getExceedCheckouttime(connection,currentTransaction.transactionId,function(data){
                currentTransaction.exceedCheckoutTime = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getAddedFee(connection,currentTransaction.transactionId,function(data){
                currentTransaction.addedFee = data;
              })
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.getAllTransaction(connection,currentCustomer.currentUsername,function(data){
                currentTransaction.totalTransaction = data;
              })
            });
            //RECEIPT INFORMATION
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getAllTimeIn(connection,user,function(data){
                currentReceipt.receiptTimeIn = data;
              });
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              reserve.getAllTimeOut(connection,user,function(data){
                currentReceipt.receiptTimeOut = data;
              });
            });
            pool.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                }
                transaction.getAllPaymentMethod(connection,user,function(data){
                  currentReceipt.receiptPaymentmethod = data;
                })
            });
            pool.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                }
                transaction.getAllPlateNumber(connection,user,function(data){
                  currentReceipt.receiptPlatenumber = data;
                })
            });
            pool.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                }
                transaction.getAllFee(connection,currentCustomer.currentUsername,function(data){
                  currentReceipt.receiptFee = data;
                })
            });
            pool.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                }
                transaction.getAllDate(connection,currentCustomer.currentUsername,function(data){
                  currentReceipt.receiptDate= data;
                })
            });
            pool.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                }
                transaction.getAllTotalTime(connection,currentCustomer.currentUsername,function(data){
                  currentReceipt.receiptTotaltime = data;
                })
            });
            pool.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                }
                transaction.getAllBuilding(connection,currentCustomer.currentUsername,function(data){
                  currentReceipt.receiptBuilding = data;
                });
            });

            deserializing.currentCustomer = currentCustomer;
            deserializing.currentCar = currentCar;
            deserializing.currentReserve = currentReserve;
            deserializing.currentTransaction = currentTransaction;
            deserializing.currentReceipt = currentReceipt;
            deserializing.stopwatch = stopwatch;
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
                    // columns.forEach(function(column) {
                    //     deserializing.push(column.value);
                    // });
                });
                connection.execSql(request);
              });
        });

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
                            console.log('Logged In username: '+username);
                            console.log('number of row return: '+rowCount);


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

            //start user's timer
            function startUserTimer(){
              req.user.stopwatch.start();
            }
            //stop the stopwatch
            function stopUserTimer(){
              var totalTime = parseInt(req.user.stopwatch.stop()/1000);
              req.user.stopwatch.reset();
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
                    console.log('name : ' + req.user.currentCustomer.currentUsername);
                    return next();
                } else {
                    console.log('user not login');
                    res.redirect('/login');
                }
            }

            // Middleware Check if the user has already reaserved return next()
            function hasReserved(req, res, next) {
                if (req.user.currentCustomer.customerReservable == 1) {
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

//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
//ROUTES
//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
app.get('/', function(req, res){
  res.redirect('/home');
});
app.get('/home',loggedIn, async function(req, res){
    pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
      }
      customer.getReservable(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCustomer.customerReservable = data;
      });
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      customer.getCustomerPicture(connection,req.user.currentCustomer.currentUsername,async function(data){
        req.user.currentCustomer.currentPicture = data;
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
      car.getAllPlateNumber(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCar.currentPlateNumber = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarBrand(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCar.currentBrand = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarModel(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCar.currentModel = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarColor(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCar.currentColor = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllCarPicture(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCar.currentCarPicture = data;
      });
    });
    await sleep(1000);
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      car.getAllPlateProvince(connection,req.user.currentCustomer.currentUsername,function(data){
        req.user.currentCar.currentPlateProvince = data;

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
                            currentUsername: req.user.currentCustomer.currentUsername,
                            currentPicture: req.user.currentCustomer.currentPicture,
                            reservePlatenumber: req.user.currentReserve.reservePlatenumber,
                            reserveBuildingname:req.user.currentReserve.reserveBuildingname,
                            reserveStatus:req.user.currentReserve.reserveStatus
                            });
        // ====================================================================
      });
    });

    feeRate = feeRate(req.user.currentCustomer.currentCustomerType);
    setInterval(async function() {
      console.log('Please wait for check-in/check-out');
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        reserve.getReserveID(connection,req.user.currentCustomer.currentUsername,function(data){
          req.user.currentReserve.reserveId = data;
        });
      });
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        reserve.getTimeIn(connection,req.user.currentReserve.reserveId,function(data){
          req.user.currentReserve.reserveTimein = data;
        });
      });
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        reserve.getTimeOut(connection,req.user.currentReserve.reserveId,function(data){
          req.user.currentReserve.reserveTimeout= data;
        });
      });
      await sleep(500);
      if(req.user.currentReserve.reserveTimein != check && req.user.currentReserve.reserveTimeout == check){
          pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
            }
            reserve.getQRCodeIn(connection,req.user.currentReserve.reserveId,function(data){
                req.user.currentReserve.reserveQRin = data;
                console.log("QR code In =" + req.user.currentReserve.reserveQRin);
            });
          });
          if(req.user.currentReserve.reserveQRin == req.user.currentReserve.reserveId && req.user.currentReserve.reserveStatus != "Checked In"){
              console.log("Checked IN");
              // startUserTimer();
              req.user.stopwatch.start();
              pool.acquire(function (err, connection) {
                if (err) {
                  console.error(err);
                  connection.release();
                }
                req.user.currentReserve.reserveStatus = "Checked In";
                reserve.setReserveStatus(connection,req.user.currentReserve.reserveId,"Checked In");
              });
              isScan = true;
          }
      }
      else if(req.user.currentReserve.reserveTimeout != check){
        pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
            }
            reserve.getQRCodeOut(connection,req.user.currentReserve.reserveId,function(data){
                req.user.currentReserve.reserveQRout = data;
            });
        });
        if(req.user.currentReserve.reserveQRout == req.user.currentTransaction.transactionId && req.user.currentReserve.reserveStatus != "Checked Out"){
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              req.user.currentReserve.reserveIsfull = 0;
              parkingspot.setIsFull(connection,req.user.currentReserve.reserveBuildingname,req.user.currentReserve.reserveFloor,req.user.currentReserve.reserveSlot,0);

            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              req.user.currentCustomer.customerReservable = 1;
              customer.setReservable(connection,req.user.currentCustomer.currentUsername,1);
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              req.user.currentReserve.reserveStatus = "Checked Out";
              reserve.setReserveStatus(connection,req.user.currentReserve.reserveId,req.user.currentReserve.reserveStatus);
            });
            pool.acquire(function (err, connection) {
              if (err) {
                console.error(err);
                connection.release();
              }
              transaction.setTransactionStatus(connection,req.user.currentTransaction.transactionId,"Checked Out");
            });
            isScan = false;
          }
      }
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        req.user.currentReserve.currentTime = parseInt(req.user.stopwatch.read()/1000);
        reserve.setCurrentTime(connection,req.user.currentReserve.reserveId,req.user.currentReserve.currentTime);
      });
      pool.acquire(function (err, connection) {
        if (err) {
          console.error(err);
          connection.release();
        }
        req.user.currentReserve.currentFee = parseInt(req.user.currentReserve.currentTime * feeRate);
        reserve.setCurrentFee(connection,req.user.currentReserve.reserveId,req.user.currentReserve.currentFee);
      });
      console.log(req.user.currentReserve.currentTime);
      console.log(req.user.currentReserve.currentFee);
      console.log(req.user.currentReserve.reserveTimein);
      console.log(req.user.currentReserve.reserveTimeout);
    },5000);
});
app.get('/getthisusername', function(req, res){
  res.send(req.user);
});
app.get('/login', function(req, res){
  res.render('login');
});
app.get('/register', function(req, res){
  res.render('register');
});
app.get('/userinfo', async function(req, res){
  await sleep(5000);
  res.render('userinfo', {
                          //USER INFO
                          currentUsername:req.user.currentCustomer.currentUsername,
                          currentPicture:req.user.currentCustomer.currentPicture,
                          currentEmail:req.user.currentCustomer.currentEmail,
                          currentCustomerType:req.user.currentCustomer.currentCustomerType,
                          currentID:customer.getID(req.user.currentCustomer),
                          currentFirstname:req.user.currentCustomer.currentFirstname,
                          currentLastname:req.user.currentCustomer.currentLastname,
                          //CAR INFO
                          currentCarPicture: req.user.currentCar.currentCarPicture,
                          currentBrand:req.user.currentCar.currentBrand,
                          currentColor:req.user.currentCar.currentColor,
                          currentModel:req.user.currentCar.currentModel,
                          currentPlateNumber:req.user.currentCar.currentPlateNumber,
                          currentPlateProvince:req.user.currentCar.currentPlateProvince,
                          //RECEIPT INFO
                          totalTransaction:req.user.currentTransaction.totalTransaction,
                          receiptFee:req.user.currentReceipt.receiptFee,
                          receiptDate:req.user.currentReceipt.receiptDate,
                          receiptTotaltime:req.user.currentReceipt.receiptTotaltime,
                          receiptBuilding:req.user.currentReceipt.receiptBuilding
                        });
});
//ROUTE TO CAR REGISTER PAGE
app.get('/carregister',loggedIn, function(req, res){
    res.render('carregister');
});
//ROUTE TO EDIT USER
app.get('/edituserinfo', loggedIn, function(req, res){
      res.render('edituserinfo', {currentUsername: req.user.currentCustomer.currentUsername,
                                  currentEmail:req.user.currentCustomer.currentEmail,
                                  currentFirstname:req.user.currentCustomer.currentFirstname,
                                  currentLastname:req.user.currentCustomer.currentLastname,
                                  currentPicture:req.user.currentCustomer.currentPicture
                                });
});


//LOGIN, LOGOUT, REGISTER
app.get('/login', function(req, res){
    res.render('login');
});
app.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/login');
});
app.get('/register', function(req, res){
    res.render('register');
});
app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/home',
    successFlash: 'Successfully logged in',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password',
    session: true
}));
app.post('/register', upload.single('profilePic'),passport.authenticate('local-signup' ,{
    successRedirect: '/login',
    // successFlash: 'You are registered! Please login.',
    failureRedirect: '/register',
    failureFlash: true,
    session: false
}));
//OTHER POST REQUESTS
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
      car.insert_newCar(connection,car_info,req.user.currentCustomer.currentUsername);
      req.user.currentCar.currentPlateNumber.push(car_info.platenumber);
      req.user.currentCar.currentBrand.push(car_info.carbrand);
      req.user.currentCar.currentModel.push(car_info.carmodel);
      req.user.currentCar.currentColor.push(car_info.carcolor);
      req.user.currentCar.currentPlateProvince.push(car_info.plateprovince);
      req.user.currentCar.currentCarPicture.push(car_info.carpicture);
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
      car.removeCar(connection,req.user.currentCustomer.currentUsername,req.user.currentCar.currentPlateNumber[id]);
      delete req.user.currentCar.currentPlateNumber[id];
      delete req.user.currentCar.currentBrand[id];
      delete req.user.currentCar.currentModel[id];
      delete req.user.currentCar.currentColor[id];
      delete req.user.currentCar.currentCarPicture[id];
      delete req.user.currentCar.currentPlateProvince[id];
      req.user.currentCar.currentPlateNumber = req.user.currentCar.currentPlateNumber.filter(function( element ) {
        return element !== undefined;
      });
      req.user.currentCar.currentBrand = req.user.currentCar.currentBrand.filter(function( element ) {
        return element !== undefined;
      });
      req.user.currentCar.currentModel = req.user.currentCar.currentModel.filter(function( element ) {
        return element !== undefined;
      });
      req.user.currentCar.currentColor = req.user.currentCar.currentColor.filter(function( element ) {
        return element !== undefined;
      });
      req.user.currentCar.currentCarPicture = req.user.currentCar.currentCarPicture.filter(function( element ) {
        return element !== undefined;
      });
      req.user.currentCar.currentPlateProvince = req.user.currentCar.currentPlateProvince.filter(function( element ) {
        return element !== undefined;
      });
      req.flash('success', 'Your car has been deleted');
      res.redirect('/userinfo');
  });

},autoReap);
app.post('/edituserinfo',loggedIn,upload.single('profilePic'),function(req,res){
  console.log('Trying to edit profile');
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    var encode_image;
    if(!req.file || !req.file.path){
      var encode_image = req.user.currentCustomer.currentPicture;
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
    customer.editCustomer(connection,req.user.currentCustomer.currentUsername,edited_info);
    req.user.currentCustomer.currentEmail = edited_info.email;
    req.user.currentCustomer.currentFirstname = edited_info.firstname;
    req.user.currentCustomer.currentLastname = edited_info.lastname;
  });
  pool.acquire(function (err, connection) {
    if (err) {
      console.error(err);
      connection.release();
    }
    customer.getCustomerPicture(connection,req.user.currentCustomer.currentUsername,async function(data){
      req.user.currentCustomer.currentPicture = data;
        res.redirect('/userinfo');
    })
  });
  req.flash('success', 'Your information has been changed.');

},autoReap);













app.listen(3000, process.env.IP, function(){
    console.log('New Park King Server is running on port 3000.....');
});
