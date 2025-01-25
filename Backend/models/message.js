import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // receiver: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
