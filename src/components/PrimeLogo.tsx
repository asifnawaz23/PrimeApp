import React from "react";

interface PrimeLogoProps {
  /** Width/height of the icon mark in px */
  size?: number;
  /** Show the wordmark beside the icon */
  showText?: boolean;
  className?: string;
}

export default function PrimeLogo({
  size = 40,
  showText = true,
  className = "",
}: PrimeLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* ── Icon mark ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Blue → Cyan gradient for the P letterform */}
          <linearGradient
            id="pGrad"
            x1="20"
            y1="10"
            x2="80"
            y2="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#1e6fb5" />
            <stop offset="100%" stopColor="#0f3460" />
          </linearGradient>

          {/* Green gradient for the orbit swoosh + arrow */}
          <linearGradient
            id="swooshGrad"
            x1="10"
            y1="60"
            x2="90"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Subtle drop-shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        {/* ── P letterform ── */}
        {/*  Vertical stem */}
        <rect
          x="22"
          y="14"
          width="13"
          height="72"
          rx="6"
          fill="url(#pGrad)"
          filter="url(#shadow)"
        />
        {/* Bowl of the P — top arc */}
        <path
          d="M35 14 Q72 14 72 38 Q72 62 35 62"
          stroke="url(#pGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
          filter="url(#shadow)"
        />

        {/* ── Orbit swoosh ── */}
        {/*
            An elliptical arc that wraps around the mid-section of the P,
            going from bottom-left, under the bowl, and sweeping up-right.
        */}
        <path
          d="M18 68 Q10 52 28 44 Q46 36 68 40 Q82 43 80 32"
          stroke="url(#swooshGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#shadow)"
        />

        {/* ── Upward arrow at the end of the swoosh ── */}
        {/* Arrowhead pointing upper-right */}
        <path
          d="M80 32 L72 28 M80 32 L84 40"
          stroke="url(#swooshGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* ── Wordmark ── */}
      {showText && (
        <span className="flex flex-col leading-none select-none">
          <span
            className="font-display font-bold tracking-wide text-transparent bg-clip-text"
            style={{
              fontSize: size * 0.42,
              backgroundImage:
                "linear-gradient(90deg, #38bdf8 0%, #1e6fb5 60%, #0f3460 100%)",
            }}
          >
            PRIME
          </span>
          <span
            className="font-sans font-medium tracking-widest text-gray-400 uppercase"
            style={{ fontSize: size * 0.2 }}
          >
            App Solutions
          </span>
        </span>
      )}
    </div>
  );
}
