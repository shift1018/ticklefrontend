import "./feed.css";
import Share from "../share/Share.jsx";
import Post from "../post/Post.jsx";
//import {Posts} from "../../data.js"
//import { useEffect } from "react"
import { AuthContext } from "../../utils/AuthContext";
import axios from "../../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Feed({ username, setVisible }) {
  // const {user}=useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  // const { user } = useContext(AuthContext);
  const userId = authState.userId;
  
  // const [userObject, setUserObject] = useState("");
  // const { authState } = useContext(AuthContext);

  // const userId = authState.userId;
  // console.log("User2222222", userId);

  // useEffect(() => {
  //   axios
  //     //.get(`http://localhost:8800/api/auth/user`,
  //     .get("api/auth/user", {
  //       headers: { accessToken: localStorage.getItem("accessToken") },
  //     }).then((response) => {
  //       setUserObject(response.data.user);
  //      // console.log("!!!!!!!!!!", response.data);
  //     });

  //     axios.get(`api/posts/timeline/${userId}`,

  //     //axios.get("api/posts/timeline/637f82b61d920e556daa7a9d",
  //       {  headers: { accessToken: localStorage.getItem("accessToken") },
  //       }).then((response) => {
  //         setPosts(response.data);

  //       });

  //   }, [userId]);

//   console.log("userHome", usernameHome);

//  console.log("username", username);

  let showShare = false;
  if (username == undefined) {
   showShare = true;
    // console.log("username kdfvnakjrsgbK;WEFNAKLWJEFNKAJSENFGASJK");
  }else{
    if(username==authState.username ){
      showShare = true;
  }else{
    showShare = false;
  }
  }


  useEffect(() => {
    const fetchPosts = async () => {
      // TODO --> change posts from ALL user to posts by selected users and friends (must validate accesstoken here )
      // If there is a username in the props list the profile version of feed, otherwise list the homepage (timeline) version
      const res = username
        ? await axios.get("api/posts/profile/" + username)
        : await axios.get("api/posts/timeline/" + userId);
      // console.log(res)
      //sort feed in a descending order
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      // console.log(res.data);
    };
    fetchPosts();
  }, [username, userId]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get("api/posts/timeline/" + userId);
  //     // console.log(res)
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, [userId]);

  // console.log("feeed username", username);
  // console.log("feeed authState.username", authState.username);

  return (
    <>
      {/* <h2>Username: {userObject.username}</h2>
    <br></br>
    <h2>UserId: {userObject._id}</h2> */}
      <div className="feed">
        <div className="feedWrapper">
          {showShare ? (
            <Share setVisible={setVisible}/>
          ):( <span></span>)  }
          {/* <Share setVisible={setVisible} /> */}
          {Array.from(posts).map((p, _id) => (
            <Post post={p} key={p._id} />
          ))}
        </div>
      </div>
    </>
  );
}
