const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: {
    type: Date,
    default: "",
  },
  bio: { type: String, default: "" },
  posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

const User = model("user", userSchema);

module.exports = User;
