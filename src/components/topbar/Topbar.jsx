import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import axios from "../../utils/axios";

export default function Topbar() {
  const [userObject, setUserObject] = useState("");
  const [username, setUsername] = useState();

  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState({});
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const fetchUser = async (username) => {
    const res = await axios.get(`users?username=${username}`);
    // console.log(res.data)
    setUser(res.data);
  };
  useEffect(() => {
    axios
      //.get(`http://localhost:8800/api/auth/user`,
      .get("api/auth/user", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setUserObject(response.data.user);
       // console.log("!!!!!!!!!!", response.data);
      });}, []);

  //fetchUser();
// }, []);
// console.log("User from topbar",res.data);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">tickle</span>
        </Link>
      </div>

      <div className="topbarCenter search_area">
      <div className="search_wrap">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input 
            placeholder="Search in tickle "
            className="searchInput"
            value={username}
            onKeyDown={() => {
              fetchUser(username);
            }}
           
            onChange={(event) => {
              setUsername(event.target.value);
            }}>
                       
          </input> 
          <div className="dropdown-content2">
             
            <span>Result:
            </span>
            <br />
            {user ?(  
        <Link to={`/profile/${user.username}`} className="search_user_item hover">
          <div>
        {/* <img src={user.avatarURL || PF + "person/NoAvatar.png"} alt="" className="search_user_item_img" /> */}
        <span>{user.username}</span>
        </div>
        </Link>):(
          <span>No user found</span>
        )}
            
     
        
          </div> 
   
        </div>
        
       
        {/* <div className="search_results scrollbar"> */}
        
      {/* </div> */}

  

        </div>
      </div>
      
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${authState.username}`}>
        <img src={userObject.avatarURL || PF + "person/NoAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
