import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
  },
  // receiver: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  time: {
    type: String,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
