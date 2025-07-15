import { useState, useEffect } from "react";
import { getUser } from "../libs/fetchUsersUtils";
import { API_URL } from "../libs/api";
import { getPartyById } from "../libs/fetchPartyUtils";

export const useUser = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const getAllUser = async () => {
    const users = await getUser(API_URL);
    setAllUsers(users || []);
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

  const searchUserByName = async (searchValue, partyId) => {
    if (!searchValue) {
      setSearchResult([]);
      return;
    }

    const party = await getPartyById(API_URL, partyId);
    const memberIds = party.members.map((member) => member);

    const result = allUsers.filter(
      (user) =>
        user.penName.toLowerCase().includes(searchValue.toLowerCase()) &&
        !memberIds.includes(user._id)
    );

    setSearchResult(result);
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
  };
};
