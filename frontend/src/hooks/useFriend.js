import { useState } from "react";
import {
  getToUserRequests,
  getFromUserRequests,
  createFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
} from "../libs/fetchFriendsUtil";
import { API_URL } from "../libs/api";

export const useFriend = () => {
  const [acceptStatusFriends, setAcceptStatusFriends] = useState([]);
  const [pendingStatusFriends, setPendingStatusFriends] = useState([]);
  const getUserFriends = async (userId) => {
    const users = await getToUserRequests(API_URL, userId);
    const accepted = users.filter((user) => user.status === "accepted");
    console.log(accepted);
    setAcceptStatusFriends(accepted);

    const pending = users.filter((user) => user.status === "pending");
    console.log(pending);
    setPendingStatusFriends(pending);
  };
  return {
    acceptStatusFriends,
    pendingStatusFriends,
    getUserFriends,
    setAcceptStatusFriends,
    setPendingStatusFriends,
  };
};
