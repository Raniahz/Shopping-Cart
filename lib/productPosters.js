var fs = require('fs');
var config = require('../config');

exports.makeProductDirectories = function () {
    var pathArray = config.productPath.split('/');
    var path = config.root;
    for (var i in pathArray) {
        path = path + '/' + pathArray[i];
        try {
            fs.statSync(path);
        } catch (e) {
            try {
                fs.mkdirSync(path);
            }catch (e){
                return e;
            }
        }
    }
    /*console.log('patharray', pathArray);
     var newPath = config.root + '/' + pathArray[0];
     console.log(newPath);
     fs.stat(newPath, function (err, stats) {
     console.log('stat', stats);
     if (err) {
     console.log(err);
     }
     if (stats) {
     fs.stat(newPath + '/' + pathArray[1], function (err, stats) {
     console.log('stat2', stats);
     if (!stats) {
     fs.mkdir(newPath + '/' + pathArray[1], function (err) {
     console.log('making directory: posters');
     if (err) {
     console.log('der err', err);
     }
     fs.stat(newPath + '/' + pathArray[1] + '/' + pathArray[2], function (err, stats) {
     if (err) {
     console.log(err);
     }
     if (!stats) {
     fs.mkdir(newPath + '/' + pathArray[1] + '/' + pathArray[2], function (err) {
     console.log('making directory : products');
     if (err) {
     console.log(err);
     }
     callback();
     })
     }
     });
     });
     }
     });
     }
     else {
     fs.mkdir('/' + pathArray[0], function (err) {
     console.log('making public directory');
     if (err) {
     console.log('der err', err);
     }

     });
     }
     });*/
};


