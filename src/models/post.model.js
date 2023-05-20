const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      text: { type: String },
    },
  ],
});

const Post = model("post", postSchema);

module.exports = Post;
