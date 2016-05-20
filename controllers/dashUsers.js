var mongoose = require('mongoose');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');
var getUser = require('../lib/getUser.js');
var validateForm = require('../lib/signUpFormValidation.js');

//---------- FIND USER for dash-User page

exports.userTable = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {name: 'Users', link: 'null'}];
    var perPage = 5;
    var page = parseInt(req.query.page) - 1 || 0;
    User.count({}).exec(function (err, count) {
        console.log('page number', req.query.page);
        var pages = [];
        var maxPage = Math.ceil(count / perPage);
        for (var i = 0; i < maxPage; i++) {
            pages.push(i);
        }
        getUser.findByUserId(id, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                var role = user.roles;
                if (role !== 'Admin') {
                    console.log('user is not an admin');
                  return  res.redirect('/')
                }
            }
            User.find({}).limit(perPage).skip(perPage * page).sort({date: -1}).exec(function (err, users) {
                if (err) {
                    console.log(err);
                    return err
                }
                //console.log('page', page);
                //console.log('pages', pages);
                //console.log('-------',users);
                res.render('views/dashboard/users', {
                    breadcrumbs: breadcrumbs,
                    user: user,
                    users: users,
                    pages: pages,
                    page: page
                })
            });
        });
    });
};
exports.editUserGET = function (req, res) {
    console.log('id', req.query._id);
    var id = req.query._id;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Users',
        link: '/dashboard/users'
    }, {name: 'Create User', link: 'null'}];
    if (id) {
        breadcrumbs[2].name = 'Edit User'
    }
    User.findById(id, function (err, user) {
        if (err) {
            console.log(err);
        }
        res.render('./views/dashboard/editUsers', {breadcrumbs: breadcrumbs, user: user})
    });

};
//---------- EDIT USER for dash-editUser
exports.editUserPOST = function (req, res) {
    //console.log('req body', req.body);
    var errors = [];
    var id = req.body.id;
    var nameRes = validateForm.validateName(req.body.name);
    var emailRes = validateForm.validateEmail(req.body.email);
    var passRes = validateForm.validatePassword(req.body.password);
    var rePassRes = validateForm.validateRepassword(req.body.repassword, req.body.password);
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Users',
        link: '/dashboard/users'
    }, {name: 'Create User', link: 'null'}];
    if (id) {
        breadcrumbs[2].name = 'Edit User';
        console.log('there is an id, so use dashbardpassword validation ');
        passRes = validateForm.validatePasswordExistingUser(req.body.password);
        rePassRes = validateForm.validateRepasswordExistingUser(req.body.repassword, req.body.password);
    }
    if (nameRes) {
        errors.push(nameRes);
        console.log("error is found")
    }
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
            breadcrumbs: breadcrumbs,
            errors: errors,
            user: req.body
        });
    }
    var query = {
        name: req.body.name,
        email: req.body.email,
        roles: req.body.roles,
        password: req.body.password,
        repassword: req.body.repassword
    };
    if (passRes !== undefined) {
        query = {
            name: req.body.name,
            email: req.body.email,
            roles: req.body.roles
        };
    }
    var q = {email: new RegExp(req.body.email, 'i')};
    if (id) {
        console.log('if id is present');
        q._id = {$ne: id};
    }
    // console.log(q);
    User.findOne(q).exec(function (err, user) {
        console.log('user-------', user);
        if (user) {
            console.log('existing user');
            return res.render('./views/dashboard/editUsers', {
                breadcrumbs: breadcrumbs,
                emailErr: 'existing email',
                user: req.body
            });
        }
        User.findOne({_id: id}, function (err, user) {
            console.log('user------', user);
            if (!user) {
                user = new User(query);
            }
            else {
                for (var i in query) {
                    user[i] = query[i];
                }
            }
            user.save(function (err, users) {
                if (err) {
                    return res.render(err);
                }
                console.log('user', user);
                res.redirect('/dashboard/users');
            });
        });
    });
};

//---------- DELETE USER for dash-deleteUser
exports.deleteUser = function (req, res) {
    console.log('id', req.query._id);
    var id = req.query._id;
    var sessionID = req.cookies.sessionUser;
    getUser.findByUserId(sessionID, function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log('user', user);
        if (user._id == id) {
            console.log('cant delete self');
            return res.redirect('/dashboard/users')
        }
        User.findByIdAndRemove(id, function (err, user) {
            if (err) {
                console.log(err);
                return res.render('./views/dashboard/editUsers', {})
            }
            res.redirect('/dashboard/users');
        });
    });
};
