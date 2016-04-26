var userCtrl = require('./controllers/user');
var welcomeCtrl = require('./controllers/welcome');
var dashUser = require('./controllers/dashUsers');

module.exports = function (app) {

//-------- LOGIN /SIGNUP/ LOGOUT ---------------------
    app.post('/signup', userCtrl.signupUser);
    app.post('/login', userCtrl.loginUser);
    app.get('/logout', userCtrl.logOutUser);
    app.get('/signup', function (req, res) {
        res.render('./views/signup', {})
    });
    app.get('/login', function (req, res) {
        res.render('./views/login', {})
    });

//----------- HOME -----------------------------
    app.get('/', welcomeCtrl.userWelcome);

//-----------NAV-BAR-----------------------------
// about-------------------------
    app.get('/about', welcomeCtrl.userWelcomeAbout);
// contact-------------------------
    app.get('/contact', welcomeCtrl.userWelcomeContact);

//-----------PRODUCTS-----------------------------
// cars-------------------------
    app.get('/cars', welcomeCtrl.userWelcomeCars);
//food-------------------------
    app.get('/food', welcomeCtrl.userWelcomeFood);
// movies-------------------------
    app.get('/movies', welcomeCtrl.userWelcomeMovies);
// music-------------------------
    app.get('/music', welcomeCtrl.userWelcomeMusic);

//-----------DASHBOARD-----------------------------

// users-------------------------

    app.get('/dashboard', welcomeCtrl.userWelcomeDash);
    app.get('/dashboard/users', dashUser.findUsers);

    app.get('/dashboard/editUsers', function (req, res) {
        res.render('./views/dashboard/editUsers', {})
    });
    // ---- edit users--------------------
    app.post('/dashboard/editUsers', dashUser.editUser);

    // ---- delete users--------------------
    //app.get('/dashboard/deleteUsers', function (req, res) {
    //    res.render('./views/dashboard/deleteUsers', {})
    //});


   // app.get('/dashboard/editUsers', dashUser.deleteUser);
};