import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment.jsx";
import "./comments.css";
function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.CommentLists, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div key={index} style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p className="commentColaps" onClick={handleChange}>
          View {ChildCommentNumber} more comment(s)
        </p>
      )}

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
