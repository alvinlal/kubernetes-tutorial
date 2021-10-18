const Sequelize = require("sequelize");
const db = require("../config/database.js");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.ENUM("ROLE_ADMIN", "ROLE_USER"),
    defaultValue: "ROLE_USER",
  },
  enabled: {
    type: Sequelize.BOOLEAN,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync().then(() => console.log("user table created"));

module.exports = User;
