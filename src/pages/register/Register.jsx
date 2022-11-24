import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8800/api/auth/register", data)
      .then((response) => {
        navigate("/login");
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
    confirmpassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
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
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div>
                  <ErrorMessage name="username" component="span" />
                  <Field
                    className="loginInput"
                    name="username"
                    placeholder="User name"
                  />
                </div>
                <div>
                  <ErrorMessage name="email" component="span" />
                  <Field
                    className="loginInput"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <ErrorMessage name="password" component="span" />
                  <Field
                    className="loginInput"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div>
                  <ErrorMessage name="confirmpassword" component="span" />
                  <Field
                    className="loginInput"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    type="password"
                  />
                </div>
                <button type="submit" className="loginButton">Sign Up</button>
                <button type="submit" className="loginRegiaterButton">
                  Log into Account
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );


//   return (
//     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//             <h3 className="loginLogo">tickle</h3>
//             <span className="loginDesc">Tickle your friends via the app so you don't have to get off your couch while watching Netflix.</span>
//         </div>
//         <div className="loginRight">
//             <div className="registerBox">
//                 <input placeholder="User name" className="loginInput"></input>
//                 <input placeholder="Email" className="loginInput"></input>
//                 <input placeholder="Password" className="loginInput"></input>
//                 <input placeholder=" Confirm Password" className="loginInput"></input>

//                 <button className="loginButton">Sign Up</button>
//                 <button className="loginRegiaterButton">Log into Account</button>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
}
