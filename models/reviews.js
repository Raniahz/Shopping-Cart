var mongoose = require('mongoose');

var KNReviewsSchema = new mongoose.Schema({ //schema
    user: {type: String},
    comment: {type: String},
    product: {type: String},
    status: {type: String, default: 'Not Accepted'},
    rating: {type: Number},
    date: {type: Date, default: Date.now}

});

mongoose.model('KNReviews', KNReviewsSchema); // model


