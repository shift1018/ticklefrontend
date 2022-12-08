import "./friend.css";
import axios from "../../utils/axios.js";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"


export default function Friend({user}) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
  
    
        <li >
         <div className="rightbarFollowing">
          <Link to={'/profile/' + user.username} style={{textDecoration:"none"}}>
        <img src={user.avatarURL || PF + "person/NoAvatar.png"} alt="" className="rightbarFollowingImg"/>
        </Link>
     
          <Link to={'/profile/' + user.username} style={{textDecoration:"none"}}>
            <span className="rightbarFollowingName">{user.username}</span>
            </Link>
            </div>
     
        </li>
    
  );
}
