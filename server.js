/*if (process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}*/

require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config');
const adminController = require('./controllers/admin_controller');

const app = express();

const mongoose = require('mongoose');
const router = require('./routes/index');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));
const User = require('./models/user');

initializePassport(
    passport,
    async email => email = await User.find({ email: email }),
    async id => id = await User.find({ _id: id })
)
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(express.json());
app.use('/', router);
//app.use('/places', router);



//sprawdzić

/*
app.get('/api/admin/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { email: req.user.email })
})


app.get('/api/admin/', checkNotAuthenticated, (req, res) => {
    res.json({ email: req.user.email })
})

app.post('/api/admin/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/api/places/',
    failureRedirect: '/api/admin/',
    failureFlash: true
}))

app.delete('/api/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})
*/

app.get('/api/admin/', adminController.checkAuthenticated, (req, res) => {
    console.log(req.user, 'check');
    res.json({ message: req.user })
})

app.get('/api/admin/', adminController.checkNotAuthenticated, (req, res) => {
    res.json({ message: 'Nieprawidłowe dane logowania' })
})

app.post('/api/admin/',
    //checkNotAuthenticated, 
    passport.authenticate('local', { failureFlash: true, failureMessage: "Nieprawidłowe dane logowania" }), (req, res) => {
        console.log(req.user, 'logged in');
        res.json({ message: req.user.email || req.message })
    })

app.get('/api/logout/', (req, res) => {
        console.log(req.user, 'logged out')
        req.logout()
        res.json({ message: "Zostałeś wylogowany" })
    })
    /*
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        //   res.redirect('/login/')
    }

    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return
            //res.redirect('/api/admin/')
            res.json({ message: "Nie zalogowany" })
        }
        next()
    }

    */
app.listen(3000, () => {
    console.log('TripApp started');
})