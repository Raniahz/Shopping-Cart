var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ //schema
    name: String,
    email: String,
    mobile: Number,
    age: Number,
    gender: String,
    password: String,
    rePassword: String,
    date: Number,
    roles: String
});
mongoose.model('User', userSchema); // model


