require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')

require('./middlewares/auth');
const models = require('./models');
const routes = require('./routes');
const unprotectedRoutes = require('./routes/unprotectedRoutes');

models.sequelize.authenticate()
  .then(() =>
    console.log("BD connected"))
  .catch((error) => console.log(error));

const app = express();

app.set('port', process.env.APP_PORT);

// enable bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable cors
app.use(cors());

app.enable('trust proxy');

// app routes
app.use('/', unprotectedRoutes(
  // public folder
  app.use(express.static('uploads/users')),
  ));
  
app.use('/', passport.authenticate('jwt', { session:false}), routes());

// server port
app.listen(app.get('port'), () => {
  console.log(`up and runnig on port ${app.get('port')}`);
});