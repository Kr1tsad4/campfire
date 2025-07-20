const getToUserRequests = async (url, userId) => {
  try {
    const res = await fetch(`${url}/friends/${userId}`);
    const requests = await res.json();
    return requests;
  } catch (e) {
    throw new Error("cannot get friend requests");
  }
};
const getFromUserRequests = async (url, userId) => {
  try {
    const res = await fetch(`${url}/friends/fromUser/${userId}`);
    const requests = await res.json();
    return requests;
  } catch (e) {
    throw new Error("cannot get friend requests");
  }
};

const createFriendRequest = async (url, newRequest) => {
  try {
    const res = await fetch(`${url}/friends`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newRequest,
      }),
    });
    const createdRequest = await res.json();
    return createdRequest;
  } catch (e) {
    throw new Error("cannot create friend request");
  }
};

const acceptFriendRequest = async (url, requestId) => {
  try {
    const res = await fetch(`${url}/friends/accept`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ requestId }),
    });
    const acceptedRequest = await res.json();
    return acceptedRequest;
  } catch (e) {
    throw new Error("cannot accept friend request");
  }
};

const deleteFriendRequestById = async (url, requestId) => {
  try {
    const res = await fetch(`${url}/friends/${requestId}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("cannot delete friend request");
  }
};

const deleteFriendRequest = async (url, user1, user2) => {
  try {
    const res = await fetch(`${url}/friends/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1,
        user2,
      }),
    });
    return res.status;
  } catch (e) {
    throw new Error("cannot delete friend request");
  }
};

export {
  getToUserRequests,
  getFromUserRequests,
  createFriendRequest,
  acceptFriendRequest,
  deleteFriendRequestById,
  deleteFriendRequest,
};
