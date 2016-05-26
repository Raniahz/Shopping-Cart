var mongoose = require('mongoose');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNProduct = mongoose.model('KNProduct');
var KNSessionUser = mongoose.model('KNSessionUser');


exports.welcome = function (req, res) {
    var sessionUser = req.currentUser;
    console.log('da user', req.currentUser);
    KNProduct.find().populate('category').sort({date: -1}).limit(10).exec(function (err, products) {
        if (err) {
            console.log(err);
        }
        KNCategory.find().exec(function (err, categories) {
            if (err) {
                console.log('no categories found', err)
            }
            res.render('views/', {user: sessionUser, categories: categories, products: products})
        });
    });
};