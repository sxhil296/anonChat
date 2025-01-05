"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MessageFeed() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch userId from localStorage
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

    // fetchMessages();
    // Optional: Refresh messages every 2 seconds
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-center overflow-y-auto">
      <h2 className="text-xl font-medium text-zinc-600">Your Messages</h2>
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
  );
}
