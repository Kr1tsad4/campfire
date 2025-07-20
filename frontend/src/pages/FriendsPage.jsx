import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../libs/fetchUsersUtils";
function FriendsPage({ loginUser }) {
  const {
    getLoginUser,
    searchUserByName,
    searchResult,
    getAllUser,
    getUserFriends,
    friends,
    createRequest,
    requests,
    getUserRequest,
    deleteUserRequest,
    deleteUserFriend,
    acceptUserRequest,
    setFriends,
    setSearchResult,
  } = useUser();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [section, setSection] = useState("my-friends");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchUserByName("friends", value, null, loginUser);
  };

  const handleSendRequest = async (fromUser, toUser) => {
    await createRequest(fromUser, toUser);
    await getUserRequest(loginUser._id);
  };

  const handleDeleteRequest = async (requestId) => {
    await deleteUserRequest(requestId);
    await getUserRequest(loginUser._id);
  };

  const handleDeleteFriend = async (userId, friendId) => {
    await deleteUserFriend(userId, friendId);
    setFriends((prevFriends) => prevFriends.filter((f) => f._id !== friendId));
  };

  const handleAcceptFriend = async (requestId) => {
    await acceptUserRequest(requestId, loginUser._id);
    await getUserRequest(loginUser._id);
  };

  useEffect(() => {
    getLoginUser();
    getAllUser();
  }, []);
  useEffect(() => {
    if (loginUser?._id) {
      getUserFriends(loginUser._id);
      getUserRequest(loginUser._id);
    }
  }, [loginUser]);

  useEffect(() => {
    getLoginUser();
    getAllUser();
    setInputValue("");
    setSearchResult([]);
    if (loginUser?._id) {
      getUserRequest(loginUser._id);
      getUserFriends(loginUser._id);
    }
  }, [section]);

  return (
    <Layout hideSearchBar={true} loginUser={loginUser}>
      <div className="ml-50 mt-30 text-black w-[50vw] shadow-2xl rounded-xl">
        <p className="text-4xl p-5">Friends</p>
        <div>
          <div className="flex justify-between max-w-full text-2xl border-b-1 border-gray-300 pl-8 pr-8 pb-3">
            <div>
              <button
                className={`${
                  section === "my-friends" ? "text-blue-500" : ""
                } cursor-pointer`}
                onClick={() => setSection("my-friends")}
              >
                My Friends
              </button>
              {section === "my-friends" && (
                <div className="border-b-4 border-blue-500 pt-2 -mb-6 transition-all duration-300"></div>
              )}
            </div>
            <div>
              <button
                className={`${
                  section === "friend-request" ? "text-blue-500" : ""
                } cursor-pointer`}
                onClick={() => setSection("friend-request")}
              >
                Friend Requests
              </button>
              {section === "friend-request" && (
                <div className="border-b-4 border-blue-500 pt-2 -mb-6 transition-all duration-300"></div>
              )}
            </div>
            <div>
              <button
                className={`${
                  section === "find-friends" ? "text-blue-500" : ""
                } cursor-pointer`}
                onClick={() => setSection("find-friends")}
              >
                Find Friends
              </button>
              {section === "find-friends" && (
                <div className="border-b-4 border-blue-500 pt-2 -mb-6 transition-all duration-300"></div>
              )}
            </div>
          </div>
        </div>
        {/* my-friends */}
        <div className="mt-5 p-5">
          {section === "my-friends" && (
            <div>
              {friends.length === 0 && (
                <div className="text-center mb-5">
                  Looks like your friend list is empty.{" "}
                  <span
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() => setSection("find-friends")}
                  >
                    Find and add some friends!
                  </span>
                </div>
              )}
              {friends?.map((friend, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between mb-3"
                    onClick={() => navigate(`/profile/${friend._id}`)}
                  >
                    <p>{friend.penName}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFriend(loginUser._id, friend._id);
                      }}
                      className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/*friend req section */}
          {section === "friend-request" && (
            <div className="p-5 pt-0 text-center">
              {requests?.length === 0 && (
                <div className="text-center">
                  You don't have any request yet.
                </div>
              )}
              {requests?.map((request, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center p-2 mb-2">
                    <p className="text-xl">{request?.fromUser?.penName}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptFriend(request._id)}
                        className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-400"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(request._id)}
                        className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* find friends section */}
          {section === "find-friends" && (
            <div>
              <input
                type="text"
                className="border-2 border-black w-full p-2 rounded-xl"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search users"
              />
              {searchResult?.length === 0 && (
                <div className="pl-3 pt-5">No users found.</div>
              )}

              {searchResult?.map((user, index) => (
                <div key={index}>
                  <div className="flex justify-between mt-4 pl-5 hover:bg-gray-200 transition-all duration-200 rounded-xl p-2">
                    <p className="text-xl">{user.penName}</p>
                    {!user.friends.find((f) => f._id === loginUser._id) && (
                      <button
                        onClick={() =>
                          handleSendRequest(loginUser._id, user._id)
                        }
                        className={`bg-blue-500 hover:bg-blue-400 cursor-pointer
                       text-white px-3 rounded-md`}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FriendsPage;
