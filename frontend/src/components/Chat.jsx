import { useEffect, useState } from "react";
import socket from "../socket.js";
import { useNavigationBar } from "../contexts/NavigationContext.jsx";

function Chat({ partyId, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!partyId) return;

    socket.emit("join-party", partyId);

    socket.on("old-messages", (oldMessages) => {
      setMessages(oldMessages);
    });

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
      socket.off("old-messages");
    };
  }, [partyId]);

  const sendMessage = () => {
    if (message.trim() && partyId && user) {
      socket.emit("send-message", {
        partyId,
        user: user.penName,
        message,
      });
      setMessage("");
    }
  };
  const { hideNavBar } = useNavigationBar();
  return (
    <div>
      <div className={`rounded-lg p-5 overflow-auto max-h-[300px] h-[300px] xl:w-[700px] ${hideNavBar ? "lg:w-[600px]" : "lg:w-[400px]"} md:w-[460px] w-[90vw] shadow-sm shadow-[#7ad89a] text-black`}>
        {messages.length === 0 && <div>Let's chat now!</div>}
        {messages.map((msg, i) => (
          <div key={i} className="text-[#041c0cff]">
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
        className={`text-black rounded-2xl shadow-sm shadow-[#14552aff] p-2 mr-5 xl:w-[610px] ${hideNavBar ? "lg:w-[510px]" : "lg:w-[310px]"} md:w-[370px] w-[78vw] max-[520px]:w-[60vw]`}
      />
      <button
        onClick={sendMessage}
        className="bg-[#beffd4ff] cursor-pointer hover:bg-[#7ad89aff]
             rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] text-black"
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
