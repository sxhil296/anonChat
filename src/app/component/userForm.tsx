"use client";
import axios from "axios";
import {  CheckCheck, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { FaFacebookSquare,  FaTelegram } from "react-icons/fa";
import { FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";



export default function UserForm() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setLink(parsedData.link);
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
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label htmlFor="userName" className=" text-zinc-600">
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
            className="border border-zinc-400 rounded-md px-4 py-2 bg-transparent w-full outline-black mb-2"
          />
          <button
            type="submit"
            className="border border-black bg-black hover:bg-zinc-800 text-white font-medium px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? <Spinner />: "Generate Link"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      ) : (
        <div className="mt-4 w-full flex flex-col justify-start items-start gap-2">
          <p className="text-[1rem] font-medium">Your anonymous chat link:</p>
          <div className="flex flex-col gap-2 bg-white border border-black rounded-md px-4 py-2 w-full">
          <div className=" flex  items-center  justify-between">
          <p className="text-blue-500 underline w-[200px] md:w-full overflow-hidden text-ellipsis whitespace-nowrap" title={link}>
  {link}
</p>
            {copied ? (
            

              <button onClick={handleCopy} type="button" className="flex gap-2 items-center border rounded-md p-1 px-2 cursor-pointer">
                 <CheckCheck  className="size-5 text-blue-500" /> Copied
              </button>
            ) : (
              <button onClick={handleCopy} type="button" className="flex gap-2 items-center border rounded-md p-1 px-2 cursor-pointer">
                <Copy className="size-4 text-black " /> Copy
              </button>
            )}
          </div>
          <div className="flex gap-2 justify-start">
          <p className="text-[1rem] font-medium">Share on:</p>
          <FacebookShareButton url={link} className="">
            <FaFacebookSquare
              size={30}
              className="text-blue-600 hover:scale-105"
            />
          </FacebookShareButton>
          <TwitterShareButton url={link}>
            <FaXTwitter size={30} className="text-black hover:scale-105" />
          </TwitterShareButton>
          <LinkedinShareButton url={link} className="">
            <FaLinkedin size={30} className="text-blue-600 hover:scale-105" />
          </LinkedinShareButton>
          <TelegramShareButton url={link} className="">
            <FaTelegram size={30} className="text-blue-400 hover:scale-105" />
          </TelegramShareButton>
          <WhatsappShareButton url={link} className="">
            <FaWhatsapp size={30} className="text-green-500 hover:scale-105" />
          </WhatsappShareButton>
        </div>
          </div>
        </div>
      )}
    </div>
  );
}
