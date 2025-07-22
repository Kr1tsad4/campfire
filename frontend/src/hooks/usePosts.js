import { useCallback, useState } from "react";
import {
  createPost,
  deletePost,
  getPosts,
  deleteComment,
} from "../libs/fetchPostUtils";
import { API_URL } from "../libs/api";

export const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [content, setContent] = useState("");

  const fetchAllPost = useCallback(async () => {
    const res = await getPosts(API_URL);
    setPosts(res || []);
  });

  const createNewPost = async (userId) => {
    const post = { authorId: userId, content };
    const newPost = await createPost(API_URL, post);
    if (newPost) {
      fetchAllPost();
      setContent("");
    }
  };
  const deleteUserPost = async (postId) => {
    const deletedPost = await deletePost(API_URL, postId);
    if (deletedPost) {
      fetchAllPost();
    }
  };
  const deleteUserComment = async (commentId) => {
    const deletedComment = await deleteComment(API_URL, commentId);
    if (deletedComment) {
      fetchAllPost();
    }
  };
  return {
    posts,
    setPosts,
    fetchAllPost,
    createNewPost,
    setContent,
    content,
    deleteUserPost,
    deleteUserComment
  };
};
