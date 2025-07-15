import { useEffect } from "react";
import { useParty } from "../hooks/useParty";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";

function PartyDetailsPopup() {
  const { partyId } = useParams();

  const {
    party,
    getPartyTagsAndMembersName,
    checkUserIsMemberOfParty,
    isMember,
    joinParty,
  } = useParty();
  const { loginUser, getLoginUser } = useUser();
  const navigator = useNavigate();

  useEffect(() => {  
    getPartyTagsAndMembersName(partyId);
  }, [partyId]);

  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    checkUserIsMemberOfParty(partyId, loginUser);
  }, [loginUser]);

  if (!party) return <div>Loading...</div>;

  return (
    <div className="flex bg-[#c86e5a] h-[650px] w-[800px] max-[1025px]:w-[700px] max-[1025px]:h-[600px] max-[769px]:w-[600px] max-[426px]:w-[380px] max-[321px]:w-[300px] rounded-2xl m-5">
      <div className="text-black">
        <div className="h-[250px] w-[800px] bg-[#FEF3C7] rounded-t-2xl max-[1025px]:w-[700px] max-[769px]:w-[600px] max-[426px]:w-[380px] max-[321px]:w-[300px]"></div>
        <div className="ml-10 mt-5 text-[18px]">
          <h1 className="">Party name : {party.name}</h1>
          <h1>Owner : {party.ownerName}</h1>
          <h1>Description : {party.description}</h1>
          <p>Date : {party.date}</p>
          <p>
            Time : {party.startTime} - {party.endTime}{" "}
          </p>
          <p>Members: {party.membersName.join(" ") || "-"}</p>
          <p>Tags: {party.tagNames.join(",")}</p>
          <div className="flex justify-end mr-5 mt-[100px] gap-5 max-[1025px]:mt-10">
            {!isMember && (
              <button
                onClick={() => joinParty(loginUser._id, party._id)}
                className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#f0b291] "
              >
                Join
              </button>
            )}
            {isMember && (
              <button
                onClick={() => navigator(`/party/${partyId}/lobby`)}
                className="bg-[#f3bfa3] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#f0b291] "
              >
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
export default PartyDetailsPopup;
