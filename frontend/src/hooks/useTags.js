import { useCallback, useState } from "react";
import { getTags } from "../libs/fetchTagsUtils";
import { API_URL } from "../libs/api";

export const useTags = () => {
  const [baseTags, setBaseTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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
  return {
    baseTags,
    setBaseTags,
    handleSelectedTag,
    fetchBaseTags,
    selectedTags,
  };
};
