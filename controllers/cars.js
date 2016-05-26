var mongoose = require('mongoose');
var config = require('../config');
var KNProduct = mongoose.model('KNProduct');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');

exports.findCarProducts = function (req, res) {
    var sessionUser = req.currentUser;
    var breadcrumbs = [{name: 'Products', link: '/dashboard/products'}, {name: 'Cars', link: 'null'}];
    KNCategory.findOne({name: 'Cars'}, function (err, category) {
        if (err) {
            console.log('no category found', err);
        }
        var categoryID = category._id;
        KNProduct.find({category: categoryID}, function (err, products) {
            console.log('products', products);
            if (err) {
                console.log('no products found', err)
            }
            KNCategory.find().exec(function (err, categories) {
                if (err) {
                    console.log('no categories found', err)
                }
                res.render('views/categories/cars', {
                    breadcrumbs: breadcrumbs,
                    categories: categories,
                    products: products,
                    user: sessionUser
                })
            });
        });
    });
};