"use client";
import { useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

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

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full"
    >
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
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline bg-white border border-zinc-400 rounded-md px-4 py-2"
          >
            {link}
          </a>
        </div>
      )}
    </>
  );
}
