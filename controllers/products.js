var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');
var getUser = require('../lib/getUser.js');
var validation = require('../lib/productFormValidation.js');
var productPoster = require('../lib/productPosters.js');
//console.log(config);
//console.log(config.root);
var errPath = productPoster.makeProductDirectories();
console.log('errPath', errPath);

exports.productTable = function (req, res) { // need to change this to also send back stuff from db
    var id = req.cookies.sessionUser;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {name: 'Products', link: 'null'}];
    var perPage = 5;
    var page = parseInt(req.query.page) - 1 || 0;
    // console.log('page', page);
    Product.count({}).exec(function (err, count) {
        //  console.log('page number', req.query.page);
        var pages = [];
        var maxPage = Math.ceil(count / perPage);
        for (var i = 0; i < maxPage; i++) {
            pages.push(i);
        }
        getUser.findByUserId(id, function (err, user) {
            if (err) {
                console.log(err);
            }
            Product.find({}).limit(perPage).skip(perPage * page).sort({date: -1}).exec(function (err, products) {
                if (err) {
                    console.log(err);
                    return err
                }
                res.render('./views/dashboard/products', {
                    breadcrumbs: breadcrumbs,
                    user: user,
                    products: products,
                    pages: pages,
                    page: page
                })
            });
        });
    });
};
exports.editProductGET = function (req, res) {
    console.log('id', req.query._id);
    var id = req.query._id;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Products',
        link: '/dashboard/products'
    }, {name: 'Create Products', link: 'null'}];
    if (id) {
        breadcrumbs[2].name = 'Edit Products'
    }
    Product.findById(id, function (err, products) {
        if (err) {
            console.log(err);
        }
        res.render('./views/dashboard/editProducts', {breadcrumbs: breadcrumbs, products: products})
    });
};
exports.editProductPOST = function (req, res) {
    console.log('req body', req.body);
    var id = req.body.id;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Products',
        link: '/dashboard/products'
    }, {name: 'Create Products', link: 'null'}];
    if (id) {
        breadcrumbs[2].name = 'Edit Products'
    }
    var errors = [];
    var nameRes = validation.validateName(req.body.name);
    var slugRes = validation.validateSlug(req.body.slug);
    if (nameRes) {
        errors.push(nameRes)
    }
    if (slugRes) {
        errors.push(slugRes)
    }
    if (errors != 0) {
        console.log('errors');
        return res.render('./views/dashboard/editProducts', {
            breadcrumbs: breadcrumbs,
            errors: errors,
            product: req.body
        })
    }
    var slugQuery = {slug: new RegExp(req.body.slug, 'i')};
    var nameQuery = {name: new RegExp(req.body.name, 'i')};
    if (id) {
        slugQuery._id = {$ne: id};
        nameQuery._id = {$ne: id};
    }
    Product.findOne(slugQuery).exec(function (err, product) {
        if (product) {
            //   console.log('existing slug');
            return res.render('./views/dashboard/editProducts', {
                slugErr: 'existing slug',
                products: req.body
            })
        }
        //console.log('name---', req.body.attributesName);
        //console.log('value---', req.body.attributesValue);
        var name = req.body.attributesName;
        var value = req.body.attributesValue;
        var attributes = [];
        if (name && value) {
            // console.log(typeof name);
            // console.log(typeof value);
            if (typeof name == 'string') {
                name = [name];
            }
            if (typeof value == 'string') {
                value = [value];
            }
            for (var i = 0; i < name.length; i++) {
                attributes.push({key: name[i], value: value[i]});
            }
        }
        // console.log('attributeObj', attributes);
        //Product.findOne(nameQuery).exec(function (err, product) {
        //    if (product) {
        //        console.log('existing name');
        //        return res.render('./views/dashboard/editProducts', {
        //            nameErr: 'existing name',
        //            category: req.body
        //        })
        //    }
        Product.findOne({_id: id}, function (err, product) {
            if (!product) {
                product = new Product();
            }
            product.name = req.body.name;
            product.category = req.body.category;
            product.slug = req.body.slug;
            product.image = req.body.image;
            product.quantity = req.body.quantity;
            product.price = req.body.price;
            product.discountPrice = req.body.discountPrice;
            product.attributes = attributes;

            //console.log(config);
            console.log('root', config.root);
            console.log('req.file-----', req.file);
            // console.log('fileName',fileName);

            var root = config.root; // root path of this file
            var productPath = config.productPath;
            var originalName = req.file.originalname.toLowerCase().split('.'); //this gets the "jpg"
            var oldPath = req.file.path; //the old path
            var fileName = req.file.filename; //array with name of file

            fs.rename(oldPath, newPath, function (err) {
                //            if (err) {
                //                console.log('other rename err', err)
                //            }
                //        });


            //fs.stat(directoryPath, function (err, stats) {
            //    if (!stats) {
            //        productPoster.makeDirectory(directoryPath);
            //        fs.rename(oldPath, newPath, function (err) {
            //            if (err) {
            //                console.log('rename err', err)
            //            }
            //        });
            //    }
            //    else {
            //        fs.rename(oldPath, newPath, function (err) {
            //            if (err) {
            //                console.log('other rename err', err)
            //            }
            //        });
            //    }
            //});

            product.save(function (err, product) {
                if (err) {
                    return res.render(err)
                }
                console.log('product', product);
                res.redirect('/dashboard/products')
            })
        })
    });
};
exports.deleteProduct = function (req, res) {
    console.log('id', req.query._id);
    var id = req.query._id;
    Product.findByIdAndRemove(id, function (err, product) {
        if (err) {
            console.log(err);
            return res.render('./views/dashboard/editProducts', {})
        }
        res.redirect('/dashboard/products');
    });
};