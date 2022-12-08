import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext, useRef } from "react";
import { AuthContext } from "../../utils/AuthContext.js";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Share({ setVisible }) {
  const { authState } = useContext(AuthContext);
  //console.log("usershare", authState.userId);
  const [userObject, setUserObject] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const content = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    // const newPost = {
    //   //   userId: authState.userId,
    //   title: "aaa",
    //   content: content.current.value,
    // };

    // if (file) {
    //     const data = new FormData();
    //     const fileName = Date.now() + file.name;
    //     data.append("name", fileName);
    //     data.append("file", file);
    //     newPost.img = fileName;
    //     console.log(newPost);
    //     try {
    //       await axios.post("/upload", data);
    //     } catch (err) {}
    //   }
    try {
      await axios.post(
        "api/posts/",
        {
          title: "default title",
          content: content.current.value,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
        // newPost
      );
      //  console.log("api/posts");
      window.location.reload();
    } catch (err) {}
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
  return (
    <div className="share">
      <div className="shareWrapper">
        <div
          className="shareTop open_post"
          onClick={() => {
            setVisible(true);
          }}
        >
          <Link to={`/profile/${authState.username}`}>
            <img
              src={userObject.avatarURL || PF + "person/NoAvatar.png"}
              alt=""
              className="shareProfileImage"
            />
          </Link>

          {/* <img
            src={PF + "person/avatar1.jpg"}
            alt=""
            className="shareProfileImage"
          /> */}
          {/* <img
                        src={
                        authState.avatarURL ? PF + authState.avatarURL : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="shareProfileImage"
                    /> */}

          {/* <input
            placeholder={"What's on your mind " + authState.username + "?"}
            className="shareInput"
            ref={content}
          /> */}
          <div>What's on your mind {authState.username}?</div>
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label className="shareOption">
              <PermMediaIcon htmlColor="#C12267" className="shareIcon" />
              <span className="shareOptionText"> Photo/Video </span>
              {/* <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files)}
              /> */}
            </label>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="#FDD017" className="shareIcon" />
              <span className="shareOptionText"> Feeling/Activity </span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="#4CC417" className="shareIcon" />
              <span className="shareOptionText"> Location </span>
            </div>
          </div>
          {/* <button className="shareButton" type="submit">
            Share
          </button> */}
        </form>
      </div>
    </div>
  );
}
