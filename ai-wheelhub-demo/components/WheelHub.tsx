"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

interface WheelHubProps {
  size?: number;
  className?: string;
}

export default function WheelHub({ size = 500, className = "" }: WheelHubProps) {
  const rotateRef = useRef<SVGSVGElement>(null);
  const mouseX = useMotionValue(0);
  const smoothRotate = useSpring(mouseX, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rotateRef.current) return;
      const rect = rotateRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dx = e.clientX - centerX;
      const normalized = dx / window.innerWidth;
      mouseX.set(normalized * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.47;
  const innerR = size * 0.38;
  const hubR = size * 0.1;
  const boltR = size * 0.06;

  // Generate 5 double-spoke paths
  const spokes = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const angleL = (i * 72 - 90 - 7) * (Math.PI / 180);
    const angleR = (i * 72 - 90 + 7) * (Math.PI / 180);
    const angleLC = (i * 72 - 90 - 4) * (Math.PI / 180);
    const angleRC = (i * 72 - 90 + 4) * (Math.PI / 180);

    const outerL = {
      x: cx + outerR * Math.cos(angleL),
      y: cy + outerR * Math.sin(angleL),
    };
    const outerR2 = {
      x: cx + outerR * Math.cos(angleR),
      y: cy + outerR * Math.sin(angleR),
    };
    const innerL = {
      x: cx + hubR * 1.3 * Math.cos(angleL),
      y: cy + hubR * 1.3 * Math.sin(angleL),
    };
    const innerR2 = {
      x: cx + hubR * 1.3 * Math.cos(angleR),
      y: cy + hubR * 1.3 * Math.sin(angleR),
    };

    // Mid control points for the spoke curve
    const midR = (outerR + hubR * 1.3) / 2;
    const ctrlL = {
      x: cx + midR * 1.05 * Math.cos(angleLC),
      y: cy + midR * 1.05 * Math.sin(angleLC),
    };
    const ctrlR2 = {
      x: cx + midR * 1.05 * Math.cos(angleRC),
      y: cy + midR * 1.05 * Math.sin(angleRC),
    };

    // Gold edge highlight line
    const edgeAngle = (i * 72 - 90 - 8.5) * (Math.PI / 180);
    const edgeOuter = {
      x: cx + (outerR - size * 0.02) * Math.cos(edgeAngle),
      y: cy + (outerR - size * 0.02) * Math.sin(edgeAngle),
    };
    const edgeInner = {
      x: cx + hubR * 1.5 * Math.cos(edgeAngle),
      y: cy + hubR * 1.5 * Math.sin(edgeAngle),
    };

    const midAngle = angle;
    const shadowOuter = {
      x: cx + (outerR - size * 0.01) * Math.cos((i * 72 - 90 + 8) * (Math.PI / 180)),
      y: cy + (outerR - size * 0.01) * Math.sin((i * 72 - 90 + 8) * (Math.PI / 180)),
    };
    const shadowInner = {
      x: cx + hubR * 1.5 * Math.cos((i * 72 - 90 + 8) * (Math.PI / 180)),
      y: cy + hubR * 1.5 * Math.sin((i * 72 - 90 + 8) * (Math.PI / 180)),
    };

    return {
      id: i,
      path: `M ${innerL.x} ${innerL.y} Q ${ctrlL.x} ${ctrlL.y} ${outerL.x} ${outerL.y} L ${outerR2.x} ${outerR2.y} Q ${ctrlR2.x} ${ctrlR2.y} ${innerR2.x} ${innerR2.y} Z`,
      edge: `M ${edgeOuter.x} ${edgeOuter.y} L ${edgeInner.x} ${edgeInner.y}`,
      shadow: `M ${shadowOuter.x} ${shadowOuter.y} L ${shadowInner.x} ${shadowInner.y}`,
      angle: i * 72,
    };
  });

  // Bolt hole positions
  const bolts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return {
      x: cx + boltR * Math.cos(angle),
      y: cy + boltR * Math.sin(angle),
    };
  });

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={{
        filter: [
          "drop-shadow(0 0 16px rgba(212, 175, 55, 0.35))",
          "drop-shadow(0 0 40px rgba(212, 175, 55, 0.7))",
          "drop-shadow(0 0 16px rgba(212, 175, 55, 0.35))",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg
        ref={rotateRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ rotate: smoothRotate }}
      >
        <defs>
          {/* Outer ring gradient */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5E5E5" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#888" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E5E5E5" stopOpacity="0.7" />
          </linearGradient>

          {/* Spoke fill gradient */}
          <radialGradient id="spokeGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="40%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>

          {/* Hub gradient */}
          <radialGradient id="hubGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="40%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Rim depth gradient */}
          <radialGradient id="rimDepth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#252525" stopOpacity="0" />
            <stop offset="85%" stopColor="#111" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </radialGradient>

          {/* Inner rim gradient */}
          <linearGradient id="innerRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#555" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#333" stopOpacity="0.5" />
          </linearGradient>

          {/* Gold highlight gradient */}
          <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B8960C" stopOpacity="0.3" />
          </linearGradient>

          {/* Spoke 3D sheen */}
          <linearGradient id="spokeSheenA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#222" stopOpacity="0" />
          </linearGradient>

          {/* Center cap gradient */}
          <radialGradient id="capGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#404040" />
            <stop offset="60%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer tire bead area */}
        <circle cx={cx} cy={cy} r={outerR + size * 0.025} fill="none" stroke="#1a1a1a" strokeWidth={size * 0.02} />
        <circle cx={cx} cy={cy} r={outerR + size * 0.015} fill="none" stroke="#111" strokeWidth={size * 0.008} />

        {/* Outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r={outerR}
          fill="#111"
          stroke="url(#ringGrad)"
          strokeWidth={size * 0.018}
        />

        {/* Rim depth shadow */}
        <circle cx={cx} cy={cy} r={outerR} fill="url(#rimDepth)" />

        {/* Inner ring */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke="url(#innerRimGrad)"
          strokeWidth={size * 0.006}
        />

        {/* Spokes */}
        {spokes.map((spoke) => (
          <g key={spoke.id}>
            {/* Main spoke body */}
            <path
              d={spoke.path}
              fill="url(#spokeGrad)"
              stroke="#2a2a2a"
              strokeWidth="0.5"
            />
            {/* Sheen overlay */}
            <path
              d={spoke.path}
              fill="url(#spokeSheenA)"
            />
            {/* Gold edge highlight */}
            <line
              x1={spoke.edge.split(" ")[1]}
              y1={spoke.edge.split(" ")[2]}
              x2={spoke.edge.split(" ")[4]}
              y2={spoke.edge.split(" ")[5]}
              stroke="url(#goldHighlight)"
              strokeWidth={size * 0.004}
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Shadow edge */}
            <line
              x1={spoke.shadow.split(" ")[1]}
              y1={spoke.shadow.split(" ")[2]}
              x2={spoke.shadow.split(" ")[4]}
              y2={spoke.shadow.split(" ")[5]}
              stroke="#000"
              strokeWidth={size * 0.005}
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        ))}

        {/* Hub base */}
        <circle cx={cx} cy={cy} r={hubR * 1.6} fill="#0d0d0d" />
        <circle
          cx={cx}
          cy={cy}
          r={hubR * 1.6}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={size * 0.003}
          opacity="0.4"
        />

        {/* Hub body */}
        <circle cx={cx} cy={cy} r={hubR * 1.35} fill="url(#hubGrad)" />

        {/* Hub inner ring */}
        <circle
          cx={cx}
          cy={cy}
          r={hubR * 1.2}
          fill="none"
          stroke="#333"
          strokeWidth={size * 0.004}
        />

        {/* Bolt holes */}
        {bolts.map((bolt, i) => (
          <g key={i}>
            <circle cx={bolt.x} cy={bolt.y} r={size * 0.018} fill="#050505" />
            <circle
              cx={bolt.x}
              cy={bolt.y}
              r={size * 0.018}
              fill="none"
              stroke="#444"
              strokeWidth={size * 0.003}
            />
            <circle
              cx={bolt.x - size * 0.004}
              cy={bolt.y - size * 0.004}
              r={size * 0.006}
              fill="#2a2a2a"
            />
          </g>
        ))}

        {/* Center cap */}
        <circle cx={cx} cy={cy} r={size * 0.045} fill="url(#capGrad)" />
        <circle
          cx={cx}
          cy={cy}
          r={size * 0.045}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={size * 0.004}
          opacity="0.6"
          filter="url(#glowFilter)"
        />
        {/* Center specular highlight */}
        <ellipse
          cx={cx - size * 0.01}
          cy={cy - size * 0.012}
          rx={size * 0.015}
          ry={size * 0.01}
          fill="white"
          opacity="0.12"
        />

        {/* Outer ring highlight arc */}
        <path
          d={`M ${cx - outerR * 0.7} ${cy - outerR * 0.7} A ${outerR} ${outerR} 0 0 1 ${cx + outerR * 0.5} ${cy - outerR * 0.85}`}
          fill="none"
          stroke="white"
          strokeWidth={size * 0.005}
          strokeLinecap="round"
          opacity="0.06"
        />

        {/* Rotating animation overlay */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        >
          {/* Subtle outer ring dots */}
          {Array.from({ length: 20 }, (_, i) => {
            const a = (i * 18) * (Math.PI / 180);
            const r = outerR + size * 0.01;
            return (
              <circle
                key={i}
                cx={cx + r * Math.cos(a)}
                cy={cy + r * Math.sin(a)}
                r={i % 5 === 0 ? size * 0.006 : size * 0.003}
                fill={i % 5 === 0 ? "#D4AF37" : "#333"}
                opacity={i % 5 === 0 ? 0.7 : 0.3}
              />
            );
          })}
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
