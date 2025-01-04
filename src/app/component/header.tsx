
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function Header() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserId(parsedData.userId);
    }
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/delete/${userId}`
      );
      localStorage.removeItem("userData");
      setUserId(""); 
    } catch (error) {
      console.error("Failed to log out:", error);
    }
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
