const getUser = async (url) => {
  try {
    const data = await fetch(`${url}/users`);
    const users = data.json();
    return users;
  } catch (e) {
    throw new Error("can not get users");
  }
};

const getUserById = async (url, id) => {
  try {
    const data = await fetch(`${url}/users/${id}`);
    const user = data.json();
    return user;
  } catch (e) {
    if (data.status === 404) return undefined;
    throw new Error("can not get user");
  }
};

const createUser = async (url, newUser) => {
  try {
    const res = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newUser,
      }),
    });
    const createdUser = await res.json();
    return createdUser;
  } catch (e) {
    throw new Error("can not create user");
  }
};

const updateUser = async (url, id, updateUser) => {
  try {
    const res = await fetch(`${url}/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...updateUser,
      }),
    });
    const updatedUser = await res.json();
    return updatedUser;
  } catch (e) {
    throw new Error("can not update user");
  }
};

const deleteUser = async (url, id) => {
  try {
    const res = await fetch(`${url}/users/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("can not delete user");
  }
};

export { getUser, getUserById, createUser, updateUser, deleteUser };
