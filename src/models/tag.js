const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const TagPost = new Schema({
  name: {
    type: String,
    required: true,
  },
  postId: [
    {
      type: ObjectId,
    },
  ],
});

module.exports = mongoose.model("Tag", TagPost);
