import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/CSS/Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch(
        "https://chatapp-backend-yn09.onrender.com/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save token and username in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        navigate("/home");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://chatapp-backend-yn09.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/home");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login or Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.btn}>
        <button className={styles.signup} onClick={handleSignup}>
          Signup
        </button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
