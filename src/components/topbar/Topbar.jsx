import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar() {
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">tickle</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="Search in tickle "  className="searchInput"></input>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>          
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <ChatIcon/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                </div> 
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <NotificationsIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div> 
                <img src="/assets/person/avatar1.jpg" alt="" className="topbarImg" />
            </div>
        </div>
    )
};
