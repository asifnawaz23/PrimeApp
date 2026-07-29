import React from "react";
import { db } from "@/lib/db";
import { seedDatabaseIfNeeded } from "@/lib/seedData";
import ConsultationCTA from "@/components/ConsultationCTA";
import { ExternalLink, Terminal } from "lucide-react";
import { Metadata } from "next";
import type { Portfolio } from "@prisma/client";

export const metadata: Metadata = {
  title: "Case Studies Portfolio",
  description: "Browse the engineering case studies and systems shipped by Prime App Solutions across web, mobile, AI, and blockchain systems.",
};

export default async function PortfolioPage() {
  await seedDatabaseIfNeeded();
  let items: Portfolio[] = [];

  try {
    items = await db.portfolio.findMany();
  } catch (error) {
    console.error("Failed to query portfolio page:", error);
  }

  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-indigo/25 bg-accent-indigo/5 text-xs text-accent-indigo font-semibold uppercase tracking-wider mb-6">
          <span>Our Work</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          System Implementations & <br />
          <span className="gradient-text-indigo">Case Studies</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          Explore our portfolio of projects. We deliver scalable systems, clean contract code, and responsive interface layers.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        {items.map((project) => (
          <div key={project.id} className="group relative rounded-2xl overflow-hidden glass-card flex flex-col justify-between">
            {/* Image Box */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-white/5">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent opacity-85" />
            </div>

            {/* Text description */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-accent-cyan mb-3">
                  {project.tags.split(",").map((t) => (
                    <span key={t.trim()} className="px-2.5 py-0.5 rounded-md bg-accent-cyan/10">
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Technologies strip */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(",").map((tech) => (
                    <span key={tech.trim()} className="text-xs font-mono text-gray-500">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-white/5 max-w-4xl mx-auto">
        <h3 className="font-display font-bold text-2xl text-white mb-4">Have an ambitious project idea?</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
          Partner with our engineering team to map your requirements, set up database pipelines, and build a high-conversion product.
        </p>
        <ConsultationCTA text="Get Started With Our Team" />
      </div>
    </div>
  );
}
