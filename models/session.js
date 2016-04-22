var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({ //schema
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
mongoose.model('SessionUser', SessionSchema); // model

//var SessionUser = mongoose.model('SessionUser', SessionSchema); // model
//module.exports = SessionUser;