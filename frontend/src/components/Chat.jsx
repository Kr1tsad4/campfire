import { useEffect, useState } from "react";
import socket from "../socket";

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

  return (
    <div>
      <div className="border-2 border-black p-5 overflow-auto max-h-[300px] h-[300px] w-[800px] bg-[#eecab7] text-black">
        {messages.length === 0 && <div>Let's chat now!</div>}
        {messages.map((msg, i) => (
          <div key={i} className="text-black">
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
        className="text-black border-1 rounded-2xl border-black mt-5 p-2 mr-5 w-[500px]"
      />
      <button
        onClick={sendMessage}
        className="bg-[#f3bfa3] cursor-pointer hover:bg-[#f0b291]
             rounded-[5px] w-fit mt-2 px-4 py-2 font-[700] text-black"
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
