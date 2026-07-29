"use client";

import dynamic from "next/dynamic";

// Client component wrapper so that ssr:false dynamic import is valid
const ThreeHero = dynamic(() => import("@/components/ThreeHero"), { ssr: false });

export default function ThreeHeroWrapper() {
  return <ThreeHero />;
}
