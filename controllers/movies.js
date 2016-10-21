var mongoose = require('mongoose');
var config = require('../config');
var KNProduct = mongoose.model('KNProduct');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');

exports.findMoviesProducts = function (req, res) {
    var sessionUser = req.currentUser;
    var breadcrumbs = [{name: 'Products', link: '/dashboard/products'}, {name: 'Movies', link: 'null'}];
    KNCategory.findOne({name: 'Movies'}, function (err, category) {
        if (err) {
            console.log('no category found', err);
        }
        console.log('category', category);
        if (category) {
            var categoryID = category._id;
        }
        KNProduct.find({category: categoryID}, function (err, products) {
            if (err) {
                console.log('no products found', err)
            }
            KNCategory.find().exec(function (err, categories) {
                if (err) {
                    console.log('no categories found', err)
                }
                res.render('views/categories/movies', {breadcrumbs: breadcrumbs, categories: categories, products: products, user: sessionUser})
            });
        });
    });
};