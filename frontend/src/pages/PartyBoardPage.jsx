import Layout from "../components/Layout";
import { usePosts } from "../hooks/usePosts";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { IoTrashBinOutline } from "react-icons/io5";

import socket from "../socket";
function PartyBoardPage({ loginUser }) {
  const {
    posts,
    setPosts,
    fetchAllPost,
    createNewPost,
    setContent,
    content,
    deleteUserPost,
  } = usePosts();
  const [showCommentPostId, setShowCommentPostId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  useEffect(() => {
    fetchAllPost();
  }, []);

  const toggleComments = (postId) => {
    setShowCommentPostId((prevId) => (prevId === postId ? null : postId));
  };
  useEffect(() => {
    const handleNewComment = (post) => {
      setPosts(post);
    };
    socket.on("new-comment", handleNewComment);

    return () => {
      socket.off("new-comment", handleNewComment);
    };
  }, []);

  const openConfirmDeletePopup = (postId) => {
    setShowConfirmPopup(true);
    setPostToDelete(postId);
  };

  const handleDeletePost = () => {
    deleteUserPost(postToDelete);
    setShowConfirmPopup(false);
  };
  const handleComment = (postId) => {
    socket.emit("comment", {
      commentedBy: loginUser?._id,
      content: commentContent,
      commentToPost: postId,
    });
    setCommentContent("");
  };
  return (
    <Layout hideSearchBar={true} loginUser={loginUser}>
      <div className="ml-[600px] mt-25 text-black relative ">
        <h1 className="text-4xl mb-2">Board</h1>

        <div className="w-[500px] h-auto p-5">
          <div className="border-1 p-5 mb-4 rounded-xl">
            <input
              type="text"
              placeholder="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="outline-none w-[380px] "
            />
            <div className="mt-5 flex justify-end">
              <button
                className={` px-4 py-1 rounded-xl  ${
                  content ? "cursor-pointer bg-blue-500" : "bg-gray-400"
                }`}
                disabled={!content}
                onClick={() => createNewPost(loginUser?._id)}
              >
                Post
              </button>
            </div>
          </div>
          {posts?.map((post, index) => (
            <div
              key={post._id || index}
              className="border-1 p-5 mb-4 rounded-xl"
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{post.authorId.penName}</h1>
                {post?.authorId?._id === loginUser?._id && (
                  <button
                    className="cursor-pointer"
                    onClick={() => openConfirmDeletePopup(post._id)}
                  >
                    <IoTrashBinOutline size={20} />
                  </button>
                )}
              </div>
              <p>{post.content}</p>
              <div className="flex gap-3 mt-2">
                <button
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => toggleComments(post._id)}
                >
                  <FaRegComment size={20} color="black" />
                </button>
                <p>{post.comments.length}</p>
              </div>

              {showCommentPostId === post._id && (
                <div className="border-t-1 mt-2 pt-2">
                  <div className="border-1 p-4 mb-4 rounded-xl h-15">
                    <input
                      type="text"
                      placeholder="comment"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="outline-none w-[380px] overflow-scroll"
                    />
                  </div>
                  <div className=" flex justify-end">
                    <button
                      className="bg-blue-500 px-4 py-1 rounded-xl cursor-pointer"
                      onClick={() => handleComment(post._id)}
                    >
                      Comment
                    </button>
                  </div>
                  {post.comments?.map((comment, cIndex) => (
                    <div key={cIndex}>
                      <h1 className="text-xl font-bold">
                        {comment.commentedBy.penName}
                      </h1>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {showConfirmPopup && (
            <div className="bg-opacity-40  inset-0 fixed flex justify-center items-center z-50 left-20">
              <div className="bg-white p-6 rounded-xl w-[300px] text-center shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Delete Post?</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to delete this post?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
                    onClick={() => {
                      handleDeletePost();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-1 rounded cursor-pointer"
                    onClick={() => setShowConfirmPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PartyBoardPage;
