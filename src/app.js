const express = require("express");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const cors = require('cors')

const tiConnected = require('./router')
require('dotenv').config()

// const data = require('./../config/config.json')


const app = express()
app.use(express.json())


app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(tiConnected)


app.post("/number-email", (req, res) => {

    const { emailTo, title, domain, number, email, messagem } = req.body

    ejs.renderFile(__dirname + "/template/email-number.ejs", {
        domain: domain,
        number: number,
        email: email,
        messagem: messagem
    }, function (err, data) {
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

app.post("/ticonnected", (req, res) => {

    const { emailTo, title, domain, name, email, phone, state, city, branches, companyName, message } = req.body

    ejs.renderFile(__dirname + "/template/email-number.ejs", {
        // domain: domain,
        // name: name,
        // email: email,
        // phone: phone,
        // state: state,
        // city: city,
        // branches: branches,
        // companyName: companyName,
        // message: message

        domain: domain,
        number: number,
        email: email,
        message: message
    }, function (err, data) {
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



app.listen(process.env.PORT || 3333, () => {
    console.log("Rodando ...");
});