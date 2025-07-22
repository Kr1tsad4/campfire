const getPosts = async (url) => {
  try {
    const data = await fetch(`${url}/posts`);
    const posts = data.json();
    return posts;
  } catch (e) {
    throw new Error("can not get posts");
  }
};

const getPostById = async (url, id) => {
  try {
    const data = await fetch(`${url}/posts/${id}`);
    const post = data.json();
    return post;
  } catch (e) {
    if (data.status === 404) return undefined;
    throw new Error("can not get post");
  }
};

const createPost = async (url, newPost) => {
  try {
    const res = await fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newPost,
      }),
    });
    const createdPost = await res.json();
    return createdPost;
  } catch (e) {
    throw new Error("can not create post");
  }
};

const deletePost = async (url, id) => {
  try {
    const res = await fetch(`${url}/posts/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("can not delete post");
  }
};

const deleteComment = async (url, id) => {
  try {
    const res = await fetch(`${url}/posts/comment/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("can not delete comment");
  }
};

export { getPosts, getPostById, createPost, deletePost, deleteComment };
