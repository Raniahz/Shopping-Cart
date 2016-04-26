/**
 * Created by lamppostgroup on 3/16/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
require('./models/user');
require('./models/session');
var swig = require('swig');
//require('./controllers/dashUsers');


//var template = swig.compileFile('./views/layout.html');
var cookieParser = require('cookie-parser');
//var signup = require('./models/formValidation.js');
//var sessUser = require('./models/sessUser.js');
//var fs = require('fs');
//db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');

//var dir = './models';
//fs.readdirSync(dir).forEach(function (folder) {
//    require(dir + '/' + folder + '/model');
//});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
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

require('./routes.js')(app);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});