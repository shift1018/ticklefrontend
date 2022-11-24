import "./profile.css"
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
      <>
                <Topbar/>
                <div className="profile">
                    <Sidebar/>
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={`${PF}post/1.jpg`} alt="" className="profileCoverImg" />
                                <img src={`${PF}person/avatar1.jpg`} alt="" className="profileUserImg" />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">Olivia Brown</h4>
                                <span className="profileInfoDesc">Hello my Friends!</span>
                                

                            </div>
                        </div>
                        <div className="profileRightBottom">
                          <Feed/>
                          <Rightbar profile/>
                        </div>                  
                    </div>
                </div>
            </>
  )
}
