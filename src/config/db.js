const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://nikhil:nikhil@cluster0.dtxla5b.mongodb.net/databases?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = connect;
