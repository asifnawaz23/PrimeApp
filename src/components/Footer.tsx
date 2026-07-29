"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, GitBranch, X, Link2, Camera, ArrowRight, Send } from "lucide-react";
import PrimeLogo from "@/components/PrimeLogo";

export default function Footer() {
  const { openInquiry } = useApp();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "loading">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="relative bg-bg-base border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex items-center group">
              <PrimeLogo size={38} showText={true} className="transition-opacity duration-300 group-hover:opacity-85" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Engineering premium, futuristic software solutions for mobile, web, blockchain, game development, and custom AI applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300">
                <X className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300">
                <Link2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300">
                <GitBranch className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300">
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">Sitemap</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent-cyan" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent-cyan" />
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent-cyan" />
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/technologies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent-cyan" />
                  Tech Stack
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent-cyan" />
                  Development Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="w-4 h-4 text-accent-cyan mt-1 flex-shrink-0" />
                <a href="mailto:info@primeappsolutions.site" className="text-gray-400 hover:text-white transition-colors duration-200">
                  info@primeappsolutions.site
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="w-4 h-4 text-accent-cyan mt-1 flex-shrink-0" />
                <a href="tel:+923212122047" className="text-gray-400 hover:text-white transition-colors duration-200">
                  +92 321 2122047
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={openInquiry}
                  className="text-xs font-semibold uppercase tracking-wider text-accent-cyan hover:text-accent-violet flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  Start a Project
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe for periodic engineering notes, software strategies, and tech trends.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 glass-input text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1 w-8 h-8 rounded-md bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-base flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-bg-base border-t-transparent rounded-full animate-spin" />
                ) : status === "success" ? (
                  <span className="text-bg-base text-xs font-bold">✓</span>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
            {status === "success" && (
              <p className="text-accent-cyan text-xs mt-2 animate-pulse">Subscribed successfully!</p>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Prime App Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
