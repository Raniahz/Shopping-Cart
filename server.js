/**
 * Created by lamppostgroup on 3/16/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');

var User = require('./user');
var SessionUser = require('./session');


app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) { // ----CORS to override
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/singup', function (req, res) {
    console.log(req.body);
    User.findOne({email: req.body.email}, function (err, user) {
        if (user) {
            console.log('existing user');
            res.send({
                error: true,
                message: 'email already exists',
                field: 'errEmail'
            });
            return;
        }
        console.log('not existing user');
        user = new User(req.body);
        user.save(function (err, user) { //this user.save method is making all
            if (err) {
                return res.send(err);
            }
            res.send({
                error: false,
                message: 'success'
            });
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
                console.log(err);
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
