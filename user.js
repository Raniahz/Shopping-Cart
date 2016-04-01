var mongoose = require('mongoose');
db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');

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


//User.find({name: 'name'}, function () {
//    if (err) throw err
//};

//db.on('error', console.log('connection error'));
//db.once('open', function () {
//    //schemas and models go here
//
//    var formSchema = new mongoose.Schema({
//        name: String,
//        email: String,
//        mobile: Number,
//        age: Number,
//        gender: String,
//        password: String,
//        rePassword: String
//    });
//
//    return mongoose.model('User', formSchema);
//
//});