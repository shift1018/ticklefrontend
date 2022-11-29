import "./post.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { format } from "timeago.js";
import Comments from "../comments/Comments.jsx";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  // TODO --> when we get LIKES working change below to ""=useState(post.likes.length);""
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // need useState to update the state of list of comments
  const [CommentLists, setCommentLists] = useState([]);
  // get post ID for the current post to send it in the request to the
  const postId = post._id;

  // get new comment value from props from Comments.jsx and update the list of comments by ad
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  useEffect(() => {
    axios.get(`api/comments/getComments/${postId}`).then((response) => {
      //console.log("response:", response);
      if (response) {
        //console.log('response.data.comments',response.data.comments)
        // taking comments from the backend response cause we named it comments on the backend

        //console.log(typeof response.data)
        setCommentLists(response.data);
        //console.log("comments list:", CommentLists);
      } else {
        console.log("failed", response);
        //alert('Failed to get post info')
      }
    });

    const fetchUser = async () => {
      const res = await axios.get(`users?userId=${post.user}`);
      // console.log(res)
      setUser(res.data);
    };
    fetchUser();
  }, [post.user]);
  // }, [])

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`users?userId=${post.user}`);
  //     // console.log(res)
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [post.user]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.avatarURL || PF + "person/NoAvatar.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate"> {format(post.createdAt)}</span>
          </div>
          <div className="posTopRight">
            <MoreHorizIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
          <img src={post?.imageURL} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}post/like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}post/heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment}comments</span>
          </div> */}
          
        </div>
        <Comments
            CommentLists={CommentLists}
            postId={post._id}
            refreshFunction={updateComment}
          />
      </div>
    </div>
  );
}

// return(
//     <div className="post">
//         <div className="postWrapper">
//             <div className="postTop">
//                 <div className="postTopLeft">
//                     <img src={user.avatarURL || PF+"NoAvatar.png"} alt="" className="postProfileImg" />
//                     <span className="postUserName">{user.username}</span>
//                     <span className="postDate"> {format(post.createdAt)}</span>
//                 </div>
//                 <div className="posTopRight">
//                < MoreHorizIcon/>
//                 </div>
//             </div>
//             <div className="postCenter">
//                 <span className="postText">{post?.content}</span>
//                 <img src={post?.imageURL} alt="" className="postImg" />

//             </div>
//             <div className="postBottom">
//                 <div className="postBottomLeft">
//                     <img src={`${PF}post/like.png`} alt="" className="likeIcon" onClick={likeHandler} />
//                     <img src={`${PF}post/heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
//                     <span className="postLikeCounter">{like}</span>
//                 </div>
//                 <div className="postBottomRight">
//                     <span className="postCommentText">{post.comment}comments</span>
//                 </div>
//             </div>
//         </div>

//     </div>
// )

// return(
//     <div className="post">
//         <div className="postWrapper">
//             <div className="postTop">
//                 <div className="postTopLeft">
//                     <img src={user.avatarURL || PF+"NoAvatar.png"} alt="" className="postProfileImg" />
//                     <span className="postUserName">{user.username}</span>
//                     <span className="postDate"> {format(post.createdAt)}</span>
//                 </div>
//                 <div className="posTopRight">
//                < MoreHorizIcon/>
//                 </div>
//             </div>
//             <div className="postCenter">
//                 <span className="postText">{post?.content}</span>
//                 <img src={post?.imageURL} alt="" className="postImg" />

//             </div>
//             <div className="postBottom">
//                 <div className="postBottomLeft">
//                     <img src={`${PF}post/like.png`} alt="" className="likeIcon" onClick={likeHandler} />
//                     <img src={`${PF}post/heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
//                     <span className="postLikeCounter">{like}</span>
//                 </div>
//             </div>
//         {/* setting props to pass post id onto the child component Comments.jsx
//         and using props called refreshFunction to get the comment from Comments.jsx */}
//             <Comments CommentLists={CommentLists} postId={post._id} refreshFunction={updateComment}/>
//         </div>
