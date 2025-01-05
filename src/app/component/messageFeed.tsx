"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MessageFeed() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
        }finally {
          setLoading(false); 
        }
      }
    };

    // Fetch messages immediately
    fetchMessages();


  
  }, [userId]);

  return (
    <div className="w-full flex flex-col gap-2 items-start justify-start h-full pb-6">
      <h2 className="text-[1rem] font-medium text-black">Your Messages</h2>
      <div className=" overflow-auto max-h-[99%] w-full flex flex-col gap-2 c">
      {loading ? ( 
          <p className="text-zinc-500">Loading...</p>
        ) : messages.length > 0 ? (
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
