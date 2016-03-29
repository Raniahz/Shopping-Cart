/**
 * Created by lamppostgroup on 3/14/16.
 */

function Cookie() {
    this.setValue = function (cname, cvalue, days, callback) {
        // if () {
        var now = new Date();
        now.setTime(now.getTime() + (days * 24 * 60 * 60 * 1000));
        if (days) {
            var expires = "expires=" + now.toUTCString();
        }
        callback(document.cookie = cname + "=" + cvalue + ";" + expires);
        //  }
        // callback(null);

    };
    this.getValue = function (cname, callback) {
        if (cname) {
            console.log('if cname exists');
            var firstSplit = document.cookie.split(";");
            console.log(firstSplit);
            for (var i = 0; i < firstSplit.length; i++) {
                firstSplit[i] = firstSplit[i].trim();
                if (firstSplit[i].indexOf(cname) != -1) {
                    var secondSplit = firstSplit[i].split("=");
                    //   console.log(secondSplit[i+1]);
                    console.log(secondSplit[1]);
                    return callback(secondSplit[1]);

                }
            }
        }
        console.log('null');
        callback(null);
    };
    this.deleteValue = function (cname, callback) {
        callback(this.setValue(cname, "", -1));
    }
}
function LocalStore() {

    this.setValue = function (cname, cvalue, days, callback) {
        callback(localStorage.setItem(cname, cvalue));
    };
    this.getValue = function (cname, callback) {
        console.log("get value fnc");
        if (cname) {
            console.log('cname exists');
            return callback(localStorage.getItem(cname));
        }

        callback(null);
    };
    this.deleteValue = function (cname, callback) {
        callback(localStorage.removeItem(cname));
    }
}

function ServerStorage() {
    this.setValue = function (cname, cvalue, days, callback) {
        var http = new XMLHttpRequest();
        http.open("POST", 'http://localhost:3000/store', true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //  http.setRequestHeader("Content-length", cvalue.length);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
                callback(http.responseText);
            }
        };
        http.send("key=" + cname + "&value=" + cvalue);
    };
    this.getValue = function (cname, callback) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
                callback(http.responseText);
            }
        };
        http.open("GET", 'http://localhost:3000/store/' + cname, true);
        http.send(null);
    };
    this.deleteValue = function (cname, callback) {
        var http = new XMLHttpRequest();
        http.open("POST", 'http://localhost:3000/store/delete', true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                callback(http.responseText);
            }
        };
        // http.open('DELETE', 'http://localhost:3000/store', true);
        http.send("key=" + cname);

    };
}


function Passport() {
    this.signUp = function () {
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

        if (errors.length == 0) { // ---- if no errors, sign up and make cookie/ls
            storeValues();
            return false
        }
        console.log(JSON.stringify(errors));

        for (var i = 0; i < errors.length; i++) { // ----- loop through array of errors
            errors[i].field.innerHTML = errors[i].message;
        }
        return false
    };
    this.logIn = function () {
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

            instance.getValue('user', function (userString) {
                console.log(userString);
                var userObj = JSON.parse(userString);
                //console.log('__________________',userObj);
                //console.log(userObj[0]);
                //console.log(userObj[1]);
                if (!userObj) {
                    // alert('you must first login');
                    return;
                }
                for (var i = 0; i < userObj.length; i++) { //---- loops through array of object to see if user matches
                    console.log('var def');
                    var userEmail = userObj[i].email;
                    var userPassword = userObj[i].password;
                    //console.log('here: ',userObj[i].email);
                    console.log("if email and password match");

                    if (userEmail == email && userPassword == password) { //--- if log in info matches info in storage
                        //console.log("new ob", userEmail);
                        var logInCookieObj = JSON.stringify(userObj[i]); //---- turns object back into string
                        //    console.log(logInCookieObj);
                        instance.setValue('loggedIn', logInCookieObj, null, function () {

                            console.log("success________________");
                            window.location.href = "/Cart/index.html"; //----- redirects page to home
                        });
                        //    //   break;
                    }
                    else { // ---- if no matching cookie returns error message
                        document.getElementById('messageArea').innerHTML = "make sure email/password are correct";
                        //return false;
                    }
                }
            });
        }
        for (var i = 0; i < errors.length; i++) { // --- if any errors in form show message
            errors[i].field.innerHTML = errors[i].message;
        }
        return false; // --- needs to be true to submit
    };
    this.logOut = function () {
        console.log("log out funct");
        instance.deleteValue('loggedIn', function () {
            console.log("this should direct you to new page");
            //  window.location.href = "/Cart/login.html";
        })
    }
}

//var instance = new ServerStorage();
//instance.setValue('name', 123, function (response) {
//    console.log("set",response);
//    instance.getValue('name', function (response) {
//        console.log("get",response);
//        instance.deleteValue('name', function (response) {
//            console.log("del",response);
//            instance.getValue('name', function (response) {
//                console.log("get2",response);
//            });
//
//        });
//    });
//});

var instance = new Cookie();
var pass = new Passport();



