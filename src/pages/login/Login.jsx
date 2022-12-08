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
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const data = { email: email, password: password };
    axios.post("api/auth/login", data).then((response) => {
      // console.log(response);
      //  console.log(response.data.message);
      if (response.data.user) {
        // console.log("I was here");
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuthState({
          email: response.data.user.email,
          userId: response.data.user._id,
          status: true,
          role: response.data.user.role,
          friendships: response.data.user.friendships,
          // username: response.data.username,
        });
        navigate("/");
      } else {
        // console.log(response.data.message);
        setError(response.data.message);
      }
    });
  };
  //console.log("AuthState after Login and Set AuthStatus:", authState)

  // const login = () => {
  //   const data = { email: email, password: password };
  //   axios.post("api/auth/login", data).then((response) => {
  //     if (response.data.error) {
  //       alert(response.data.error);
  //     } else {
  //       //console.log("Response on login", response); // ------------------COMMENT OUT-------------------
  //       localStorage.setItem("accessToken", response.data.accessToken);
  //       setAuthState({
  //         email: response.data.user.email,
  //         userId: response.data.user._id,
  //         status: true,
  //         role: response.data.user.role,
  //         friendships: response.data.user.friendships,
  //         // username: response.data.username,
  //       });

  //       navigate("/");
  //     }
  //   });
  // };
  //console.log("AuthState after Login and Set AuthStatus:", authState)

  const createAccount = () => {
    navigate("/register");
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
            {error &&
              <span>{error}</span>
            }
            
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
            {/* <span className="loginForgot">Forgot Password?</span> */}
            <button
              type="submit"
              className="loginRegiaterButton"
              onClick={createAccount}
            >
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
