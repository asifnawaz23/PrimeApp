import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Team",
  description: "Get in touch with Prime App Solutions to request a free consultation, scope pricing, and outline your system deliverables.",
};

export default function ContactPage() {
  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col: Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-6">
              <span>Contact Us</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-6">
              Let's Architect <br />
              <span className="gradient-text-electric">Your System</span>
            </h1>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
              Have an upcoming product launch or legacy migration? Share your parameters and schedule a direct engineering consult.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan mt-1 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">General Inquiries</h4>
                  <a href="mailto:info@primeappsolutions.site" className="text-gray-400 hover:text-white text-sm transition-colors mt-0.5 block">
                    info@primeappsolutions.site
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan mt-1 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">Direct Phone / WhatsApp</h4>
                  <a href="tel:+923212122047" className="text-gray-400 hover:text-white text-sm transition-colors mt-0.5 block">
                    +92 321 2122047
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan mt-1 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">Operating Hours</h4>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Monday - Friday &bull; 9 AM - 6 PM PST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
