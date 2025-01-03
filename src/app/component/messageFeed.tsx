"use client";
import { useEffect, useState } from "react";

export default function MessageFeed() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 items-start justify-center">
      <h2 className="text-xl font-medium text-zinc-600">Your Messages</h2>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white text-lg p-4 rounded-md"
          >
            {message}
          </div>
        ))
      ) : (
        <p className="text-zinc-500">No messages yet</p>
      )}
    </div>
  );
}
