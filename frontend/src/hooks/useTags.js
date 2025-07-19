import { useCallback, useState } from "react";
import { getTags } from "../libs/fetchTagsUtils";
import { API_URL } from "../libs/api";
import { getUser, getUserById } from "../libs/fetchUsersUtils";
import { getTagById } from "../libs/fetchTagsUtils";

export const useTags = () => {
  const [baseTags, setBaseTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [userTags, setUserTags] = useState([]);

  const handleSelectedTag = useCallback(
    (index) => {
      const newTags = [...baseTags];

      newTags[index].selected = !newTags[index].selected;
      const selectedTag = newTags[index];
      setBaseTags(newTags);
      setSelectedTags((prev) => {
        if (selectedTag.selected) {
          const tags = prev.filter((p) => p !== selectedTag._id);
          return [...tags, selectedTag._id];
        } else {
          return prev.filter((tag) => tag !== selectedTag._id);
        }
      });
    },
    [baseTags, setBaseTags, setSelectedTags]
  );

  const fetchBaseTags = useCallback(async () => {
    try {
      const tags = await getTags(API_URL);
      if (tags) {
        setBaseTags(tags);
      }
    } catch (e) {
      console.log(`Failed to fetch base tags.`);
      console.error(e);
    }
  }, []);

  const fetchUserTags = useCallback(async (userId) => {
    try {
      const user = await getUserById(API_URL, userId);
      const tagArr = user.interestedTag.map((u) => u);
      const tagNames = await Promise.all(
        tagArr.map((tagId) => getTagById(API_URL, tagId))
      );
      const tagsObj = tagNames.map((tag) => tag.name);
      setUserTags(tagsObj);
    } catch (e) {
      console.log(`Failed to fetch user tags.`);
      console.error(e);
    }
  }, []);

 
  return {
    baseTags,
    setBaseTags,
    handleSelectedTag,
    fetchBaseTags,
    selectedTags,
    userTags,
    fetchUserTags,
    setSelectedTags,
  };
};
