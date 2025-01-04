"use client";
import axios from "axios";
import { useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState("");


  const storedUserData = localStorage.getItem("userData");
  const userId = storedUserData ? JSON.parse(storedUserData).userId : "";
  const name = storedUserData ? JSON.parse(storedUserData).name : "";

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      // const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]");
      // const updatedMessages = [...existingMessages, message];
      // localStorage.setItem("messages", JSON.stringify(updatedMessages));
      // console.log(updatedMessages);
      // setMessage("");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/message/${userId}`,
        {
          message,
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        // const { message } = response.data;
        setMessage("");
        // console.log(message);
      }
    } else {
      alert("Enter a proper message.");
    }
  };

  return (
    <form onSubmit={handleMessageSubmit} className="w-full space-y-2">
         <div className="text-xl font-medium text-zinc-600 mb-2"> Send Anon Message to <span className="text-blue-500 font-bold">{name}</span></div>
      <textarea
        name="msg"
        id="msg"
        cols={20}
        rows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-zinc-400 rounded-md w-full px-4 py-2 "
        placeholder="Type your message here..."
      ></textarea>
      <button
        type="submit"
        className="border border-zinc-800 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2 rounded-md w-full"
      >
        Send Message
      </button>
    </form>
  );
};

export default MessageForm;
