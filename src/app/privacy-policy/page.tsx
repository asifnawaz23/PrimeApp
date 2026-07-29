import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy regarding how Prime App Solutions collects, stores, and protects user data and contact inquiries.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto z-10">
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-8">
        Privacy Policy
      </h1>
      <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/5 space-y-6 text-sm md:text-base text-gray-300 leading-relaxed font-light">
        <p className="text-gray-400 text-xs font-mono">Effective Date: July 28, 2026</p>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">1. Information Collection</h2>
          <p>
            When you request a consultation through our website form, we collect personal data including your name, email address, WhatsApp/phone number, company name, country, budget scope, and project description. We use this information solely to assess requirements, estimate project costs, and initiate contact.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">2. Data Storage & Usage</h2>
          <p>
            Submitted inquiries are securely logged into our project management database and Google Sheets. We do not sell, rent, or lease customer lists to third parties. We restrict access to authorized estimators who require the data to scope your project.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">3. Security</h2>
          <p>
            We implement standard security measures to safeguard your information, including SSL encryption on all API routes, database authentication controls, and token-restricted access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">4. Cookies & Analytics</h2>
          <p>
            We may use session cookies and basic web analytics (such as Google Analytics) to analyze web traffic and optimize page layouts. These cookies do not extract personally identifiable information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-white text-lg border-b border-white/5 pb-1">5. Contact</h2>
          <p>
            If you have questions regarding this privacy policy or would like us to remove your submitted information from our records, please reach out to <a href="mailto:info@primeappsolutions.site" className="text-accent-cyan hover:underline">info@primeappsolutions.site</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
