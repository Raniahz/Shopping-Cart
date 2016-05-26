var mongoose = require('mongoose');

var KNSessionSchema = new mongoose.Schema({ //schema
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'KNUser'}
});
mongoose.model('KNSessionUser', KNSessionSchema); // model

//var SessionUser = mongoose.model('SessionUser', SessionSchema); // model
//module.exports = SessionUser;