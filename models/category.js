var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    date: {type: Date, default: Date.now}
});

mongoose.model('Category', categorySchema);
