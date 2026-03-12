"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["PROCESS", "PRICING", "ABOUT", "FAQ"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span
              className="font-heading font-bold text-xl tracking-widest text-white"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              AXIS
            </span>
            <motion.span
              animate={{
                boxShadow: [
                  "0 0 4px rgba(0,180,255,0.6), 0 0 8px rgba(0,180,255,0.3)",
                  "0 0 10px rgba(0,180,255,1), 0 0 20px rgba(0,180,255,0.6)",
                  "0 0 4px rgba(0,180,255,0.6), 0 0 8px rgba(0,180,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#00B4FF",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-heading text-xs tracking-widest transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <motion.button
              className="hidden md:flex items-center gap-2 font-heading text-xs tracking-widest px-5 py-2"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                border: "1px solid rgba(0,180,255,0.4)",
                color: "rgba(255,255,255,0.8)",
                background: "transparent",
                cursor: "pointer",
              }}
              whileHover={{
                boxShadow: "0 0 20px rgba(0,180,255,0.3), 0 0 40px rgba(0,180,255,0.1)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              CONFIGURE
              <span style={{ color: "#00B4FF" }}>→</span>
            </motion.button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "block", width: 22, height: 1, backgroundColor: "#ffffff" }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                style={{ display: "block", width: 22, height: 1, backgroundColor: "#ffffff" }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "block", width: 22, height: 1, backgroundColor: "#ffffff" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-heading text-sm tracking-widest"
                  style={{
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <button
                className="font-heading text-xs tracking-widest px-4 py-3 mt-1 w-full text-left"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  border: "1px solid rgba(0,180,255,0.4)",
                  color: "#ffffff",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                CONFIGURE →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
