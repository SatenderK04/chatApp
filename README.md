# Chat App

A real-time chat application that allows users to communicate in different chat rooms with seamless messaging features.

## Features
- **Real-Time Messaging:** Instant chat updates using WebSockets.
- **Multiple Chat Rooms:** Users can join and switch between different chat rooms.
- **User List Management:** Displays the list of active users in a room.

## Technologies Used
- **Frontend:** React.js, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose ORM)
- **Real-Time Communication:** Socket.IO

## Installation Guide

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB setup)

### Steps to Install and Run
1. **Clone the Repository**
   ```sh
   git clone https://github.com/SatenderK04/chatApp.git
   cd chatApp
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start the Backend Server**
   ```sh
   npm start
   ```

5. **Run the Frontend (if separate)**
   ```sh
   cd Frontend
   npm install
   npm start
   ```

### Usage
- Open `https://chatapp-frontend-x1dp.onrender.com/` in the browser.
- Enter a username and a room name to join the chat.
- Start chatting with other users in real time.

## Contribution
Feel free to fork this repository and submit a pull request with improvements!

