const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.json());

const randomNum = (Math.random() + 1).toString(36).substring(7);
var users = [];

app.get("/", (req, res) => {
  res.send("hello worlds");
});

// health-status
app.get("/usermgmt/health-status", (req, res) => {
  res.send(`user management service up and running on pod ${randomNum}`);
});

// Get All users
app.get("/usermgmt/users", (req, res) => {
  return res.json(users);
});

// Get a single user
app.get("/usermgmt/user/:id", (req, res) => {
  return res.json(users.find(user => user.id == req.params.id));
});

// Create a new user
app.post("/usermgmt/user", (req, res) => {
  users.push(req.body);
  fetch(`http://${process.env.NOTIFICATION_SERVICE_HOST}:${process.env.NOTIFICATION_SERVICE_PORT}/`, {
    method: "POST",
    body: JSON.stringify({
      to: req.body.email,
      firstname: req.body.firstname,
      event: "newUser",
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => console.log("sending request to notification service"))
    .catch(err => console.error(err));

  return res.send("user created successfully");
});

// Update a user
app.put("/usermgmt/user/:id", (req, res) => {
  index = users.findIndex(user => user.id == req.params.id);
  users[index] = req.body;
  return res.send("user updated successfully");
});

// Delele a user
app.delete("/usermgmt/user/:username", (req, res) => {
  users = users.filter(user => user.username != req.params.username);
  return res.send("user deleted successfully");
});

app.listen(8085, () => console.log("usermgmt microservice listening on port 8085"));
