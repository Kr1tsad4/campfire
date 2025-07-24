import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import socket from "../socket";
import { useUser } from "../hooks/useUser";

function InvitePopup({
  searchResult,
  searchUserByName,
  setOpenInvitePopup,
  getAllUser,
}) {
  const { loginUser, getLoginUser } = useUser();
  const [inputValue, setInputValue] = useState("");
  const { partyId } = useParams();
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
    socket.emit("inviteUser", senderId, recipientId, partyId);
  };
  return (
    <div className="flex flex-col text-black bg-white border-2 border-black max-[601px]:w-[300px] max-[601px]:h-[400px]  h-[500px] w-[450px] rounded-2xl m-5 items-center">
      <div className="ml-[400px] max-[601px]:ml-[260px]  mt-1">
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
          className="border-2 border-black w-[400px] max-[601px]:w-[280px]  p-2 rounded-xl"
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
                  <button
                    className="bg-blue-500 rounded-[5px] w-fit px-2 py-[2px]  font-[700] cursor-pointer hover:bg-blue-400 mr-5"
                    onClick={() => inviteUser(loginUser._id, user._id, partyId)}
                  >
                    invite
                  </button>
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
