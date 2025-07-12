import { useEffect, useState } from "react";
import { useParty } from "../hooks/useParty";
import { getPartyById } from "../libs/fetchPartyUtils";
import { getTagById } from "../libs/fetchTagsUtils";
import { API_URL } from "../libs/api";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../libs/fetchUsersUtils";

function PartyDetailsPage() {
  const { partyId } = useParams();

  const { party, setParty, checkUserIsMemberOfParty, isMember } = useParty();
  const { loginUser, getLoginUser } = useUser();
  const navigator = useNavigate();

 useEffect(() => {
  const fetch = async () => {
    const res = await getPartyById(API_URL, partyId);
    if (res) {
      const tagNames = await Promise.all(
        res.tags.map((tagId) => getTagById(API_URL, tagId))
      );
      const ownerId = res.ownerId;
      const filteredMemberIds = res.members.filter((id) => id !== ownerId);

      const membersName = await Promise.all(
        filteredMemberIds.map((memberId) => getUserById(API_URL, memberId))
      );

      const ownerUser = await getUserById(API_URL, ownerId);

      const partyWithTagsAndMembers = {
        ...res,
        tagNames: tagNames.map((tag) => tag.name),
        membersName: membersName.map((member) => member.penName),
        ownerName: ownerUser?.penName,
      };

      setParty(partyWithTagsAndMembers);
    }
  };
  if (partyId) fetch();
}, [partyId]);


  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    checkUserIsMemberOfParty(partyId, loginUser);
  }, [loginUser]);

  if (!party) return <div>Loading...</div>;

  return (
    <div className="flex bg-[#c86e5a] h-[650px] w-[800px] rounded-2xl m-5">
      <div className="text-black">
        <div className="h-[250px] w-[800px] bg-[#FEF3C7] rounded-t-2xl"></div>
        <div className="ml-10 mt-5">
          <h1>Party name : {party.name}</h1>
          <h1>Owner : {party.ownerName}</h1>
          <h1>Description : {party.description}</h1>
          <p>Date : {party.date}</p>
          <p>
            Time : {party.startTime} - {party.endTime}{" "}
          </p>
          <p>Members: {party.membersName.join(",") || "-" }</p>
          <p>Tags: {party.tagNames.join(",")}</p>
          <div className="flex justify-end mr-5 mt-[120px] gap-5">
            {!isMember && (
              <button
                onClick={() => joinParty(loginUser._id, party._id)}
                className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#f0b291] "
              >
                Join
              </button>
            )}
            {isMember && (
              <button className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#f0b291] ">
                view
              </button>
            )}
            <button
              onClick={() => navigator(-1)}
              className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#f0b291] "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PartyDetailsPage;
