import { API_URL } from "../libs/api";
import { getParties, getPartyById } from "../libs/fetchPartyUtils";
import { getTagById } from "../libs/fetchTagsUtils";
import { useState } from "react";
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
  const [tags, setTags] = useState("");

  const navigator = useNavigate();
  const fetchParties = async (searchValue) => {
    const res = searchValue ? searchValue : await getParties(API_URL);
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

      setParties(partiesWithTags);
    }
  };

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

  const createNewParty = async() =>{
    console.log(partyName);
    console.log(description);
    console.log(selectedDate);
    console.log(startTime);
    console.log(endTime);
    console.log(tags);
  }
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
    tags,
    setTags
  };
};
