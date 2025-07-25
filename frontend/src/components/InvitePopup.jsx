import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import socket from "../socket.js";
import { useUser } from "../hooks/useUser.js";

function InvitePopup({
  searchResult,
  searchUserByName,
  setOpenInvitePopup,
  getAllUser,
}) {
  const { loginUser, getLoginUser } = useUser();
  const [inputValue, setInputValue] = useState("");
  const { partyId } = useParams();
  const [invitedMap, setInvitedMap] = useState({});
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchUserByName("party",value, partyId,null);
  };
  useEffect(() => {
    getAllUser();
    getLoginUser();
  }, []);
  const inviteUser = async (senderId, recipientId, partyId) => {
    setInvitedMap((prev) => ({
       ...prev,
      [recipientId]: 1,
    }))
    console.log(invitedMap);
    socket.emit("inviteUser", senderId, recipientId, partyId);
  };
  return (
    <div className="flex flex-col text-black bg-white border-2 border-black max-[601px]:w-[400px] max-[601px]:h-[400px]  max-[426px]:w-[90vw] h-[500px] w-[450px] rounded-2xl items-center">
      <div className="ml-[400px] max-[601px]:ml-[360px] max-[426px]:ml-[80vw] mt-1">
        <button
          className="cursor-pointer"
          onClick={() => setOpenInvitePopup(false)}
        >
          <IoIosClose size={30} />
        </button>
      </div>
      <div className="mt-2">
        <input
          type="text"
          className="border-2 border-black w-[400px] max-[601px]:w-[380px] max-[426px]:w-[84vw]  p-2 rounded-xl"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search users"
        />
        <div className="mt-8">
          {searchResult?.length === 0 && <div>No users found.</div>}
          {searchResult?.map((user, index) => (
            <div key={index}>
              <div className="flex justify-between hover:bg-gray-200 items-center cursor-pointer transition-all duration-100 rounded-md">
                <h1>{user.penName}</h1>
                <div className="mb-2 pt-2">
                  {!(user._id in invitedMap) && <button
                    className="bg-blue-500 rounded-[5px] w-fit px-2 py-[2px]  font-[700] cursor-pointer hover:bg-blue-400 mr-5"
                    onClick={() => inviteUser(loginUser._id, user._id, partyId)}
                  >
                    invite
                  </button>}
                  {
                    (user._id in invitedMap) && <div className="bg-gray-200 rounded-[5px] w-fit px-2 py-[2px] mr-5"> invited </div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvitePopup;
