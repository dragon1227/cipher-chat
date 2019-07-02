const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { User, validate, generateToken } = require("../models/user");

// Get Active User
router.get("/auth", [auth], async (req, res) => {
  const { auth } = req;

  const user = await User.findOne({ auth });
  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  res.send(user);
});

// Register
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let user = new User(req.body);
  user = await user.save();

  res.status(201).send(user);
});

// Login / Authentication
router.post("/auth", async (req, res) => {
  const { auth } = req.body;

  const user = await User.findOne({auth});
  if (!user) return res.status(404).send("Wrong credentials");

  const userToken = generateToken(auth);

  res.send(userToken);
});

// Account Deletion
router.delete("/:_id", [auth], async (req, res) => {
  let user = await User.findByIdAndDelete(req.params._id);
  if (!user) return res.status(404).send("User was not found.");

  res.send(user);
});

module.exports = router;
