"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Thin progress bar that runs across the top during navigation */
function ProgressBar({ active }: { active: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!active) {
      setWidth(0);
      return;
    }
    // Jump to 15% immediately, then creep toward 85%
    setWidth(15);
    const t1 = setTimeout(() => setWidth(50), 150);
    const t2 = setTimeout(() => setWidth(75), 500);
    const t3 = setTimeout(() => setWidth(85), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active]);

  if (!active && width === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[2px] transition-all ease-out pointer-events-none"
      style={{
        width: active ? `${width}%` : "100%",
        opacity: active ? 1 : 0,
        transitionDuration: active ? "400ms" : "200ms",
        background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
        boxShadow: "0 0 8px rgba(6, 182, 212, 0.7)",
      }}
    />
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [navigating, setNavigating] = useState(false);

  // Detect route change start/end
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setNavigating(false);          // new page rendered → stop bar
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // Listen for link clicks to start the bar early
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) return;
      if (href !== pathname) setNavigating(true);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <>
      <ProgressBar active={navigating} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="flex flex-col flex-grow"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
