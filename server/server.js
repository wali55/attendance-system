/**
   * Request input sources
   * Request body
   * req param
   * req query
   * req header
   * req cookies
   */

const express = require("express");
const connectDB = require("./db");
const authenticate = require('./middleware/authenticate');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : 'Error occurred in the server';
  const status = err.status ? err.status : 500;
  res.status(status).json({message});
});



app.get('/private', authenticate, (req, res) => {
  console.log('This is the user', req.user);
  return res.status(200).json({message: 'I am a private route'});
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
