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
  const [statusMap, setStatusMap] = useState({});
  const [acceptStatusFriends, setAcceptStatusFriends] = useState([]);
  const [pendingStatusFriends, setPendingStatusFriends] = useState([]);
  const getUserFriends = async (userId) => {
    const requests = await getToUserRequests(API_URL, userId);
    const pendingFromTo = await getFromUserRequests(API_URL, userId);
    const mapping = {};
    requests.forEach((request) => {
      mapping[request.fromUser._id] = request.status;
    });
    pendingFromTo.forEach((request) => {
      mapping[request.toUser._id] = request.status;
    });
    setStatusMap(mapping);
    const accepted = requests.filter((request) => request.status === "accepted");
    // console.log(accepted);
    setAcceptStatusFriends(accepted);

    const pending = requests.filter((request) => request.status === "pending");
    // console.log(pending);
    setPendingStatusFriends(pending);
  };
  return {
    statusMap,
    setStatusMap,
    acceptStatusFriends,
    pendingStatusFriends,
    getUserFriends,
    setAcceptStatusFriends,
    setPendingStatusFriends,
  };
};
