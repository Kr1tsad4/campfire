import { API_URL } from "../libs/api";
import {
  createParty,
  getParties,
  getPartyById,
  updateParty,
  deleteParty,
} from "../libs/fetchPartyUtils";
import { getUserById } from "../libs/fetchUsersUtils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useParty = () => {
  const [parties, setParties] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [party, setParty] = useState(null);
  const [partyName, setPartyName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userParties, setUserParties] = useState(null);
  const [joinedParties, setJoinedParties] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const navigator = useNavigate();
  const fetchParties = useCallback(
    async (user, keyword = "") => {
      try {
        const res = await getParties(API_URL);
        if (res) {
          let filtered = res;

          if (keyword.trim()) {
            filtered = res.filter((p) =>
              p.name.toLowerCase().includes(keyword.toLowerCase())
            );
          }
          filtered = filtered.filter((p) => {
            return !p.members?.some((m) => m._id === user?._id);
          });
          setParties(filtered);
        }
      } catch (error) {
        console.log(`Failed to fetch party.`);
        console.error(error);
      }
    },
    [setParties]
  );

  const fetchPartyById = useCallback(
    async (partyId) => {
      try {
        const res = await getPartyById(API_URL, partyId);
        if (res) {
          const owner = await getUserById(API_URL, res.ownerId);
          const partyWithOwnerName = { ...res, ownerName: owner?.penName };
          setParty(partyWithOwnerName);
        }
      } catch (error) {
        console.log(`Failed to fetch party.`);
        console.error(error);
      }
    },
    [setParty]
  );

  const handleSearchParty = async (value, user) => {
    await fetchParties(user, value);
  };

  const viewPartyDetails = async (id) => {
    navigator(`/party/${id}`);
  };

  const checkUserIsMemberOfParty = async (partyId, user) => {
    const party = await getPartyById(API_URL, partyId);
    const inParty = party.members?.some((m) => m._id === user?._id);
    if (inParty) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }
  };
  const createNewParty = async (
    { partyName, description, selectedDate, startTime, endTime, selectedTags },
    userId
  ) => {
    const partyData = {
      name: partyName,
      ownerId: userId,
      description,
      date: selectedDate,
      startTime,
      endTime,
      tags: selectedTags,
    };
    const newParty = await createParty(API_URL, partyData);
    if (newParty) {
      await fetchParties();
      navigator("/my-party");
    }
  };

  const joinParty = async (userId, partyId) => {
    const party = await getPartyById(API_URL, partyId);

    if (party) {
      const isUserInParty = party.members.includes(userId);
      if (!isUserInParty) {
        party.members.push(userId);
        await updateParty(API_URL, partyId, { members: party.members });
        navigator(`/party/${partyId}/lobby`);
      }
    }
  };

  const leaveParty = async (userId, partyId) => {
    const party = await getPartyById(API_URL, partyId);

    if (party) {
      const isUserInParty = party.members.includes(userId);
      if (isUserInParty) {
        const updatedMembers = party.members.filter(
          (member) => member !== userId
        );
        await updateParty(API_URL, partyId, { members: updatedMembers });
        navigator("/my-party");
      }
    }
  };

  const getUserParties = async (userId) => {
    const user = await getUserById(API_URL, userId);
    const parties = await getParties(API_URL);
    const userOwnParty = await parties.filter((party) => {
      return party.ownerId === user._id;
    });

    setUserParties(userOwnParty);
  };

  const getUserJoinedParties = async (userId) => {
    const user = await getUserById(API_URL, userId);
    const parties = await getParties(API_URL);

    const userJoinedParty = parties.filter((party) => {
      return (
        party.members?.some((m) => m._id === user?._id) &&
        party.ownerId !== user._id
      );
    });
    setJoinedParties(userJoinedParty);
  };

  const updateMyParty = async (partyFormData, userId, id) => {
    const partyData = {
      name: partyFormData.name,
      ownerId: userId,
      description: partyFormData.description,
      date: partyFormData.date,
      startTime: partyFormData.startTime,
      endTime: partyFormData.endTime,
      tags: partyFormData.tags,
    };
    const updatedParty = await updateParty(API_URL, id, partyData);

    if (updatedParty) {
      await fetchParties();
      navigator("/my-party");
    }
  };

  const deleteMyParty = async (partyId, userId) => {
    await deleteParty(API_URL, partyId);
    await getUserParties(userId);
    navigator("/my-party");
  };
  return {
    parties,
    fetchParties,
    handleSearchParty,
    searchValue,
    setSearchValue,
    viewPartyDetails,
    party,
    setParty,
    createNewParty,
    partyName,
    setPartyName,
    description,
    setDescription,
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    userParties,
    getUserParties,
    joinedParties,
    getUserJoinedParties,
    joinParty,
    checkUserIsMemberOfParty,
    isMember,
    fetchPartyById,
    deleteMyParty,
    updateMyParty,
    leaveParty,
  };
};
