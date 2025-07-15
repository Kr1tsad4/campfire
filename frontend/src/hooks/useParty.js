import { API_URL } from "../libs/api";
import {
  createParty,
  getParties,
  getPartyById,
  updateParty,
  deleteParty,
} from "../libs/fetchPartyUtils";
import { getUserById } from "../libs/fetchUsersUtils";
import { getTagById } from "../libs/fetchTagsUtils";
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
    async (searchValue, user) => {
      try {
        const res =
          searchValue && searchValue.length > 0
            ? searchValue
            : await getParties(API_URL);
        if (res) {
          const partiesWithTags = await Promise.all(
            res.map(async (party) => {
              const tagNames = await Promise.all(
                party.tags.map((tagId) => getTagById(API_URL, tagId))
              );
              return {
                ...party,
                tagNames: tagNames.map((tag) => tag.name),
              };
            })
          );
          const filteredParties = partiesWithTags.filter((p) => {
            return !p.members.includes(user?._id);
          });

          setParties(filteredParties);
        }
      } catch (error) {
        console.log(`Failed to fetch party.`);
        console.error(error);
      }
    },
    [setParties]
  );

  const handleSearchParty = async (value) => {
    const res = await getParties(API_URL);
    if (res) {
      const result = res.filter((party) =>
        party.name.toLowerCase().includes(value.toLowerCase())
      );
      await fetchParties(result);
    }
  };

  const viewPartyDetails = async (id) => {
    navigator(`/party/${id}`);
  };

  const checkUserIsMemberOfParty = async (partyId, user) => {
    const party = await getPartyById(API_URL, partyId);
    const inParty = party.members.includes(user?._id);
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
    const userParty = await parties.filter((party) => {
      return party.ownerId === user._id;
    });
    const partiesWithTags = await Promise.all(
      userParty?.map(async (party) => {
        const tagNames = await Promise.all(
          party.tags.map((tagId) => getTagById(API_URL, tagId))
        );

        return {
          ...party,
          tagNames: tagNames.map((tag) => tag.name),
        };
      })
    );
    setUserParties(partiesWithTags);
  };

  const getUserJoinedParties = async (userId) => {
    const user = await getUserById(API_URL, userId);
    const parties = await getParties(API_URL);

    const userJoinedParty = parties.filter((party) => {
      return party.members.includes(user._id) && party.ownerId !== user._id;
    });
    const partiesWithTags = await Promise.all(
      userJoinedParty.map(async (party) => {
        const tagNames = await Promise.all(
          party.tags.map((tagId) => getTagById(API_URL, tagId))
        );

        return {
          ...party,
          tagNames: tagNames.map((tag) => tag.name),
        };
      })
    );
    setJoinedParties(partiesWithTags);
  };
  const getPartyTagsAndMembersName = async (partyId) => {
    const res = await getPartyById(API_URL, partyId);
    if (res) {
      const tagIds = Array.isArray(res.tags) ? res.tags : [];

      const tagNames = await Promise.all(
        tagIds?.map((tagId) => getTagById(API_URL, tagId))
      );

      const ownerId = res.ownerId;
      const filteredMemberIds =
        res.members?.filter((id) => id !== ownerId) || [];

      const membersName = await Promise.all(
        filteredMemberIds?.map((memberId) => getUserById(API_URL, memberId))
      );

      const ownerUser = await getUserById(API_URL, ownerId);

      const partyWithTagsAndMembers = {
        ...res,
        tagNames: tagNames.map((tag) => tag.name),
        membersName: membersName?.map((member) => member.penName),
        ownerName: ownerUser?.penName,
      };

      setParty(partyWithTagsAndMembers);
    }
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
    getPartyTagsAndMembersName,
    deleteMyParty,
    updateMyParty,
    leaveParty,
  };
};
