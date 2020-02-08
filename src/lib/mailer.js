const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e73e69bef340ed",
    pass: "5967eb5d9549d7"
  }
});

module.exports = transport;
