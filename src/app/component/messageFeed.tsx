"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MessageFeed() {
  const [messages, setMessages] = useState([]);

  const storedUserData = localStorage.getItem("userData");
  const userId = storedUserData ? JSON.parse(storedUserData).userId : "";

  useEffect(() => {
    const fetchMessages = async () => {
   

     if (userId) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/allmessages/${userId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        console.log(response.data);
        if (response.status === 200) {
          const { message } = response.data;
          setMessages(message);
          console.log(message);
        } else {
          console.error("Failed to fetch messages.");
        }
      } catch (err) {
        console.error(err);
      } 
     }
    };

  fetchMessages();
    // setInterval(fetchMessages, 2000);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-center overflow-y-auto">
      <h2 className="text-xl font-medium text-zinc-600">Your Messages</h2>
      {messages ? (
        messages.map((message, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white text-lg p-2 rounded-md"
          >
            {message}
          </div>
        ))
      ) : (
        <p className="text-zinc-500">No messages yet...</p>
      )}
    </div>
  );
}
