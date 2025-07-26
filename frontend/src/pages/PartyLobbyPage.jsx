import { useNavigationBar } from "../contexts/NavigationContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useParty } from "../hooks/useParty.js";
import { useEffect, useState } from "react";
import Chat from "../components/Chat.jsx";
import InvitePopup from "../components/InvitePopup.jsx";
import Layout from "../components/Layout.jsx";
import { useUser } from "../hooks/useUser.js";
import ConfirmPopup from "../components/ConfirmPopup.jsx";

function PartyLobby({ loginUser }) {
  const { hideNavBar } = useNavigationBar();
  const { partyId } = useParams();
  const { fetchPartyById, party, leaveParty } = useParty();
  const { searchResult, searchUserByName, getAllUser } = useUser();
  const [openInvitePopup, setOpenInvitePopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    const loadParty = async () => {
      await fetchPartyById(partyId);
      setIsLoading(false);
    };
    loadParty();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (!party?.members || !userData?._id) return;

    const isMember = party.members.some(
      (member) => member._id === userData._id
    );
    if (!isMember) {
      navigator("/home");
    }
  }, [party]);

  const handleLeaveClick = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmLeave = () => {
    leaveParty(loginUser?._id, partyId);
    setShowConfirmPopup(false);
  };

  const handleCancelLeave = () => {
    setShowConfirmPopup(false);
  };

  return (
    <>
      <Layout loginUser={loginUser} hideSearchBar={true}>
        <div
          className={`${
            openInvitePopup ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <div
            className={`${
              hideNavBar ? "lg:ml-165" : "lg:ml-5"
            } mt-[100px] text-black flex gap-0`}
          >
            <div className="text-[#041c0cff]">
              <div className="flex justify-between relative">
                <h1 className="text-4xl">Welcome to {party?.name} !</h1>
                <div className="z-8">
                  <button
                    onClick={() => setOpenInvitePopup(!openInvitePopup)}
                    className={`lg:fixed lg:right-0 lg:top-[17%]
                     bg-[#7ad89aff] rounded-[5px] w-fit px-4 py-2 cursor-pointer hover:bg-[#63b77fff] mr-2 lg:mr-12`}
                  >
                    Invite
                  </button>

                  {loginUser?._id !== party?.ownerId && (
                    <button
                      className="bg-[#f88f82] cursor-pointer hover:bg-[#f44f39]
                      rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] text-black"
                      onClick={handleLeaveClick}
                    >
                      Leave
                    </button>
                  )}
                </div>
              </div>

              <div className={`flex flex-col md:flex-row mt-10`}>
                <Chat partyId={party?._id} user={loginUser} />
                <div
                  className={`shadow-[#7ad89aff] shadow-sm text-[#041c0cff] rounded-lg h-[300px] md:w-[250px] w-[90vw] ml-2 pl-4 pt-4 md:mt-0 mt-4`}
                >
                  <h1 className="text-2xl mb-2">Members</h1>
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
          </div>
        </div>

        <ConfirmPopup
          isOpen={showConfirmPopup}
          title="Leave Party?"
          message={`Are you sure you want to leave "${party?.name}"?`}
          confirmText="Leave"
          cancelText="Cancel"
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />

        <div
          className={`fixed top-32 right-0 transition-transform duration-500 z-10 ${
            openInvitePopup ? "translate-x-0 mr-2" : "translate-x-full "
          }`}
        >
          <InvitePopup
            searchResult={searchResult}
            searchUserByName={searchUserByName}
            setOpenInvitePopup={setOpenInvitePopup}
            getAllUser={getAllUser}
          />
        </div>
      </Layout>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50">
          <p className="text-gray-700 text-4xl font-medium animate-pulse">
            Loading party lobby...
          </p>
        </div>
      )}
    </>
  );
}

export default PartyLobby;
