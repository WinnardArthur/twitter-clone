import React from "react";
import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}
const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem key={comment.id} data={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
