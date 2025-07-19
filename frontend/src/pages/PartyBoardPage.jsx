import Layout from "../components/Layout";
import { usePosts } from "../hooks/usePosts";
import { useEffect, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { useNavigationBar } from "../contexts/NavigationContext";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
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

  const { hideNavBar } = useNavigationBar();

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
      <div
        className={`${
          hideNavBar
            ? " md:ml-[30px] lg:ml-[920px] xl:ml-[640px]"
            : " md:ml-[30px] lg:ml-[0px]"
        } overflow-x-hidden mt-25 text-black relative border-1 border-gray-300 rounded-xl bg-white shadow-sm`}
      >
        <h1 className="text-4xl ml-4 md:ml-0 pt-5 pl-6">Board</h1>

        <div className="w-[95vw] md:w-[85vw] lg:w-[60vw] h-auto p-5">
          <div className="p-2 mb-4 rounded-xl">
            <input
              type="text"
              placeholder="What's on your mind ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="outline-none border-1 border-gray-400 w-full p-2 rounded-lg"
            />
            <div className="mt-5 flex justify-end">
              <button
                className={` px-4 py-1 rounded-md  ${
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
              className="border border-gray-300 mb-4 rounded-xl p-4 bg-white shadow-sm cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: 40,
                      height: 40,
                      fontSize: 18,
                    }}
                  >
                    {post.authorId.penName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <h1 className="text-lg font-semibold">
                      {post.authorId.penName}
                    </h1>
                    <p className="text-sm mt-1 text-gray-700">{post.content}</p>
                  </div>
                </div>

                {post?.authorId?._id === loginUser?._id && (
                  <button
                    className="text-gray-600 hover:text-red-600"
                    onClick={() => openConfirmDeletePopup(post._id)}
                  >
                    <IoTrashBinOutline size={18} />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between  mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 ">
                  <FaRegCommentAlt size={14} />
                  <span>{post.comments.length}</span>
                </div>

                <button
                  className="flex items-center self-end gap-1 text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => toggleComments(post._id)}
                >
                  <FaRegCommentAlt size={14} />
                  <p>Comment</p>
                </button>
              </div>
              {showCommentPostId === post._id && (
                <div className="mt-4 pt-2 border-t border-gray-200">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleComment(post._id);
                      }
                    }}
                    className="w-full border border-gray-300 p-2 rounded-lg outline-none text-sm"
                  />

                  <div className="mt-3 space-y-2">
                    {post.comments?.map((comment, cIndex) => (
                      <div key={cIndex} className="pl-1 flex gap-3">
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 25,
                            height: 25,
                            fontSize: 10,
                          }}
                        >
                          {post.authorId.penName?.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">
                            {comment.commentedBy.penName}
                          </p>
                          <p className="text-sm text-gray-700">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
