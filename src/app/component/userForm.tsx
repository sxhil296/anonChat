"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      const encodedName = encodeURIComponent(name.trim());
      const generatedLink = `${window.location.origin}/chat/${encodedName}`;
      setLink(generatedLink);
      localStorage.setItem("userName", name);
      console.log(localStorage.getItem("userName"));
    } else {
      alert("Please enter a valid name.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
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
      {link && (
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
