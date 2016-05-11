//incoming is req.
var mongoose = require('mongoose');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');
var getUser = require('../lib/getUser.js');


exports.userWelcome = function (req, res) {
    //console.log('cookies', req.cookies);
    //var breadcrumbs = [{name: 'Food', link: '/dashboard/products/food'}, {name: 'Music', link: '/dashboard/products/music'}, {name: 'Movies', link: '/dashboard/products/movies'},{name: 'Cars', link: '/dashboard/products/cars'}];
   // var breadcrumbs = [{name: 'Products', link: '/products/food'}];
    console.log(req.cookies.sessionUser);
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        console.log(user);
        console.log('request frm getUser ');
        res.render('views/', { user: user})
    });
};
exports.userWelcomeDash = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}];
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }

        res.render('views/dashboard', {breadcrumbs: breadcrumbs, user: user})
    });
};
exports.userWelcomeAbout = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/about', {user: user})
    });
};
exports.userWelcomeContact = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/contact', {user: user})
    });
};

exports.userWelcomeFood = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Products', link: '/'}, {name: 'Food', link:'null'}];
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/products/food', {breadcrumbs: breadcrumbs, user: user})
    });
};
exports.userWelcomeMovies = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Products', link: '/'}, {name: 'Movies', link:'null'}];
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/products/movies', {breadcrumbs: breadcrumbs,user: user})
    });
};
exports.userWelcomeMusic = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Products', link: '/'}, {name: 'Music', link: 'null'}];
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/products/music', {breadcrumbs: breadcrumbs, user: user})
    });
};
exports.userWelcomeCars = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Products', link: '/'}, {name: 'Cars', link:'null'}];
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/products/cars', {breadcrumbs: breadcrumbs, user: user})
    });
};


