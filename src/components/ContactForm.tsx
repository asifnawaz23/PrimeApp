"use client";

import React, { useState } from "react";
import { Mail, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
  { name: "Singapore", code: "+65" },
];

export default function ContactForm() {
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

    if (formData.honeypot) {
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
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || "Failed to submit. Please try again." });
      }
    } catch {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 md:p-12 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center animate-pulse">
            <CheckCircle className="w-10 h-10 text-accent-cyan" />
          </div>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
          Requirements Logged Successfully!
        </h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Your project scoping details have been successfully written to our estimators. We will initiate contact via your preferred method (<span className="text-accent-cyan font-bold">{formData.contactMethod}</span>) shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan text-sm font-semibold transition-all duration-300 cursor-pointer"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-4 border border-white/5">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full py-2.5 px-3 glass-input text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="e.g. john@company.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full py-2.5 px-3 glass-input text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

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
                  {c.code || "Code"}
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
              className="flex-grow py-2.5 px-3 glass-input text-sm"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
          Project Details *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Briefly describe your objectives, requirements, and target timeline..."
          value={formData.description}
          onChange={handleInputChange}
          className="w-full py-2.5 px-3 glass-input text-sm"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

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

      {errors.submit && <p className="text-red-500 text-sm font-semibold">{errors.submit}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-br from-accent-violet to-accent-cyan hover:text-white cursor-pointer"
      >
        <span className="w-full relative px-6 py-3 transition-all ease-in duration-75 bg-bg-base rounded-md group-hover:bg-transparent group-hover:text-bg-base flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting scope...
            </>
          ) : (
            <>
              Get My Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </button>
    </form>
  );
}
