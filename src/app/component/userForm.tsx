"use client";
import axios from "axios";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedLink = localStorage.getItem("link");
    if (storedLink) {
      setLink(JSON.parse(storedLink));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/user`,
          {
            name: name.trim(),
          }
        );

        if (response.status === 200) {
          const { name, link, userId } = response.data;
          const userData = {
            userId,
            link,
            name,
          };

          localStorage.setItem("userData", JSON.stringify(userData));

          setLink(link);
        }
      } catch (error) {
        console.error("Error generating link:", error);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
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
          >
            Generate Link
          </button>
        </form>
      ) : (
        <div className="mt-4 mx-auto max-w-3xl px-6 flex flex-col justify-start items-center gap-2">
          <p>Your anonymous chat link:</p>
          <div className="bg-white border border-zinc-400 rounded-md px-4 py-2 flex gap-2 items-center">
            <p className="text-blue-500 underline ">{link}</p>
            {copied ? (
              <Check className="size-5 text-zinc-500" />
            ) : (
              <button onClick={handleCopy} type="button">
                <Copy className="size-5 text-zinc-500 cursor-pointer" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
