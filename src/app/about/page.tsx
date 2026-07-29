import React from "react";
import ConsultationCTA from "@/components/ConsultationCTA";
import { ShieldCheck, Cpu, Code2, Users, Mail, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Prime App Solutions, our core engineering values, and our commitment to building premium software systems.",
};

const values = [
  {
    icon: Code2,
    title: "Technical Rigor",
    desc: "We write clean, documented, compile-safe code. We avoid shortcut abstractions that lead to technical debt, choosing stability and durability.",
  },
  {
    icon: Cpu,
    title: "Design Precision",
    desc: "We build pixel-perfect frontends. Transition and layout styling details matter, which is why we enforce design fidelity across all viewports.",
  },
  {
    icon: ShieldCheck,
    title: "Absolute Transparency",
    desc: "Our development repositories and task boards are fully visible to our partners. You know exactly what is built, tested, and shipped, in real-time.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    desc: "We integrate directly with your product managers. We act as an extension of your team, providing leadership on architectural decisions.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-violet/20 bg-accent-violet/5 text-xs text-accent-violet font-semibold uppercase tracking-wider mb-6">
          <span>Our Agency</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          Pioneering Premium <br />
          <span className="gradient-text-electric">Software Engineering</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          Prime App Solutions was founded on a simple premise: engineering teams deserve elite builders, not template shops. We construct robust, high-performance architectures.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {values.map((v, idx) => {
          const Icon = v.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan mb-6 group-hover:border-accent-cyan transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-accent-cyan transition-colors">
                {v.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {v.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Contact Section */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Direct <span className="gradient-text-indigo">Coordinates</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Want to contact our executive team directly? Reach out below for partnerships, general inquiries, or detailed project scoping.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-5 h-5 text-accent-cyan" />
              <a href="mailto:info@primeappsolutions.site" className="text-gray-300 hover:text-white transition-colors">
                info@primeappsolutions.site
              </a>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-5 h-5 text-accent-cyan" />
              <a href="tel:+923212122047" className="text-gray-300 hover:text-white transition-colors">
                +92 321 2122047
              </a>
            </div>
          </div>
        </div>
        <div className="text-center lg:text-left bg-white/5 rounded-2xl p-6 border border-white/5">
          <h3 className="font-display font-bold text-white text-lg mb-2">Ready to scope your project?</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            We will conduct an architecture review and estimate pricing models based on your specifications.
          </p>
          <ConsultationCTA text="Start Project Scoping" />
        </div>
      </div>
    </div>
  );
}
