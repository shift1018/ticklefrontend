import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
//import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthContext } from "./utils/AuthContext.js";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    userId: 0,
    status: false,
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/auth/user", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // setUser(response.data);
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            email: response.data.email,
            userId: response.data.id,
            status: true,
            role: response.data.role,
          });
        }
      });
  }, []);

  return (
    // by wrapping routers in Authcontext here we make accessible the data which we keep inside AuthContext to every route(component)
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile/:username' element={<Profile/>} />
        </Routes>
      </Router>      
    </AuthContext.Provider>
  )  
}

export default App;
