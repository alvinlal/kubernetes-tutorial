const express = require("express");
const app = express();
const db = require("./config/database");
const { cache, setCache } = require("./config/redis");
const User = require("./models/User");
const randomNum = (Math.random() + 1).toString(36).substring(7);

app.use(express.json());

db.authenticate()
  .then(() => console.log("Mysql database connected"))
  .catch(err => console.error(err));

// health-status
app.get("/usermgmt/health-status", (req, res) => {
  res.send(`user management service up and running on pod ${randomNum}`);
});

// Get All users
app.get("/usermgmt/users", (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => console.error(err));
});

// Get a single user
app.get("/usermgmt/user/:id", cache, async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  setCache(id, JSON.stringify(user));
  return res.json(user);
});

// Create a new user
app.post("/usermgmt/user", (req, res) => {
  User.create(req.body)
    .then(() => res.send("User added successfully!"))
    .catch(err => console.err(err));
});

// Update a user
app.put("/usermgmt/user/:id", (req, res) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send("User updated successfully!"))
    .catch(err => console.error(err));
});

// Delele a user
app.delete("/usermgmt/user/:username", (req, res) => {
  User.destroy({ where: { username: req.params.username } })
    .then(() => res.send("User deleted successfully!"))
    .catch(err => console.error(err));
});

app.listen(3000, () => console.log("listening on port 3000"));
