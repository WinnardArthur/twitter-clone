import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : "";
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default usePost;
