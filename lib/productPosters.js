var fs = require('fs');
exports.makeDirectory = function (path) {
    console.log(path);
    var pathArray = path.split('/');
    console.log(pathArray);
    for (var i = 0; i < pathArray.length; i++) {
        fs.stat(pathArray[i], function(err, stats){
            if(!stats){
                console.log('heyy',pathArray[0] );
                fs.mkdir(pathArray[i], function(err){
                    if(err){
                        console.log(err);
                    }
                })
            }
        })
    }

};