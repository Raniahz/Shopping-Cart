var mongoose = require('mongoose');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');
var getUser = require('../lib/getUser.js');
var validateForm = require('../lib/formValidation.js');

//---------- FIND USER for dash-User page

exports.findUsers = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        }
        console.log('users we are sending to user table', users);
        res.render('views/dashboard/users', {users: users})
    })
};

//---------- EDIT USER for dash-editUser
exports.editUser = function (req, res) {
    console.log(' req params', req.query );
    console.log('req body', req.body);
    var errors = [];
    var emailRes = validateForm.validateEmail(req.body.email);
    var passRes = validateForm.validatePassword(req.body.password);
    var rePassRes = validateForm.validateRepassword(req.body.repassword, req.body.password);
    if (emailRes) {
        errors.push(emailRes);
        console.log("error is found")
    }
    if (passRes) {
        errors.push(passRes);
        console.log("error is found")
    }
    if (rePassRes) {
        errors.push(rePassRes);
        console.log("error is found")
    }
    if (errors != 0) {
        return res.render('./views/dashboard/editUsers', {
            errors: errors,
            body: req.body
        })
    }

    //console.log('cookies', req.cookies);
    var id = req.cookies.sessionUser;
    getUser.findByUserId(id, function (err, user) {
        if (err) {
            console.log(err);
            // return callback(err);
            return res.render('./views/dashboard/editUsers', {
                emailErr: 'no user found',
                body: req.body
            })
        }
        console.log('requested user', user);
        var query = {
            email: req.body.email,
            password: req.body.password,
            repassword: req.body.repassword
        };
        console.log(user._id);
        User.findByIdAndUpdate(user._id, query, function (err, user) {
            if (err) {
                console.log(err);
                return res.render('./views/dashboard/editUsers', {
                    emailErr: 'no user found',
                    body: req.body
                });
                //return callback(err);
            }
            console.log(user);
            res.render('./views/dashboard/editUsers', {});
        });
    });
};

////---------- DELETE USER for dash-deleteUser
//exports.deleteUser = function (req, res) {
//
//    User.findByIdAndRemove(, function (err, user) {
//        if (err) {
//            console.log(err);
//            return res.render('./views/dashboard/editUsers', {})
//        }
//        res.render('./views/dashboard/editUsers', {});
//    })
//};
