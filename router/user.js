var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs')

//register
router.post('/register', async (req, res) => {

    var password = await bcrypt.hash(req.body.password, 10)

    User.find({ name: req.body.name })
        .then((user) => {
            if (user.length == 0) {
                const user = new User({
                    name: req.body.name,
                    password: password
                });
                user.save()
                    .then((response) => {
                        res.json({
                            "message": "User registered successfully",
                            "user": response,
                            "status": 200
                        })
                    })
                    .catch((error) => {
                        res.json({
                            "error": error
                        })
                    })

            } else {
                res.json({
                    "message": "User Name already exist."
                })
            }
        })
        .catch((error) => {
            res.json({"error": error})
        })
});

//login
router.get('/login', async (req, res) => {

    User.find({name: req.body.name})
    .then((user) => {
        if(user.length > 0) {
            const hashedPwd = user[0].password
            bcrypt.compare(req.body.password, hashedPwd)
            .then((result) => {
                if(result) {
                    res.json({
                        "message": "Logged in Successfully",
                        "user": user,
                        "status": 200
                    })
                } else {
                    res.json({
                        "message": "Password doesnot matched",
                        "status": 401
                    })
                }
            })
            .catch((error) => {
                res.json({
                    "error": error
                })
            })
        } else{
            res.send({
                "message": "User does not exist",
                "status": 404
            })
        }
    })
    .catch((error) => {
        res.send(error)
    })
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.json({
            "message": "User does not exist",
            "status": 404
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (req.body.name) {
            user.name = req.body.name
        }

        if (req.body.address) {
            user.address = req.body.address
        }

        const updatedUser = await user.save()
        res.json(updatedUser)
    } catch (error) {
        res.json({
            "message": "User does not exist",
            "status": 404
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        res.json({
            "message": "User Deleted Successfully"
        })
    } catch (error) {
        res.json({
            "message": "User does not exist",
            "status": 404
        })
    }
})

module.exports = router