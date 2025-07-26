import { useEffect } from "react";
import { useParty } from "../hooks/useParty.js";
import { useUser } from "../hooks/useUser.js";
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
    <div className="mt-10 flex bg-[#beffd4ff] xl:w-[800px] lg:w-[600px] md:w-[600px] w-[500px] max-[700px]:-ml-15 rounded-2xl max-[426px]:w-[90vw] max-[426px]:ml-5 box-border overflow-y-auto scrollbar-hide h-[85vh]">
      <div className="text-black w-full">
        <div
          className="max-[426px]:h-[52vw] 
         xl:h-[330px] xl:w-[800px]
         lg:h-[250px] lg:w-[600px]
         md:h-[250px] md:w-[600px]
         h-[30vh] w-[500px] max-[426px]:w-[90vw]
        bg-[#e3ffecff] rounded-t-2xl "
        ></div>
        <div className="ml-5 mt-5 text-[18px] p-5 max-[426px]:p-1 ">
          <div className="text-[28px]">{party.name}</div>
          <div className="text-[#093c1aff] text-[18px] -mt-2 mb-3">
            Owner : {party.ownerName}
          </div>
          <div className="line-clamp-4 overflow-y-auto break-words text-[20px] bg-[#b6f8ccff] h-auto  rounded-md ">
            {party.description}
          </div>
          <div className="">
            <p className="text-[20px]">Date : {party.date}</p>
            <p className="text-[20px]">
              Time : {party.startTime} - {party.endTime}{" "}
            </p>
          </div>
          <div className="line-clamp-3 overflow-hidden break-words h-full text-[20px]">
            <span className="">Members:</span>{" "}
            <span className="text-gray-600">
              {Array.isArray(party.members)
                ? party.members.map((m) => m.penName).join(", ")
                : "Loading members..."}
            </span>
          </div>
          <div className="flex gap-3 mt-1  text-[20px]">
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
