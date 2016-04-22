var userCtrl = require('./controllers/user');
var indexCtrl = require('./controllers/index');

module.exports = function (app) {
// user -----------------------------
    app.post('/signup', userCtrl.signupUser);

    app.post('/login', userCtrl.loginUser);

    app.get('/logout',userCtrl.logOutUser);

    app.get('/signup', function (req, res) {
        res.render('./views/signup', {})
    });

    app.get('/index', indexCtrl.userWelcome);

    //app.get('/', function (req, res) {
    //    res.render('./views/index', {})
    //});

    app.get('/login', function (req, res) {
        res.render('./views/login', {})
    });


//app.get('/', function (req, res) {
//
//    SessionUser.findOne({}, function (err, sessionUser) {
//            console.log('ses', sessionUser);
//            if (err) {
//                console.log(err);
//            }
//            if (sessionUser == null) {
//                console.log('sessUser is null');
//                res.render('./views/index', {});
//                return
//            }
//            User.findOne({_id: sessionUser.user}, function (err, user) {
//                if (err) {
//                    console.log(err);
//                }
//                console.log(' look here ', user);
//                res.render('./views/index', {user: user})
//            })
//        }
//    )
//});

// about-------------------------
    app.get('/about', function (req, res) {
        res.render('./views/about', {})
    });
// contact-------------------------
    app.get('/contact', function (req, res) {
        res.render('./views/contact', {})
    });
// cars-------------------------
    app.get('/cars', function (req, res) {
        res.render('./views/cars', {})
    });
//food-------------------------
    app.get('/food', function (req, res) {
        res.render('./views/food', {})
    });
// movies-------------------------
    app.get('/movies', function (req, res) {
        res.render('./views/movies', {})
    });
// music-------------------------
    app.get('/music', function (req, res) {
        res.render('./views/music', {})
    });


//app.post('/logout', function (req, res) {
//    console.log(req.body);
//    SessionUser.remove({user: req.body._id}, function (err) {
//        if (err) {
//            return res.send(err);
//        }
//
//    })
//});


};