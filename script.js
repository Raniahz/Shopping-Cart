/**
 * Created by lamppostgroup on 2/15/16.
 */


function validateName() { // ----validate name function
    console.log("name validation:");
    var name = document.forms["myForm"]["name"].value;
    var nameErr = document.getElementById('nameErr');

    if (!name) { // ----check anything in name field
        console.log("name has no value");
        return { // ---- if false returns object
            field: nameErr,
            message: "name field must be filled out"
        };
    }
    console.log("name is right");
    //document.getElementById('errName').innerHTML = ""; // ----clear the name message if it is correct
    return undefined; // ----return if name has value
}

function validateEmail() { // -----validate email function
    console.log("email validation:");
    var email = document.forms["myForm"]["email"].value;
    var emailErr = document.getElementById('errEmail');
    var atsign = email.indexOf("@");
    var period = email.lastIndexOf("."); // ----variable assignment

    if (!email) { // check that email has a value

        console.log("email has no value");
        return { // ---- if false returns object
            field: emailErr,
            message: "email field must be filled out"
        };
    }
    else if (atsign < 1 || period < atsign + 2 || period + 2 >= email.length) {  // ----check if email field is correct
        //  document.getElementById('errEmail').innerHTML = "not a valid email address"; // ----error message 2 for email
        console.log("email doesnt have right characters");
        return { // ---- if false returns object
            field: emailErr,
            message: "email is not valid"
        };
    }
    console.log("email is right");
    return undefined; // ----if email has value and correct characters it is true
}

function validateMobile() { // -----validate phone number field
    console.log("mobile validation:");
    var mobile = document.forms["myForm"]["mobile"].value;
    var mobileErr = document.getElementById('errMobile');

    if (!mobile) { // -----check if anything in mobile field
        console.log("mobile has no value");
        return { // ---- if false returns object
            field: mobileErr,
            message: "mobile field must be filled out"
        };
    }
    else if (mobile.length < 10 || mobile.length > 10) { // -----make sure mobile is 10 digits
        console.log("mobile not right length");
        return { // ---- if false returns object
            field: mobileErr,
            message: "mobile not right length"
        };
    }
    else if (isNaN(mobile)) { // ----check to make sure only numbers
        console.log("mobile not right  characters");
        return { // ---- if false returns object
            field: mobileErr,
            message: "mobile is not number"
        };
    }
    console.log("mobile is right");
    return undefined; // -----if mobile has value and is right
}

function validateAge() { // -----validate age field
    console.log("age validation:");
    var age = document.forms["myForm"]["age"].value;
    var ageErr = document.getElementById('errAge');

    if (!age) { // ------check if anything in age field
        console.log("age has no value");
        return { // ---- if false returns object
            field: ageErr,
            message: "age field must be filled out"
        };
    }
    else if (isNaN(age)) { // ------check to make sure age is number
        console.log("age is not a number");
        return { // ---- if false returns object
            field: ageErr,
            message: "age is not a number"
        };
    }
    else if (age.length > 3) { // -----check to make sure is no bigger than 3 characters
        console.log("age not correct length");
        return { // ---- if false returns object
            field: ageErr,
            message: "age is not valid, cannot use more than 3 characters"
        };
    }
    console.log("age is right");
    return undefined;
}

function validateGender() { // ----- validate gender field
    console.log("gender validation:");
    var female = document.getElementById("female");
    var male = document.getElementById("male");
    var genderErr = document.getElementById('errGender');

    if ((female.checked == false) && (male.checked == false)) {
        console.log("gender validation not true");
        return { // ---- if false returns object
            field: genderErr,
            message: "gender must be checked"
        };
    }
    return undefined;
}

function validatePassword() { // ----validate password function
    console.log("password validation:");
    var password = document.forms["myForm"]["password"].value;
    var passwordErr = document.getElementById('errPassword');

    if (!password) { // ----check if   anything in password field
        console.log('password has no value');
        return { // ---- if false returns object
            field: passwordErr,
            message: "must enter password"
        };
    }
    else if (password.length <= 6 || password.length >= 12) {   // ----check if password field is correct
        console.log("password is not correct length");
        return {  // ---- if false returns object
            field: passwordErr,
            message: "password is not correct length"
        };
    }
    console.log("password is correct");
    return undefined; // ----if password has value and is correct length it will be true
}

function validateRepassword() { // ----validation re-password function
    console.log("RE-password validation:");
    var rePassword = document.forms["myForm"]["repassword"].value;
    var password = document.forms["myForm"]["password"].value;
    var rePasswordErr = document.getElementById('errRepassword');

    if (!rePassword) {
        console.log('REpassword has no value');
        return { // ---- if false returns object
            field: rePasswordErr,
            message: "must re-enter password"
        };
    }
    else if (rePassword !== password) {
        console.log('REpassword does not match password');
        return { // ---- if false returns object
            field: rePasswordErr,
            message: "passwords do not match"
        };
    }
    console.log("REpassword is correct");
    return undefined;
}


function welcome() {
    var cookieString = getCookie("loggedIn");
    var obj = JSON.parse(cookieString);
    var welcome = document.getElementById('welcome');
    console.log(welcome);
    if (welcome) {
        welcome.innerHTML = "Hello," + obj.name;
    }
}


function setCookie(cname, cvalue, days) { // ---- function that makes cookies
    var now = new Date(); // ---- time expiration for cookie
    now.setTime(now.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = '';
    if (days) {
        expires = "expires=" + now.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires;
    console.log("this is the cookie:");
    console.log(document.cookie); // ---- will print the cookie object
}

function getCookie(cname) {
    if (cname) {
        var firstSplit = document.cookie.split(";");
        console.log(firstSplit);
        // console.log(firstSplit);
        for (var i = 0; i < firstSplit.length; i++) {
            firstSplit[i] = firstSplit[i].trim();
            if (firstSplit[i].indexOf(cname) != -1) {
                var secondSplit = firstSplit[i].split("=");
                //   console.log(secondSplit);
                //   console.log(secondSplit[i + 1]);
                return secondSplit[1];
            }
        }
    }
    return null
}

function storeValues() {
    console.log("the store value function is being called");
    var name = document.forms["myForm"]["name"].value; // ----setting variable values for form fields
    var email = document.forms["myForm"]["email"].value;
    var mobile = document.forms["myForm"]["mobile"].value;
    var age = document.forms["myForm"]["age"].value;
    var female = document.getElementById("female");
    var male = document.getElementById("male");
    var password = document.forms["myForm"]["password"].value;
    var repassword = document.forms["myForm"]["repassword"].value;
    if (female.checked) { // ----- if statement for the gender radio buttons cookie
        var gender = "female";
    }
    else if (male.checked) {
        gender = "male";
    }
    var user = {
        "name": name,
        "email": email,
        "mobile": mobile,
        "age": age,
        "gender": gender,
        "password": password,
        "reppasword": repassword
    };
    console.log("the get cookie function is called now");
    var cook = getCookie("users");

    if (cook) {
        var array = JSON.parse(cook);
        array.push(user);
        setCookie("users", JSON.stringify(array), 5);
    } else {
        var cookieArray = [];
        cookieArray.push(user);
        var cookieArrayString = JSON.stringify(cookieArray);
        setCookie("users", cookieArrayString, 5);
    }
    //fucking done
}

function deleteCookies(cname) { // ---- this function deletes cookies
    console.log("this is the delete cookie function");
    setCookie(cname, "", -1);
}

function signUpController() { // -----main validation function FOR SIGN UP PAGE!!!!!!
    var errors = [];
    console.log("main validation function:");
    var nameRes = validateName(); // ----setting variable for name function
    var emailRes = validateEmail(); // -----setting variable for email function
    var mobileRes = validateMobile(); // ----setting variable for mobile function
    var ageRes = validateAge(); // ----setting variable for age function
    var genderRes = validateGender();
    var passRes = validatePassword(); // -----setting variable for password function
    var rePassRes = validateRepassword(); // -----setting variable for RE-password function

    if (nameRes) {
        errors.push(nameRes);
        console.log("error is found")
    }
    if (emailRes) {
        errors.push(emailRes);
        console.log("error is found")
    }
    if (mobileRes) {
        errors.push(mobileRes);
        console.log("error is found")
    }
    if (ageRes) {
        errors.push(ageRes);
        console.log("error is found")
    }
    if (genderRes) {
        errors.push(genderRes);
        console.log("error is found")
    }
    if (passRes) {
        errors.push(passRes);
        console.log("error is found")
    }
    if (rePassRes) {
        errors.push(rePassRes);
        console.log("error is found")
    }

    if (errors.length == 0) {
        storeValues();
        console.log("this should direct you to new page");
        window.location.href = "/Cart/login.html";
        return false
    }
    console.log(JSON.stringify(errors));

    for (var i = 0; i < errors.length; i++) {
        errors[i].field.innerHTML = errors[i].message;
    }
    return false
}

function logInController() { // ----main validation function FOR LOG IN PAGE !!!!!
    var errors = [];
    console.log("main validation function:");
    var emailRes = validateEmail(); // -----setting variable for email function
    var passRes = validatePassword(); // ----setting variable for password function
    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;

    if (emailRes) {
        errors.push(emailRes);
        console.log("error is found")
    }
    if (passRes) {
        errors.push(passRes);
        console.log("error is found")
    }
    if (errors.length == 0) {
        console.log("if no errors in error array");
        var userString = getCookie("users");
        var userObj = JSON.parse(userString);
        for (i = 0; i < userObj.length; i++) {
            console.log(userString);
            console.log(userObj);
            // console.log(userObj[i].email);
            var userEmail = userObj[i].email;
            var userPassword = userObj[i].password;
            if (userEmail == email && userPassword == password) {
                console.log('DID THIS EVEN HAPPEN IT MUST HAVE');
                var logInCookieObj = JSON.stringify(userObj[i]);
                setCookie("loggedIn", logInCookieObj, 5);
            }
            else {
                document.getElementById('messageArea').innerHTML = "make sure email/password are correct";
                return false;
            }
        }
        console.log("this should take you back home");
        window.location.href = "/Cart/index.html";
        return false; // --- needs to be true to submit
    }
    //console.log(JSON.stringify(errors));
    for (var i = 0; i < errors.length; i++) {
        errors[i].field.innerHTML = errors[i].message;
    }
    return false;
}

function homeController() {
    welcome();
    deleteCookies();
}
function aboutController() {

}
function contactController() {

}
function logOutController() {

}