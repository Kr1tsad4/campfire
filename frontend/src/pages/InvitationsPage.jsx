import { useNavigationBar } from "../hooks/useNavigationBar";
import socket from "../socket";
import { useEffect, useState } from "react";
import { useInvitation } from "../hooks/useInvitation";
import { API_URL } from "../libs/api";
import { getPartyById } from "../libs/fetchPartyUtils";
import { deleteInvitation } from "../libs/fetchInvitationUtils";
import Layout from "../components/Layout";
import { useParty } from "../hooks/useParty";
import PartyDeletedPopup from "../components/partyDeletePopup";

function InvitationsPage({ loginUser }) {
  const { hideNavBar } = useNavigationBar();
  const { joinParty } = useParty();
  const { userInvitation, setUserInvitation, fetchUserInvitation } =
    useInvitation();

  const getPartyByArr = async () => {
    const partyArr = await Promise.all(
      userInvitation.map(async (invite) => {
        const party = await getPartyById(API_URL, invite.partyId);
        return { ...party, inviteId: invite._id };
      })
    );

    setParties(partyArr);
    return partyArr;
  };
  const handleDeleteInvite = async (id) => {
    deleteInvitation(API_URL, id);
    
    setParties((prevParties) =>
      prevParties.filter((party) => party.inviteId !== id)
    );
  };

  const buttonClass = `text-[20px] border-2 rounded-2xl p-4`;
  const [parties, setParties] = useState([]);
  const [isAcceptError, setIsAcceptError] = useState(false);
  useEffect(() => {
    let isMounted = true;
    fetchUserInvitation();
    const handleNewInvite = async (invite) => {
      if (!isMounted) return;

      try {
        const newInvite = await getPartyById(API_URL, invite.partyId);
        const partyWithInviteId = { ...newInvite, inviteId: invite._id };
        setParties((prevParties) => [...prevParties, partyWithInviteId]);
      } catch (err) {
        console.log(err);
      }
    };
    socket.on("new-invite", handleNewInvite);
    return () => {
      socket.off("new-invite", handleNewInvite);
    };
  }, []);

  useEffect(() => {
    socket.emit("join-invitation", loginUser?._id);
  }, [loginUser]);

  useEffect(() => {
    getPartyByArr();
  }, [userInvitation]);

  return (
    <>
      {isAcceptError && (
        <PartyDeletedPopup setIsAcceptError={setIsAcceptError} />
      )}
      <div className="flex bg-[#fcfff7ff] min-h-screen w-auto">
        <Layout loginUser={loginUser} hideSearchBar={true}>
          <div
            className={`flex flex-col gap-3 pt-[88px] mt-6 mb-6 transition-all duration-300 ${
              hideNavBar ? "pl-5" : "pl-[380px]"
            } max-[769px]:pl-0`}
          >
            {parties.map((party, index) => (
              <div
                key={index}
                className={`flex w-[1120px] max-[1441px]:w-[1000px] max-[1025px]:w-[750px] max-[769px]:w-[700px] max-[376px]:w-[300px]  
              max-[426px]:w-[400px] max-[426px]:h-[180px] border-1 border-gray-200 h-[200px] rounded-2xl relative
              p-3 cursor-pointer text-black hover:bg-gray-100 transition-all`}
              >
                <div className="h-full w-[300px] max-[426px]:w-[150px] max-[426px]:h-[150px] max-[376px]:pt-[20px] max-[376px]:w-[150px] bg-[#FEF3C7] rounded-2xl"></div>
                <div className="p-2 pl-15 pt-1 max-[321px]:-mt-2 max-[769px]:pt-2 max-[426px]:text-[10px] max-[376px]:text-[10px] max-[426px]:pt-2 max-[376px]:pt-2 max-[376px]:pl-10">
                  <p className="font-bold text-[17px]">{party.name}</p>
                  <p className="pb-2 text-gray-500">{party.description}</p>
                  <p>Date : {party.date}</p>
                  <p>
                    Time : {party.startTime} - {party.endTime}{" "}
                  </p>

                  <div className="flex gap-2 pt-2  mt-5">
                    <div
                      key={index}
                      className="flex gap-2 max-[376px]:flex-wrap"
                    >
                      {party.tagNames?.map((tagName, index) => (
                        <div key={index}>
                          <p className="bg-blue-200 px-2 rounded-2xl">
                            {tagName}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    className={buttonClass + " bg-green-200 border-green-800"}
                    onClick={async () => {
                      handleDeleteInvite(party?.inviteId);
                      const tmp = await getPartyById(API_URL, party?._id);
                      if (tmp.message) setIsAcceptError(true);
                      else {
                        joinParty(loginUser._id, party._id);
                      }
                    }}
                  >
                    accept
                  </button>
                  <button
                    className={buttonClass + " bg-red-200 border-red-800"}
                    onClick={() => handleDeleteInvite(party.inviteId)}
                  >
                    decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Layout>
      </div>
    </>
  );
}

export default InvitationsPage;
