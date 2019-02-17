//requires
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shopdb',
  {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
}
);

require('./routes')(app)

// app.use(session({
//   secret: 'mysupersecret',
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   cookie: { maxAge: 180 * 60 * 1000 }
// }));

app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT || 8081)

module.exports = app;