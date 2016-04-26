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
        res.render('views/', {user: user})
    });
};

exports.userWelcomeDash = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }

        res.render('views/dashboard', {user: user})
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
exports.userWelcomeCars = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/cars', {user: user})
    });
};
exports.userWelcomeFood = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/food', {user: user})
    });
};
exports.userWelcomeMovies = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/movies', {user: user})
    });
};
exports.userWelcomeMusic = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/music', {user: user})
    });
};
exports.userWelcomeUsers = function (req, res) {
    var id = req.cookies.sessionUser;
    getUser.findByUserId( id, function (err, user) {
        if(err){
            console.log(err);
        }
        res.render('views/dashboard/users', {user: user})
    });
};