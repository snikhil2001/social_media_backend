const express = require("express");

const app = express();

app.listen(8080, async () => {
  try {
    console.log("listening on port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
