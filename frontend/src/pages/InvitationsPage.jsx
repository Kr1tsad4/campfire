import { useNavigationBar } from "../hooks/useNavigationBar";
import SideNavContainer from "../components/SideNavContainer";
import Header from "../components/Header";
import socket from "../socket";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useInvitation } from "../hooks/useInvitation";
import { API_URL } from "../libs/api";
import { getPartyById } from "../libs/fetchPartyUtils";
function InvitationsPage() {
  const { hideNavBar, toggleSideNavBar } = useNavigationBar();
  const { loginUser, getLoginUser } = useUser();
  const { userInvitation, setUserInvitation, fetchUserInvitation } =
    useInvitation();

  const getPartyByArr = async () => {
    const partyArr = await Promise.all(
      userInvitation.map((invite) => getPartyById(API_URL, invite.partyId))
    );
    return partyArr;
  };
  const [parties, setParties] = useState([]);
  useEffect(() => {
    getLoginUser();
    fetchUserInvitation();
    socket.on("new-invite", async (invite) => {
      alert(invite);
    });
  }, []);

  useEffect(() => {
    console.log(loginUser);
    socket.emit("join-invitation", loginUser?._id);
  }, [loginUser]);

  useEffect(() => {
    getPartyByArr();
  }, [userInvitation]);

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

          {/* comp */}

          <div
            className={`flex flex-col gap-3 pt-[88px] mt-6 mb-6 transition-all duration-300 ${
              hideNavBar ? "pl-5" : "pl-[250px]"
            } max-[769px]:pl-0`}
          >
            {userInvitation.map((invite, index) => (
              <div
                key={index}
                className={`flex w-[1120px] max-[1441px]:w-[1000px] max-[1025px]:w-[750px] max-[769px]:w-[700px] max-[376px]:w-[300px]  
              max-[426px]:w-[400px] max-[426px]:h-[180px] border-1 border-gray-200 h-[200px] rounded-2xl relative
              p-3 cursor-pointer text-black hover:bg-gray-100 transition-all`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default InvitationsPage;
