//---------validate form fields

exports.validateName = function (name) { // ----validate name function
    console.log("name validation:");
    //var name = document.forms["myForm"]["name"].value;
    //var nameErr = document.getElementById('nameErr');
    if (!name) { // ----check anything in name field
        console.log("name has no value");
        return { // ---- if false returns object
            field: "nameErr",
            message: "name field must be filled out"
        };
    }
    console.log("name is right!");
    return undefined; // ----return if name has value
};

exports.validateEmail = function (email) { // -----validate email function
    console.log("email validation:");
    console.log(email);
    //var email = document.forms["myForm"]["email"].value;
    //var emailErr = document.getElementById('errEmail');
    var atsign = email.indexOf("@");
    var period = email.lastIndexOf("."); // ----variable assignment
    if (!email) { // check that email has a value
        console.log("email has no value");
        return { // ---- if false returns object
            field: "emailErr",
            message: "email field must be filled out"
        };
    }
    else if (atsign < 1 || period < atsign + 2 || period + 2 >= email.length) {  // ----check if email field is correct
        console.log("email doesnt have right characters");
        return { // ---- if false returns object
            field: "emailErr",
            message: "email is not valid"
        };
    }
    console.log("email is right!");
    return undefined; // ----if email has value and correct characters it is true
};

exports.validateMobile = function (mobile) { // -----validate phone number field
    console.log("mobile validation:");
    //var mobile = document.forms["myForm"]["mobile"].value;
    //var mobileErr = document.getElementById('errMobile');
    console.log(mobile);
    if (!mobile) { // -----check if anything in mobile field
        console.log("mobile has no value");
        return { // ---- if false returns object
            field: "mobileErr",
            message: "mobile field must be filled out"
        };
    }
    else if (mobile.length < 9 || mobile.length > 11) { // -----make sure mobile is 10 digits
        console.log("mobile not right length");
        return { // ---- if false returns object
            field: "mobileErr",
            message: "mobile not right length"
        };
    }
    else if (isNaN(mobile)) { // ----check to make sure only numbers
        console.log("mobile not right  characters");
        return { // ---- if false returns object
            field: "mobileErr",
            message: "mobile is not number"
        };
    }
    console.log("mobile is right!");
    return undefined; // -----if mobile has value and is right
};

exports.validateAge = function (age) { // -----validate age field
    console.log("age validation:");
    // var age = document.forms["myForm"]["age"].value;
    //  var ageErr = document.getElementById('errAge');
    age = parseInt(age);
    console.log(age);
    if (!age) { // ------check if anything in age field
        console.log("age has no value");
        return { // ---- if false returns object
            field: "ageErr",
            message: "age field must be filled out"
        };
    }
    else if (isNaN(age)) { // ------check to make sure age is number
        console.log("age is not a number");
        return { // ---- if false returns object
            field: "ageErr",
            message: "age is not a number"
        };
    }
    else if (age > 300) { // -----check to make sure is no bigger than 3 characters
        console.log("age not correct length");
        return { // ---- if false returns object
            field: "ageErr",
            message: "age is not valid, cannot use more than 3 characters"
        };
    }
    console.log("age is right!");
    return undefined;
};

exports.validateGender = function (gender) { // ----- validate gender field
    console.log(gender);
    //if(gender == 'female'){
    //    return {gender: 'female'}
    //}
    //if(gender == 'male'){
    //    return {gender: 'male'}
    //}
    //console.log("gender validation:");

    //if(!gender){
    //    return {
    //        field: "genderErr",
    //        message: "gender must be checked"
    //    };
    //}
    // console.log("gender is right!");
    //return undefined;
    // var female = document.getElementById("female");
    // var male = document.getElementById("male");
    // var genderErr = document.getElementById('errGender');
    //if ((female.checked == false) && (male.checked == false)) {
    //    console.log("gender validation not true");
    //    return { // ---- if false returns object
    //        field: "genderErr",
    //        message: "gender must be checked"
    //    };
    //}
};

exports.validatePassword = function (password) { // ----validate password function
    console.log("password validation:");
    if (!password) { // ----check if   anything in password field
        console.log('password has no value');
        return { // ---- if false returns object
            field: "passwordErr",
            message: "must enter password"
        };
    }
    else if (password.length <= 6 || password.length >= 12) {   // ----check if password field is correct
        console.log("password is not correct length");
        return {  // ---- if false returns object
            field: "passwordErr",
            message: "password is not correct length"
        };
    }
    console.log("password is correct!");
    return undefined; // ----if password has value and is correct length it will be true
};

exports.validateRepassword = function (repassword, password) { // ----validation re-password function
    console.log("RE-password validation:");
    if (!repassword) {
        console.log('REpassword has no value');
        return { // ---- if false returns object
            field: "repasswordErr",
            message: "must re-enter password"
        };
    }
    else if (repassword !== password) {
        console.log('REpassword does not match password');
        return { // ---- if false returns object
            field: "repasswordErr",
            message: "passwords do not match"
        };
    }
    console.log("REpassword is correct");
    return undefined;
};


// validation for dashboard does not require fields to be filled in
exports.validatePasswordDashboard = function (password) { // ----validate password function
    console.log("password validation:");
    if (!password) {
        return null
    }
    if (password.length <= 6 || password.length >= 12) {   // ----check if password field is correct
        console.log("password is not correct length");
        return {  // ---- if false returns object
            field: "passwordErr",
            message: "password is not correct length"
        };
    }
    //  console.log("password is correct!");
    return undefined; // ----if password has value and is correct length it will be true


};
exports.validateRepasswordDashboard = function (repassword, password) { // ----validation re-password function
    console.log("RE-password validation:");
    if (repassword !== password) {
        console.log('REpassword does not match password');
        return { // ---- if false returns object
            field: "repasswordErr",
            message: "passwords do not match"
        };
    }
    console.log("REpassword is correct");
    return undefined;
};