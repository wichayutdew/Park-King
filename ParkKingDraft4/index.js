//NPM REQUIRE
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
<<<<<<< HEAD
//app.use(CookieParser());
//===================================================================================================================================================
//          Passport Config
//===================================================================================================================================================

    passport.serializeUser(function(user, done) {
        console.log('serializer');
        done(null, user[4]);
    });
    passport.deserializeUser(function(id, done) {
      console.log('deserializer')
        connection.on('connect',function(err){
            if(err){
                console.log(err);
            }else{
            }
        });
        deserializer(id,done);

    });
    function deserializer(username,done){
        var request = new Request(
            "SELECT * FROM dbo.Customer WHERE Username = @username",
            function(err,rows){
                //done(err,rows[0]);
            }
        );
        //set parameterized query
        request.addParameter('email',TYPES.VarChar,username);
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
          profilePic: req.body.profilePic,
        };
        var request = new Request(
            "SELECT * FROM dbo.Customer WHERE Username = @username",
            function (err, rowCount, rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (customer_info.password!=customer_info.passportCheck){
                    return done(null,false);
                    console.log('password does not match')
                }
                if (rows.length != 0) {
                    return done(null, false);
                    console.log('this email is already taken');
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
        request.addParameter('username',TYPES.VarChar,req.body.username);
        request.addParameter('password',TYPES.VarChar,req.body.password);

        request.on('requestCompleted', function () {

        });

        connection.execSql(request);

    }
    function insert_newCustomer(customer_info,done){
        var request = new Request("INSERT INTO dbo.Customer (FirstName,LastName,Email,Username,Password,customerType,studentID,professorID,CitizenID,profilePic) values (@firstName,@lastName,@email,@username,@password,@occupation,@studentID,@professorID,@CitizenID,@profilePic)",
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
        request.addParameter('profilePic',TYPES.image,customer_info.profilePic);

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
=======
>>>>>>> 137e633c60fca234baf74ccd468c3dd7fbdfe332


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

//ROUTE TO LOGIN PAGE
app.get('/login', function(req, res){
    res.render('login');
});

//ROUTE TO TEMPORARY PAGE
app.get('/temp', function(req, res){
    res.render('temp');
});


<<<<<<< HEAD
//when login button click
app.post('/login',passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    session: false
  }));
app.post('/register',passport.authenticate('local-signup',{
    successRedirect: '/login',
    failureRedirect: '/register',
    session: false
  }));
=======
>>>>>>> 137e633c60fca234baf74ccd468c3dd7fbdfe332

app.listen(3000, process.env.IP, function(){
    console.log('Park King Server is running on port 3000.....');
});
