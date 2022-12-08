import "./createpostpopup.css";
//import React from "react";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../utils/AuthContext.js";
import axios from "../../utils/axios";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";

export default function CreatePostPopup({ user, setVisible }) {
  const { authState } = useContext(AuthContext);
  //console.log("usershare", authState.userId);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [content, setContent] = useState("");
  const contentRef = useRef(null);


    // all blobs in container
    const [blobList, setBlobList] = useState([]);

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState([]);

    const onFileChange = (event) => {
      // capture file into state
      setFileSelected(event.target.files);
    };

    const formData = new FormData()


      
    formData.append('title', "default title");
    
    formData.append('content', content);
    // {content =null ? formData.append('content', content): null};
    for( var i =0; i< fileSelected.length;i++){
      formData.append("fileName", fileSelected[i])
    }

 const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.
      post(`api/posts/`,
      formData,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
            <img src="/assets/post/close.png" alt="" />
          </div>
          <span>Create Post</span>
        </div>
        {/* <div className="box_profile">
          <img
            src={authState.avatarURL || PF + "person/avatar1.jpg"}
            alt=""
            className="box_profile_img"
          />
          <div className="box_col">
            <div className="box_profile_name">{authState.username}</div>
            {/* <div className="box_privacy">
              <span>Public</span>
            </div> */}
          {/* </div>
        </div>  */}
        <div className="flex_center">
          <textarea
            ref={contentRef}
            maxlength="100"
            value={content}
            placeholder={"What's on your mind " + authState.username + "?"}
            className="post_input"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <EmojiPickerBackgrounds
          content={content}
          contentRef={contentRef}
          setContent={setContent}
        />
        <AddToYourPost />
        
        <form onSubmit={submitHandler}  >
        <div className="postForm">
        <input type="file"  accept="image/jpeg, image/png, image/jpg"  multiple="multiple" onChange={onFileChange}  />
        {/* <div id="display-image"></div> */}     
        </div> 
        <button className="post_submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}






  







      
