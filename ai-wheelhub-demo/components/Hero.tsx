"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WheelHub from "./WheelHub";

const techTags = ["5-SPOKE", "6061 ALLOY", "AI-DESIGNED", "8.5KG"];

const orbitalRings = [
  { size: 560, duration: 20, reverse: false, opacity: 0.12 },
  { size: 640, duration: 30, reverse: true, opacity: 0.07 },
  { size: 740, duration: 45, reverse: false, opacity: 0.04 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const wheelY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Radial glow on right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 70% 50%, rgba(0,180,255,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Fine cyan grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Main content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen grid lg:grid-cols-2 gap-8 items-center pt-24 pb-16 lg:pt-0 lg:pb-0">

        {/* Left column — text */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-col gap-8 lg:gap-10"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.span
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              style={{
                display: "inline-block",
                width: 32,
                height: 1,
                backgroundColor: "#00B4FF",
                transformOrigin: "left",
              }}
            />
            <span
              className="font-heading text-xs tracking-widest"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 500,
                color: "#00B4FF",
                letterSpacing: "0.35em",
              }}
            >
              AI-ENGINEERED PRECISION
            </span>
          </motion.div>

          {/* Headline — three staggered lines */}
          <div className="flex flex-col gap-0">
            {["PRECISION", "ENGINEERED", "BY MACHINE"].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="font-heading font-bold leading-none tracking-tight"
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 700,
                    fontSize: "clamp(52px, 7vw, 96px)",
                    color: i === 2 ? "transparent" : "#ffffff",
                    WebkitTextStroke: i === 2 ? "1px rgba(255,255,255,0.5)" : undefined,
                    lineHeight: 1.0,
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-heading text-sm leading-7 max-w-md"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.05em",
            }}
          >
            Each hub designed by artificial intelligence. Each component forged for the performance vehicle.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              className="font-heading text-xs tracking-widest px-8 py-4"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                border: "1px solid rgba(0,180,255,0.4)",
                background: "rgba(0,180,255,0.05)",
                color: "#ffffff",
                cursor: "pointer",
                letterSpacing: "0.2em",
              }}
              whileHover={{
                boxShadow: "0 0 24px rgba(0,180,255,0.25), 0 0 48px rgba(0,180,255,0.1)",
                borderColor: "rgba(0,180,255,0.8)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              CONFIGURE YOURS
            </motion.button>

            <motion.button
              className="font-heading text-xs tracking-widest px-8 py-4"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                letterSpacing: "0.2em",
              }}
              whileHover={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.97 }}
            >
              VIEW PROCESS
            </motion.button>
          </motion.div>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            {techTags.map((tag) => (
              <span
                key={tag}
                className="font-heading text-xs px-3 py-1"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.15em",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — wheel with orbital effects */}
        <motion.div
          style={{ y: wheelY }}
          className="relative flex items-center justify-center"
        >
          {/* Orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {orbitalRings.map((ring, i) => (
              <motion.div
                key={i}
                animate={{ rotate: ring.reverse ? -360 : 360 }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  width: ring.size,
                  height: ring.size,
                  borderRadius: "50%",
                  border: `1px solid rgba(0,180,255,${ring.opacity})`,
                  flexShrink: 0,
                }}
              />
            ))}

            {/* Scan beam */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 520,
                height: 520,
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, transparent 0deg 340deg, rgba(0,180,255,0.15) 340deg 360deg)",
                flexShrink: 0,
              }}
            />

            {/* Corner tick marks on orbital ring */}
            {[0, 90, 180, 270].map((angle) => (
              <motion.div
                key={angle}
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,180,255,0.5)",
                  transform: `rotate(${angle}deg) translateX(280px)`,
                }}
              />
            ))}
          </div>

          {/* Wheel Hub */}
          <div className="relative z-10">
            <WheelHub size={480} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span
          className="font-heading text-xs tracking-widest"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.3em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(0,180,255,0.6), transparent)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
}
