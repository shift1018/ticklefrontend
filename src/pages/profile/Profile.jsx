import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

export default function Profile({ setVisible }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();
  const { authState } = useContext(AuthContext);

  // console.log("user name on profile", username)
  // console.log("AuthState on profile:", authState)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users?username=${username}`);
      //console.log(res)
      setUser(res.data);
    };
    //console.log("User in useEffect :", user);
    //window.location.reload();
    fetchUser();
  }, [username]);

  //TO CHECK IF ITS MY OWN PROFILE
  // let itsMyProfile = false;
  // if (authState.username === username) {
  //   itsMyProfile = true;
  // }

  let areFriends = false;
  // console.log("AuthState before FOR:", authState);
  //console.log("User before FOR:", user);
  // console.log(Object.keys(user).length);

  if (Object.keys(user).length !== 0) {
    for (let i = 0; i < authState.friendships.length; i++) {
      for (let j = 0; j < user.friendships.length; j++) {
        // console.log("current user", authState.friendships);
        // console.log("profile user", user.friendships);
        if (authState.friendships[i] === user.friendships[j]) {
          areFriends = true;
          break;
          // console.log("hello");
        }
      }
    }
  }

  //button to add a friend
  const addFriend = (id) => {
    axios
      .post(
        "api/friends/user/addFriend",
        {
          friend: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then(() => {
        window.location.reload();
        // navigate("/");
      });
  };


  const addbackgroundimage = () =>{

  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* ...................upload....................................... */}
              <img
                src={user.profileURL || PF + "person/noBackground.png"}
                alt=""
                className="profileCoverImg"
                // onClick={ addbackgroundimage }
              />
              <img
                src={user.avatarURL || PF + "person/NoAvatar.png"}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>

              {/* {itsMyProfile ? (
                <Link to={`/aboutMe/${user._id}`}>About me</Link>
              ) : (
                <span></span>
              )} */}

              {!areFriends ? (
                <button
                  onClick={() => {
                    addFriend(user._id);
                  }}
                >
                  Add friend
                </button>
              ) : (
                <span></span>
                //<Link to={`/aboutMe/${user._id}`}>About me</Link>
              )}
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            
            <Feed username={username} setVisible={setVisible} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
