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
  const getAllUser = async () => {
    const users = await getUser(API_URL);
    setAllUsers(users || []);
  };
  const fetchUser = async (userId) => {
    const user = await getUserById(API_URL, userId);
    setUser(user);
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
    setLoginUser,
    setSearchResult,
  };
};
