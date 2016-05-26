var mongoose = require('mongoose');

var KNproductSchema = new mongoose.Schema({ //schema
    name: {type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'KNCategory'},
    slug: {type: String, trim: true},
    imageUrl: {type: String},
    imagePath: {type: String},
    description: {type: String},
    rating: {type: Number},
    quantity: {type: Number},
    price: {type: Number},
    date: {type: Date, default: Date.now},
    discountPrice: {type: Number},
    attributes: {type: Array}
});

mongoose.model('KNProduct', KNproductSchema); // model


