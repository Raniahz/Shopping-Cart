var mongoose = require('mongoose');
var User = mongoose.model('User');
var SessionUser = mongoose.model('SessionUser');

//-----find user be the id

exports.findByUserId = function (id, callback) {
    SessionUser.findOne({_id: id}, function (err, sessionUser) {
        console.log('ses', sessionUser);
        if (err) {
            console.log(err);
            return callback(err)
        }
        if (sessionUser == null) {
            console.log('sessUser is null');
            return callback(null);
        }
        User.findOne({_id: sessionUser.user}, function (err, user) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            console.log(' look here ', user);
            callback(null, user);
        });
    });
};
