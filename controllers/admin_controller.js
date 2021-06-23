const User = require('../models/user');
const bcrypt = require('bcrypt')

exports.postRegister = async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        email: req.body.email,
        password: hashedPassword
    })
    console.log(req.body);
    try {
        let checkUser = await User.find({ email: req.body.email });
        console.log(checkUser);
        if (!checkUser.length) {
            const addedUser = await newUser.save();
            res.status(201).json(addedUser);
        } else res.status(400).json({ message: "User already exists" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    //   res.redirect('/login/')
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return
        //res.redirect('/api/admin/')
        res.json({ message: "Nie zalogowany" })
    }
    next()
}