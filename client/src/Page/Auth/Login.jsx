import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log(username, password);
      await axios
        .post(
          "http://localhost:5000/login",
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          //   window.history.replaceState(null, "", "/");
          console.log(response);
          // Navigate("/");
          if (response.status === 200) {
            window.location.href = "/";
          } else if (response.status === 201) {
            alert("Wrong Credentials Try Again !");
          }
        });
      // Handle success (e.g., redirect, show a message, etc.)
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-head">Login</div>
        <div className="login-inner">
          <div className="login-input">
            <input
              type="text"
              placeholder="abc@xmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-input">
            <input
              type="password"
              placeholder="pass***d"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-submit">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
