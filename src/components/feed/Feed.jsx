import "./feed.css"
import Share from "../share/Share.jsx"
import Post from "../post/Post.jsx"
import {Posts} from "../../data.js"


export default function Feed() {
    return(
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {Posts.map(p=>(
                    <Post key={p.id} post={p}/>))}
                
            </div>
        </div>
    )
};
