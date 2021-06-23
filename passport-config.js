const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async(email, password, done) => {
        let user = await getUserByEmail(email)
        user = user[0];
        if (user == null) {
            console.log('zły user')
            return done(null, false, { message: 'Nieprawidłowe dane logowania' })
        }
        try {

            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                console.log('złe hasło')
                return done(null, false, { message: 'Nieprawidłowe dane logowania' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async(id, done) => {
        return done(null, await getUserById(id))
    })

}

module.exports = initialize