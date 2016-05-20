var userCtrl = require('./controllers/user');
var welcomeCtrl = require('./controllers/welcome');
var dashboardUsers = require('./controllers/dashUsers');
var categoryCrtl = require('./controllers/category');
var productCrtl = require('./controllers/products');
var indexCrtl = require('./controllers/index');
var musicCrtl = require('./controllers/music');
var movieCtrl = require('./controllers/movies');
var foodCtrl = require('./controllers/food');
var carCtrl = require('./controllers/cars');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


module.exports = function (app) {
//----------- HOME -----------------------------
    app.get('/', indexCrtl.welcome);

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
    app.get('/products/cars', carCtrl.findCarProducts); //change name of controllers here
    //food-------------------------
    app.get('/products/food', foodCtrl.findFoodProducts);
    // movies-------------------------
    app.get('/products/movies', movieCtrl.findMoviesProducts);
    // music-------------------------
    app.get('/products/music', musicCrtl.findMusicProducts);



    app.get('/products/pizza', musicCrtl.findMusicProducts);

};