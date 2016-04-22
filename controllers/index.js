//incoming is req.
var mongoose = require('mongoose');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');

var getUser = require('../lib/getUser.js');

exports.userWelcome = function (req, res) {
    console.log('cookies', req.cookies);
    console.log(req.cookies.sessionUser);

    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        console.log(user);
        console.log('request frm getUser ');
        if(user == null){
            return res.render('./views/index', {});
        }
        res.render('./views/index', {user: user})
    });
};
