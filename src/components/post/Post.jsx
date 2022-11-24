import "./post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {format} from "timeago.js"


export default function Post({post}) {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=> {
        const fetchUser = async () => {
        const res = await axios.get(`users/byId/${post.user}`);
       // console.log(res)
        setUser(res.data)
        };
        fetchUser();
    },[post.user])

    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={user.avatarURL || PF+"NoAvatar.png"} alt="" className="postProfileImg" />
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate"> {format(post.createdAt)}</span>
                    </div>
                    <div className="posTopRight">
                   < MoreHorizIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.content}</span>
                    <img src={post?.imageURL} alt="" className="postImg" />
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}post/like.png`} alt="" className="likeIcon" onClick={likeHandler} />
                        <img src={`${PF}post/heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment}comments</span>
                    </div>
                </div>
            </div>

        </div>
    )
};
