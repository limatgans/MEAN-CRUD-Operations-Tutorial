require('rootpath')();
var express = require('express');
var app = express();
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');
var cors = require('cors');

app.use(cors());

//db Connection
var monk = require('monk');
var db = monk('mongodb://localhost:27017/crud');

// start server
var server = app.listen(3003, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
    //console.dir(db);
    //console.dir(form);
    //console.dir(app.use('/form', form));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
// // use JWT auth to secure the api
// app.use('/api', expressJwt({ secret: config.secret }));

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});


// routes

var form = require('./routes/form');
var view = require('./routes/view');
var findemail = require('./routes/findemail');
var del = require('./routes/delete.js');
var update = require('./routes/update.js');

//use the files based on the request
app.use('/form', form);
app.use('/view', view);
app.use('/findemail', findemail);
app.use('/delete', del);
app.use('/update', update);


// make '/form' default route
app.get('/', function (req, res) {
    return res.redirect('/form');
});

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');


// app.use('/login', require('./controllers/login.controller'));
// app.use('/register', require('./controllers/register.controller'));
// app.use('/app', require('./controllers/app.controller'));
// app.use('/api/users', require('./controllers/api/users.controller'));




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });

// Error Handlers

// development error handler
// will print stacktrace

// if (app.get('env') === 'development') {
    // app.use(function (err, req, res, next) {
    //     console.log("Error occurred in node message: " + err.message);
    //     console.log("Error occurred in node: " + err);
    //     res.status(err.status || 500);
    //     // res.send('error', {
    //     //     message: err.message,
    //     //     error: err
    //     // });
    // });
// }

// production error handler no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     console.log("Error occurred in node message: " + err.message);
//     console.log("Error occurred in node: " + err);
//     res.status(err.status || 500);
//     res.send('error', {
//         message: err.message,
//         error: {}
//     });
// });