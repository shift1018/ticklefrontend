import React, { useEffect, useState } from "react";
import { Avatar, Button, Input } from "antd";
import Comment from "@ant-design/compatible/lib/comment";
import axios from "../../utils/axios.js";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.js";
import "./comments.css";
import { format } from "timeago.js";

const { TextArea } = Input;
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function SingleComment(props) {
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      user: authState.userId,
      post: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };
    
    axios.post("api/comments/saveComment", variables).then((response) => {
      if (response.data.success) {
        //console.log(response.data.result)
        setCommentValue("");
        setOpenReply(!OpenReply);
        // update saved data into parent component using props and refreshFunction
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  // this hides or opens "reply" text area on UI
  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users?userId=${props.comment.user}`);
      // console.log(res)
      setUser(res.data);
      //console.log("RES-DATA", res.data);
    };
    fetchUser();
  }, [props.comment.user]);

  //console.log("THIS is PROPS-comment", props.comment);

  return (
    <div>
      <Comment
        actions={actions}
        author={user.username}
        avatar={
          <img
            className="commentsImg"
            src={user.avatarURL || PF + "person/NoAvatar.png"}
            alt="image"
          />
        }
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {/* this checks the condition if OpenReply is true or false, based on it the textarea for the reply will display  */}
      {
        OpenReply && (
          <form style={{ display: "flex" }} onSubmit={onSubmit}>
            <Avatar
              style={{
                width: "10%",
                marginTop: "10px",
                marginLeft: "20px",
                height: "30px",
                width: "32px",
                marginRight: "5px",
              }}
              src={user.avatarURL || PF + "person/NoAvatar.png"}
              alt="image"
            />
            <TextArea
              style={{
                width: "80%",
                borderRadius: "10px",
                height: "30px",
                backgroundColor: "#eee",
                marginTop: "10px",
              }}
              onChange={handleChange}
              value={CommentValue}
              placeholder="write a reply"
            />
            <br />
            <Button
              style={{
                width: "20%",
                borderRadius: "10px",
                marginLeft: "5px",
                height: "36px",
                marginTop: "8px",
                backgroundColor: "#1877f2",
                color: "white",
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </form>
        )

        // <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        //     <TextArea
        //         style={{ width: '100%', borderRadius: '5px' }}
        //         onChange={handleChange}
        //         value={CommentValue}
        //         placeholder="write a reply"
        //     />
        //     <br />
        //     <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
        // </form>
      }
    </div>
  );
}

export default SingleComment;
