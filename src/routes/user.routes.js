const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authMiddleware = require("../middlewares/authMiddleware");

const app = express.Router();

app.get("/", async (req, res) => {
  const users = await User.find().populate({
    path: "friendRequests",
    select: { password: 0 },
  });

  try {
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.get("/:id/friends", async (req, res) => {
  const { id } = req.params;
  const userById = await User.findById(id);

  try {
    return res.status(200).send(userById.friends);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.post("/:id/friends", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userById = await User.findById(id);
  const { userId } = req;

  try {
    userById.friendRequests.push({ _id: userId });
    await userById.save();
    return res.status(201).send({ message: "Friend request sent" });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password, dob, bio } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(403).send({ message: "User already exists" });
    }

    const hash = await argon2.hash(password);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      dob,
      bio,
    });

    const token = jwt.sign(
      { _id: newUser._id, name, email, bio },
      "secretPassword",
      {
        expiresIn: "7 days",
      }
    );

    return res
      .status(201)
      .send({ message: "User registered successfully", token });
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
});

module.exports = app;
