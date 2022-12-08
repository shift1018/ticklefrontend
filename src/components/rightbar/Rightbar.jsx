import "./rightbar.css";
import { Users } from "../../data.js";
import Online from "../online/Online";
import axios from "../../utils/axios.js";
import Friend from "../../components/friends/Friend";

import {useEffect, useState} from "react";


export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  


  const HomeRightbar = () => {

    const[listNotFriends, setListNotFriends] = useState([]);

    useEffect(() => {
       axios.get("users/allUsers",
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
          setListNotFriends(response.data);
          
        });  
      });
      
    // console.log("Not Friendssssssssssssssssssss",listNotFriends);

    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
          <span className="birtdayText">
            <b>Peppa Pig</b> and <b>2 other friends</b> have a birthday today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle"> Recommended Friends</h4>
        <ul className="rightbarFriendList">
          {Array.from(listNotFriends).slice(0, 5).map((u) => (
            <Online key={u._id} user={u} />
          ))}

        </ul>
      </>
    );
  };
  
  const ProfileRightbar = () => {

    const[listOfAppFriends, setListOfAppFriends] = useState([]);

    const username = user.username;
 
   //  console.log(username);
 
    useEffect(() => {
     const fetchFriends = async () => {
       const res = await axios.get(`api/friends/hisFriends/${username}`);
       //console.log(res) 
       setListOfAppFriends(res.data);
     };
    
   fetchFriends();
   
   }, [username]); 

    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Birthday:</span>
            <span className="rightbarInfoValue">{user.birthday}</span>
          </div>
          <hr className="sidebarHr"/>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <ul className="rightbarFollowings">
                {Array.from(listOfAppFriends).map((u) => (
                  <Friend key={u._id} user={u} />
                ))}
              </ul>
              </div>
              </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
