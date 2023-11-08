/**
   * Request input sources
   * Request body
   * req param
   * req query
   * req header
   * req cookies
   */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const connectDB = require("./db");
const User = require("./models/User");

const app = express();
app.use(express.json());

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({message: 'Error occurred in the server'});
});

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: 'Invalid Credentials'});
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({message: 'Invalid Credentials'});
    }
    delete user._doc.password;

    const token = jwt.sign(user._doc, 'secret-key', {expiresIn: '2h'});

    res.status(200).json({message: 'Login Successful', token});
  } catch (error) {
    next(error);
  }
});

app.get('/private', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  res.status(200).json({message: 'I am a private route'});
});

app.get('/public', (_req, res) => {
  res.status(200).json({message: 'I am a public route'});
});

app.get("/", (_req, res) => {
  const obj = {
    name: "wali",
    email: "wali@email.com",
  };
  res.json(obj);
});

connectDB("mongodb://127.0.0.1:27017/attendance-db")
  .then(() => {
    console.log("database connected");
    app.listen(4000, () => {
      console.log("app is listening");
    });
  })
  .catch((e) => {
    console.log(e);
  });
