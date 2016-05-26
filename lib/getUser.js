var mongoose = require('mongoose');
var KNUser = mongoose.model('KNUser');
var KNSessionUser = mongoose.model('KNSessionUser');

//-----find user be the id

exports.findByUserId = function (id, callback) {
    KNSessionUser.findOne({_id: id}, function (err, sessionUser) {
      //  console.log('ses', sessionUser);
        if (err) {
            console.log(err);
            return callback(err)
        }
        if (sessionUser == null) {
          // console.log('sessUser is null');
            return callback(null);
        }
        KNUser.findOne({_id: sessionUser.user}, function (err, user) {
            if (err) {
                console.log(err);
                return callback(err);
            }
          //  console.log(' look here ', user);
            callback(null, user);
        });
    });
};

