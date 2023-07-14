import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
import { ClipLoader } from "react-spinners";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader size={60} color="lightblue" />
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
