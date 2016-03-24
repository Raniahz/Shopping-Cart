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



