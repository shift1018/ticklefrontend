import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../utils/AuthContext";
import axios from "../../utils/axios";
import "./home.css";
import { useParams } from "react-router";
//import { useNavigate } from "react-router-dom";

export default function Home({ setVisible }) {
  
 

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed setVisible={setVisible} />
        <Rightbar />
      </div>
    </>
  );
}
