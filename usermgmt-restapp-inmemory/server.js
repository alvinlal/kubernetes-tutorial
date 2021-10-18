const express = require("express");
const app = express();
const randomNum = (Math.random() + 1).toString(36).substring(7);

var users = [];

app.use(express.json());

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

app.listen(8085, () => console.log("listening on port 3000"));
