import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../hooks/useUser";
import socket from "../socket";

function FriendsPage({ loginUser }) {
  const {
    getLoginUser,
    searchUserByName,
    searchResult,
    getAllUser,
    getUserFriends,
    friends,
    deleteUserFriend,
  } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [section, setSection] = useState("my-friends");
  const [requests, setRequests] = useState([]);
  const [alreadyRequest, setAlreadyRequest] = useState([]);

  useEffect(() => {
    getLoginUser();
    getAllUser();
  }, []);

  useEffect(() => {
    if (loginUser?._id) {
      getUserFriends(loginUser._id);
    }
  }, [loginUser]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchUserByName("friends", value, null, loginUser);
  };

  const sendFriendRequest = (fromUserId, toUserId) => {
    socket.emit("send-request", { fromUser: fromUserId, toUser: toUserId });
  };

  const rejectFriendRequest = (userId, requestId) => {
    socket.emit("reject-request", { userId, requestId });

  };

  const acceptFriendRequest = (userId, requestId) => {
    socket.emit("accept-request", { userId, requestId });
  };

  const deleteFriend = async (userId, friendId) => {
    await deleteUserFriend(userId, friendId);
    getUserFriends(userId);
  };
  useEffect(() => {
    if (loginUser?._id) {
      socket.emit("join-room", loginUser._id);
      socket.emit("get-requests", loginUser._id);
    }
  }, [loginUser?._id]);

  useEffect(() => {
    socket.on("requests-data", (data) => {
      setRequests(data);
    });

    socket.on("receive-request", (request) => {
      setRequests((prev) => [...prev, request]);
    });
    return () => {
      socket.off("receive-request");
      socket.off("requests-data");
    };
  }, []);

  useEffect(() => {
    getUserFriends(loginUser._id);
    setInputValue("");
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
                  <div className="flex justify-between mb-3">
                    <p>{friend.penName}</p>
                    <button
                      onClick={() => deleteFriend(loginUser?._id, friend._id)}
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
              {requests.map((request, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center p-2 mb-2">
                    <p className="text-xl">{request?.fromUser?.penName}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          acceptFriendRequest(loginUser._id, request._id)
                        }
                        className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-400"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          rejectFriendRequest(loginUser?._id, request._id)
                        }
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
                    <button
                      onClick={() => sendFriendRequest(loginUser._id, user._id)}
                      className={`bg-blue-500 hover:bg-blue-400 cursor-pointer
                       text-white px-3 rounded-md`}
                    >
                      Add
                    </button>
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
