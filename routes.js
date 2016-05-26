var userCtrl = require('./controllers/user');
var dashboardUsers = require('./controllers/dashUsers');
var categoryCrtl = require('./controllers/category');
var productCrtl = require('./controllers/products');
var indexCrtl = require('./controllers/index');
var musicCrtl = require('./controllers/music');
var movieCtrl = require('./controllers/movies');
var foodCtrl = require('./controllers/food');
var carCtrl = require('./controllers/cars');
var reviewCtrl = require('./controllers/reviews');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var getUser = require('./lib/getUser.js');
var userRole = require('./lib/userRole.js');

module.exports = function (app) {

//----------- HOME -----------------------------
    app.use('/', function (req, res, next) {
        var id = req.cookies.sessionUser;
        getUser.findByUserId(id, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
              //  console.log('user found');
                req.currentUser = user;
            }
           // console.log('user', user);
            next()
        })
    });
    app.get('/', indexCrtl.welcome);

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
    app.use('/dashboard', function (req, res, next) {
        var id = req.cookies.sessionUser;
        userRole.userRole(id, function (err, user) {
            if (user) {
                next();
            }
            else {
                return res.redirect('/')
            }
        });
    });
    app.get('/dashboard', function (req, res) {
        var sessionUser = req.currentUser;
        var breadcrumbs = [{name: 'Dashboard', link: '/dashboard'}];
        res.render('views/dashboard', {breadcrumbs: breadcrumbs, user: sessionUser})
    });
    app.get('/dashboard/users', dashboardUsers.fillUsersTable);
    app.get('/dashboard/editUsers', dashboardUsers.createOrEditUserGET);
    app.post('/dashboard/editUsers', dashboardUsers.createOrEditUserPOST);
    app.get('/dashboard/deleteUsers', dashboardUsers.deleteUser);

    //----REVIEWS-----------------------------
    app.get('/dashboard/reviews', reviewCtrl.fillReviewTable);
    app.get('/dashboard/deleteReview', reviewCtrl.deleteReview);
    app.get('/dashboard/acceptReview', reviewCtrl.acceptReview);

    // categories-------------------------
    app.get('/dashboard/categories', categoryCrtl.fillCategoryTable);
    app.get('/dashboard/editCategory', categoryCrtl.createOrEditCategoryGET);
    app.post('/dashboard/editCategory', categoryCrtl.createOrEditCategoryPOST);
    app.get('/dashboard/deleteCategory', categoryCrtl.deleteCategory);

    //----PRODUCTS-----------------------------
    app.use('/products/:slug', productCrtl.getProductSlug);
    app.get('/products/:slug', productCrtl.individualProductPageGET);
    app.post('/products/:slug', productCrtl.individualProductPagePOST);

    app.get('/dashboard/products', productCrtl.fillProductTable);
    app.get('/dashboard/editProducts', productCrtl.createOrEditProductGET);
    app.post('/dashboard/editProducts', upload.single('poster'), productCrtl.createOrEditProductPOST);
    app.get('/dashboard/deleteProducts', productCrtl.deleteProduct);

    // cars-------------------------
    app.get('/categories/cars', carCtrl.findCarProducts); //change name of controllers here
    //food-------------------------
    app.get('/categories/food', foodCtrl.findFoodProducts);
    // movies-------------------------
    app.get('/categories/movies', movieCtrl.findMoviesProducts);
    // music-------------------------
    app.get('/categories/music', musicCrtl.findMusicProducts);

};