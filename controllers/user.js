var mongoose = require('mongoose');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');
var formValidate = require('../lib/signUpFormValidation.js');

exports.signupUser = function (req, res) {
    // console.log('req body', req.body);
    var errors = [];
    var nameRes = formValidate.validateName(req.body.name);
    var emailRes = formValidate.validateEmail(req.body.email);
    var mobileRes = formValidate.validateMobile(req.body.mobile);
    var ageRes = formValidate.validateAge(req.body.age);
    var passRes = formValidate.validatePassword(req.body.password);
    var rePassRes = formValidate.validateRepassword(req.body.repassword, req.body.password);
    if (nameRes) {
        errors.push(nameRes);
        console.log("error is found")
    }
    if (emailRes) {
        errors.push(emailRes);
        console.log("error is found")
    }
    if (mobileRes) {
        errors.push(mobileRes);
        console.log("error is found")
    }
    if (ageRes) {
        errors.push(ageRes);
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
        return res.render('./views/signup', {
            errors: errors,
            body: req.body
        });
    }
    KNUser.findOne({email: req.body.email}, function (err, user) {
        if (user) {
            console.log('existing user');
            return res.render('./views/signup', {
                emailErr: 'existing email',
                body: req.body
            });
        }
        console.log('not existing user');

        user = new KNUser(req.body);
        user.save(function (err, user) { //this user.save method is making all
            if (err) {
                return res.render(err);
            }
            return res.redirect('/login');
        });
    });
};
exports.loginUser = function (req, res) {
    var errors = [];
    var query = {
        email: req.body.email,
        password: req.body.password
    };
    //console.log("main validation function:");
    var emailRes = formValidate.validateEmail(req.body.email); // -----setting variable for email
    var passRes = formValidate.validatePassword(req.body.password); // ----setting variable for password
    if (emailRes) {
        errors.push(emailRes);
        console.log("error is found")
    }
    if (passRes) {
        errors.push(passRes);
        console.log("error is found")
    }
    if (errors != 0) {
        return res.render('./views/login', {
            errors: errors,
            query: query
        });
    }
    KNUser.findOne(query, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('./views/login');
        }
        if (!user) {
            return res.render('./views/login', {loginMsg: 'sorry, no existing user'});
        }
        //   console.log('user', user);
        var sessUser = new KNSessionUser();
        sessUser.user = user._id;
        sessUser.save(function (err, user) {
            if (err) {
                return console.log(err);
            }
            //  console.log('new sessionUser', user);
            res.cookie('sessionUser', user._id);
            return res.redirect('/');
        })
    })
};
exports.logOutUser = function (req, res) {
    //console.log('logging out cookie', req.cookies);
    var id = req.cookies.sessionUser;
    KNSessionUser.findByIdAndRemove(id, function (err, user) {
        if (err) {
            return console.log(err);
        }
        res.clearCookie('sessionUser');
        res.redirect('/');

    });
    //SessionUser.find({}, function (err, user) {
    //    if(err){
    //        console.log(err);
    //    }
    //    SessionUser.remove({user: id}, function (err) {
    //        if (err) {
    //            return res.send(err);
    //        }
    //    });
    //    console.log('response');
    //    // res.clearCookie('user');
    //    res.redirect('/index');
    //})

};