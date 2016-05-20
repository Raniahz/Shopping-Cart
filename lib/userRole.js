var getUser = require('getUser.js');

exports.findRole = function (id) {
    getUser.findByUserId(id, function (err, user) {
        if (err) {
            console.log(err);
            return null
        }

        //  console.log('user.roles',user.roles);
        if (user) {
           return user
        }
    });
};