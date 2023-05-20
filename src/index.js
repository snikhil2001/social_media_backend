const express = require("express");
const connect = require("./config/db");
const app = express();

app.listen(8080, async () => {
  try {
    await connect();
    console.log("mongodb connection successful");
    console.log("listening on port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
