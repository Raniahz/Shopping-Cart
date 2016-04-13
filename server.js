/**
 * Created by lamppostgroup on 3/16/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/user');
var SessionUser = require('./models/session');
var swig = require('swig');
var template = swig.compileFile('./views/layout.html');
var cookieParser = require('cookie-parser');
db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');

//setTimeout(function () {
//    var http = require('http');
//    var querystring = require('querystring');
//    var postData = querystring.stringify({ // makes posts string from object
//        'time': 1,
//        'day': 2
//    });
//    var options = { //options that indicate where to post
//        host: 'localhost',
//        port: 3000,
//        path: '/test',
//        method: 'POST',
//        headers: {
//            'x-rania': 'true',
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Content-Length': postData.length
//        }
//    };
//    var postreq = http.request(options, function (res) { //set up request
//        res.setEncoding('utf8');
//        res.on('data', function (data) { // is called when there is a chunk of data
//            console.log('Response:' + data);
//        });
//        res.on('end', function () { // calls when connection is closed
//            console.log('no more data in response')
//        })
//    });
//    postreq.write(postData); //post the actual data
//    postreq.end();
//}, 2000);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
//app.post('/test', function (req, res) {
//    console.log(req.headers);
//    console.log(req.body);
//    res.send('ok');
//});
//app.get('/test', function (req, res) {
//});

app.use(function (req, res, next) { // ----CORS to override
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookieParser());
app.engine('html', swig.renderFile); // set sup view engine
app.set('view engine', 'html');
app.set('views', __dirname + '/');
app.set('view cache', false);
swig.setDefaults({cache: false});

app.get('/', function (req, res) {
    SessionUser.findOne({}, function (err, sessionUser) {
            console.log('ses', sessionUser);
            if (err) {
                console.log(err);
            }
            if (sessionUser == null) {
                console.log('sessUser is null');
                res.render('./views/index', {});
                return
            }
            User.findOne({_id: sessionUser.user}, function (err, user) {
                if (err) {
                    console.log(err);
                }
                console.log(' look here ', user);
                res.render('./views/index', {user: user})
            })
        }
    )
});
app.get('/index', function (req, res) {
    console.log(req.body);
    res.render('./views/index', {})
});
app.get('/signup', function (req, res) {
    res.render('./views/signup', {})
});
app.get('/login', function (req, res) {
    res.render('./views/login', {})
});
app.get('/about', function (req, res) {
    res.render('./views/about', {})
});
app.get('/contact', function (req, res) {
    res.render('./views/contact', {})
});
app.get('/cars', function (req, res) {
    res.render('./views/cars', {})
});
app.get('/food', function (req, res) {
    res.render('./views/food', {})
});
app.get('/movies', function (req, res) {
    res.render('./views/movies', {})
});
app.get('/music', function (req, res) {
    res.render('./views/music', {})
});


app.post('/signup', function (req, res) {
    console.log('req body', req.body);
    //var userString = JSON.stringify(req.body);
    //// res.send(req.cookies.user);
    //console.log('right before cookie is made');
    //res.cookie('user', userString);
    //console.log('cookies', req.cookies);

    var nameRes = validateName();
    var emailRes = validateEmail();
    var mobileRes = validateMobile();
    var ageRes = validateAge();
    var genderRes = validateGender();
    var passRes = validatePassword();
    var rePassRes = validateRepassword();

    User.findOne({email: req.body.email}, function (err, user) {
        if (user) {
            console.log('existing user');
            return res.render('./views/signup', {
                emailErr: 'existing email',
                body: req.body
            });
        }
        console.log('not existing user');
        user = new User(req.body);
        user.save(function (err, user) { //this user.save method is making all
            if (err) {
                return res.render(err);
            }
            return res.redirect('/login');
        });
    });
});

app.post('/login', function (req, res) {
    var query = {
        email: req.body.email,
        password: req.body.password
    };
    User.find(query, function (err, user) {
        res.send(user);
        console.log('user', user);

        var sessUser = new SessionUser();
        sessUser.user = user[0]._id;
        sessUser.save(function (err, user) {
            if (err) {
                return console.log(err);
            }
            console.log('new', user);
        })
    })
});
app.post('/logout', function (req, res) {
    console.log(req.body);
    SessionUser.remove({user: req.body._id}, function (err) {
        if (err) {
            return res.send(err);
        }
        console.log('response');
        res.sendStatus(200);
    })

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
