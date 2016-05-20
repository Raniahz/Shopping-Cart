var mongoose = require('mongoose');
var config = require('../config');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');
var getUser = require('../lib/getUser.js');

exports.findCarProducts = function (req, res) {
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Products', link: '/dashboard/products'}, {name: 'Cars', link: 'null'}];
    getUser.findByUserId(id, function (err, user) {
        if (err) {
            console.log(err);
        }
        Category.findOne({name: 'cars'}, function (err, category) {
            if (err) {
                console.log('no category found', err);
            }
            var categoryID = category._id;

            Product.find({category: categoryID}, function (err, products) {
                console.log('products', products);
                if (err) {
                    console.log('no products found', err)
                }
                res.render('views/products/cars', {breadcrumbs: breadcrumbs, products: products, user: user})
            });
        });
    });
};