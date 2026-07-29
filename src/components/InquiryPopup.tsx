"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Mail, Phone, Building, Globe, DollarSign, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const servicesList = [
  "Web Development",
  "Mobile Development",
  "Blockchain Solutions",
  "Game Development",
  "Custom AI Systems",
  "UI/UX Design",
  "Cloud & DevOps",
  "Enterprise Software",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
];

const countries = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Pakistan", code: "+92" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Singapore", code: "+65" },
  { name: "Other", code: "" },
];

export default function InquiryPopup() {
  const { isInquiryOpen, closeInquiry } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    countryCode: "+1",
    phone: "",
    country: "United States",
    service: "Web Development",
    budget: "$10,000 - $25,000",
    projectTitle: "",
    description: "",
    contactMethod: "Email",
    // Honeypot field
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone/WhatsApp is required";
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/[\s()-]/g, ""))) {
      newErrors.phone = "Invalid phone number (must be 7-15 digits)";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check honeypot field
    if (formData.honeypot) {
      // Treat as success so the bot thinks it succeeded, but do nothing
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          countryCode: "+1",
          phone: "",
          country: "United States",
          service: "Web Development",
          budget: "$10,000 - $25,000",
          projectTitle: "",
          description: "",
          contactMethod: "Email",
          honeypot: "",
        });
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || "Failed to submit inquiry. Please try again." });
      }
    } catch {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isSubmitting) {
                closeInquiry();
                setIsSuccess(false);
              }
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card p-6 md:p-8 z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                closeInquiry();
                setIsSuccess(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>

            {!isSuccess ? (
              <>
                <div className="mb-6">
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                    Start Your <span className="gradient-text-electric">Project Journey</span>
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Tell us about your objectives. We will analyze your scope and get in touch with you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from screen, but screen readers might notice - standard honeypot style) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">If you are human, leave this empty:</label>
                    <input
                      id="honeypot"
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full py-2.5 pl-3 pr-4 glass-input text-sm ${
                            errors.name ? "border-red-500 focus:border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. john@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full py-2.5 pl-3 pr-4 glass-input text-sm ${
                            errors.email ? "border-red-500 focus:border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone (with Country Code) & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="w-20 py-2.5 px-2 glass-input text-sm cursor-pointer"
                        >
                          {countries.map((c) => (
                            <option key={c.name} value={c.code}>
                              {c.code || "Code"} ({c.name.substring(0, 3)})
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="e.g. 3212122047"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`flex-grow py-2.5 px-3 glass-input text-sm ${
                            errors.phone ? "border-red-500 focus:border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Acme Corp"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 glass-input text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 3: Country & Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 glass-input text-sm cursor-pointer"
                      >
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Required Service *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 glass-input text-sm cursor-pointer"
                      >
                        {servicesList.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Budget & Project Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Estimated Budget *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 glass-input text-sm cursor-pointer"
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                        Project Title / Subject
                      </label>
                      <input
                        type="text"
                        name="projectTitle"
                        placeholder="e.g. E-Commerce Revamp"
                        value={formData.projectTitle}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 glass-input text-sm"
                      />
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      Project Details *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      placeholder="Outline your timeline, goals, and core system requirements..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full py-2.5 px-3 glass-input text-sm ${
                        errors.description ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <span className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Preferred Contact Channel
                    </span>
                    <div className="flex space-x-6">
                      {["Email", "Phone", "WhatsApp"].map((method) => (
                        <label key={method} className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={formData.contactMethod === method}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-accent-cyan bg-bg-base border-white/10 focus:ring-accent-cyan focus:ring-2 rounded-full cursor-pointer"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Server Submit Error */}
                  {errors.submit && <p className="text-red-500 text-sm font-semibold">{errors.submit}</p>}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-accent-violet to-accent-cyan hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-800 cursor-pointer"
                    >
                      <span className="w-full relative px-6 py-3 transition-all ease-in duration-75 bg-bg-base rounded-md group-hover:bg-transparent group-hover:text-bg-base font-bold flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Analyzing Requirements...
                          </>
                        ) : (
                          <>
                            Get My Free Consultation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-10 h-10 text-accent-cyan" />
                  </div>
                </div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                  Inquiry Successfully Received!
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
                  Your project requirements have been routed to our technical estimators. We are already analyzing your description and will reach out via your preferred method (<span className="text-accent-cyan font-bold">{formData.contactMethod}</span>) shortly.
                </p>
                <button
                  onClick={() => {
                    closeInquiry();
                    setIsSuccess(false);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan text-sm font-semibold transition-all duration-300 cursor-pointer"
                >
                  Return to Site
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
