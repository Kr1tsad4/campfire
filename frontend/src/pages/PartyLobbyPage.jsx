import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useParty } from "../hooks/useParty";
import { useEffect } from "react";
import Lobby from "../components/Lobby";
import { useUser } from "../hooks/useUser";
function PartyLobby() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { partyId } = useParams();
  const { getPartyTagsAndMembersName, party } = useParty();
  const { loginUser, getLoginUser } = useUser();
  useEffect(() => {
    getLoginUser()
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
            <Header hideSearchBar={true} hideNavBar={hideNavBar} />
          </div>
          <div className="ml-[330px] mt-[100px]">
            <Lobby party={party} loginUser={loginUser}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartyLobby;
