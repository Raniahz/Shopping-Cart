var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var KNProduct = mongoose.model('KNProduct');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');
var KNReviews = mongoose.model('KNReviews');
var validation = require('../lib/productFormValidation.js');
var productPoster = require('../lib/productPosters.js');
var errPath = productPoster.makeProductDirectories();
console.log('errPath', errPath);
//console.log(config);

exports.fillProductTable = function (req, res) { // need to change this to also send back stuff from db
    var sessionUser = req.currentUser;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {name: 'Products', link: 'null'}];
    var perPage = 5;
    var page = parseInt(req.query.page) - 1 || 0;
    KNProduct.count().exec(function (err, count) {
        var pages = [];
        var maxPage = Math.ceil(count / perPage);
        for (var i = 0; i < maxPage; i++) {
            pages.push(i);
        }
        KNProduct.find().limit(perPage).skip(perPage * page).populate('category').sort({date: -1}).exec(function (err, products) {
            if (err) {
                console.log(err);
                return err
            }
            res.render('./views/dashboard/products', {
                breadcrumbs: breadcrumbs,
                user: sessionUser,
                products: products,
                pages: pages,
                page: page
            })
        });
    });
};
exports.createOrEditProductGET = function (req, res) {
    var id = req.query._id;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Products',
        link: '/dashboard/products'
    }, {name: 'Create Products', link: 'null'}];
    if (id) {
        breadcrumbs.push({name: 'Edit Products'});
    }
    KNCategory.find().exec(function (err, categories) {
        if (err) {
            console.log(err);
            return err
        }
        KNProduct.findById(id, function (err, products) {
            if (err) {
                console.log(err);
                return err
            }
            //  console.log('products', products);
            res.render('./views/dashboard/editProducts', {
                breadcrumbs: breadcrumbs,
                products: products,
                categories: categories
            })
        });
    });
};
exports.createOrEditProductPOST = function (req, res) {
    //console.log('req body', req.body);
    var id = req.body.id;
    //  console.log('req.file-----', req.file);
    if (req.file) {
        var filePath = req.file.path;
    }
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Products',
        link: '/dashboard/products'
    }, {name: 'Create Products', link: 'null'}];
    if (id) {
        breadcrumbs.push({name: 'Edit Products'});
    }
    KNCategory.find().exec(function (err, categories) {
        if (err) {
            console.log(err);
            return err
        }
        var errors = [];
        var nameRes = validation.validateName(req.body.name);
        var categoryRes = validation.validateCategory(req.body.category);
        var slugRes = validation.validateSlug(req.body.slug);
        var imgRes = validation.validateImage(req.file);
        var quantityRes = validation.validateQuantity(req.body.quantity);
        var priceRes = validation.validatePrice(req.body.price);
        if (id) {
            imgRes = undefined;
        }
        if (nameRes) {
            errors.push(nameRes)
        }
        if (categoryRes) {
            errors.push(categoryRes)
        }
        if (slugRes) {
            errors.push(slugRes)
        }
        if (imgRes) {
            errors.push(imgRes)
        }
        if (quantityRes) {
            errors.push(quantityRes)
        }
        if (priceRes) {
            errors.push(priceRes)
        }
        if (errors != 0) {
            //  console.log('validation errors');
            if (req.file) {
                productPoster.deleteProductFile(filePath);
            }
            return res.render('./views/dashboard/editProducts', {
                breadcrumbs: breadcrumbs,
                errors: errors,
                categories: categories,
                products: req.body
            })
        }
        var slugQuery = {slug: new RegExp(req.body.slug, 'i')};
        if (id) {
            slugQuery._id = {$ne: id};
        }
        KNProduct.findOne(slugQuery).exec(function (err, product) {
            if (product) {
                if (req.file) {
                    productPoster.deleteProductFile(filePath);
                }
                return res.render('./views/dashboard/editProducts', {
                    slugErr: 'existing slug',
                    products: req.body,
                    categories: categories
                })
            }
            var name = req.body.attributesName;
            var value = req.body.attributesValue;
            var attributes = [];
            if (name && value) {
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
            //console.log('looking for FUCKING BUGS 1');
            KNProduct.findOne({_id: id}, function (err, product) {
                if (!product) {
                    product = new KNProduct();
                }
                //console.log('looking for FUCKING BUGS 2');
                var productPath = config.productPath;
                if (req.file) {
                    var fileName = req.file.filename; //array with name of file
                    var posterURL = productPath.split('/');
                    var originalNameArray = req.file.originalname.toLowerCase().split('.'); //this gets the "jpg"
                    //  console.log('product existing file--------------', product.imagePath);
                    if (id) {
                        productPoster.deleteProductFile(product.imagePath);
                    }
                }
                product.name = req.body.name;
                product.category = req.body.category;
                product.slug = req.body.slug;
                if (req.file) {
                    product.imagePath = productPath + '/' + fileName + '.' + originalNameArray[1];
                    product.imageUrl = posterURL[2] + '/' + fileName + '.' + originalNameArray[1];
                }
                product.quantity = req.body.quantity;
                product.price = req.body.price;
                product.discountPrice = req.body.discountPrice;
                product.attributes = attributes;
                //console.log(config);
                //console.log('looking for FUCKING BUGS 3');
                product.save(function (err, product) {
                    if (err) {
                        console.log('err in saving product');
                        productPoster.deleteProductFile(filePath);
                        return res.render(err)
                    }
                    //console.log('looking for FUCKING BUGS 4');
                    if (req.file) {
                        var root = config.root; // root path of this file
                        var originalNameArray = req.file.originalname.toLowerCase().split('.'); //this gets the "jpg"
                        var oldPath = req.file.path; //the old path
                        fs.rename(oldPath, root + '/' + productPath + '/' + fileName + '.' + originalNameArray[1], function (err) {
                            //console.log('rename function');
                            if (err) {
                                console.log('other rename err', err);
                            }
                            //  console.log('product', product);
                            res.redirect('/dashboard/products')
                        });
                    }
                    if (!req.file) {
                        res.redirect('/dashboard/products')
                    }
                })
            })
        });
    });
};
exports.deleteProduct = function (req, res) {
    var id = req.query._id;
    KNProduct.findByIdAndRemove(id, function (err, product) {
        if (err) {
            console.log(err);
            return res.render('./views/dashboard/editProducts', {})
        }
        if (product) {
            productPoster.deleteProductFile(product.imagePath);
            res.redirect('/dashboard/products');
        }
    });
};
exports.getProductSlug = function (req, res, next) {
    KNCategory.find().exec(function (err, category) {
        if (err) {
            console.log(err);
        }
        KNProduct.findOne({slug: req.params.slug}).populate('category').exec(function (err, product) {
            if (err) {
                console.log('err', err);
            }
            if (product) {
                req.product = product;
                req.category = category;
            }
            next();
        });
    });
};
exports.individualProductPageGET = function (req, res, next) {
    var sessionUser = req.currentUser;
    var product = req.product;
    KNCategory.find().exec(function (err, categories) {
        if (err) {
            console.log('no categories found', err)
        }
        KNReviews.find().exec(function (err, reviews) {
            if (err) {
                console.log('err');
            }
         //   console.log('reviews',reviews);
            res.render('./views/individualProduct', {reviews:reviews, user: sessionUser, categories: categories, product: product})
        });
    });
};
exports.individualProductPagePOST = function (req, res, next) {
    // console.log('req.body', req.body);
    var review = new KNReviews(req.body);
    review.save(function (err) {
        if (err) {
            console.log(err);
        }
        //  console.log('redirect');
        return res.redirect('back')
    });

};