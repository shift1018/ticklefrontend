import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.js";
import axios from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = () => {
    const data = { email: email, password: password };
    axios.post("api/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response);
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          email: response.data.email,
          userId: response.data.id,
          status: true,
          role: response.data.role,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">tickle</h3>
          <span className="loginDesc">
            Tickle your friends via the app so you don't have to get off your
            couch while watching Netflix.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <button type="submit" className="loginButton" onClick={login}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button type="submit" className="loginRegiaterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
