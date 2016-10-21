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
            } catch (e) {
                return e;
            }
        }
    }
};
exports.deleteProductFile = function (filePath) {
  //  console.log('removing file: err');
   // console.log(filePath);
    var path = config.root + '/' + filePath;
    fs.unlinkSync(path);
};

