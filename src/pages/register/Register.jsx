import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { useState, createContext, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.js";

export default function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
    avatarURL: "",
    city: "",
    from: "",
    birthday: "",
    desc: "",
  };

  const [error, setError] = useState("");
  const { authState } = useContext(AuthContext);

  //console.log("Register page:", authState);
  const currentUserId = authState.userId;
  //console.log("THIS USER ID:", currentUserId);

  const navigate = useNavigate();

  // const onSubmit = (data) => {
  //   axios.post("api/auth/register", data).then((response) => {
  //     navigate("/login");
  //   });
  // };

  const onSubmit = (data) => {
    axios.post("api/auth/register", data).then((response) => {
      if (response.data.newUser) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
    confirmpassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
    // role: Yup.string(),
    // avatarURL: Yup.string(),
    // city: Yup.string(),
    // from: Yup.string(),
    // birthday: Yup.string(),
    // desc: Yup.string(),
  });

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
          <div className="registerBox">
            {error && <span>{error}</span>}
            <Formik
              initialValues={initialValues}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div>
                  <ErrorMessage
                    className="RegisterError"
                    name="username"
                    component="span"
                  />
                  <Field
                    className="loginInput"
                    name="username"
                    placeholder="User name"
                  />
                </div>
                <div>
                  <ErrorMessage
                    className="RegisterError"
                    name="email"
                    component="span"
                  />
                  <Field
                    className="loginInput"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <ErrorMessage
                    className="RegisterError"
                    name="password"
                    component="span"
                  />
                  <Field
                    className="loginInput"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div>
                  <ErrorMessage
                    className="RegisterError"
                    name="confirmpassword"
                    component="span"
                  />
                  <Field
                    className="loginInput"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>

                <Field
                  className="loginInput"
                  name="role"
                  placeholder="Role"
                  hidden
                />

                <Field
                  className="loginInput"
                  name="avatarURL"
                  placeholder="avatarURL"
                  hidden
                />

                <Field
                  className="loginInput"
                  name="city"
                  placeholder="city"
                  hidden
                />

                <Field
                  className="loginInput"
                  name="from"
                  placeholder="from"
                  hidden
                />

                <Field
                  className="loginInput"
                  name="birthday"
                  placeholder="birthday"
                  hidden
                />

                <Field
                  className="loginInput"
                  name="desc"
                  placeholder="desc"
                  hidden
                />

                <button type="submit" className="loginRegisterButton">
                  Sign Up
                </button>
                <button
                  type="submit"
                  className="loginButton"
                  onClick={goToLogin}
                >
                  Log into Account
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="login">
  //     <div className="loginWrapper">
  //       <div className="loginLeft">
  //           <h3 className="loginLogo">tickle</h3>
  //           <span className="loginDesc">Tickle your friends via the app so you don't have to get off your couch while watching Netflix.</span>
  //       </div>
  //       <div className="loginRight">
  //           <div className="registerBox">
  //               <input placeholder="User name" className="loginInput"></input>
  //               <input placeholder="Email" className="loginInput"></input>
  //               <input placeholder="Password" className="loginInput"></input>
  //               <input placeholder=" Confirm Password" className="loginInput"></input>

  //               <button className="loginButton">Sign Up</button>
  //               <button className="loginRegiaterButton">Log into Account</button>
  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
