import "./rightbar.css"
import {Users} from "../../data.js"
import Online from "../online/Online"

export default function Rightbar({profile}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return(
            <>
            <div className="birthdayContainer">
                    <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
                    <span className="birtdayText">
                        <b>Peppa Pig</b> and <b>2 other friends</b> have a birthday today
                    </span>
                </div>
                <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle"> Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=>(
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">Montreal</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Tokio</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                    <h4 className="rightbarTitle">User friends</h4>
                    <div className="rightbarFollowings">
                        <div className="rightbarFollowing">
                            <img src={`${PF}/person/avatar2.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">John Smith</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img src={`${PF}person/avatar4.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">John Smith</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img src={`${PF}person/avatar7.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">John Smith</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img src={`${PF}person/avatar8.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">John Smith</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img src={`${PF}person/avatar9.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">John Smith</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img src={`${PF}person/avatar10.jpg`} alt="" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">John Smith</span>
                        </div>
                    </div>

                    

                </div>
            </>
            
        )
    }
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
               {profile? <ProfileRightbar/> : <HomeRightbar/>} 
            </div>
        </div>
    )
};
