var mongoose = require('mongoose');

var KNUserSchema = new mongoose.Schema({ //schema
    name:  {type: String},
    //name: {type: String, normalized: String },
    email: {type: String},
    mobile: {type: Number},
    age: {type: Number},
    gender: {type: String},
    password: {type: String},
    rePassword: {type: String},
    date: {type: Date, default: Date.now},
    roles: {type: String, default: 'User'}
});

mongoose.model('KNUser', KNUserSchema); // model


