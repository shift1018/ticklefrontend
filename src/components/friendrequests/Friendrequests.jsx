import "./friendrequests.css";
import axios from "../../utils/axios.js";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"


export default function Friend({user}) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
let navigate = useNavigate();
const approveFriend=(id)=>{

  axios.patch("api/friends/user/approveDate", 
  {
    friend: id,
  },
  {
    headers: { accessToken: localStorage.getItem("accessToken") },
  }).then(() => {
    window.location.reload();
    // navigate("/");
    }
  );
}

const deleteFriend=(id)=>{

  axios.delete(`api/friends/user/deleteFriend/${id}`, 
     {
    headers: { accessToken: localStorage.getItem("accessToken") },
  }
  // {
  //   friend: id,
  // }
  ).then(() => {
    window.location.reload();
    // navigate("/");
    });
  }    
 
  return (
  
    <div className="friendRequestsWrapper">
        <li className="sidebarFriend">
          <div className="friendRequestsImg">
          <Link to={'/profile/' + user.username} style={{textDecoration:"none"}}>
        <img src={user.avatarURL || PF + "person/NoAvatar.png"} alt="" className="sidebarFriendImg"/>
        </Link>
        </div>
        <div className="friendRequestsWrapperInfo">
          <div className="friendRequestsWrapperName">
          <Link to={'/profile/' + user.username} style={{textDecoration:"none"}}>
            <span className="sidebarFriendName">{user.username}</span>
            </Link>
          </div>
          <div >

            <button className="friendRequestsWrapperButtonApprove" onClick={() => {
                      approveFriend(user._id);
                    }}> Approve
                  </button>

            <button  className="friendRequestsWrapperButtonDecline" onClick={() => {
                      deleteFriend(user._id);
                    }}>Decline</button>
          </div>
          </div>
        </li>
    </div>
  );
}
