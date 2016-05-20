var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var SessionUser = mongoose.model('SessionUser');
var getUser = require('../lib/getUser.js');


exports.welcome = function (req, res) {
    // console.log(req.cookies.sessionUser);
    var id = req.cookies.sessionUser;
    getUser.findByUserId(id, function (err, user) {
        if (err) {
            console.log(err);
        }
      //  console.log('user.roles',user.roles);
        if(user) {
            var role = user.roles;
        }

        Product.find({}).populate('category').sort({date: -1}).limit(10).exec(function (err, products) {
            if (err) {
                console.log(err);
            }
            Category.find({}, function (err, categories) {
                if (err) {
                    console.log('no categories found', err)
                }
                //console.log('categories', categories);
                res.render('views/', {user: user, categories: categories, products: products, role: role})
            });
        });
    })
};