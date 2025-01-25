import React, { useEffect, useState, useRef } from "react";
import styles from "../CSS/Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";

const Chat = ({ username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();
  const chatBodyRef = useRef(null);
  const [typingUser, setTypingUser] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    socket.on("display_typing", ({ username: typingUsername }) => {
      if (typingUsername !== username) {
        setTypingUser(typingUsername);
      }
    });

    socket.on("stop_typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("display_typing");
      socket.off("stop_typing");
    };
  }, [socket, username]);

  const handleTyping = (e) => {
    const value = e.target.value;
    setCurrentMessage(value);

    if (value.trim() === "") {
      socket.emit("stop_typing", room);
    } else {
      socket.emit("typing", { room, username });
    }
  };

  const handleEmojiClick = (emoji) => {
    setCurrentMessage((prev) => prev + emoji.emoji);
  };

  const handleLeaveRoom = () => {
    socket.emit("leave_room", { username, room });
    navigate("/home");
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        message: currentMessage,
        author: username,
        time:
          new Date(Date.now()).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
      };

      setMessageList((list) => [...list, messageData]);

      try {
        const response = await fetch("http://localhost:8000/save-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        });

        const result = await response.json();

        if (!result.success) {
          console.error("Failed to save the message.");
        }
      } catch (error) {
        console.error("Error saving message to backend:", error);
      }
      setCurrentMessage("");
      socket.emit("stop_typing", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <p>Live Chat {`(${username})`}</p>
        <FontAwesomeIcon
          icon={faDoorOpen}
          className={styles.exitIcon}
          onClick={handleLeaveRoom}
        />
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {messageList.map((messageContent, index) => (
          <p
            key={index}
            className={
              messageContent.author === username
                ? styles.senderMessage
                : styles.receiverMessage
            }
          >
            {messageContent.author === username ? (
              <span>{messageContent.message}</span>
            ) : (
              <>
                <strong className={styles.sender}>
                  {messageContent.author}
                </strong>
                <br />
                <span>{messageContent.message}</span>
              </>
            )}
            <br />
            <span className={styles.time}>{messageContent.time}</span>
          </p>
        ))}
        {typingUser && (
          <p className={styles.typingIndicator}>{typingUser} is typing...</p>
        )}
      </div>
      <div className={styles.chatFooter}>
        <input
          type="text"
          placeholder="Message..."
          value={currentMessage}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className={styles.input}
        />
        <div
          className={styles.emojiContainer}
          onMouseLeave={() => setShowEmojiPicker(false)}
        >
          {!showEmojiPicker && (
            <FontAwesomeIcon
              icon={faSmile}
              className={styles.emojiBtn}
              onMouseOver={() => setShowEmojiPicker(true)}
            />
          )}
          {showEmojiPicker && (
            <div className={styles.emojiPickerContainer}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                className={styles.emojiPickerBody}
                height="400px"
                width="300px"
                theme="dark"
                searchPlaceHolder={true}
                searchDisabled={true}
                skinTonesDisabled={true}
              />
            </div>
          )}
        </div>
        <button onClick={sendMessage} className={styles.sendButton}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
