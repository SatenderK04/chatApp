import MessageModel from "../models/message.js";

const saveMessage = async (req, res) => {
  try {
    const { room, message, author, time } = req.body;

    // Validate request
    if (!room || !message || !author || !time) {
      return res.status(400).json({ success: false, error: "Invalid data" });
    }

    // Save message to database
    const newMessage = new MessageModel({ room, message, author, time });
    await newMessage.save();

    return res.status(201).json({ success: true, message: "Message saved" });
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export default saveMessage;
