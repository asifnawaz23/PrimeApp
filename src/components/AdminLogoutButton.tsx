"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      setIsLoggingOut(true);
      try {
        const res = await fetch("/api/admin/logout", { method: "POST" });
        if (res.ok) {
          router.push("/admin/login");
          router.refresh();
        }
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 cursor-pointer"
    >
      <LogOut className="w-4.5 h-4.5 text-gray-400 group-hover:text-red-400" />
      <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
    </button>
  );
}
