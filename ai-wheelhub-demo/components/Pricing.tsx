"use client";

import { motion } from "framer-motion";

const features = [
  "AI-generated unique design",
  "Aerospace-grade 6061-T6 alloy",
  "CNC precision-machined",
  "Lifetime structural warranty",
];

const decorativeRings = [
  { size: 340, opacity: 0.05, duration: 0 },
  { size: 460, opacity: 0.04, duration: 40 },
  { size: 580, opacity: 0.03, duration: 0 },
  { size: 700, opacity: 0.025, duration: 0 },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,180,255,0.04) 0%, transparent 60%), #000000",
        }}
      />

      {/* Cyber grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative orbital rings behind the card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {decorativeRings.map((ring, i) => (
          ring.duration > 0 ? (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
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
          ) : (
            <div
              key={i}
              style={{
                position: "absolute",
                width: ring.size,
                height: ring.size,
                borderRadius: "50%",
                border: `1px solid rgba(0,180,255,${ring.opacity})`,
                flexShrink: 0,
              }}
            />
          )
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
              INVESTMENT
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
            className="font-heading font-bold tracking-tight text-white"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            CONFIGURED FOR ONE.
          </h2>
        </motion.div>

        {/* Main pricing card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-lg"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,180,255,0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "2.5rem",
            }}
          >
            {/* Starting at */}
            <p
              className="font-heading text-xs tracking-widest mb-2"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 500,
                color: "#00B4FF",
                letterSpacing: "0.3em",
                opacity: 0.8,
              }}
            >
              STARTING AT
            </p>

            {/* Price */}
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,180,255,0.1)",
                  "0 0 40px rgba(0,180,255,0.25)",
                  "0 0 20px rgba(0,180,255,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-display text-white"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(4rem, 10vw, 6rem)",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              $9,800
            </motion.div>

            {/* Per set */}
            <p
              className="font-heading text-sm tracking-wide mb-6"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              per set of four
            </p>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.3), transparent)",
                marginBottom: "1.5rem",
              }}
            />

            {/* Features */}
            <div className="flex flex-col gap-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#00B4FF",
                      flexShrink: 0,
                      opacity: 0.8,
                    }}
                  />
                  <span
                    className="font-heading text-sm"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.65)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <motion.button
                className="w-full font-heading text-xs tracking-widest py-4"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  border: "1px solid rgba(0,180,255,0.4)",
                  background: "rgba(0,180,255,0.06)",
                  color: "#ffffff",
                  cursor: "pointer",
                  letterSpacing: "0.2em",
                }}
                whileHover={{
                  boxShadow: "0 0 24px rgba(0,180,255,0.25), 0 0 48px rgba(0,180,255,0.1)",
                  borderColor: "rgba(0,180,255,0.8)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                CONFIGURE YOURS
              </motion.button>

              <motion.button
                className="w-full font-heading text-xs tracking-widest py-4"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  letterSpacing: "0.2em",
                }}
                whileHover={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.8)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                REQUEST CONSULTATION
              </motion.button>
            </div>

            {/* Fine print */}
            <p
              className="font-heading text-xs text-center"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              Each set is unique. No two designs are alike.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
