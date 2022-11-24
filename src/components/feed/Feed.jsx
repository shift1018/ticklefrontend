import "./feed.css"
import Share from "../share/Share.jsx"
import Post from "../post/Post.jsx"
//import {Posts} from "../../data.js"
//import { useEffect } from "react"
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";

export default function Feed() {
    const [posts,setPosts] = useState([]);

    useEffect(()=> {
        const fetchPosts = async () => {
        const res = await axios.get("api/posts/");
       // console.log(res)
        setPosts(res.data)
        };
        fetchPosts();
    },[])
    return(
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map(p=>(
                    <Post key={p._id} post={p}/>))}
                
            </div>
        </div>
    )
};
