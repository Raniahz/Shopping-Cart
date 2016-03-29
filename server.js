/**
 * Created by lamppostgroup on 3/16/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var storage = {};


app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) { // ----CORS to override
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    console.log('message rec\'d');
    res.send(JSON.stringify(storage));
});
app.get('/store/:key', function (req, res) {
    if (!req.params.key) {
        return res.send('BAD KEY');
    }
    console.log('message post', req.params.key);
    res.send(storage[req.params.key] ? storage[req.params.key] : '');
});

//
//app.post('/users', function (req, res) {
//    if (!User) {
//        return res.send("no data");
//    }
//    console.log('');
//
//    res.send(User);
//
//});

app.post('/store', function (req, res) {
    if (!req.body.key) {
        return res.send('BAD KEY');
    }
    if (!req.body.value) {
        return res.send('BAD VALUE');
    }
    storage[req.body.key] = req.body.value;
    res.send('ok');
});
app.post('/store/delete', function (req, res) {
    console.log(req.body);
    if (!req.body.key) {
        return res.send('BAD KEY');
    }
    delete storage[req.body.key];

    res.send('ok');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
