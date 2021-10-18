const express = require("express");
const nodemailer = require("nodemailer");
const { welcomeEmail } = require("./emailTemplates");
const app = express();

app.use(express.json());

var mailOptions = {
  from: "alvinzzz2001@gmail.com",
  to: "alvinlal710@gmail.com",
  text: "this is a test notification",
};

var smtpTransporter = nodemailer.createTransport({
  port: 465,
  host: process.env.AWS_MAIL_SERVER_HOST,
  secure: true,
  auth: {
    user: process.env.AWS_MAIL_SERVER_USERNAME,
    pass: process.env.AWS_MAIL_SERVER_PASSWORD,
  },
  debug: true,
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/", (req, res) => {
  console.log("new request");
  switch (req.body.event) {
    case "newUser": {
      mailOptions.html = welcomeEmail(req.body.firstname);
      smtpTransporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.err(err);
        } else {
          console.log(`mail send successfully to ${req.body.to}`);
        }
        console.log(info);
      });
      break;
    }
    case "updateUser": {
    }
    default: {
      res.send({
        error: "No event provided",
      });
    }
  }
});

app.listen(8086, () => console.log("notification microservice listening on port 8086"));
