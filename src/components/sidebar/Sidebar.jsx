import "./sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Friendrequests from "../friendrequests/Friendrequests";
import { Link } from "react-router-dom";
import axios from "../../utils/axios.js";
import {useEffect, useState} from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
 import { useNavigate } from 'react-router-dom';

export default function Sidebar({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const [user, setUser] = useState({});
    const [userObject, setUserObject] = useState("");
    const[listOfNotAppFriends, setListOfNotAppFriends] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios
          //.get(`http://localhost:8800/api/auth/user`,
          .get("api/auth/user", {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }).then((response) => {
            setUserObject(response.data.user);
           // console.log("!!!!!!!!!!", response.data);
          });
              
          axios.get("api/friends/user/notApprFriends",{
            headers: { accessToken: localStorage.getItem("accessToken") },
          }).then((response)=>{
           // console.log("Friendships++++++++++++", response.data);
              setListOfNotAppFriends(response.data);
          });
    
      }, []);

     
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                    <Link to="/" style={{textDecoration: "none"}}>
                        <HomeIcon className="sidebarItemIcon"/>
                        <span className="sidebarListItemText"> Home </span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                    <Link to="/user/myFriends" style={{textDecoration: "none"}}>
                        <GroupIcon className="sidebarItemIcon"/>
                        <span className="sidebarListItemText"> Friends </span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                    <Link to="/photos" style={{textDecoration: "none"}}>
                        <PhotoLibraryIcon className="sidebarItemIcon"/>
                        <span className="sidebarListItemText"> Photos </span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                    <Link to={`/aboutMe/${userObject._id}`} style={{textDecoration: "none"}}>
                        <ManageAccountsIcon className="sidebarItemIcon"/>
                        <span className="sidebarListItemText"> Information </span>
                        </Link>
                        
                    
                    </li>
                    {/* <li className="sidebarListItem">
                        <AppsIcon className="sidebarItemIcon"/>
                        <span className="sidebarListItemText"> All </span>
                    </li> */}
                    </ul>
                    <button className="sidebarButton"> all</button>
                    <hr className="sidebarHr"/>


                    <PersonAddIcon className="sidebarItemIcon"/>
                    <span className="sidebarListItemText"> Friend requests </span>
                    
                    <ul className="sidebarFriendList">

                       {Array.from(listOfNotAppFriends).map((u)=>(

                       <Friendrequests key={u.id} user={u}/>)

                       )}

                    </ul>
                    
            </div>
        </div>
    );
}
