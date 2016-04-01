/**
 * Created by lamppostgroup on 3/16/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var User = require('./user');

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

//var user = new User(req.body);
//user.save(function (err, user) { //this user.save method is making all
//    if (err) {
//        console.log(err);
//        return res.send(err);
//    }
//    res.send(user);
//});
//  });
//console.log(existUser);
//if (existUser) {
//    var errMsg = document.getElementById('signErr');
//    errMsg.innerHTML = "User already has account"
//}
//else {
// }

app.post('/login', function (req, res) {
    User.find(req.body, 'name', function (err, user) {
        console.log(err, user);
        res.send(user);
    })
});

//app.post('/');

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
