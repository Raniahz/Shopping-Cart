var mongoose = require('mongoose');


var formSchema = new mongoose.Schema({ //schema
    name: String,
    email: String,
    mobile: Number,
    age: Number,
    gender: String,
    password: String,
    rePassword: String
});
var User = mongoose.model('User', formSchema); // model
module.exports = User; // make available to app


