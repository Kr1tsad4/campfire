import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useParty } from "../hooks/useParty";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import Chat from "../components/Chat";
import InvitePopup from "../components/InvitePopup";
function PartyLobby() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { partyId } = useParams();
  const { getPartyTagsAndMembersName, party, leaveParty } = useParty();
  const { loginUser, getLoginUser } = useUser();
  const [openInvitePopup, setOpenInvitePopup] = useState(false);
  useEffect(() => {
    getLoginUser();
    getPartyTagsAndMembersName(partyId);
  }, []);
  return (
    <>
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
        <SideNavContainer
          hideNavBar={hideNavBar}
          toggleSideNavBar={toggleSideNavBar}
        />
        <div>
          <div className="-ml-[75px]">
            <Header
              hideSearchBar={true}
              hideNavBar={hideNavBar}
              loginUser={loginUser}
            />
          </div>
          <div className="ml-[330px] mt-[100px]">
            <div className="text-black">
              <div className="flex justify-between">
                <h1 className="font-bold text-4xl">
                  Welcome to {party?.name} !
                </h1>
                <div>
                  <button
                    onClick={() => setOpenInvitePopup(!openInvitePopup)}
                    className="bg-blue-500 rounded-[5px] w-fit px-4 py-2  font-[700] cursor-pointer hover:bg-blue-400 mr-5 relative"
                  >
                    Invite
                  </button>
                  {openInvitePopup && (
                    <div className="absolute right-100">
                      <InvitePopup />
                    </div>
                  )}
                  {loginUser?._id !== party?.ownerId && (
                    <button
                      className="bg-[#f44f39] cursor-pointer
                 rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] text-black"
                      onClick={() => leaveParty(loginUser?._id, partyId)}
                    >
                      Leave
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <Chat partyId={party?._id} user={loginUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartyLobby;
