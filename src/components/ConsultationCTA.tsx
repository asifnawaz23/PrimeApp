"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";

interface ConsultationCTAProps {
  className?: string;
  variant?: "primary" | "secondary" | "link";
  text?: string;
}

export default function ConsultationCTA({
  className = "",
  variant = "primary",
  text = "Get My Free Consultation",
}: ConsultationCTAProps) {
  const { openInquiry } = useApp();

  if (variant === "secondary") {
    return (
      <button
        onClick={openInquiry}
        className={`px-6 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 cursor-pointer ${className}`}
      >
        {text}
      </button>
    );
  }

  if (variant === "link") {
    return (
      <button
        onClick={openInquiry}
        className={`text-accent-cyan hover:text-accent-violet text-sm font-bold flex items-center gap-1.5 group transition-colors cursor-pointer ${className}`}
      >
        {text}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    );
  }

  return (
    <button
      onClick={openInquiry}
      className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-br from-accent-violet to-accent-cyan hover:text-white cursor-pointer shadow-lg shadow-accent-violet/10 hover:shadow-accent-cyan/15 transition-all duration-300 ${className}`}
    >
      <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-bg-base rounded-md group-hover:bg-transparent group-hover:text-bg-base flex items-center gap-2">
        {text}
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}
