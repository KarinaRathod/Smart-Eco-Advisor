import React from "react";

const EcoLogo = ({ size = 48, className = "" }) => {
  const strokeWidth = size / 22;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glowing 3D Orb Background */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-60 
        transition-all duration-500 group-hover:blur-2xl group-hover:opacity-80"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #7CFF8D, #00C15A, #006633)",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-500 group-hover:scale-110"
      >
        {/* ===== Gradients ===== */}
        <defs>
          <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9CFFCE" />
            <stop offset="100%" stopColor="#008C49" />
          </radialGradient>

          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6AFF8A" />
            <stop offset="100%" stopColor="#2FBF60" />
          </linearGradient>

          <linearGradient id="energyPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E4FF" />
            <stop offset="100%" stopColor="#2FAAFF" />
          </linearGradient>
        </defs>

        {/* ===== Rotating Earth Ring ===== */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#earthGlow)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ===== AI Energy Waves ===== */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="url(#energyPulse)"
          strokeWidth={strokeWidth * 0.6}
          strokeDasharray="4 10"
          opacity="0.8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="40"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ===== Animated Leaf (Soft Breathing) ===== */}
        <path
          d="M50 25 Q70 35 70 55 Q55 78 50 82 Q45 78 30 55 Q30 35 50 25 Z"
          fill="url(#leafGradient)"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M50 25 Q70 35 70 55 Q55 78 50 82 Q45 78 30 55 Q30 35 50 25 Z;
              M50 27 Q72 37 72 57 Q57 80 50 84 Q43 80 28 57 Q28 37 50 27 Z;
              M50 25 Q70 35 70 55 Q55 78 50 82 Q45 78 30 55 Q30 35 50 25 Z"
          />
        </path>

        {/* ===== Central AI Core (pulsing) ===== */}
        <circle cx="50" cy="50" r="6" fill="#FFFFFF">
          <animate
            attributeName="r"
            values="5;7;5"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default EcoLogo;
