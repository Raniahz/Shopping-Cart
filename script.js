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

function validateSignUpForm() { // -----main validation function FOR SIGN UP PAGE!!!!!!
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
        return true
    }
    console.log(JSON.stringify(errors));

        for (var i = 0; i < errors.length; i++) {
            errors[i].field.innerHTML = errors[i].message;
        }
        return false
}

function validateLogInForm() { // ----main validation function FOR LOG IN PAGE !!!!!
    console.log("main validation function:");
    var emailResult = validateEmail(); // -----setting variable for email function
    var passwordResult = validatePassword(); // ----setting variable for password function

    if (emailResult && passwordResult) {
        console.log("if all functions are true, main function is true");
        return true; // ----if all fields are correct submit form
    }
    return false; // ----if either are not true do not submit
}

function setCookie(cname, cvalue, date) { // ---- function that makes cookies
    // var today = new Date(); // ---- time expiration for cookie
    //d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = '';

    if (date) {
        expires = "expires=" + date.toUTCString();
    }
    document.cookie = cname + "=" + cvalue; //+ ";" + expires;
    console.log("this is the cookie:");
    console.log(document.cookie); // ---- will print the cookie object
}

function getCookie(cname) {
    if (cname) {
        var firstSplit = document.cookie.split(";");
        console.log(firstSplit);
        for (var i = 0; i < firstSplit.length; i++) {
            if (firstSplit[i].indexOf(cname) != -1) {
                var secondSplit = firstSplit[i].split("=");
                console.log(secondSplit);
                console.log(secondSplit[i + 1]);
                return secondSplit[i + 1];
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
        setCookie("users", JSON.stringify(array));
    } else {
        var cookieArray = [];
        cookieArray.push(user);
        var cookieArrayString = JSON.stringify(cookieArray);
        setCookie("users", cookieArrayString);
    }
    //fucking done
}


//var name = document.forms["myForm"]["name"].value; //
//var email = document.forms["myForm"]["email"].value;
//var mobile = document.forms["myForm"]["mobile"].value;
//var age = document.forms["myForm"]["age"].value;
//var female = document.getElementById("female");
//var male = document.getElementById("male");
//var password = document.forms["myForm"]["password"].value;
//var repassword = document.forms["myForm"]["repassword"].value;
//if (female.checked) { // ----- if statement for the gender radio buttons cookie
//    var gender = "female";
//}
//else if (male.checked) {
//    var gender = "male";
//}
//var innerCookie =  // ------ make an object innCookie so that can put all into one big cookie
//{
//    "user": [
//        {
//            name: name,
//            email: email,
//            mobile: mobile,
//            age: age,
//            gender: gender,
//            password: password,
//            repassword: repassword
//        }
//    ]
//};
//document.cookie = "user" + JSON.stringify(innerCookie); + expires.toUTCString(); // ----- adds "myCookie" to the values that are now stores as array
//var loginCookie = document.cookie = "User logged in as:" + name + expires.toUTCString(); // ---- makes a cookie for user logging in '
//console.log(loginCookie); // ---- will print the login cookie
//userWelcome(); //---- calls the welcome heading function


//function getCookie(propOfCookie) { // ----- This will be the function that gets cookies
//    console.log("get cookie function is being applied");
//    var cookieStr = document.cookie;
//    var cookieValue = cookieStr.split(',');
//    console.log(cookieValue);
//
//    for (var i = 0; i < cookieValue.length; i++) {
//        console.log("the for statement");
//        if (cookieValue[i].indexOf(propOfCookie) != -1) {
//            console.log("the if statement");
//            var newCookieValue = cookieValue[i].split(":");
//            console.log("this is splitting the cookie by a colon");
//            console.log(newCookieValue);
//            console.log(newCookieValue[2].trim());
//            continue
//        }
//        return false;
//    }
//}


// ----- adding login welcome heading to main page
//function userWelcome(){
//    if()
///}


// ------ makes individual cookies for each log-in field
//document.cookie = "name =" + name; //expires=Thu, 25 Feb 2016 24:00:00 UTC;
//document.cookie = "email =" + email ;
//document.cookie = "mobile =" + mobile ;
//document.cookie = "age =" + age ;
//document.cookie = "gender =" + gender;
//document.cookie = "password =" + password ;
//document.cookie = "re-password =" + repassword ;



