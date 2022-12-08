import "./post.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { format } from "timeago.js";
import Comments from "../comments/Comments.jsx";
import { Link } from "react-router-dom";
import ReactsPopup from "../reactions/ReactsPopup";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.js";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// --------------------CHANGE WHEN DEPLOYED------------!!!!!!!
const PF1 = "/assets/";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Post({ post }) {
  // TODO --> when we get LIKES working change below to ""=useState(post.likes.length);""
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [reactions, setReactions] = useState();
  const [check, setCheck] = useState();
  const [visible, setVisible] = useState(false);
  // need useState to update the state of list of comments
  const [CommentLists, setCommentLists] = useState([]);
  // get post ID for the current post to send it in the request to the
  const postId = post._id;
  const urlList = post.imageURL;

  if (urlList.length > 0 && urlList[0] != "") {
    var items = urlList.map((value, key) => {
      return <img key={key} src={value} alt="" height={400} width={400} />;
    });
  } else {
    var items = <br></br>;
  }

  const { authState } = useContext(AuthContext);
  const userId = authState.userId;
  const [totalReactions, setTotalReactions] = useState(0);

  // get new comment value from props from Comments.jsx and update the list of comments by ad
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const getReactions = async (pId) => {
    try {
      const { data } = await axios.get("api/reactions/getReactions/" + pId, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  useEffect(() => {
    // calls a function to get reactions by post id and user id
    getPostReactions();

    axios.get(`api/comments/getComments/${postId}`).then((response) => {
      //console.log("response:", response);
      if (response) {
        //console.log('response.data.comments',response.data.comments)
        // taking comments from the backend response cause we named it comments on the backend

        //console.log(typeof response.data)
        setCommentLists(response.data);
        //console.log("comments list:", CommentLists);
      } else {
        //console.log("failed", response);
        alert("Failed to get post info");
      }
    });

    const fetchUser = async () => {
      const res = await axios.get(`users?userId=${post.user}`);
      // console.log(res)
      setUser(res.data);
    };
    fetchUser();
  }, [post.user, post]);

  const getPostReactions = async () => {
    const res = await getReactions(postId);
    setReactions(res.reactions);
    setCheck(res.check);
    setTotalReactions(res.total);
  };
  //console.log("CHECK!!!!!", check);

  const reactHandler = async (type) => {
    // dynamically change the reaction on page (update without reloading)
    if (check == type) {
      setCheck();

      // change the number of certain reaction dynamically if it exists
      let index = reactions.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReactions([
          ...reactions,
          (reactions[index].count = --reactions[index].count),
        ]);
        setTotalReactions((prev) => --prev);
      }
    } else {
      setCheck(type);
      // change the number of certain reaction dynamically if it doesn't exist (add new)
      let index = reactions.findIndex((x) => x.react == type);
      if (index !== -1) {
        setReactions([
          ...reactions,
          (reactions[index].count = ++reactions[index].count),
        ]);
        setTotalReactions((prev) => ++prev);
      }
      // at the same time deduct from the number of existing reaction
      let indexExisting = reactions.findIndex((x) => x.react == check);
      if (indexExisting !== -1) {
        setReactions([
          ...reactions,
          (reactions[indexExisting].count = --reactions[indexExisting].count),
        ]);
        setTotalReactions((prev) => --prev);
      }
    }
    try {
      const { data } = await axios.put("api/reactions/reactPost", {
        postId: postId,
        reaction: type,
        userId: userId,
      });
    } catch (error) {
      return error.response.data.message;
    }
  };
  const deletePost = (postid) => {
    axios
      .delete(`api/posts/${postid}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.avatarURL || PF + "person/NoAvatar.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate"> {format(post.createdAt)}</span>
          </div>
          {user.username === authState.username && (
            // <button
            //   className=""
            //   onClick={() => {
            //     deletePost(post._id);
            //   }}
            // >
            //   Delete post
            // </button>
            <div className="posTopRight">
              <div className="dropdown">
                <button className="dropbtn">
                  {" "}
                  <MoreHorizIcon />
                </button>
                <div className="dropdown-content">
                  <a
                    href="#"
                    onClick={() => {
                      deletePost(post._id);
                    }}
                  >
                    {" "}
                    Delete post
                  </a>
                  <a href="#"> Edit post</a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="postCenter container ">
          <span className="postText">{post?.content}</span>

          <div className="row">{items}</div>
          {/* <img src={post?.imageURL} alt="" className="postImg" /> */}
        </div>

        <div className="postBottom">
          <div className="reacts_count">
            <div className="reacts_count_imgs">
              {reactions &&
                reactions
                  // sort among the reactions by the number of certain reaction
                  .sort((a, b) => {
                    return b.count - a.count;
                  })
                  .slice(0, 3)
                  .map(
                    (reaction, index) =>
                      reaction.count > 0 && (
                        <img
                          src={`${PF1}reactions/${reaction.react}.png`}
                          alt="emoji"
                          key={index}
                        />
                      )
                  )}
            </div>
            <div className="reacts_count_num">
              {totalReactions > 0 && totalReactions}
            </div>
          </div>
        </div>
        <div className="post_actions">
          <ReactsPopup
            visible={visible}
            setVisible={setVisible}
            reactHandler={reactHandler}
          />
          <div
            className="post_action hover1"
            onMouseOver={() => {
              setTimeout(() => {
                setVisible(true);
              }, 500);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setVisible(false);
              }, 500);
            }}
            onClick={() => reactHandler(check ? check : "like")}
          >
            {check ? (
              <img
                src={`${PF1}reactions/${check}.png`}
                alt="emoji"
                className="small-reaction"
              />
            ) : (
              <img
                src={`${PF1}reactions/likeempty.png`}
                alt="emoji"
                className="small-reaction"
              />
            )}
            <span
              style={{
                color: `           
            ${
              check === "like"
                ? "#4267b2"
                : check === "love"
                ? "#f63459"
                : check === "haha"
                ? "#f7b125"
                : check === "sad"
                ? "#f7b125"
                : check === "wow"
                ? "#f7b125"
                : check === "angry"
                ? "#e4605a"
                : "rgba(0, 0, 0, 0.65)"
            }
            `,
              }}
            >
              {check ? " " + check : " Like"}
            </span>
          </div>
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
