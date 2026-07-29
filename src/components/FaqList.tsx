"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: FAQ[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="glass-card rounded-xl overflow-hidden border border-white/5 transition-all duration-300"
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex items-center justify-between p-6 text-left font-display font-semibold text-white hover:text-accent-cyan transition-colors cursor-pointer"
            >
              <span className="pr-4">{faq.question}</span>
              {isOpen ? (
                <Minus className="w-5 h-5 text-accent-cyan flex-shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
