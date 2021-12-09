var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var router = require('./router/router');
var user = require('./router/user')

var app = express();
var url = 'mongodb://localhost/expressApi';

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.connect(url);
var con = mongoose.connection
con.on('open', ()=> {
    console.log("connected")
})

app.use('/', router);
app.use('/user', user);

app.listen(3000);