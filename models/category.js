var mongoose = require('mongoose');

var KNCategorySchema = new mongoose.Schema({
    name: {type: String},
    slug: {type: String, trim: true},
    date: {type: Date, default: Date.now}
});

mongoose.model('KNCategory', KNCategorySchema);
