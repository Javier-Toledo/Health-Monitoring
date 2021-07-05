const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const {User} = require('../models');

// Create a passport middleware to handle User login by email and password
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await User.findOne({ where: { email, status: true, authentication: true } }); // buscar el usuario, que sea activo y autenticado
    if (!user) {
      // If the user isn't found in the database, return a message
      return done(null, false, { message: 'User not found or not authenticated.' });
    }

    const validado = await user.isValidPassword(password); // isValidPassword() debe ser creado en el modelo Usuario

    if (!validado) {
      return done(null, false, { message: 'Incorrect access data' });
    }

    // si es valido, continuar con la petición, pasándole los datos del usuario autenticado
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  // secret we used to sign our JWT
  secretOrKey: process.env.TOKEN_SECRET,
  // we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
}, async (token, done) => {
  try {
    //  Pass the user details to the next middleware
    return done(null, { ...token.user, tokenExp: token.exp });
  } catch (error) {
    return done(error);
  }
}));