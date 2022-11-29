import React, { useState } from 'react';
import { Avatar, Button, Input } from "antd";
import Comment from "@ant-design/compatible/lib/comment"
import axios from "../../utils/axios.js";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.js";

const { TextArea } = Input; 


function SingleComment(props) {

    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);
    const { authState } = useContext(AuthContext);

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            user: authState.userId,
            post: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        axios.post('api/comments/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.result)
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    // update saved data into parent component using props and refreshFunction
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    // this hides or opens "reply" text area on UI
    const actions = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]


    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.user.username}
                avatar={
                    <Avatar
                        src={props.comment.user.avatarURL}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

                {/* this checks the condition if OpenReply is true or false, based on it the textarea for the reply will display  */}
            {OpenReply && 
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write a reply"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
                </form>
            } 

        </div>
    )
}

export default SingleComment