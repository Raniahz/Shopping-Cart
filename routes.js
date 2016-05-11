var userCtrl = require('./controllers/user');
var welcomeCtrl = require('./controllers/welcome');
var dashboardUsers = require('./controllers/dashUsers');
var categoryCrtl = require('./controllers/category');
var productCrtl = require('./controllers/products');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
//var upload = multer({ dest: 'posters/products' });

module.exports = function (app) {
//----------- HOME -----------------------------
    app.get('/', welcomeCtrl.userWelcome);

//-----------NAV-BAR-----------------------------
    // about-------------------------
    app.get('/about', welcomeCtrl.userWelcomeAbout);
    // contact-------------------------
    app.get('/contact', welcomeCtrl.userWelcomeContact);

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

//-----------DASHBOARD-----------------------------
    // users-------------------------
    app.get('/dashboard', welcomeCtrl.userWelcomeDash);
    app.get('/dashboard/users', dashboardUsers.userTable);
    app.get('/dashboard/editUsers', dashboardUsers.editUserGET);
    app.post('/dashboard/editUsers', dashboardUsers.editUserPOST);
    app.get('/dashboard/deleteUsers', dashboardUsers.deleteUser);

    // categories-------------------------
    app.get('/dashboard/categories', categoryCrtl.categoryTable);
    app.get('/dashboard/editCategory', categoryCrtl.editCategoryGET);
    app.post('/dashboard/editCategory', categoryCrtl.editCategoryPOST);
    app.get('/dashboard/deleteCategory', categoryCrtl.deleteCategory);

    // products-----------------------------
    app.get('/dashboard/products', productCrtl.productTable);
    app.get('/dashboard/editProducts', productCrtl.editProductGET);
    app.post('/dashboard/editProducts', upload.single('poster'), productCrtl.editProductPOST);
    app.get('/dashboard/deleteProducts', productCrtl.deleteProduct);

    // cars-------------------------
    app.get('/products/cars', welcomeCtrl.userWelcomeCars); //change name of controllers here
    //food-------------------------
    app.get('/products/food', welcomeCtrl.userWelcomeFood);
    // movies-------------------------
    app.get('/products/movies', welcomeCtrl.userWelcomeMovies);
    // music-------------------------
    app.get('/products/music', welcomeCtrl.userWelcomeMusic);

};