"use client";
import axios from "axios";
import { LogOut } from "lucide-react";

export default function Header() {
  const storedUserData = localStorage.getItem("userData");
  const userId = storedUserData ? JSON.parse(storedUserData).userId : "";

  const handleLogOut = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/delete/${userId}`
    );
    localStorage.removeItem("userData");
    // window.location.reload();
  };
  return (
    <header className="fixed top-0 px-6 py-2 h-10 w-full border-b">
      <div className="w-full flex justify-between items-center ">
        <h1 className="font-mono text-xl font-medium">anonChat</h1>
        {userId && (
          <LogOut
            className="text-red-500 hover:text-red-700 cursor-pointer size-6"
            onClick={handleLogOut}
          />
        )}
      </div>
    </header>
  );
}
