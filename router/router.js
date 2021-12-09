var express = require('express');
var router = express.Router();
// var user = require('./user');

router.get('/index',  (req, res) => {
    res.send("hello")
})

router.get('/about/:id',  (req, res) => {
    res.send("about us "+req.params.id)
})

module.exports = router;