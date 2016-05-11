var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ //schema
    name:  String,
    //name: {type: String, normalized: String },
    email: String,
    mobile: Number,
    age: Number,
    gender: String,
    password: String,
    rePassword: String,
    date: {type: Date, default: Date.now},
    roles: {type: String, default: 'User'}
});

mongoose.model('User', userSchema); // model


