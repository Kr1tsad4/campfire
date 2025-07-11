import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useParty } from "../hooks/useParty";
import { getPartyById } from "../libs/fetchPartyUtils";
import { getTagById } from "../libs/fetchTagsUtils";
import { API_URL } from "../libs/api";

function PartyDetailsPage() {
  const { id } = useParams();
  const { party, setParty } = useParty();
  useEffect(() => {
    const fetch = async () => {
      const res = await getPartyById(API_URL, id);
      if (res) {
        const tagNames = await Promise.all(
          res.tags.map((tagId) => getTagById(API_URL, tagId))
        );
        const partyWithTags = {
          ...res,
          tagNames: tagNames.map((tag) => tag.name),
        };
        setParty(partyWithTags);
      }
    };
    fetch();
  }, [id]);

  if (!party) return <div>Loading...</div>;

  return (
    <div className="p-5 bg-[#fff7f8] min-h-screen w-auto text-black">
      <h1>{party.name}</h1>
      <h1>{party.description}</h1>
      <p>Date : {party.date}</p>
      <p>
        Time : {party.startTime} - {party.endTime}{" "}
      </p>
      <p>Tags: {party.tagNames.join(',')}</p>
    </div>
  );
}
export default PartyDetailsPage;
