import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../libs/fetchUsersUtils";
import { useFriend } from "../hooks/useFriend";
import {
  getToUserRequests,
  getFromUserRequests,
  createFriendRequest,
  acceptFriendRequest,
  deleteFriendRequestById,
  deleteFriendRequest,
} from "../libs/fetchFriendsUtil";
import { API_URL } from "../libs/api";
function FriendsPage({ loginUser }) {
  const {
    getLoginUser,
    searchUserByName,
    searchResult,
    getAllUser,
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
  const {
    statusMap,
    setStatusMap,
    acceptStatusFriends,
    pendingStatusFriends,
    getUserFriends,
    setAcceptStatusFriends,
    setPendingStatusFriends,
  } = useFriend();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [section, setSection] = useState("my-friends");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchUserByName("friends", value, null, loginUser);
  };

  const removeStatusMap = (userIdToRemoveOnMap) => {
    setStatusMap((prev) => {
      const newMap = { ...prev };
      delete newMap[userIdToRemoveOnMap];
      return newMap;
    });
  };
  const addStatusMap = (userIdToAddOnMap, status) => {
    setStatusMap((prevMap) => ({
      ...prevMap,
      [userIdToAddOnMap]: status,
    }));
  };
  const handleSendRequest = async (fromUser, toUser) => {
    const result = await createFriendRequest(API_URL, {
      fromUser,
      toUser,
    });
    console.log(result);
    if (
      result.message &&
      result.message === "The pending is exist, auto accept"
    ) {
      setAcceptStatusFriends((prevFriends) => [...prevFriends, result.populated]);
      addStatusMap(toUser, "accepted");
      return;
    }
    setPendingStatusFriends((prevFriends) => [...prevFriends, result]);
    addStatusMap(toUser, "pending");
    return;
  };
  const handleDeleteRequest = async (requestId, userIdToRemoveOnMap) => {
    await deleteFriendRequestById(API_URL, requestId);
    setPendingStatusFriends((prevFriends) =>
      prevFriends.filter((f) => f._id !== requestId)
    );
    removeStatusMap(userIdToRemoveOnMap);
  };

  const handleDeleteFriend = async (API_URL, userId, friendId) => {
    const result = await deleteFriendRequest(API_URL, userId, friendId);
    setAcceptStatusFriends((prevFriends) =>
      prevFriends.filter((f) => f.fromUser._id !== friendId)
    );
    removeStatusMap(userIdToRemoveOnMap);
  };

  const handleAcceptFriend = async (requestId, userIdToAddOnMap) => {
    const result = await acceptFriendRequest(API_URL, requestId);
    setAcceptStatusFriends((prevFriends) => [...prevFriends, result]);
    setPendingStatusFriends((prevFriends) =>
      prevFriends.filter((f) => f._id !== requestId)
    );
    addStatusMap(userIdToAddOnMap, "accepted");
  };

  useEffect(() => {
    getLoginUser();
    getAllUser();
  }, []);
  useEffect(() => {
    if (loginUser?._id) {
      getUserFriends(loginUser._id);
    }
  }, [loginUser]);

  useEffect(() => {}, [acceptStatusFriends]);

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
              {acceptStatusFriends.length === 0 && (
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
              {acceptStatusFriends?.map((friend, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => navigate(`/profile/${friend.fromUser._id}`)}
                  >
                    <p>{friend.fromUser.penName}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFriend(
                          API_URL,
                          loginUser._id,
                          friend.fromUser._id
                        );
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
          {/*friend req section*/}
          {section === "friend-request" && (
            <div className="p-5 pt-0 text-center">
              {pendingStatusFriends?.length === 0 && (
                <div className="text-center">
                  You don't have any request yet.
                </div>
              )}
              {pendingStatusFriends?.map((request, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center p-2 mb-2">
                    <p className="text-xl">{request?.fromUser?.penName}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptFriend(request._id, request.fromUser._id);
                        }}
                        className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-400"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRequest(
                            request._id,
                            request.fromUser._id
                          );
                        }}
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
                  <div
                    className="flex justify-between mt-4 pl-5 hover:bg-gray-200 transition-all duration-200 rounded-xl p-2"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    <p className="text-xl">{user.penName}</p>
                    {!(user._id in statusMap) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendRequest(loginUser._id, user._id);
                        }}
                        className={`bg-blue-500 hover:bg-blue-400 cursor-pointer
                       text-white px-3 rounded-md`}
                      >
                        Add
                      </button>
                    )}
                    {user._id in statusMap &&
                      statusMap[user._id] === "pending" && (
                        <div>on request</div>
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
