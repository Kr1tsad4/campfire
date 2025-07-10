const getTags = async (url) => {
  try {
    const data = await fetch(`${url}/tags`);
    const tags = data.json();
    return tags;
  } catch (e) {
    throw new Error("can not get tags");
  }
};

const getTagById = async (url, id) => {
  try {
    const data = await fetch(`${url}/tags/${id}`);
    const tag = data.json();
    return tag;
  } catch (e) {
    if (data.status === 404) return undefined;
    throw new Error("can not get tag");
  }
};

const createTag = async (url, newTag) => {
  try {
    const res = await fetch(`${url}/tags`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newTag,
      }),
    });
    const createdTag = await res.json();
    return createdTag;
  } catch (e) {
    throw new Error("can not create tag");
  }
};

const updateTag = async (url, id, updateTag) => {
  try {
    const res = await fetch(`${url}/tags/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...updateTag,
      }),
    });
    const updatedTag = await res.json();
    return updatedTag;
  } catch (e) {
    throw new Error("can not update tag");
  }
};

const deleteTag = async (url, id) => {
  try {
    const res = await fetch(`${url}/tags/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("can not delete tag");
  }
};

export { getTags, getTagById, createTag, updateTag, deleteTag };
