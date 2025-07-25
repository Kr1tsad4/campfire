import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { useNavigationBar } from "../contexts/NavigationContext.jsx";
import { useFriend } from "../hooks/useFriend.js";
import Avatar from "@mui/material/Avatar";
import { FaChevronLeft } from "react-icons/fa";
import { deepOrange } from "@mui/material/colors";
import socket from "../socket.js";
import { useNavigate } from "react-router-dom";
function InboxPage({ loginUser }) {
  const { hideNavBar } = useNavigationBar();
  const [userToChat, setUserToChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const { getUserFriends, acceptStatusFriends } = useFriend();
  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser?._id) {
      getUserFriends(loginUser._id);
    }
  }, [loginUser]);

  useEffect(() => {
    if (loginUser && userToChat) {
      socket.emit("join-private-room", {
        userAId: loginUser._id,
        userBId: userToChat._id,
      });

      socket.on("old-private-messages", (msg) => setMessages(msg));
      socket.on("receive-private-message", (msg) =>
        setMessages((prev) => [...prev, msg])
      );

      return () => {
        socket.off("old-private-messages");
        socket.off("receive-private-message");
      };
    }
  }, [userToChat]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-private-message", {
      sender: loginUser._id,
      recipient: userToChat._id,
      message: message.trim(),
    });

    setMessage("");
  };

  return (
    <div>
      <Layout hideSearchBar={true} loginUser={loginUser}>
        <div
          className={`${
            hideNavBar
              ? "xl:ml-150 lg:ml-180 md:-ml-0 xl:w-[60vw] lg:w-[75vw] w-[95vw]"
              : "xl:ml-15 lg:-ml-3 md:ml-72 lg:w-[68vw] md:w-[56vw] w-[95vw]"
          } mt-28 text-black shadow-2xl rounded-xl border-2 h-[600px] overflow-hidden`}
        >
          <div className="flex w-full h-full">
            {/* Friends List */}
            {!showChat && (
              <div className="w-full bg-gray-100 overflow-y-auto">
                <h1 className="p-6 font-bold text-4xl border-b-1">Messages</h1>
                {!acceptStatusFriends ||
                  (acceptStatusFriends.length === 0 && (
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center items-center pt-20">
                        <h1 className="text-xl">It's a little quiet here...</h1>
                      </div>
                      <h1>
                        <span
                          onClick={() => navigate("/friends")}
                          className="text-xl mt-1 underline text-blue-500 hover:text-blue-400 cursor-pointer"
                        >
                          Find someone
                        </span>
                        <span className="text-xl"> to chat with!</span>
                      </h1>
                    </div>
                  ))}
                {acceptStatusFriends?.map((friend, index) => (
                  <div key={index}>
                    <div
                      className={`flex p-3 gap-2 cursor-pointer hover:bg-gray-300 mt-4 pl-7 ${
                        userToChat?._id === friend.fromUser?._id
                          ? "bg-gray-300"
                          : ""
                      }`}
                      onClick={() => {
                        setUserToChat(friend.fromUser);
                        setShowChat(true);
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: deepOrange[500],
                          width: 40,
                          height: 40,
                          fontSize: 18,
                        }}
                      >
                        {friend.fromUser.penName?.charAt(0).toUpperCase()}
                      </Avatar>
                      <p className="text-2xl pt-1 text-black">
                        {friend.fromUser.penName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat */}
            {userToChat && showChat && (
              <div className="flex flex-col w-full">
                <div className="border-b-2 p-4 font-semibold text-lg bg-white flex gap-4">
                  <div
                    className="pt-1 cursor-pointer"
                    onClick={() => {
                      setShowChat(false);
                      setUserToChat(null);
                    }}
                  >
                    <FaChevronLeft size={20} />
                  </div>
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: 30,
                      height: 30,
                      fontSize: 15,
                    }}
                  >
                    {userToChat.penName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <div className="text-lg">
                    {userToChat ? `${userToChat.penName}` : "Select a friend"}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white flex flex-col overflow-y-hidden)">
                  {messages.map((msg, index) => {
                    const senderId =
                      typeof msg.sender === "string"
                        ? msg.sender
                        : msg.sender?._id;

                    return (
                      <div
                        key={index}
                        className={`flex ${
                          senderId === loginUser._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl max-w-[70%] break-words ${
                            senderId === loginUser._id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 border-t-2 bg-white flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border-2 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition max-[321px]:-ml-2 max-[321px]:px-3"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default InboxPage;
