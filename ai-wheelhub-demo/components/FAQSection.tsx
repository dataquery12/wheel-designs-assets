"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqItems = [
  {
    question: "How does the AI design my wheel hub?",
    answer:
      "Our proprietary AI system analyzes your vehicle's specifications, weight distribution, and aesthetic preferences to generate thousands of unique structural designs. The optimal design balances beauty with engineering precision.",
  },
  {
    question: "What materials are used?",
    answer:
      "Each hub is machined from aerospace-grade 6061-T6 aluminum alloy — the same material used in Formula 1 and aerospace applications. We offer optional anodizing in 12 finishes.",
  },
  {
    question: "How long does production take?",
    answer:
      "From design approval to shipping: 48-72 hours. Our CNC machining facility operates 24/7. Express 24-hour production available for premium orders.",
  },
  {
    question: "Do you offer custom sizing?",
    answer:
      "Yes. AXIS hubs are available in 18\" to 24\" diameter with PCD patterns from 4x100 to 6x139.7. All specs are entered during the configuration process.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="about" className="relative px-6 py-28 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #020408 50%, #000000 100%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto grid gap-16 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
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
              AXIS
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-heading font-bold text-white leading-tight"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.01em",
              maxWidth: "28rem",
            }}
          >
            WHEEL HUBS DESIGNED BY INTELLIGENCE.
          </h2>

          {/* Description */}
          <p
            className="font-heading text-sm leading-relaxed max-w-sm"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
            }}
          >
            AXIS is the intersection of artificial intelligence and precision manufacturing.
            Every hub starts as a unique algorithm — evolved through thousands of structural iterations,
            then machined to exacting tolerances from aerospace-grade alloy.
          </p>

          {/* Quote box */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "4px solid rgba(0,180,255,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "1.5rem",
            }}
          >
            <p
              className="font-display italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                textShadow: "0 0 20px rgba(0,180,255,0.1)",
              }}
            >
              "Every AXIS hub is a unique artifact. No two designs are algorithmically identical."
            </p>
          </div>

          {/* Location tag */}
          <p
            className="font-heading text-xs tracking-widest"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.2em",
            }}
          >
            SAN DIEGO DESIGN × GLOBAL PRECISION
          </p>
        </motion.div>

        {/* Right column — FAQ */}
        <div id="faq" className="flex flex-col gap-0">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <span
                    className="font-heading font-medium"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      letterSpacing: "0.04em",
                      color: isOpen ? "#00B4FF" : "#ffffff",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      color: isOpen ? "#00B4FF" : "rgba(255,255,255,0.4)",
                      fontSize: "1.2rem",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="font-heading text-sm leading-relaxed pb-5"
                        style={{
                          fontFamily: "var(--font-rajdhani)",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.8,
                        }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
