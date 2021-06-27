require('dotenv').config();

const express = require('express');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const port = 3000
const initializePassport = require('./passport-config');

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

app.listen(process.env.PORT || port, () => {
    console.log('TripApp started');
})