const Sequelize = require("sequelize");
const AWSXRay = require("aws-xray-sdk");
module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  dialect: "mysql",
  dialectModule: AWSXRay.captureMySQL(require("mysql2")),
});
