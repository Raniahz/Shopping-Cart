var mongoose = require('mongoose');
var config = require('../config');
var KNProduct = mongoose.model('KNProduct');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');

exports.findFoodProducts = function (req, res) {
    var sessionUser = req.currentUser;
    var breadcrumbs = [{name: 'Products', link: '/dashboard/products'}, {name: 'Food', link: 'null'}];
    KNCategory.findOne({name: 'Food'}, function (err, category) {
        if (err) {
            console.log('no category found', err);
        }
        var categoryID = category._id;
        //   console.log('category', category);
        KNProduct.find({category: categoryID}, function (err, products) {
            //  console.log('products', products);
            if (err) {
                console.log('no products found', err)
            }
            KNCategory.find().exec(function (err, categories) {
                if (err) {
                    console.log('no categories found', err)
                }
                res.render('views/categories/food', {
                    breadcrumbs: breadcrumbs,
                    categories: categories,
                    products: products,
                    user: sessionUser
                })
            });
        });
    });
};
