var getUser = require('./getUser.js');

exports.userRole = function (id, callback ) {
    getUser.findByUserId(id, function (err, user) {
        if (err) {
            console.log(err);
           return callback(err)
        }
        console.log(user);
        if(user.roles == 'User'){
            return callback(null);
        }
      //   console.log('user.roles',user.roles);
        if (user.roles == 'Admin') {
          callback(null, user)
        }
    });
};
