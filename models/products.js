var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({ //schema
    name: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    slug: String,
    imageUrl: String,
    imagePath: String,
    description: String,
    rating: Number,
    quantity: Number,
    price: Number,
    date: {type: Date, default: Date.now},
    discountPrice: Number,
    attributes: Array
});

mongoose.model('Product', productSchema); // model


