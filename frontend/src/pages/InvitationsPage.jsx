import { useNavigationBar } from "../hooks/useNavigationBar";
import socket from "../socket";
import { useEffect, useState } from "react";
import { useInvitation } from "../hooks/useInvitation";
import { API_URL } from "../libs/api";
import { getPartyById } from "../libs/fetchPartyUtils";
import Layout from "../components/Layout";
function InvitationsPage({ loginUser }) {
  const { hideNavBar } = useNavigationBar();
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
        <Layout loginUser={loginUser} hideSearchBar={true}>
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
        </Layout>
      </div>
    </>
  );
}

export default InvitationsPage;
