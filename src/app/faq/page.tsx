import React from "react";
import { db } from "@/lib/db";
import { seedDatabaseIfNeeded } from "@/lib/seedData";
import FaqList from "@/components/FaqList";
import ConsultationCTA from "@/components/ConsultationCTA";
import { HelpCircle } from "lucide-react";
import { Metadata } from "next";
import type { Faq } from "@prisma/client";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Read answers to common questions about Prime App Solutions, our engineering practices, support timelines, and billing models.",
};

export const revalidate = 60;

export default async function FaqPage() {
  await seedDatabaseIfNeeded();
  let faqs: Faq[] = [];

  try {
    faqs = await db.faq.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("Failed to query FAQs:", error);
  }

  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-6">
          <span>FAQ Index</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          Frequently Asked <br />
          <span className="gradient-text-electric">Questions</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          Quick technical answers about our development standards, engagement procedures, pricing, and system architectures.
        </p>
      </div>

      {/* Accordion Component */}
      <div className="mb-24">
        <FaqList faqs={faqs} />
      </div>

      {/* CTA Box */}
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-white/5 max-w-4xl mx-auto">
        <HelpCircle className="w-12 h-12 text-accent-cyan mx-auto mb-4 animate-pulse" />
        <h3 className="font-display font-bold text-2xl text-white mb-4">Have an unaddressed technical question?</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
          Our engineering architects can answer complex scoping, capability, or timeline questions during a free consultation call.
        </p>
        <ConsultationCTA text="Consult With An Engineer" />
      </div>
    </div>
  );
}
