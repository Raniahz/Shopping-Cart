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

function storeValues() { // ------  STORES VALUES FROM FORM TO STORE
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
    var user = { // --- sets the object user that will be cookie/ls
        "name": name,
        "email": email,
        "mobile": mobile,
        "age": age,
        "gender": gender,
        "password": password,
        "reppasword": repassword
    };

    console.log('before passport');

    //passport.signUp(user, function (res) {
    //    console.log(res);
    //    var obj = res;
    //    console.log(obj);
    //    if (obj.error == true) {
    //        console.log('if error is true');
    //        var msg = document.getElementById(obj.field);
    //        msg.innerHTML = obj.message;
    //        return
    //    }
    //    console.log('before return');
    //    document.getElementById("myForm").submit();
    //    //return true;
    //    //  window.location.href = "/views/login.html";
    //});

}

function welcome() {
    storage.getValue('user', function (welcomeString) {
        console.log(welcomeString);
        var userObj = JSON.parse(welcomeString);
        console.log(userObj[0]);
        var welcome = document.getElementById('welcome');
        console.log(userObj[0].name);
        welcome.innerHTML = 'hello ' + userObj[0].name;
    });
}

function logOut() {
    console.log("log out funct");
    storage.getValue('user', function (userString) {
        console.log(userString);
        var person = JSON.parse(userString);
        console.log(person[0]);

        passport.logOut(person[0], function (res) {
            console.log('logout passport');
            storage.deleteValue('user', function () {
                console.log("this should direct you to new page");
                window.location.href = "/views/login.html";

            });
        })
    });
}

function signUpController() { // ----- validation FOR SIGN-UP PAGE
    var errors = [];
    console.log("main validation function:");
    var nameRes = validateName(); // ---- variable for name function
    var emailRes = validateEmail(); // ----- variable for email function
    var mobileRes = validateMobile(); // ---- variable for mobile function
    var ageRes = validateAge(); // ---- variable for age function
    var genderRes = validateGender();
    var passRes = validatePassword(); // ----- variable for password function
    var rePassRes = validateRepassword(); // ----- variable for RE-password function

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
    console.log(JSON.stringify(errors));

    for (var i = 0; i < errors.length; i++) { // ----- loop through array of errors
        console.log('looping through errors');
        errors[i].field.innerHTML = errors[i].message;
    }
    if (errors.length == 0) { // ---- if no errors, sign up and make cookie/ls
        console.log('no errors are found store values is called');
        storeValues();
        //    return true
    }
    console.log(errors.length);
    console.log('return false');
    return false;

}

function logInController() { // ----validation FOR LOGIN
    var errors = [];
    console.log("main validation function:");
    var emailRes = validateEmail(); // -----setting variable for email
    var passRes = validatePassword(); // ----setting variable for password
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
    if (errors.length == 0) { // ---- if no errors in array
        console.log("if no errors in error array");

        passport.logIn({email: email, password: password}, function (res) {
            console.log(res);
            storage.setValue('user', res, 1, function () {
                window.location.href = "/views/index.html"
            });
        });
    }
    for (var i = 0; i < errors.length; i++) { // --- if any errors in form show message
        errors[i].field.innerHTML = errors[i].message;
    }
    return false; // --- needs to be true to submit
}

