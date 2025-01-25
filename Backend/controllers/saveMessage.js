import Message from "../models/message.js";

const saveMessage = async (req, res) => {
  const { room, message, author, time } = req.body;

  // Validate input
  if (!room || !message || !author || !time) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    const newMessage = new Message({ room, message, author, time });
    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    console.error(
      "Error saving message:",
      process.env.NODE_ENV === "development" ? error.stack : error.message
    );
    res.status(500).json({ success: false, error: "Failed to save message." });
  }
};

export default saveMessage;
