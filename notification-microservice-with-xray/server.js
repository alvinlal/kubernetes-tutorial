const AWSXRay = require("aws-xray-sdk");
const XRayExpress = AWSXRay.express;

const express = require("express");

AWSXRay.captureHTTPsGlobal(require("http"));
AWSXRay.captureHTTPsGlobal(require("https"));

const nodemailer = require("nodemailer");
const { welcomeEmail } = require("./emailTemplates");
const app = express();

app.use(express.json());

app.use(XRayExpress.openSegment("notification-microservice"));

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
          console.error(err);
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

app.use(XRayExpress.closeSegment());

app.listen(8096, () => console.log("notification microservice listening on port 8096"));
