import { useNavigationBar } from "../contexts/NavigationContext";
import { useParams } from "react-router-dom";
import { useParty } from "../hooks/useParty";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import InvitePopup from "../components/InvitePopup";
import Layout from "../components/Layout";
import { useUser } from "../hooks/useUser";

function PartyLobby({ loginUser }) {
  const { hideNavBar } = useNavigationBar();
  const { partyId } = useParams();
  const { fetchPartyById, party, leaveParty } = useParty();
  const { searchResult, searchUserByName, getAllUser } = useUser();
  const [openInvitePopup, setOpenInvitePopup] = useState(false);

  useEffect(() => {
    fetchPartyById(partyId);
  }, []);
  return (
    <>
      <div>
        <Layout loginUser={loginUser} hideSearchBar={true}>
          <div
            className={`${
              openInvitePopup ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <div
              className={`${
                hideNavBar ? "ml-[600px]" : "ml-5"
              } mt-[100px] text-black flex gap-20`}
            >
              <div className="text-black">
                <div className="flex justify-between relative">
                  <h1 className="font-bold text-4xl">
                    Welcome to {party?.name} !
                  </h1>
                  <div className="z-50">
                    <button
                      onClick={() => setOpenInvitePopup(!openInvitePopup)}
                      className={`
                     bg-blue-500 rounded-[5px] w-fit px-4 py-2  font-[700] cursor-pointer hover:bg-blue-400 mr-5 `}
                    >
                      Invite
                    </button>

                    {loginUser?._id !== party?.ownerId && (
                      <button
                        className="bg-[#f44f39] cursor-pointer hover:bg-[#f88f82]
                 rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] text-black"
                        onClick={() => leaveParty(loginUser?._id, partyId)}
                      >
                        Leave
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-10 ">
                  <Chat partyId={party?._id} user={loginUser} />
                </div>
              </div>

              <div className="border-2 h-[300px] mt-21 w-[200px] p-4">
                <h1 className="font-bold text-2xl mb-2">Members</h1>
                <p className="text-xl">
                  {party?.ownerName} <span className="pl-8">(Owner)</span>
                </p>
                {party?.members?.map((member, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <p className="text-xl">
                        {member._id === party.ownerId ? " " : member.penName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {openInvitePopup && (
            <div className={`absolute right-110 top-30`}>
              <InvitePopup
                searchResult={searchResult}
                searchUserByName={searchUserByName}
                setOpenInvitePopup={setOpenInvitePopup}
                getAllUser={getAllUser}
              />
            </div>
          )}
        </Layout>
      </div>
    </>
  );
}

export default PartyLobby;
