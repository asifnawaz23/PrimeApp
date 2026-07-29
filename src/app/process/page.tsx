import React from "react";
import { Compass, Paintbrush, Code2, ShieldAlert, Rocket, ArrowRight } from "lucide-react";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process",
  description: "Learn about the 5-step software development and system integration process we use to build premium digital products at Prime App Solutions.",
};

const processSteps = [
  {
    num: "01",
    title: "Discovery & Blueprinting",
    icon: Compass,
    duration: "Week 1",
    desc: "We analyze your project goals and generate a technical system blueprint. This details requirements, database entity relationship diagrams (ERD), API structures, and platform architecture specs.",
    deliverables: ["Product Specification Document", "System Architecture Blueprint", "Project Timeline & Cost Estimates"],
  },
  {
    num: "02",
    title: "UI/UX Framing",
    icon: Paintbrush,
    duration: "Weeks 2-3",
    desc: "Our design team translates specifications into high-fidelity Figma prototypes. We build a custom design system with reusable typography, color variables, and components, ensuring a premium, unified aesthetic.",
    deliverables: ["Interactive Figma Prototypes", "Custom Design Tokens Layout", "Component Library Map"],
  },
  {
    num: "03",
    title: "Agile Engineering",
    icon: Code2,
    duration: "Weeks 4-10 (Variable)",
    desc: "Our developers start building the system. Code is executed in 2-week sprints, using GitHub repositories, strict type constraints, and database adapters. We deploy functional increments to staging environments daily.",
    deliverables: ["Compiled Git Repository Access", "Staging Server Deployments", "Sprint Progress Reports"],
  },
  {
    num: "04",
    title: "Testing & Quality Assurance",
    icon: ShieldAlert,
    duration: "Weeks 11-12",
    desc: "We run the code through a series of automated checks. This includes writing Jest/Vitest unit tests, executing cypress end-to-end user flows, performing database load testing, and running security scanners.",
    deliverables: ["QA Audit & Security Reports", "Stress-Testing Metrics", "API Integrity Signoff"],
  },
  {
    num: "05",
    title: "Production Release & SLA",
    icon: Rocket,
    duration: "Launch",
    desc: "We push the project live on high-availability serverless platforms or cloud clusters (Vercel, AWS). We map domain routing, configure SSL, establish backups, and initiate the 30-day post-launch support SLA.",
    deliverables: ["Production System Deployment", "Automated Daily Backup Scripts", "SLA Support Handover"],
  },
];

export default function ProcessPage() {
  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-pink/25 bg-accent-pink/5 text-xs text-accent-pink font-semibold uppercase tracking-wider mb-6">
          <span>Execution Roadmap</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          Our Development <br />
          <span className="gradient-text-electric">Engineering Cycle</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          We combine transparent scoping timelines, Agile sprints, and automated testing cycles to ship code that works correctly from day one.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative border-l border-white/5 pl-6 md:pl-10 space-y-16 max-w-5xl mx-auto mb-24">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative group scroll-mt-24">
              {/* Timeline marker */}
              <div className="absolute left-[-35px] md:left-[-51px] top-0 w-[18px] h-[18px] rounded-full bg-bg-base border-2 border-accent-cyan flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-mono text-gray-500 flex items-center gap-1.5">
                  <span>{step.duration}</span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-display font-bold text-2xl text-accent-cyan/40">{step.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-display font-bold text-xl md:text-2xl text-white">{step.title}</h2>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-3xl">
                  {step.desc}
                </p>

                {/* Deliverables Subgrid */}
                <div className="border-t border-white/5 pt-6">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">Milestone Deliverables</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {step.deliverables.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center space-x-2 text-xs">
                        <span className="w-1 h-1 rounded-full bg-accent-cyan" />
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

      {/* CTA Box */}
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-white/5 max-w-4xl mx-auto">
        <h3 className="font-display font-bold text-2xl text-white mb-4">Ready to start the Discovery phase?</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
          Schedule a consultation to map out your software specification document and obtain an architected blueprint.
        </p>
        <ConsultationCTA text="Initiate Scope Discovery" />
      </div>
    </div>
  );
}
