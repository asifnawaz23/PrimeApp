import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Terms & Conditions governing the use of the Prime App Solutions agency website and our technical consultation offerings.",
};

export default function TermsConditionsPage() {
  return (
    <div className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto z-10">
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-8">
        Terms & Conditions
      </h1>
      <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/5 space-y-6 text-sm md:text-base text-gray-300 leading-relaxed font-light">
        <p className="text-gray-400 text-xs font-mono">Last Updated: July 28, 2026</p>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">1. Acceptance of Terms</h2>
          <p>
            By accessing and browsing the Prime App Solutions website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these conditions, you must cease using the site immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">2. Consultation Services</h2>
          <p>
            Submission of project requirements through our consultation form does not establish a formal contract or binding development agreement. All project scoping estimates, blueprints, and proposals provided are non-binding until explicitly signed within a master services agreement (MSA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">3. Intellectual Property</h2>
          <p>
            The content, custom graphics, Three.js source designs, layout code, and branding displayed on this website are the intellectual property of Prime App Solutions and are protected by applicable trademark, copyright, and patent laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">4. Disclaimer of Liability</h2>
          <p>
            We attempt to keep the information on this website accurate and up-to-date. However, Prime App Solutions makes no warranties, express or implied, regarding the website's uptime, compatibility, or functional status. We disclaim all liability for any disruption, loss of data, or network errors arising from site use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">5. Contact</h2>
          <p>
            If you have questions regarding these terms, please contact us at <a href="mailto:info@primeappsolutions.site" className="text-accent-cyan hover:underline">info@primeappsolutions.site</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
