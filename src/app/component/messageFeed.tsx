"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MessageFeed() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserId(parsedData.userId);
    }
  }, []);

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

          if (response.status === 200) {
            const { message } = response.data;
            setMessages(message);
          } else {
            console.error("Failed to fetch messages.");
          }
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      }
    };

    // Fetch messages immediately
    fetchMessages();


  
  }, [userId]);

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-center">
      <h2 className="text-[1rem] font-medium text-black">Your Messages</h2>
      <div className=" overflow-auto max-h-[530px] w-full flex flex-col gap-2 scrollbar-hidden">
      {messages.length > 0 ? (
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
     
    </div>
  );
}
