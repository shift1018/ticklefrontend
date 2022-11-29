import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import {useContext} from "react";
import {AuthContext} from "../../utils/AuthContext";
import "./home.css"


export default function Home () {
    // const { authState } = useContext(AuthContext);

    // const userId = authState.userId;
    // console.log("User!!!!!", userId);

    return (
            <>
                <Topbar/>
                <div className="homeContainer">
                    <Sidebar/>
                    <Feed/>
                    <Rightbar/>
                </div>
            </>
    );
}