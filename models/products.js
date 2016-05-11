var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({ //schema
    name: String,
    category: {type: String, ref: 'Product'},
    slug: String,
    image: String,
    description: String,
    quantity: Number,
    price: Number,
    discountPrince: Number,
    attributes: Array
});

mongoose.model('Product', productSchema); // model


