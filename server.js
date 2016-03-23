/**
 * Created by lamppostgroup on 3/16/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var storage = {};

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));

// ----CORS to override
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send(JSON.stringify(storage));
});

app.get('/store/:key', function (req, res) {
    if (!req.params.key) {
        return res.send('BAD KEY');
    }
    res.send(storage[req.params.key] ? storage[req.params.key] : '');
});

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

// added this below
//app.delete('/user', function (req, res) {
//    res.send('Got a DELETE request at /user');
//});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
