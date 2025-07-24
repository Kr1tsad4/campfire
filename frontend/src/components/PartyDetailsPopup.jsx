import { useEffect } from "react";
import { useParty } from "../hooks/useParty";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";

function PartyDetailsPopup() {
  const { partyId } = useParams();

  const {
    party,
    fetchPartyById,
    checkUserIsMemberOfParty,
    isMember,
    joinParty,
  } = useParty();
  const { loginUser, getLoginUser } = useUser();
  const navigator = useNavigate();

  useEffect(() => {
    fetchPartyById(partyId);
  }, [partyId]);

  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    checkUserIsMemberOfParty(partyId, loginUser);
  }, [loginUser]);
  if (!party) return <div>Loading...</div>;

  return (
    <div className="mt-10 flex bg-[#beffd4ff] xl:w-[800px] lg:w-[600px] md:w-[600px] w-[90vw] rounded-2xl max-[426px]:ml-5 box-border overflow-y-auto scrollbar-hide h-[85vh]">
      <div className="text-black">
        <div
          className="max-[426px]:h-[52vw] 
         xl:h-[330px] xl:w-[800px]
         lg:h-[250px] lg:w-[600px]
         md:h-[250px] md:w-[600px]
         h-[30vh] w-[90vw] max-[426px]:w-[90vw]
        bg-[#e3ffecff] rounded-t-2xl "
        ></div>
        <div className="ml-5 mt-5 text-[18px] p-5 max-[426px]:p-1">
          <h1 className="">Party name : {party.name}</h1>
          <h1>Owner : {party.ownerName}</h1>
          <h1>Description : {party.description}</h1>
          <p>Date : {party.date}</p>
          <p>
            Time : {party.startTime} - {party.endTime}{" "}
          </p>
          <div className="flex gap-2">
            Members:{" "}
            {Array.isArray(party.members)
              ? party.members.map((member, index) => (
                  <div key={index}>{member.penName}</div>
                ))
              : "Loading members..."}
          </div>

          <div className="flex gap-3 mt-1">
            Tags:{" "}
            {Array.isArray(party.tags)
              ? party.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="border-1 rounded-2xl px-1 bg-blue-200"
                  >
                    {tag.name}
                  </div>
                ))
              : "Loading tags..."}
          </div>

          <div className="flex justify-end mr-5 mt-[100px] gap-5 max-[1025px]:mt-10">
            {!isMember && (
              <button
                onClick={() => joinParty(loginUser._id, party._id)}
                className="bg-[#7ad89aff] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#63b77fff] "
              >
                Join
              </button>
            )}
            {isMember && (
              <button
                onClick={() => navigator(`/party/${partyId}/lobby`)}
                className="bg-[#63b77fff] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#63b77fff] "
              >
                view
              </button>
            )}
            <button
              onClick={() => navigator(-1)}
              className="bg-[#7ad89aff] rounded-[5px] w-fit mt-2 px-8 py-4 font-[700] cursor-pointer hover:bg-[#63b77fff] "
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
