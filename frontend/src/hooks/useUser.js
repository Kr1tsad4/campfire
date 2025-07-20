import { useState, useEffect } from "react";
import {
  getUser,
  getUserById,
  updateUser,
} from "../libs/fetchUsersUtils";
import { API_URL } from "../libs/api";
import { getPartyById } from "../libs/fetchPartyUtils";

export const useUser = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const getAllUser = async () => {
    const users = await getUser(API_URL);
    setAllUsers(users || []);
  };
  const fetchUser = async (userId) => {
    const user = await getUserById(API_URL, userId);
    setUser(user);
  };

  const getUserFriends = async (userId) => {
    const user = await getUserById(API_URL, userId);
    setFriends(user.friends || []);

    setLoginUser(user);
    saveLoginUserSession(user);
  };
  const saveLoginUserSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const getLoginUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setLoginUser(user);
    setIsLoadingUser(false);
  };

  const removeLoginUser = () => {
    sessionStorage.removeItem("user");
  };

  const deleteUserFriend = async (userId, friendId) => {
    const user = await getUserById(API_URL, userId);
    const friend = await getUserById(API_URL, friendId);

    const updatedUserFriends = user.friends.filter((f) => f._id !== friend._id);
    const updatedFriendFriends = friend.friends.filter(
      (f) => f._id !== user._id
    );

    await updateUser(API_URL, userId, { friends: updatedUserFriends });
    await updateUser(API_URL, friendId, { friends: updatedFriendFriends });

    const updatedLoginUser = await getUserById(API_URL, userId);
    saveLoginUserSession(updatedLoginUser);
  };

  const searchUserByName = async (from, searchValue, partyId, loginUser) => {
    if (!searchValue) {
      setSearchResult([]);
      return;
    }
    if (from === "party" && partyId) {
      const party = await getPartyById(API_URL, partyId);

      const members = party.members.map((member) => member);

      const result = allUsers.filter((user) => {
        const isAlreadyMember = members.some(
          (member) => member._id === user._id
        );
        return (
          user.penName.toLowerCase().includes(searchValue.toLowerCase()) &&
          !isAlreadyMember
        );
      });
      setSearchResult(result);
    } else if (from === "friends" && loginUser) {
      const result = allUsers.filter((user) => {
        const isLoginUser = user._id === loginUser._id;

        return (
          user.penName.toLowerCase().includes(searchValue.toLowerCase()) &&
          !isLoginUser
        );
      });
      setSearchResult(result);
    }
  };

  // const createRequest = async (fromUserId, toUserId) => {
  //   await createFriendRequest(API_URL, {
  //     fromUser: fromUserId,
  //     toUser: toUserId,
  //   });
  // };

  // const acceptUserRequest = async (requestId, userId) => {
  //   await acceptFriendRequest(API_URL, requestId);

  //   const updatedLoginUser = await getUserById(API_URL, userId);
  //   saveLoginUserSession(updatedLoginUser);
  // };

  // const getUserRequest = async (userId) => {
  //   const req = await getUserRequests(API_URL, userId);
  //   if (req) {
  //     setRequests(req);
  //   } else {
  //     setRequests([]);
  //   }
  // };

  const deleteUserRequest = async (requestId) => {
    await deleteFriendRequest(API_URL, requestId);
  };
  return {
    loginUser,
    getLoginUser,
    saveLoginUserSession,
    removeLoginUser,
    isLoadingUser,
    searchUserByName,
    searchResult,
    getAllUser,
    fetchUser,
    user,
    getUserFriends,
    friends,
    deleteUserFriend,
    setLoginUser,
    // createRequest,
    requests,
    // getUserRequest,
    deleteUserRequest,
    // acceptUserRequest,
    setFriends,
    setSearchResult,
  };
};
