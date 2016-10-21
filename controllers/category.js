var mongoose = require('mongoose');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');
var validation = require('../lib/categoryFormValidation.js');

exports.fillCategoryTable = function (req, res) { // need to change this to also send back stuff from db
    var sessionUser = req.currentUser;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {name: 'Categories', link: 'null'}];
    var perPage = 5;
    var page = parseInt(req.query.page) - 1 || 0;
    //console.log('page', page);
    KNCategory.count().exec(function (err, count) {
        //  console.log('page number', req.query.page);
        var pages = [];
        var maxPage = Math.ceil(count / perPage);
        for (var i = 0; i < maxPage; i++) {
            pages.push(i);
        }
        KNCategory.find().limit(perPage).skip(perPage * page).sort({date: -1}).exec(function (err, categories) {
            if (err) {
                console.log(err);
                return err
            }
            res.render('./views/dashboard/categories', {
                breadcrumbs: breadcrumbs,
                user: sessionUser,
                categories: categories,
                pages: pages,
                page: page
            })
        });

    });
};
exports.createOrEditCategoryGET = function (req, res) {
    // console.log('id', req.query._id);
    var id = req.query._id;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Categories',
        link: '/dashboard/categories'
    }, {name: 'Create Categories', link: 'null'}];
    if (id) {
        breadcrumbs.push({name: 'Edit Categories'});
    }
    KNCategory.findById(id, function (err, category) {
        if (err) {
            console.log(err);
        }
        res.render('./views/dashboard/editCategory', {breadcrumbs: breadcrumbs, category: category})
    });
};
exports.createOrEditCategoryPOST = function (req, res) {
    //  console.log('req body', req.body);
    var id = req.body.id;
    var errors = [];
    var nameRes = validation.validateName(req.body.name);
    var slugRes = validation.validateSlug(req.body.slug);
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {
        name: 'Categories',
        link: '/dashboard/categories'
    }, {name: 'Create Categories', link: 'null'}];
    if (id) {
        breadcrumbs.push({name: 'Edit Categories'});
    }
    if (nameRes) {
        errors.push(nameRes)
    }
    if (slugRes) {
        errors.push(slugRes)
    }
    if (errors != 0) {
        // console.log('errors');
        return res.render('./views/dashboard/editCategory', {
            breadcrumbs: breadcrumbs,
            errors: errors,
            category: req.body
        })
    }
    var slugQuery = {slug: new RegExp(req.body.slug, 'i')};
    var nameQuery = {name: new RegExp(req.body.name, 'i')};
    if (id) {
        //  console.log('there is an id');
        slugQuery._id = {$ne: id};
        nameQuery._id = {$ne: id};
    }
    KNCategory.findOne(slugQuery).exec(function (err, category) {
        console.log('look =======');
        if (category) {
            // console.log('existing slug');
            return res.render('./views/dashboard/editCategory', {
                breadcrumbs: breadcrumbs,
                slugErr: 'existing slug',
                category: req.body
            })
        }
        KNCategory.findOne(nameQuery).exec(function (err, category) {
            if (category) {
                //  console.log('existing name');
                return res.render('./views/dashboard/editCategory', {
                    breadcrumbs: breadcrumbs,
                    nameErr: 'existing name',
                    category: req.body
                })
            }
            KNCategory.findOne({_id: id}, function (err, category) {
                if (!category) {
                    category = new KNCategory(req.body);
                }
                else {
                    category.name = req.body.name;
                    category.slug = req.body.slug
                }
                category.save(function (err, category) {
                    if (err) {
                        return res.render(err)
                    }
                    // console.log('category', category);
                    res.redirect('/dashboard/categories')
                })
            })
        })
    });
};

exports.deleteCategory = function (req, res) {
    var id = req.query._id;
    KNCategory.findByIdAndRemove(id, function (err, category) {
        if (err) {
            console.log(err);
            return res.render('./views/dashboard/editCategories', {})
        }
        res.redirect('/dashboard/categories');
    });
};
