import React from "react";
import { Terminal, Shield, Workflow, Database, Cpu } from "lucide-react";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technologies",
  description: "Explore the core technologies, frameworks, and database engines Prime App Solutions uses to build secure software.",
};

const techCategories = [
  {
    title: "Languages",
    icon: Terminal,
    color: "text-accent-violet border-accent-violet/20 bg-accent-violet/5",
    items: [
      { name: "TypeScript", details: "For type-safe, error-resilient client and server-side web logic." },
      { name: "Solidity", details: "Secure smart contract engineering for Ethereum virtual machine (EVM) protocols." },
      { name: "Python", details: "Machine learning model execution, RAG systems, and quantitative calculations." },
      { name: "Rust / C++", details: "High-throughput rendering pipelines, low-level modules, and system code." },
    ],
  },
  {
    title: "Frameworks & Runtimes",
    icon: Cpu,
    color: "text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5",
    items: [
      { name: "Next.js & React", details: "For premium, server-rendered, SEO-friendly, and interactive web layouts." },
      { name: "React Native & Flutter", details: "Native compile-rate mobile apps sharing single cross-platform codebases." },
      { name: "Node.js & FastAPI", details: "Fast, asynchronous backends with automated OpenAPI documentation hooks." },
      { name: "Three.js (WebGL)", details: "Hardware-accelerated 3D graphics rendered directly inside modern browsers." },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    icon: Workflow,
    color: "text-accent-indigo border-accent-indigo/20 bg-accent-indigo/5",
    items: [
      { name: "AWS & GCP", details: "Auto-scaled multi-zone deployments with automated network security configurations." },
      { name: "Docker & Kubernetes", details: "Containerized deployment clusters to isolate and scale microservices." },
      { name: "Terraform", details: "Infrastructure-as-Code (IaC) to audit and version cloud components safely." },
      { name: "GitHub Actions CI/CD", details: "Automated test checks and immediate push deployments to Vercel/EC2." },
    ],
  },
  {
    title: "Data Layer",
    icon: Database,
    color: "text-accent-pink border-accent-pink/20 bg-accent-pink/5",
    items: [
      { name: "PostgreSQL", details: "Strict relational ACID compliance with advanced JSONB query support." },
      { name: "Redis", details: "In-memory database for blazingly fast session caches and rate limit counters." },
      { name: "Prisma & Supabase", details: "Type-safe database ORM and headless authorization database setups." },
      { name: "Pinecone / Qdrant", details: "Vector databases to search embeddings and power AI agent systems." },
    ],
  },
];

export default function TechnologiesPage() {
  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-6">
          <span>Technology Index</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          The Production-Hardened <br />
          <span className="gradient-text-electric">Tech Stack</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          We use type-safe language structures, fast caching databases, and containerized deployment workflows to guarantee scale and uptime.
        </p>
      </div>

      {/* Bento Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {techCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />

              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white">{cat.title}</h2>
              </div>

              <div className="space-y-6">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-l-2 border-white/10 pl-4 hover:border-accent-cyan transition-colors duration-200">
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{item.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Shield Callout */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0 animate-pulse">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-xl mb-2">Our Security & Auditing Commitment</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            All deployments undergo automatic vulnerability scanning. Smart contracts are verified against reentrancy vectors, and API routes are secured behind CORS, rate limits, and cryptographic cookies.
          </p>
        </div>
      </div>
    </div>
  );
}
