"use client";
import axios from "axios";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function UserForm() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const storedLink = localStorage.getItem("link");
    if (storedLink) {
      setLink(JSON.parse(storedLink));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/user`,
          {
            name: name.trim(),
          }
        );

        if (response.status === 200) {
          const { name, link, userId } = response.data;
          const userData = { userId, link, name };
          localStorage.setItem("userData", JSON.stringify(userData));
          setLink(link);
        }
      } catch (error) {
        console.error("Error generating link:", error);
        setError("There was an error generating your link. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a valid name.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {!link ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <label htmlFor="userName" className="font-mono text-zinc-600">
            Enter your name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            required
            value={name}
            placeholder="Your name..."
            onChange={(e) => setName(e.target.value)}
            className="border border-zinc-400 rounded-md px-4 py-2 bg-transparent w-full outline-black"
          />
          <button
            type="submit"
            className="border border-zinc-800 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? <Spinner />: "Generate Link"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      ) : (
        <div className="mt-4 mx-auto max-w-3xl px-6 flex flex-col justify-start items-center gap-2">
          <p>Your anonymous chat link:</p>
          <div className="bg-white border border-zinc-400 rounded-md px-4 py-2 flex gap-2 items-center">
            <p className="text-blue-500 underline">{link}</p>
            {copied ? (
              <Check className="size-5 text-zinc-500" />
            ) : (
              <button onClick={handleCopy} type="button">
                <Copy className="size-5 text-zinc-500 cursor-pointer" />
              </button>
            )}
          </div>
          {copied && <p className="text-sm text-zinc-500 mt-2">Link copied!</p>}
        </div>
      )}
    </div>
  );
}