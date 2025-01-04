"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserId(parsedData.userId);
      setName(parsedData.name);
    }
  }, []);

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/message/${userId}`,
          { message }
        );
        
        if (response.status === 200) {
          setMessage(""); 
        } else {
          setError("Failed to send message. Please try again.");
        }
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Error sending message. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Enter a proper message.");
    }
  };

  return (
    <form onSubmit={handleMessageSubmit} className="w-full space-y-2">
      <div className="text-xl font-medium text-zinc-600 mb-2">
        Send Anon Message to{" "}
        <span className="text-blue-500 font-bold">{name}</span>
      </div>
      <textarea
        name="msg"
        id="msg"
        cols={20}
        rows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-zinc-400 rounded-md w-full px-4 py-2 outline-black "
        placeholder="Type your message here..."
      ></textarea>
      <button
        type="submit"
        className="border border-zinc-800 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2 rounded-md w-full "
        disabled={loading || !message.trim()}
      >
        {loading ? <Spinner /> : "Send Message"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default MessageForm;
