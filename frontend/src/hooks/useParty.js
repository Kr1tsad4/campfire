import { API_URL } from "../libs/api";
import {
  createParty,
  getParties,
  getPartyById,
  updateParty,
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
    console.log(userId);
    const partyData = {
      name: partyName,
      ownerId: userId,
      description,
      data: selectedDate,
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
      userParty.map(async (party) => {
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
  };
};
