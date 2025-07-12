import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useParty } from "../hooks/useParty";
import { getPartyById } from "../libs/fetchPartyUtils";
import { getTagById } from "../libs/fetchTagsUtils";
import { API_URL } from "../libs/api";
import { useUser } from "../hooks/useUser";

function PartyDetailsPage() {
  const { id } = useParams();
  const { party, setParty, joinParty } = useParty();
  const { loginUser, getLoginUser } = useUser();

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

  useEffect(() => {
    getLoginUser();
  }, []);

  if (!party) return <div>Loading...</div>;

  return (
    <div className="p-5 bg-[#fff7f8] min-h-screen w-auto text-black">
      <h1>{party.name}</h1>
      <h1>{party.description}</h1>
      <p>Date : {party.date}</p>
      <p>
        Time : {party.startTime} - {party.endTime}{" "}
      </p>
      <p>Members: {party.members.length}</p>
      <p>Tags: {party.tagNames.join(",")}</p>
      <button
        onClick={() => joinParty(loginUser._id, party._id)}
        className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] cursor-pointer hover:bg-[#f0b291] "
      >
        Join
      </button>
    </div>
  );
}
export default PartyDetailsPage;
