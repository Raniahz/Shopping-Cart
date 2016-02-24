/**
 * Created by lamppostgroup on 2/15/16.
 */

function validateName() { // ----validate name function
    console.log("name validation");
    var name = document.forms["myForm"]["name"].value;

    if (!name) { // ----check anything in name field
        document.getElementById('errName').innerHTML = "must enter name"; // -----error message 1 for name
        console.log("name has no value");
        return false; // ----will return false if no value
    }
    console.log("name is right");
    document.getElementById('errName').innerHTML = ""; // ----clear the name message if it is correct
    return true; // ----return if name has value
}

function validateEmail() { // -----validate email function
    console.log("email validation");
    var email = document.forms["myForm"]["email"].value;
    var atsign = email.indexOf("@");
    var period = email.lastIndexOf("."); // ----variable assignment

    if (!email) { // check that email has a value
        document.getElementById('errEmail').innerHTML = "must enter email address"; // -----error message 1 for email
        console.log("email has no value");
        return false; // ----if no value will be false
    }
    else if (atsign < 1 || period < atsign + 2 || period + 2 >= email.length) {  // ----check if email field is correct
        document.getElementById('errEmail').innerHTML = "not a valid email address"; // ----error message 2 for email
        console.log("email has right characters");
        return false; // ----if characters are wrong will be false
    }
    console.log("email is right");
    document.getElementById('errEmail').innerHTML = ""; // ----clear the email message if it is correct
    return true; // ----if email has value and correct characters it is true
}

function validateMobile() { // -----validate phone number field
    console.log("mobile validation");
    var mobile = document.forms["myForm"]["mobile"].value;

    if (!mobile) { // -----check if anything in mobile field
        document.getElementById('errMobile').innerHTML = "must enter mobile number"; // ----error message 1 for mobile
        console.log("mobile has no value");
        return false; // will return false if no value
    }
    else if (mobile.length < 10 || mobile.length > 10) { // -----make sure mobile is 10 digits
        document.getElementById('errMobile').innerHTML = "must be 10 digits"; // error message 2 for mobile
        console.log("mobile not right length");
        return false; // will return false if mobile is not correct length
    }
    else if (isNaN(mobile)) { // ----check to make sure only numbers
        document.getElementById('errMobile').innerHTML = "must use only numbers"; // ----error message 3 for mobile
        console.log("mobile not right  characters");
        return false; // ----will return false if mobile is not right characters
    }
    console.log("mobile is right");
    document.getElementById('errMobile').innerHTML = ""; // ----clear the Mobile message if it is correct
    return true; // -----if mobile has value and is right length will be true
}

function validateAge() { // -----validate age field
    console.log("age validation");
    var age = document.forms["myForm"]["age"].value;
    if (!age) { // ------check if anything in age field
        document.getElementById('errAge').innerHTML = "must enter age"; // ----error message 1 for mobile
        console.log("age has no value");
        return false;
    }
    else if (isNaN(age)) { // ------check to make sure age is number
        document.getElementById('errAge').innerHTML = "must enter a number"; // ------error message 1 for mobile
        console.log("age is not a number");
        return false;
    }
    else if (age.length > 3) { // -----check to make sure is no bigger than 3 characters
        document.getElementById('errAge').innerHTML = "must be between 1 and 3 characters"; // -----error message 1 for mobile
        console.log("age not correct length");
        return false;
    }
    console.log("age is right");
    document.getElementById('errAge').innerHTML = ""; // -----clear the Age message if it is correct
    return true;
}

function validateGender() {
    var female = document.getElementById("female");
    var male = document.getElementById("male");
    if ((female.checked == false) && (male.checked == false)) {
        document.getElementById('errGender').innerHTML = "choose female or male"; // -----clear the Gender message if it is correct
        console.log("gender validation not true");
        return false;
    }
    document.getElementById('errGender').innerHTML = ""; // -----clear the Gender message if it is correct
    return true;
}

function validatePassword() { // ----validate password function
    console.log("password validation");
    var password = document.forms["myForm"]["password"].value;

    if (!password) { // ----check if   anything in password field
        document.getElementById('errPassword').innerHTML = "must enter a password"; // ----error message 1 for password
        console.log('password has no value');
        return false; //----will return false if no value
    }
    else if (password.length <= 6 || password.length >= 12) {   // ----check if password field is correct
        document.getElementById('errPassword').innerHTML = "password between 6 and 12 characters"; // ----error message 2 for password
        console.log("password is not correct length");
        return false; // ----will return false if the length is wrong
    }
    console.log("password is correct");
    document.getElementById('errPassword').innerHTML = ""; // ----clear the password message of it is correct
    return true; // ----if password has value and is correct length it will be true
}

function validateRepassword() { // ----validation re-password function
    console.log("RE-password validation");
    var rePassword = document.forms["myForm"]["repassword"].value;
    var password = document.forms["myForm"]["password"].value;
    if (!rePassword) {
        document.getElementById('errRepassword').innerHTML = "must re-enter a password"; // ----error message 1 for REpassword
        console.log('REpassword has no value');
        return false; // ----will return false if no value
    }
    else if (rePassword !== password) {
        document.getElementById('errRepassword').innerHTML = "password must match";  // ----error message 2 for REpassword
        console.log('REpassword does not match password');
        return false; // ----will return false if no value
    }
    console.log("REpassword is correct");
    document.getElementById('errRepassword').innerHTML = ""; // ----clear the REpassword message if it is correct
    return true;
}

function validateForm() { // -----main validation function FOR SIGN UP PAGE!!!!!!
    console.log("main validation function");
    var nameResult = validateName(); // ----setting variable for name function
    var emailResult = validateEmail(); // -----setting variable for email function
    var mobileResult = validateMobile(); // ----setting variable for mobile function
    var ageResult = validateAge(); // ----setting variable for age function
    var genderResult = validateGender();
    var passwordResult = validatePassword(); // -----setting variable for password function
    var rePasswordResult = validateRepassword(); // -----setting variable for RE-password function
    console.log("after give validation functions variable names");

    if (emailResult && passwordResult && rePasswordResult && nameResult && mobileResult && ageResult && genderResult) {
        console.log("if all functions are true, main function is true and here are some cookies");
        makeCookie();
        return true; // ----if all fields are correct submit form
    }
    return false; // ----if either are not true do not submit
}

function validateForm1() { // ----main validation function FOR LOG IN PAGE !!!!!
    console.log("main validation function");
    var emailResult = validateEmail(); // -----setting variable for email function
    var passwordResult = validatePassword(); // ----setting variable for password function

    console.log("after give validation functions variable names");

    if (emailResult && passwordResult) {
        console.log("if all functions are true, main function is true");
        return true; // if all fields are correct submit form
    }
    return false; // if either are not true do not submit
}

// ------ cookies
function makeCookie() {
    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var mobile = document.forms["myForm"]["mobile"].value;
    var age = document.forms["myForm"]["age"].value;
    var female = document.getElementById("female");
    var male = document.getElementById("male");
    var password = document.forms["myForm"]["password"].value;
    var repassword = document.forms["myForm"]["repassword"].value;

    if (female.checked) {
        var gender = "female"
    }
    else if (male.checked) {
        var gender = ""
    }
    //
    //document.cooke = "cookies=" + JSON.stringify({
    //        name1: name,
    //        email1: email,
    //        mobile1: mobile,
    //        age1: age,
    //        gender1: gender,
    //        password1: password,
    //        repassword1: repassword
    //    });

    document.cookie = "name =" + name; //expires=Thu, 25 Feb 2016 24:00:00 UTC;
    document.cookie = "email =" + email ;
    document.cookie = "mobile =" + mobile ;
    document.cookie = "age =" + age ;
    document.cookie = "gender =" + gender;
    document.cookie = "password =" + password ;
    document.cookie = "re-password =" + repassword ;
}


//function makeCookie(key, value) {
//    document.cookie = key + '=' + value;
//}
//
//makeCookie('name', document.forms["myForms"]["name"].value);
