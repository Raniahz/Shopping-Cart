var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = [];
for (var i = 0; i < 100; i++) {
    var person = {
        name: 'personvhhgghfgfhgfghf' + i,
        email: 'person@person.com',
        mobile: 99999999,
        age: 1,
        gender: 'female',
        password: 'password',
        rePassword: 'password'
    };
    users.push(person);
}


User.collection.insert(users, function (err, user) {
    if (err) {
        console.log(err);
    }
    var counter = 0;
    //counter++ ;

    User.find({}, function (err, users) {
       // var done = [];
        // console.log(users);
        for (i = 0; i < users.length; i++) {
            //console.log(users[1].name);
            query = {_id: users[i].id};
            User.update(query, {name: 'person' + i}, function (err, result) {
                if (err) {
                    console.log(err);
                }
                // console.log(result);
                counter++;
               // done.push(result);
                if (counter == 100) {
                    console.log('before deleteUser fun called');
                    deleteUser();
                    //console.log("done");
                }
            });
        }
    });
});

function deleteUser() {
    console.log('delete function');
    User.find({}).sort({name: 1})
        .exec(function (err, users) {
            console.log('sort');
            //console.log(users);
            for (i = 0; i < 50; i++) {
                query = {_id: users[i].id};
                User.remove(query).exec()
            }
        });
}

