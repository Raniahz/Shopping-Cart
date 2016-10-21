var mongoose = require('mongoose');
var KNCategory = mongoose.model('KNCategory');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');
var KNReviews = mongoose.model('KNReviews');

exports.fillReviewTable = function (req, res) {
    var sessionUser = req.currentUser;
    var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}, {name: 'Reviews', link: 'null'}];
    var perPage = 5;
    var page = parseInt(req.query.page) - 1 || 0;
    KNReviews.count().exec(function (err, count) {
        var pages = [];
        var maxPage = Math.ceil(count / perPage);
        for (var i = 0; i < maxPage; i++) {
            pages.push(i);
        }
        KNReviews.find().limit(perPage).skip(perPage * page).sort({date: -1}).exec(function (err, reviews) {
            if (err) {
                console.log(err);
            }
            res.render('./views/dashboard/reviews', {
                reviews: reviews,
                user: sessionUser,
                breadcrumbs: breadcrumbs,
                pages: pages,
                page: page
            })
        });
    });
};
exports.deleteReview = function (req, res) {
    var id = req.query._id;
    KNReviews.findByIdAndRemove(id, function (err, reviews) {
        if (err) {
            console.log(err);
            return res.render('./views/dashboard/reviews', {})
        }
        res.redirect('/dashboard/reviews');
    });
};
exports.acceptReview = function (req, res) {
    var id = req.query._id;
    KNReviews.findByIdAndUpdate(id, {status : 'Accepted'}, function (err, review) {
        if (err) {
            console.log(err);
            return res.render('./views/dashboard/reviews', {})
        }
        res.redirect('/dashboard/reviews');
    });
};
