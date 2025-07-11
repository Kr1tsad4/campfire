import { API_URL } from "../libs/api";
import { getParties } from "../libs/fetchPartyUtils";
import { getTagById } from "../libs/fetchTagsUtils";
import { useState } from "react";

export const useParty = () => {
  const [parties, setParties] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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
  return {
    parties,
    fetchParties,
    handleSearchParty,
    searchValue,
    setSearchValue,
  };
};
