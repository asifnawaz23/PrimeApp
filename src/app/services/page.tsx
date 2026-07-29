import React from "react";
import { db } from "@/lib/db";
import { seedDatabaseIfNeeded } from "@/lib/seedData";
import LucideIcon from "@/components/LucideIcon";
import ConsultationCTA from "@/components/ConsultationCTA";
import { CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import type { Service } from "@prisma/client";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore the technical services offered by Prime App Solutions, spanning web, mobile, blockchain, game development, and custom AI systems.",
};

const serviceDeliverables: Record<string, string[]> = {
  "Web Development": [
    "Next.js & React single page applications",
    "Microfrontend and serverless scaling",
    "Performance tuning and SEO optimization",
    "CMS and Headless integrations",
  ],
  "Mobile Development": [
    "React Native & Flutter cross-platform apps",
    "Native Swift (iOS) & Kotlin (Android) development",
    "App Store & Google Play publishing pipeline",
    "Offline sync and secure device storage",
  ],
  "Blockchain Solutions": [
    "Audited Solidity Smart Contracts",
    "Decentralized apps (dApps) & wallet integrations",
    "Custom tokenomics design & ERC-20 / ERC-721 tokens",
    "Layer-2 scalability setups (Arbitrum, Polygon)",
  ],
  "Game Development": [
    "Unity & Unreal Engine cross-platform games",
    "WebGL browser-based interactive interfaces",
    "Virtual Reality (VR) and Augmented Reality (AR) products",
    "Real-time multiplayer integrations (Photon, Mirror)",
  ],
  "Custom AI Systems": [
    "Retrieval-Augmented Generation (RAG) setups",
    "Private LLM deployment on VPC infrastructure",
    "Sentiment analysis & predictive modeling pipelines",
    "AI Agent development for customer pipelines",
  ],
  "UI/UX Design": [
    "High-fidelity responsive UI layouts (Figma)",
    "Custom interactive prototype builds",
    "Design system token definition & asset sheets",
    "User journey analysis & heuristic audits",
  ],
  "Cloud & DevOps": [
    "Automated CI/CD pipelines (GitHub Actions, GitLab)",
    "Docker & Kubernetes cluster orchestration",
    "Infrastructure-as-Code (Terraform)",
    "Serverless scaling, CDN, and load balancer setups",
  ],
  "Enterprise Software": [
    "Legacy migrations to modern microservices",
    "RESTful and GraphQL API design & specifications",
    "Bespoke ERP, CRM, and asset tracking portals",
    "High-concurrency database optimizations",
  ],
};

export default async function ServicesPage() {
  await seedDatabaseIfNeeded();
  let services: Service[] = [];

  try {
    services = await db.service.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("Failed to query services page:", error);
  }

  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-cyan/25 bg-accent-cyan/5 text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-6">
          <span>Capabilities</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          Our Engineering <br />
          <span className="gradient-text-electric">Service Offerings</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          We combine advanced software engineering practices with custom product design to build resilient systems. Here is our detailed service index.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {services.map((service, idx) => {
          const deliverables = serviceDeliverables[service.title] || [];
          const slug = service.title.toLowerCase().replace(/[\s&]+/g, "-");
          return (
            <div
              id={slug}
              key={service.id}
              className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden group border border-white/5 scroll-mt-24"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-violet/5 to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info block */}
                <div className="lg:col-span-1">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan mb-6 group-hover:border-accent-cyan group-hover:bg-accent-cyan group-hover:text-bg-base transition-all duration-300">
                    <LucideIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ConsultationCTA text="Scope This Service" variant="link" />
                </div>

                {/* Deliverables / Scope */}
                <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 md:p-8 border border-white/5">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-6">
                    Typical Deliverables & Capabilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
