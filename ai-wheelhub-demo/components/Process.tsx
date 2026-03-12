"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "SCAN",
    description:
      "Submit your vehicle specs. Our AI analyzes geometry, load requirements, and aesthetic preferences.",
    stat: "< 2 MINUTES",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "GENERATE",
    description:
      "The AI models 10,000+ design iterations, optimizing for both structural integrity and visual impact.",
    stat: "INFINITE VARIATIONS",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "FORGE",
    description:
      "Your finalized design is precision-machined from aerospace-grade 6061-T6 aluminum alloy.",
    stat: "48-72 HRS",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export default function Process() {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #020408 50%, #000000 100%)",
        }}
      />

      {/* Cyber grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              style={{
                width: 24,
                height: 1,
                backgroundColor: "#00B4FF",
                opacity: 0.6,
                display: "inline-block",
              }}
            />
            <span
              className="font-heading text-xs tracking-widest"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 500,
                color: "#00B4FF",
                letterSpacing: "0.4em",
              }}
            >
              HOW IT WORKS
            </span>
            <span
              style={{
                width: 24,
                height: 1,
                backgroundColor: "#00B4FF",
                opacity: 0.6,
                display: "inline-block",
              }}
            />
          </div>
          <h2
            className="font-heading font-bold tracking-tight text-white mb-4"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            THE PROCESS
          </h2>
          <p
            className="font-heading text-sm tracking-wide"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            From specs to road. Precision at every step.
          </p>
        </motion.div>

        {/* Beam connector — desktop only */}
        <div className="hidden lg:block relative mb-[-2rem]">
          <div
            style={{
              position: "relative",
              height: 1,
              background: "rgba(255,255,255,0.05)",
              overflow: "hidden",
              marginBottom: "2rem",
            }}
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, #00B4FF, transparent)",
              }}
            />
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "2rem",
                overflow: "hidden",
              }}
            >
              {/* Large faded step number in background */}
              <span
                className="font-display select-none"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontSize: "9rem",
                  color: "rgba(255,255,255,0.04)",
                  position: "absolute",
                  top: "-1rem",
                  right: "-0.5rem",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {step.num}
              </span>

              {/* Icon box */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid rgba(0,180,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00B4FF",
                  marginBottom: "1.5rem",
                  background: "rgba(0,180,255,0.05)",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                className="font-heading font-semibold text-white mb-3"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="font-heading text-sm leading-relaxed mb-6"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>

              {/* Stat line */}
              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="font-heading text-xs tracking-widest"
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                    color: "#00B4FF",
                    letterSpacing: "0.2em",
                    opacity: 0.8,
                  }}
                >
                  {step.stat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
