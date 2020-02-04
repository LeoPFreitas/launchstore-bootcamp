const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db");

module.exports = session({
  store: new pgSession({
    pool: db
  }),
  secret: 'caducadu',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 15*60*1000 //15 minutos
  }
});
