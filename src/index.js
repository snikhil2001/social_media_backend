const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);

app.listen(8080, async () => {
  try {
    await connect();
    console.log("mongodb connection successful");
    console.log("listening on port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
