const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.getRegister = async(req, res) => {
    res.render('register.ejs')
}
exports.postRegister = async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        email: req.body.email,
        password: hashedPassword
    })
    try {
        let checkUser = await User.find({ email: req.body.email });
        if (!checkUser.length) {
            const addedUser = await newUser.save();
            res.status(201).render('index.ejs', { message: addedUser.email });
            console.log('new admin registered' + addedUser)
        } else res.status(400).json({ message: "User already exists" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getAutLogin = async(req, res) => {
    console.log(req.user.email, 'check');
    res.json({ message: req.user })
}

exports.getNotAutLogin = async(req, res) => {
    res.json({ message: 'Nieprawidłowe dane logowania' })
}

exports.postLogin = async(req, res) => {
    //checkNotAuthenticated, 
    console.log(req.user, 'logged in');
    res.json({ message: req.user.email || req.message })

}
exports.getLogout = async(req, res) => {
    console.log(req.user, 'logged out')
    req.logout()
    res.json({ message: "Zostałeś wylogowany" })
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