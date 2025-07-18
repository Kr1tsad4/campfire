const commentService = require("../services/comment-service");
const postService = require("../services/post-service");

const commentSocketHandler = (io, socket) => {
  socket.on("comment", async ({ commentedBy, content, commentToPost }) => {
    try {
      const newComment = await commentService.create({
        commentedBy,
        content,
        commentToPost,
      });
      if (newComment) {
        const posts = await postService.findAll();
        io.emit("new-comment", posts);
      }
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = { commentSocketHandler };
