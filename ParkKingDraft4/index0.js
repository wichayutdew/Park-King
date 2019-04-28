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
passport.deserializeUser(async function(user, done) {
        console.log('deserializer')
        var deserializing=[];

        pool.acquire(function (err, connection) {
            if (err) {
              console.error(err);
              connection.release();
              return;
            }
            var request = new Request(
                "SELECT * FROM dbo.Customer,dbo.Car,dbo.Reserve,dbo.TransactionReceipt WHERE dbo.Customer.Username = @username AND dbo.Car.Username = @username AND dbo.Reserve.Username = @username AND dbo.TransactionReceipt.Username = @username",
                function(err,rows){
                    if(err){
                        connection.release();
                        return done(err);
                    }
                    console.log(deserializing);
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


function loggedIn(req, res, next) {
                if (req.user) {
                    console.log('user in login state');
                    //console.log('name : ' +req.user.Customer.Username);
                    return next();
                } else {
                    console.log('user not login');
                    res.redirect('/login');
                }
            }

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

//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
//ROUTES TO REGISTER PAGE
//------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//

app.get('/home',loggedIn, async function(req, res){
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //       console.error(err);
    //       connection.release();
    //   }
    //   customer.getReservable(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCustomer.customerReservable = data;
    //   });
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   customer.getCustomerPicture(connection,req.user.currentCustomer.currentUsername,async function(data){
    //     req.user.currentCustomer.currentPicture = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getTotalSpot(connection,'buildingArts',async function(data){
    //     artsCapacity = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getTotalSpot(connection,'buildingPoli',async function(data){
    //     poliCapacity = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getTotalFreeSpot(connection,'buildingArts',async function(data){
    //     totalArtsFreeSpot = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getTotalFreeSpot(connection,'buildingPoli',async function(data){
    //     totalPoliFreeSpot = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getLowestFloor(connection,'buildingArts',async function(data){
    //     lowestFloorArts = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getLowestSlot(connection,'buildingArts',async function(data){
    //     lowestSlotArts = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getLowestFloor(connection,'buildingPoli',async function(data){
    //     lowestFloorPoli = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   parkingspot.getLowestSlot(connection,'buildingPoli',async function(data){
    //     lowestSlotPoli = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   car.getAllPlateNumber(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCar.currentPlateNumber = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   car.getAllCarBrand(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCar.currentBrand = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   car.getAllCarModel(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCar.currentModel = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   car.getAllCarColor(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCar.currentColor = data;
    //   })
    // });
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   car.getAllCarPicture(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCar.currentCarPicture = data;
    //   });
    // });
    // await sleep(1000);
    // pool.acquire(function (err, connection) {
    //   if (err) {
    //     console.error(err);
    //     connection.release();
    //   }
    //   car.getAllPlateProvince(connection,req.user.currentCustomer.currentUsername,function(data){
    //     req.user.currentCar.currentPlateProvince = data;
    //
    //     // ====================================================================
    //     // rendering home page
    //     res.render('home', {lowestFloorArts:lowestFloorArts,
    //                         lowestSlotArts:lowestSlotArts,
    //                         artsCapacity:artsCapacity,
    //                         poliCapacity:poliCapacity,
    //                         lowestFloorPoli:lowestFloorPoli,
    //                         lowestSlotPoli:lowestSlotPoli,
    //                         totalArtsFreeSpot:totalArtsFreeSpot,
    //                         totalPoliFreeSpot:totalPoliFreeSpot,
    //                         currentUsername: req.user.currentCustomer.currentUsername,
    //                         currentPicture: req.user.currentCustomer.currentPicture,
    //                         reservePlatenumber: req.user.currentReserve.reservePlatenumber,
    //                         reserveBuildingname:req.user.currentReserve.reserveBuildingname,
    //                         reserveStatus:req.user.currentReserve.reserveStatus
    //                         });
    //     // ====================================================================
    //   });
    // });
    //
    // feeRate = feeRate(req.user.currentCustomer.currentCustomerType);
    // setInterval(async function() {
    //   console.log('Please wait for check-in/check-out');
    //   pool.acquire(function (err, connection) {
    //     if (err) {
    //       console.error(err);
    //       connection.release();
    //     }
    //     reserve.getReserveID(connection,req.user.currentCustomer.currentUsername,function(data){
    //       req.user.currentReserve.reserveId = data;
    //     });
    //   });
    //   console.log(req.user.currentReserve.reserveId);
    //   pool.acquire(function (err, connection) {
    //     if (err) {
    //       console.error(err);
    //       connection.release();
    //     }
    //     reserve.getTimeIn(connection,req.user.currentReserve.reserveId,function(data){
    //       req.user.currentReserve.reserveTimein = data;
    //     });
    //   });
    //   pool.acquire(function (err, connection) {
    //     if (err) {
    //       console.error(err);
    //       connection.release();
    //     }
    //     reserve.getTimeOut(connection,req.user.currentReserve.reserveId,function(data){
    //       req.user.currentReserve.reserveTimeout= data;
    //     });
    //   });
    //   await sleep(500);
    //   if(req.user.currentReserve.reserveTimein != check && req.user.currentReserve.reserveTimeout == check){
    //       pool.acquire(function (err, connection) {
    //         if (err) {
    //           console.error(err);
    //           connection.release();
    //         }
    //         reserve.getQRCodeIn(connection,req.user.currentReserve.reserveId,function(data){
    //             req.user.currentReserve.reserveQRin = data;
    //             console.log("QR code In =" + req.user.currentReserve.reserveQRin);
    //         });
    //       });
    //       if(req.user.currentReserve.reserveQRin == req.user.currentReserve.reserveId && req.user.currentReserve.reserveStatus != "Checked In"){
    //           console.log("Checked IN");
    //           // startUserTimer();
    //           req.user.stopwatch.start();
    //           pool.acquire(function (err, connection) {
    //             if (err) {
    //               console.error(err);
    //               connection.release();
    //             }
    //             req.user.currentReserve.reserveStatus = "Checked In";
    //             reserve.setReserveStatus(connection,req.user.currentReserve.reserveId,req.user.currentReserve.reserveStatus);
    //           });
    //           isScan = true;
    //       }
    //   }
    //   // else if(req.user.currentReserve.reserveTimeout != check){
    //   //   pool.acquire(function (err, connection) {
    //   //       if (err) {
    //   //         console.error(err);
    //   //         connection.release();
    //   //       }
    //   //       reserve.getQRCodeOut(connection,req.user.currentReserve.reserveId,function(data){
    //   //           req.user.currentReserve.reserveQRout = data;
    //   //       });
    //   //   });
    //   //   if(req.user.currentReserve.reserveQRout == req.user.currentTransaction.transactionId && req.user.currentReserve.reserveStatus != "Checked Out"){
    //   //       pool.acquire(function (err, connection) {
    //   //         if (err) {
    //   //           console.error(err);
    //   //           connection.release();
    //   //         }
    //   //         req.user.currentReserve.reserveIsfull = 0;
    //   //         parkingspot.setIsFull(connection,req.user.currentReserve.reserveBuildingname,req.user.currentReserve.reserveFloor,req.user.currentReserve.reserveSlot,0);
    //   //
    //   //       });
    //   //       pool.acquire(function (err, connection) {
    //   //         if (err) {
    //   //           console.error(err);
    //   //           connection.release();
    //   //         }
    //   //         req.user.currentCustomer.customerReservable = 1;
    //   //         customer.setReservable(connection,req.user.currentCustomer.currentUsername,1);
    //   //       });
    //   //       pool.acquire(function (err, connection) {
    //   //         if (err) {
    //   //           console.error(err);
    //   //           connection.release();
    //   //         }
    //   //         req.user.currentReserve.reserveStatus = "Checked Out";
    //   //         reserve.setReserveStatus(connection,req.user.currentReserve.reserveId,req.user.currentReserve.reserveStatus);
    //   //       });
    //   //       pool.acquire(function (err, connection) {
    //   //         if (err) {
    //   //           console.error(err);
    //   //           connection.release();
    //   //         }
    //   //         transaction.setTransactionStatus(connection,req.user.currentTransaction.transactionId,"Checked Out");
    //   //       });
    //   //       isScan = false;
    //   //     }
    //   // }
    //   pool.acquire(function (err, connection) {
    //     if (err) {
    //       console.error(err);
    //       connection.release();
    //     }
    //     req.user.currentReserve.currentTime = parseInt(req.user.stopwatch.read()/1000);
    //     reserve.setCurrentTime(connection,req.user.currentReserve.reserveId,req.user.currentReserve.currentTime);
    //   });
    //   pool.acquire(function (err, connection) {
    //     if (err) {
    //       console.error(err);
    //       connection.release();
    //     }
    //     req.user.currentReserve.currentFee = parseInt(req.user.currentReserve.currentTime * feeRate);
    //     reserve.setCurrentFee(connection,req.user.currentReserve.reserveId,req.user.currentReserve.currentFee);
    //   });
    //   console.log(req.user.currentReserve.currentTime);
    //   console.log(req.user.currentReserve.currentFee);
    //   console.log(req.user.currentReserve.reserveTimein);
    //   console.log(req.user.currentReserve.reserveTimeout);
    // },5000);
    res.render('home');
});

//LOGIN, LOGOUT, REGISTER
app.get('/login', function(req, res){
    res.render('login');
});
app.get('/logout',loggedIn,function(req, res){
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














app.listen(3000, process.env.IP, function(){
    console.log('New Park King Server is running on port 3000.....');
});
