import React from "react";
import { db } from "@/lib/db";
import { seedDatabaseIfNeeded } from "@/lib/seedData";
import LucideIcon from "@/components/LucideIcon";
import ConsultationCTA from "@/components/ConsultationCTA";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ThreeHeroWrapper from "@/components/ThreeHeroWrapper";
import { ArrowUpRight, CheckCircle2, ChevronRight, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";
import type { Service, Portfolio, Testimonial } from "@prisma/client";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  // Ensure default data exists
  await seedDatabaseIfNeeded();

  let services: Service[] = [];
  let portfolioItems: Portfolio[] = [];
  let testimonials: Testimonial[] = [];

  try {
    services = await db.service.findMany({ orderBy: { order: "asc" } });
    portfolioItems = await db.portfolio.findMany({ where: { featured: true }, take: 4 });
    testimonials = await db.testimonial.findMany();
  } catch (error) {
    console.error("Failed to query home page database records:", error);
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 md:px-8 border-b border-white/5">
        {/* Three.js animated background node-particle system */}
        <ThreeHeroWrapper />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Subtle badge tag */}
          <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            <span>Next-Gen Systems Integrator</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-white tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
            We Architect & Engineer <br />
            <span className="gradient-text-electric">Elite Software Systems</span>
          </h1>

          <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Bespoke web, mobile, blockchain, and AI solutions crafted with mathematical precision. We don't build template sites; we ship high-performance assets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ConsultationCTA text="Get Free Consultation" />
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              View Our Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Ambient bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* 2. TRUST STRIP (Subtle Metrics & Tech Marquee) */}
      <section className="py-12 bg-bg-base/40 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8">
            <div>
              <p className="font-display font-bold text-3xl md:text-4xl text-white">100+</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Systems Shipped</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl md:text-4xl text-white">25+</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Countries Served</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl md:text-4xl text-white">98%</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Client Retention</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl md:text-4xl text-white">4.9/5</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Average Rating</p>
            </div>
          </div>

          {/* Scrolling Marquee */}
          <div className="relative w-full overflow-hidden py-4 border-t border-white/5">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none" />
            <div className="flex whitespace-nowrap animate-marquee">
              {/* Double items for seamless looping */}
              {[
                "Next.js", "React Native", "TypeScript", "Solidity", "Rust", "Python",
                "TensorFlow", "AWS", "Docker", "Kubernetes", "Unity", "WebGL",
                "Next.js", "React Native", "TypeScript", "Solidity", "Rust", "Python",
                "TensorFlow", "AWS", "Docker", "Kubernetes", "Unity", "WebGL"
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="mx-8 font-display text-sm font-semibold tracking-wider text-gray-500 uppercase flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-accent-cyan" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES (Asymmetric Bento Grid) */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
            Architected <span className="gradient-text-electric">Capabilities</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
            We operate across multiple engineering disciplines to design, build, and deploy premium enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            // Give some items distinct sizes/styles for a premium bento look
            const isLarge = idx === 0 || idx === 4;
            return (
              <div
                key={service.id}
                className={`glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden ${
                  isLarge ? "md:col-span-2" : "col-span-1"
                }`}
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan group-hover:text-bg-base group-hover:bg-gradient-to-tr group-hover:from-accent-violet group-hover:to-accent-cyan transition-all duration-300 mb-6">
                    <LucideIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2 group-hover:text-accent-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500">0{idx + 1} // CAPABILITY</span>
                  <Link
                    href={`/services#${service.title.toLowerCase().replace(/[\s&]+/g, "-")}`}
                    className="text-gray-400 group-hover:text-white flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Details
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INDUSTRIES SERVED */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-bg-base/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                Vertical-Specific <br />
                <span className="gradient-text-electric">Specializations</span>
              </h2>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                We custom-fit systems for demanding workflows. We adapt to regulatory frameworks and high-concurrency environments.
              </p>
            </div>
            <div className="lg:col-span-2 flex flex-wrap gap-3">
              {[
                "DeFi & Web3", "AI SaaS Platforms", "Healthcare & HIPAA", "Automotive Systems",
                "Real Estate Tech", "Supply Chain & Logistics", "Mobile E-Commerce",
                "Cross-Platform Gaming", "AdTech Pipelines", "Enterprise ERP"
              ].map((industry) => (
                <div
                  key={industry}
                  className="px-4 py-2.5 rounded-full border border-white/5 bg-white/5 text-gray-300 text-sm font-medium hover:border-accent-cyan/30 hover:bg-white/10 transition-all duration-300"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGIES (Bento Tech Grid) */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
            The <span className="gradient-text-indigo">Core Stack</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            We use compile-safe, production-hardened technologies for scale, responsiveness, and memory safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Languages */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-ping" />
                Languages
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>TypeScript</span>
                  <span className="text-accent-cyan">Type-Safe</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Solidity</span>
                  <span className="text-accent-cyan">Smart Contract</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Python</span>
                  <span className="text-accent-cyan">AI / ML</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Rust / C++</span>
                  <span className="text-accent-cyan">Performant</span>
                </li>
              </ul>
            </div>
            <span className="text-xs font-mono text-gray-500 mt-8">01 // SOURCE</span>
          </div>

          {/* Frameworks */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                Frameworks
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Next.js / React</span>
                  <span className="text-accent-cyan">Web App</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>React Native</span>
                  <span className="text-accent-cyan">Cross-Mobile</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>FastAPI / Node</span>
                  <span className="text-accent-cyan">Backends</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Three.js / Canvas</span>
                  <span className="text-accent-cyan">3D WebGL</span>
                </li>
              </ul>
            </div>
            <span className="text-xs font-mono text-gray-500 mt-8">02 // LAYER</span>
          </div>

          {/* Platforms */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
                Infrastructure
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>AWS / GCP</span>
                  <span className="text-accent-cyan">Cloud Base</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Docker</span>
                  <span className="text-accent-cyan">Containers</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Kubernetes</span>
                  <span className="text-accent-cyan">Orchestration</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Vercel / Netlify</span>
                  <span className="text-accent-cyan">Serverless</span>
                </li>
              </ul>
            </div>
            <span className="text-xs font-mono text-gray-500 mt-8">03 // DEPLOYMENT</span>
          </div>

          {/* Databases */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pink" />
                Data Layer
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>PostgreSQL</span>
                  <span className="text-accent-cyan">Relational</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Redis</span>
                  <span className="text-accent-cyan">Cache store</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Prisma / Supabase</span>
                  <span className="text-accent-cyan">ORM Layer</span>
                </li>
                <li className="flex justify-between font-mono border-b border-white/5 pb-2">
                  <span>Pinecone / Qdrant</span>
                  <span className="text-accent-cyan">Vector DB</span>
                </li>
              </ul>
            </div>
            <span className="text-xs font-mono text-gray-500 mt-8">04 // PERSISTENCE</span>
          </div>
        </div>
      </section>

      {/* 6. PROCESS PREVIEW */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-bg-base/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
              The <span className="gradient-text-electric">Engineering Cycle</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
              How we translate high-level conceptual requirements into reliable running code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-[55px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-accent-violet via-accent-cyan to-transparent z-0" />

            {[
              { num: "01", step: "Discovery & Blueprint", desc: "We translate your business objectives into detailed system constraints, wireframes, and database blueprints." },
              { num: "02", step: "System Architecture", desc: "Design data schemas, component libraries, cloud architecture, and verify security protocols." },
              { num: "03", step: "Agile Development", desc: "Continuous execution in 2-week sprints. Working code is deployed to staging repositories daily." },
              { num: "04", step: "Testing & Deployment", desc: "Rigorous QA checks (unit, integration, load tests) followed by production deployment with auto-scaling." }
            ].map((p, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-bg-base border border-white/10 flex items-center justify-center font-display font-bold text-accent-cyan mb-6 shadow-md shadow-accent-violet/10 group-hover:border-accent-cyan">
                  {p.num}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{p.step}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/process"
              className="text-xs font-bold uppercase tracking-wider text-accent-cyan hover:text-accent-violet inline-flex items-center gap-1 transition-colors"
            >
              Explore our full process
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO PREVIEW */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
              Selected <span className="gradient-text-electric">Projects</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
              A brief selection of products and architectures engineered by our team.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-accent-cyan hover:text-accent-cyan text-sm font-semibold transition-all duration-300 cursor-pointer"
          >
            All Case Studies
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden glass-card">
              {/* Image Container with zoom */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent opacity-80" />
              </div>

              {/* Text info */}
              <div className="p-6 md:p-8">
                <div className="flex items-center space-x-2 text-xs font-mono text-accent-cyan mb-2">
                  {project.tags.split(",").map((t) => (
                    <span key={t.trim()} className="px-2 py-0.5 rounded-md bg-accent-cyan/10">
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white group-hover:text-accent-cyan transition-colors mb-4">
                  {project.title}
                </h3>
                
                {/* Tech specifications */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {project.tech.split(",").map((tech) => (
                    <span key={tech.trim()} className="text-xs font-mono text-gray-500">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-bg-base/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
              Verified <span className="gradient-text-indigo">Estimates</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
              Read how tech leaders, founders, and product directors grade our custom system integrations.
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* 9. CLOSING CTA BANNER */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center border border-white/5 shadow-2xl">
          {/* Background overlay glows */}
          <div className="absolute inset-0 bg-bg-ink/80 backdrop-blur-md" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-accent-violet/10 to-accent-cyan/5 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-accent-violet/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-accent-cyan/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
              Ready to Build a <br />
              <span className="gradient-text-electric">High-Performance Product?</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Contact our engineering leads today. We will map your technical specifications, define your database stack, and supply an estimate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ConsultationCTA text="Start Project Scoping" />
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300 flex items-center gap-1 cursor-pointer"
              >
                Direct Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
