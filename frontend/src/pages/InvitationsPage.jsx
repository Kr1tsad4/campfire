import { useNavigationBar } from "../contexts/NavigationContext";
import socket from "../socket";
import { useEffect, useState } from "react";
import { useInvitation } from "../hooks/useInvitation";
import { API_URL } from "../libs/api";
import { getPartyById } from "../libs/fetchPartyUtils";
import { deleteInvitation } from "../libs/fetchInvitationUtils";
import Layout from "../components/Layout";
import { useParty } from "../hooks/useParty";
import PartyDeletedPopup from "../components/PartyDeletePopup";

function InvitationsPage({ openPartyDetails, loginUser }) {
  const { hideNavBar } = useNavigationBar();
  const { joinParty, viewPartyDetails } = useParty();
  const { userInvitation, setUserInvitation, fetchUserInvitation } =
    useInvitation();
  const openDetailsPopup = (partyId) => {
    openPartyDetails = true;
    viewPartyDetails(partyId);
  };
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
            className={`flex flex-col gap-3 pt-[88px] mt-6 mb-6 ${
              hideNavBar ? "xl:pl-[380px] lg:pl-[620px]" : ""
            }`}
          >
            <h1 className="text-black font-bold text-4xl mb-10">
              Your Invitations
            </h1>
            {!parties ||
              (parties.length === 0 && (
                <p className="ml-[400px] text-lg text-black mt-10">
                  You don’t have any invitations yet.
                </p>
              ))}
            {parties.map((party, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row bg-[#ffffff] ${
                  hideNavBar
                    ? "w-[calc(95vw)]"
                    : "w-[calc(95vw)] lg:w-[calc(100vw-350px)]"
                }
              border border-gray-200 rounded-2xl relative
              p-3 cursor-pointer text-black hover:bg-gray-100 transition-all`}
                onClick={() => openDetailsPopup(party._id)}
              >
                <div
                  className="self-center shrink-0 w-[96px] h-[96px]
                  md:w-[180px] md:h-[180px] 
                  lg:w-[180px] lg:h-[180px] 
                  xl:w-[180px] xl:h-[180px] bg-[#FEF3C7] rounded-2xl"
                ></div>
                <div className="flex flex-col p-2 md:pl-15 pt-1">
                  <p className="mt-2 font-bold xl:text-[28px] lg:text-[24px] text-[22px]">
                    {party.name}
                  </p>
                  <p
                    className="pb-2 mb-2 text-gray-500 line-clamp-4 overflow-hidden w-auto break-words xl:text-[18px] text-[14px]
              max-h-[5.2rem] xl:max-h-[7rem]"
                  >
                    {party.description}
                  </p>
                  <p>Date : {party.date}</p>
                  <p>
                    Time : {party.startTime} - {party.endTime}{" "}
                  </p>
                  <p>Members : {party.members.length}</p>
                  <div className="flex gap-2 pt-2 mt-1">
                    <div className="flex gap-2 max-[376px]:flex-wrap">
                      {party.tags?.map((tag, index) => (
                        <p key={index} className="bg-blue-200 px-2 rounded-2xl">
                          {tag.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col self-center max-[426px]:ml-0 ml-auto gap-5 mr-3">
                  <button
                    className={
                      buttonClass +
                      " bg-green-200 border-green-800 cursor-pointer"
                    }
                    onClick={async (event) => {
                      event.stopPropagation();
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
                    className={
                      buttonClass + " bg-red-200 border-red-800 cursor-pointer"
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteInvite(party.inviteId)}
                    }
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
