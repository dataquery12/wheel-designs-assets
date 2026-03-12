"use client";

const footerLinks = [
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer
      style={{ background: "#000000" }}
      className="relative px-6"
    >
      {/* Top luminous beam divider */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.4), transparent)",
        }}
      />

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex flex-col gap-1">
          <span
            className="font-heading font-bold"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.2em",
              color: "#ffffff",
            }}
          >
            AXIS
          </span>
          <span
            className="font-heading text-sm"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
            }}
          >
            AI-Crafted Wheel Hubs
          </span>
          <span
            className="font-heading text-xs"
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.08em",
            }}
          >
            San Diego, CA
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-6">
          {footerLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-heading text-xs tracking-widest transition-colors duration-200"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.2em",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)";
              }}
            >
              {label.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <div
        className="max-w-6xl mx-auto pb-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p
          className="font-heading text-xs pt-4"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
          }}
        >
          © 2025 AXIS. Designed by Machine. Crafted by Precision.
        </p>
      </div>
    </footer>
  );
}
