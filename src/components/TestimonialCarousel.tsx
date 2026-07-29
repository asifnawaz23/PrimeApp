"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-violet/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main card */}
      <div className="relative glass-card rounded-2xl p-8 md:p-12 overflow-hidden min-h-[320px] flex flex-col justify-between">
        <Quote className="absolute top-6 left-6 w-16 h-16 text-white/5 pointer-events-none" />

        <div className="relative flex-grow flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center"
            >
              <p className="font-display font-light text-lg md:text-xl text-gray-200 italic leading-relaxed mb-8">
                "{current.content}"
              </p>
              
              <div className="flex flex-col items-center">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full border border-accent-cyan/30 mb-3 object-cover"
                />
                <h4 className="font-display font-bold text-white text-base">{current.name}</h4>
                <p className="text-gray-400 text-xs mt-0.5">
                  {current.role} &bull; <span className="text-accent-cyan">{current.company}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dot controls */}
        <div className="flex items-center justify-center space-x-2 mt-8 z-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === index ? "w-6 bg-accent-cyan" : "bg-white/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Outer Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan flex items-center justify-center transition-all duration-300 z-10 cursor-pointer hidden sm:flex"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan flex items-center justify-center transition-all duration-300 z-10 cursor-pointer hidden sm:flex"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
