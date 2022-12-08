import axios from "../../utils/axios.js";
import {useEffect, useState} from "react";
//import {AuthContext} from "../../utils/AuthContext";
import { useNavigate } from 'react-router-dom';  
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import "./friends.css"
import {Link} from "react-router-dom"

export default function Friends() {

   const [userObject, setUserObject] = useState("");
   const[listOfAppFriends, setListOfAppFriends] = useState([]);
  
 let navigate = useNavigate();
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 useEffect(() => {
    axios
      //.get(`http://localhost:8800/api/auth/user`,
      .get("api/auth/user", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setUserObject(response.data.user);
       // console.log("!!!!!!!!!!", response.data);
      });
      axios.get("api/friends/user/myFriends",{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response)=>{
       // console.log("Friendships++++++++++++", response.data);
          setListOfAppFriends(response.data);
      });

  }, []);

  const deleteFriend=(id)=>{

    axios.delete(`api/friends/user/deleteFriend/${id}`, 
       {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
    ).then(() => {
      window.location.reload();
      // navigate("/user/myFriends");
      });

  };
return (
   <>
    <Topbar/>
    <div className="homeContainer">
  
   <Sidebar/>
  <div className="friendContainer">
   <h3 className="friendTitle">My friends</h3>
   <div className="friendItems">
   {listOfAppFriends.map((value, key) => { 
          return (
            <li>
              <div className="friendItem">
              <Link to={'/profile/' + value.username} style={{textDecoration:"none"}}>
              <img src={value.avatarURL || PF + "person/NoAvatar.png"} alt="" className="friendItemImg"/>
              </Link>
              <div className="friendItemTitle">
              <Link to={'/profile/' + value.username} style={{textDecoration:"none"}}>
          <span>{ value.username} </span>
          </Link>
          </div>
         <div className="friendItemButtonWrapper"> 
          <button className="friendItemButton" onClick={() => {
                      deleteFriend(value._id);
                    }}>Delete</button>
                     </div> 
          </div>
          </li>
          );
          })}

   </div>
 

</div> 
  </div>
</>
 );

}


