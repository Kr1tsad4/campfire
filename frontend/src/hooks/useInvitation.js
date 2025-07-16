import { useCallback, useState } from "react";
import { API_URL } from "../libs/api";
import {
  getAllInvitation,
  getUserInvitation,
  getInvitationById,
  createInvitation,
  deleteInvitation,
} from "../libs/fetchInvitationUtils";

const user = JSON.parse(sessionStorage.getItem("user"));

export const useInvitation = () => {
  const [userInvitation, setUserInvitation] = useState([]);

  const fetchUserInvitation = async () => {
    const invite = await getUserInvitation(API_URL,user._id);
    setUserInvitation(invite);
  };

  return {
    userInvitation,
    setUserInvitation,
    fetchUserInvitation,
  };
};
