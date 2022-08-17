const nodemailer = require("nodemailer");
const ejs = require("ejs");
const express = require('express')

const tiConnectedApp = express()


tiConnectedApp.post("/title-domain-name-email-state-branches-phone-city-companyname", (req, res) => {

  const { emailTo, title, domain, name, email, state, branches, phone, city, companyName } = req.body

  ejs.renderFile(__dirname + "./../template/ticonnected.ejs", { domain: domain, name: name, email: email, state: state, branches: branches, phone: phone, city: city, companyName: companyName }, function (err, data) {

    if (err) {
      console.log(err);
    } else {
      let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        ssl: true,
        tls: true,
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        }
      });

      var mainOptions = {
        from: 'formulario@isaquesestudios.com',
        to: emailTo,
        subject: title,
        html: data
      };
      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });
    }
  });
  res.send("enviou");
});

module.exports = tiConnectedApp