import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({setIsAuth}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();

  const login = () => {
    Axios.post("/login", { username, password }).then(
      (res) => {
        const { token, userId, firstName, lastName, username } = res.data;

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("username", username);
        setIsAuth(true);
      }
    );
  };

  return (
    <div className="login">
      <label>Login</label>
      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
