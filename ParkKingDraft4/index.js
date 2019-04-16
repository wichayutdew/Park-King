//require Customer.js file
var currentUsername,currentEmail,currentFirstname,currentLastname,currentCustomerType,currentID,currentPicture,cancelTime;
const customer = require('./Customer.js');
//require Car.js file
var currentPlateNumber=[],currentBrand=[],currentModel=[],currentColor=[],currentCarPicture=[];
const car = require('./Car.js');
//require ParkingSpot.js file
var totalArtsFreeSpot,totalPoliFreeSpot,lowestFloorArts,lowestSlotArts,lowestFloorPoli,lowestSlotPoli;
const parkingspot = require('./ParkingSpot.js');
//require Building.js file
var artsCapacity, poliCapacity;
const building = require('./Building.js');

var exceedReservetime = false;
const reserve = require('./Reserve.js');

//const transaction = require('./TransactionReceipt.js');

//NPM REQUIRE
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//create temp storage
const multer = require('multer');
//auto delete image after upload
const autoReap  = require('multer-autoreap');
const fs = require('fs');
const path = require('path');

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

app.use(require('express-session')({
    secret: "Fuck You",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
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
// var Stopwatch = require('statman-stopwatch');
// var stopwatch = new Stopwatch();
// var elaspedInterval = 0;
// var arriveTimeout = 0;
// var leftTimeout = 0;
// startUserTimer();
// userCurrentTime();
// setTimeout(stopUserTimer,5000);

//How to start stopwatch for each reserveid or username?????????

//start user's timer
// function startUserTimer(){
//   stopwatch.start();
// }
//
// //show elasped time
// function userCurrentTime() {
//   elaspedInterval = setInterval(function() {
//     var time = parseInt(stopwatch.read()/1000);
//     var hours = ~~(time / 3600);
//     var min = ~~((time % 3600) / 60);
//     var sec = time % 60;
//     console.log(hours+":"+min+":"+sec);
//   },1000);
// }
//
// //stop the stopwatch
// function stopUserTimer(){
//   var totalTime = parseInt(stopwatch.read()/1000);
//   clearInterval(elaspedInterval);
//   stopwatch.stop();
//   return totalTime;
// }
//
// //make countdown timer in seconds if finish return false
// function countdownTimer(seconds){
//   var timeout = false;
//   var countdownInterval =  setInterval(function () {
//         duration --;
//         //console.log(duration);
//         if(duration <= 0){
//           clearInterval(countdownInterval);
//           timeout = true;
//         }
//     }, 1000);
//     return timeout;
// }
//
// //get current time in hr:min:sec format
// function getCurrentTime(){
//   var today = new Date();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   return time;
// }

// //check log-in state
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
        console.log('name : '+req.user[1] )
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
function Reserve(floor,slot,buildingName,plateNumber,username,QRin,QRout,Timein,Timeout,reserveid,haspaid,connection){
  var request = new Request(
      "INSERT INTO dbo.Reserve(PlateNumber,Username,Floor,Slot,BuildingName,QRCodeIn,QRCodeOut,Time_In,Time_Out,reserveID,hasPaid) VALUES (@PlateNumber,@Username,@Floor,@Slot,@BuildingName,@QRCodeIn,@QRCodeOut,@Time_In,@Time_Out,@reserveID,@hasPaid)",
      function(err, rowCount, rows){

          if(err){
              console.log(err);
              connection.release();
              return;
          }else{
              console.log('!!!Parking spot reserved!!!');
              connection.release();
              return ;
          }
  });
  request.addParameter('PlateNumber',TYPES.VarChar,plateNumber);
  request.addParameter('Username',TYPES.VarChar,username);
  request.addParameter('Floor',TYPES.VarChar,floor);
  request.addParameter('Slot',TYPES.VarChar,slot);
  request.addParameter('BuildingName',TYPES.VarChar,buildingName);
  request.addParameter('QRCodeIn',TYPES.VarChar,QRin);
  request.addParameter('QRCodeOut',TYPES.VarChar,QRout);
  request.addParameter('Time_In',TYPES.VarChar,Timein);
  request.addParameter('Time_Out',TYPES.VarChar,Timeout);
  request.addParameter('reserveID',TYPES.VarChar,reserveid);
  request.addParameter('hasPaid',TYPES.Bit,haspaid);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}
function UpdateParkingspot(floor,slot,buildingName,connection){
  var request = new Request(
      "UPDATE dbo.ParkingSpot SET isFull=1 WHERE dbo.ParkingSpot.Floor=@Floor AND dbo.ParkingSpot.Slot=@Slot AND dbo.ParkingSpot.BuildingName=@BuildingName" ,
      function(err, rowCount, rows){

          if(err){
              console.log(err);
              connection.release();
              return;
          }else{
              //connection.release();
              console.log('!!!Parking spot updated!!!');
              connection.release();
              return;
          }
  });
  request.addParameter('Floor',TYPES.VarChar,floor);
  request.addParameter('Slot',TYPES.VarChar,slot);
  request.addParameter('BuildingName',TYPES.VarChar,buildingName);


  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}
function UpdateCustomer(username,connection){
  var request = new Request(
      "UPDATE dbo.Customer SET Reserveable=0 WHERE dbo.Customer.Username = @Username" ,
      function(err, rowCount, rows){

          if(err){
              console.log(err);
              connection.release();
              return;
          }else{
              console.log('!!!Customer updated!!!');
              connection.release();
              return;
          }
  });
  request.addParameter('Username',TYPES.VarChar,username);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}




//=======================================================
// ROUTES
//=======================================================

//ROUTE TO HOME PAGE
app.get('/',loggedIn, function(req, res){
    res.redirect('/home');
});
app.get('/logout',loggedIn,function(req, res){
  req.logout();
  res.redirect('/login');
});
app.get('/home',loggedIn, function(req, res){
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
      building.getBuildingCapacity(connection,'buildingArts',async function(data){
        artsCapacity = data;
      })
    });
    pool.acquire(function (err, connection) {
      if (err) {
        console.error(err);
        connection.release();
      }
      building.getBuildingCapacity(connection,'buildingPoli',async function(data){
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
        res.render('home', {lowestFloorArts:lowestFloorArts,
                            lowestSlotArts:lowestSlotArts,
                            artsCapacity:artsCapacity,
                            poliCapacity:poliCapacity,
                            lowestFloorPoli:lowestFloorPoli,
                            lowestSlotPoli:lowestSlotPoli,
                            totalArtsFreeSpot:totalArtsFreeSpot,
                            totalPoliFreeSpot:totalPoliFreeSpot,
                            currentUsername: req.user[0],
                            currentPicture: currentPicture});
      });
    });

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
    customer.getCustomerPicture(connection,req.user[0],function(data){
      currentPicture = data;
    })
    res.render('reserve', {currentUsername: req.user[0],currentPicture: currentPicture});
  });
});

//ROUTE TO QR CODE PAGE
app.get('/showqr',loggedIn, function(req, res){
  var qrCode = 'TEST';
  res.render('showqr', {qrCode:qrCode,currentUsername: req.user[0],currentPicture: currentPicture});
});

//ROUTE TO STATUS
app.get('/status',loggedIn, function(req, res){
  res.render('status', {currentUsername: req.user[0],currentPicture: currentPicture});
});

//ROUTE TO USER INFO
app.get('/userinfo', loggedIn, function(req, res){
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
       res.render('userinfo', {currentCarPicture: currentCarPicture,
                              currentBrand:currentBrand,
                              currentColor:currentColor,
                              currentModel:currentModel,
                              currentPlateNumber: currentPlateNumber,
                              currentUsername: req.user[0],
                              currentEmail:currentEmail,
                              currentFirstname:currentFirstname,
                              currentLastname:currentLastname,
                              currentCustomerType:currentCustomerType,
                              currentID:customer.getID(req.user),
                              currentPicture:currentPicture});
     })
   });
});

//ROUTE TO EDIT USER
app.get('/edituserinfo', loggedIn, function(req, res){
      res.render('edituserinfo', {currentUsername: req.user[0],
                             currentEmail:currentEmail,
                             currentFirstname:currentFirstname,
                             currentLastname:currentLastname,
                             currentCustomerType:currentCustomerType,
                             currentStudentID:req.user[6],
                             currentProfessorID:req.user[7],
                             currentNationalID:req.user[8],
                             currentPicture:currentPicture
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

app.get('/receipt',loggedIn, function(req, res){
    res.render('receipt');
});

app.post('/reserve',async function(req,res){
  console.log('---Reserve process begin---');

  //---------testing dataset------------
  //need to replace with req.body.parameter!!!
  var car=['5555','x'];
  var buildingSlected='buildingPoli';
  //------------------------------------

  var reserve_info = [];
  var reserve_status = false;

  //Check validity and reserve parking spot
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      if(req.user[11]=0){
          console.log('your accout is decline to reserve')
          connection.release();
          res.redirect('/home');
      }

      var request = new Request(
        "SELECT p.Floor,p.slot,p.BuildingName,c.PlateNumber,c.Username FROM (SELECT MIN( Slot ) slot,Floor,BuildingName FROM dbo.ParkingSpot WHERE dbo.ParkingSpot.BuildingName=@Building AND dbo.ParkingSpot.isfull= @bit0 AND dbo.ParkingSpot.Sensor=@bit1 GROUP BY Floor,BuildingName) p,(SELECT PlateNumber,Username FROM dbo.Car WHERE dbo.Car.PlateNumber = @PlateNumber AND dbo.Car.Username = @Username) c",
          //"SELECT Floor,MIN(Slot),BuildingName,isFull,Sensor,PlateNumber,Username FROM dbo.ParkingSpot,dbo.Car WHERE (dbo.ParkingSpot.BuildingName=@Building AND dbo.ParkingSpot.isfull= @bit0 AND dbo.ParkingSpot.Sensor=@bit1) OR (dbo.Car.PlateNumber = @PlateNumber AND dbo.Car.Username = @Username) GROUP BY Floor,BuildingName,isFull,Sensor,PlateNumber,Username",
          //"SELECT Floor,MIN(Slot),BuildingName,isFull,Sensor FROM dbo.ParkingSpot WHERE dbo.ParkingSpot.isfull= @bit0 AND dbo.ParkingSpot.Sensor=@bit1 GROUP BY Floor,BuildingName,isFull,Sensor UNION ALL SELECT PlateNumber,Username,CarBrand,CarModel,CarColor FROM dbo.Car WHERE dbo.Car.PlateNumber = @PlateNumber AND dbo.Car.Username = @Username",
          function(err, rowCount, rows){

              if(err){
                  console.log(err);
                  connection.release();
                  res.redirect('/reserve');
              }
              if (buildingState == null){
                  console.log('No parking spot in this building...');
                  connection.release();
                  res.redirect('/reserve');
              }else{
                  //console.log('Spot available : '+ buildingState);
                  var reserveId = generateTokenID();
                  reserve_info = buildingState;
                  reserve_status = true;

                  Reserve(buildingState[0], buildingState[1], buildingState[2], buildingState[3], buildingState[4], null, null, null, null, reserveId, 0,connection);
                  console.log('reserved');
              }

      });
      request.addParameter('PlateNumber',TYPES.VarChar,car[0]);
      request.addParameter('Username',TYPES.VarChar,car[1]);
      request.addParameter('Building',TYPES.VarChar,buildingSlected);
      request.addParameter('bit0',TYPES.Bit,false);
      request.addParameter('bit1',TYPES.Bit,true);

      var buildingState =[];
      request.on('row', function (columns) {
          columns.forEach(function(column) {
              buildingState.push(column.value);
          });
          //console.log(login_request + 'info');
      });

      request.on('Done',function(err, rowCount, rows){
      });

      connection.execSql(request);
  });

  //wait for insert request
  await sleep(3000);
  console.log('reserve status');
  console.log(reserve_info);
  console.log(reserve_status);
  //update parking spot
  pool.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        connection.release();
        return;
    }
    if(reserve_status){
       UpdateParkingspot(reserve_info[0], reserve_info[1], reserve_info[2],connection);

    }else{
      connection.release();
      console.log('update parking spot failed');
      return;
    }
  });
  //update customer
  pool.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        connection.release();
        return;
    }
    if(reserve_status){
       UpdateCustomer(reserve_info[4],connection);
    }else{
      connection.release();
      console.log('update customer spot failed');
      return;
    }
  });

  //wait for update request
  await sleep(1000);
  console.log('!!!Reserve process completed!!!');
  res.redirect('home');
});

app.post('/cancel',function(req,res){
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
      console.log('You cannot cancel the reserve')
      connection.release();
      res.redirect('/home');
  }else{
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        //find reserveid
        reserve.removeReserve(connection,reserveid);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        customer.setCancel(connection,req.user[0],cancelTime+1);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        //find reserveid,buildingname,floor,slot
        parkingspot.setIsFull(connection,buildingname,floor,slot,'0');
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            connection.release();
            return;
        }
        if(cancelTime > 5){
            console.log('Too much cancel, you are banned')
            connection.release();
            customer.setResevable(connection,req.user[0],'0');
            res.redirect('/home');
        }
        res.render('/home')
    });
  }
});

app.post('/pay',function(req,res){
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      var transactionid = generateTokenID();
      var totaltime = 100;
      var parkingFee = 20;
      var paymentmethod = 'Kbank';
      var date = transaction.getCurrentDate();
      transaction.Transaction(connection,platenumber,req.user[0],floor,slot,buildingname,transactionid,parkingFee,paymentmethod,totaltime,date);
  });
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      reserve.setHasPaid(connection,reserveid,'1');
      res.render('/showqr')
  });
});

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
        carpicture:encode_image,
      };
      //console.log(car_info);
      car.insert_newCar(connection,car_info,req.user[0]);
      currentPlateNumber.push(car_info.platenumber);
      currentBrand.push(car_info.carbrand);
      currentModel.push(car_info.carmodel);
      currentColor.push(car_info.carcolor);
      currentCarPicture.push(car_info.carpicture);
  });
  res.render('userinfo', {currentCarPicture: currentCarPicture,
                         currentBrand:currentBrand,
                         currentColor:currentColor,
                         currentModel:currentModel,
                         currentPlateNumber: currentPlateNumber,
                         currentUsername: req.user[0],
                         currentEmail:currentEmail,
                         currentFirstname:currentFirstname,
                         currentLastname:currentLastname,
                         currentCustomerType:currentCustomerType,
                         currentID:customer.getID(req.user),
                         currentPicture:currentPicture});
},autoReap);

app.post('/deletecar/:id',loggedIn,function(req,res){
  var id = req.params.id;
  pool.acquire(function (err, connection) {
      if (err) {
          console.error(err);
          connection.release();
          return;
      }
      delete currentPlateNumber[id];
      delete currentBrand[id];
      delete currentModel[id];
      delete currentColor[id];
      delete currentCarPicture[id];
      car.removeCar(connection,req.user[0],currentPlateNumber[id]);
  });
  res.redirect('/userinfo');
},autoReap);

// app.post('/deletecar1',loggedIn,function(req,res){
//   console.log('Trying to delete car');
//   pool.acquire(function (err, connection) {
//       if (err) {
//           console.error(err);
//           connection.release();
//           return;
//       }
//       car.removeCar(connection,req.user[0],platenumber[0]);
//   });
// });
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
      customertype: req.body.occupation,
      studentID: req.body.studentID,
      professorID: req.body.professorID,
      nationalID: req.body.NationalID,
      CustomerPicture: encode_image,
    };
    customer.editCustomer(connection,req.user[0],edited_info);
    currentEmail = edited_info.email;
    currentFirstname = edited_info.firstname;
    currentLastname = edited_info.lastname;
    currentCustomerType = edited_info.customertype;
    currentID =customer.getID(req.user);
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
  res.render('userinfo', {currentCarPicture: currentCarPicture,
                         currentBrand:currentBrand,
                         currentColor:currentColor,
                         currentModel:currentModel,
                         currentPlateNumber: currentPlateNumber,
                         currentUsername: req.user[0],
                         currentEmail:currentEmail,
                         currentFirstname:currentFirstname,
                         currentLastname:currentLastname,
                         currentCustomerType:currentCustomerType,
                         currentID:customer.getID(req.user),
                         currentPicture:currentPicture});
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
    session: false,
}));

app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
