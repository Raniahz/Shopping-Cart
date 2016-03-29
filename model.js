
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');


db.on('error', console.log('connection error'));
db.once('open', function () {
    //schemas and models go here

    var formSchema = new mongoose.Schema({
        name: String,
        email: String,
        mobile: Number,
        age: Number,
        gender: String,
        password: String,
        rePassword: String
    });

    return mongoose.model('User', formSchema);

});