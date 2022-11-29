import Home from "./pages/home/Home";
import Feed from "./components/feed/Feed";
import Profile from "./pages/profile/Profile";

//import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Comments from "./components/comments/Comments";

import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { AuthContext } from "./utils/AuthContext.js";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Friends from "./pages/friends/Friends";
import Post from "./components/post/Post";

function App() {

  // const { user } = useContext(AuthContext);
  
  const [authState, setAuthState] = useState({
    email: "",
    userId: "",
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
          //console.log("this is response:", response)
          setAuthState({
            email: response.data.user.email,
            userId: response.data.user._id,
            status: true,
            role: response.data.user.role,
            
          });
        }
      });
  }, []);
//console.log("this is after setAuthState", authState);

  //const userId = authState.userId;

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    // by wrapping routers in Authcontext here we make accessible the data which we keep inside AuthContext to every route(component)
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>

      <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/register"> Register</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/user/myFriends"> My Friends</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>

        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/getComments/:id' element={<Comments/>} />
          <Route path='/' element={<Feed/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile/:username' element={<Profile/>} />
          {/* <Route exact path="/">
            {user ? <Home /> : <Register />}
            </Route> */}
          {/* <Route path="/" element={<Feed />} /> */}
          {/* <Route path="/" element={<Post />} /> */}
          <Route path='/user/myFriends' element={<Friends/>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
