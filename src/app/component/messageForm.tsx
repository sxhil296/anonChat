"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const MessageForm = ({ userId }: { userId: string }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchName = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/${userId}`,
            {
              headers: {
                "ngrok-skip-browser-warning": "true",
              },
            }
          );

          if (response.status === 200) {
            const { name } = response.data;
            setName(name);
          } else {
            console.error("Failed to fetch username.");
          }
        } catch (err) {
          console.error("Error fetching username:", err);
        }
      }
    };
    fetchName();
  }, [userId]);

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
          setSuccess(true); 
          setError(null);
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
    <>
      {success ? (
        <div className="flex flex-col items-center justify-between max-w-2xl mx-auto h-40 border border-black rounded-md p-4">
          <p className="text-blue-500 font-medium">Message sent successfully!</p>
         <div className="w-full flex justify-center items-center gap-4">
         <button
            onClick={() => setSuccess(false)}
            className="border border-black px-4 py-2 rounded-md hover:bg-zinc-300"
          >
            Send Another Message
          </button>
          <button
            className="border border-black bg-black text-white  px-4 py-2 rounded-md hover:bg-zinc-700"
            onClick={() => {
              router.push("/");
          
            }}
          >
            Create Your Chat Link
          </button>
         </div>
        </div>
      ) : (
        <form onSubmit={handleMessageSubmit} className="w-full space-y-2">
          <div className="text-xl font-medium text-zinc-700">
            Send Anon Message to
            <span className="text-blue-500 font-bold">&nbsp;{name}</span>
          </div>
          <textarea
            name="msg"
            id="msg"
            cols={20}
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-black rounded-md w-full px-4 py-2 outline-black"
            placeholder="Type your message here..."
          ></textarea>
          <button
            type="submit"
            className="border border-black bg-black hover:bg-zinc-800 text-white font-medium px-4 py-2 rounded-md w-full cursor-pointer"
            disabled={loading || !message.trim()}
          >
            {loading ? <Spinner /> : "Send Message"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </>
  );
};

export default MessageForm;
