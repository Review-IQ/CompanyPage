import { motion } from 'framer-motion';

interface RepXLogoProps {
  className?: string;
  animated?: boolean;
  showText?: boolean;
}

export function RepXLogo({ className = "w-12 h-12", animated = false, showText = true }: RepXLogoProps) {
  const LogoContent = animated ? motion.svg : 'svg';

  return (
    <div className="flex items-center gap-3">
      <LogoContent
        className={className}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...(animated ? {
          initial: { rotate: 0 },
          animate: { rotate: 360 },
          transition: { duration: 20, repeat: Infinity, ease: "linear" }
        } : {})}
      >
        <defs>
          <linearGradient id="repxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>

          <linearGradient id="repxGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer hexagon with gradient stroke */}
        <path
          d="M60 10 L100 32.5 L100 77.5 L60 100 L20 77.5 L20 32.5 Z"
          stroke="url(#repxGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />

        {/* Inner hexagon filled */}
        <path
          d="M60 20 L90 37.5 L90 72.5 L60 90 L30 72.5 L30 37.5 Z"
          fill="url(#repxGradient)"
          opacity="0.15"
        />

        {/* Modern "R" letter */}
        <g filter="url(#glow)">
          <path
            d="M40 42 L40 72 M40 42 L52 42 C56 42 58 44 58 48 C58 52 56 54 52 54 L40 54 M52 54 L60 72"
            stroke="url(#repxGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Modern "X" letter */}
        <g filter="url(#glow)">
          <path
            d="M65 42 L80 72 M80 42 L65 72"
            stroke="url(#repxGradient2)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Accent dots */}
        <circle cx="60" cy="10" r="3" fill="url(#repxGradient)" opacity="0.8" />
        <circle cx="100" cy="32.5" r="2.5" fill="url(#repxGradient2)" opacity="0.6" />
        <circle cx="100" cy="77.5" r="2.5" fill="url(#repxGradient)" opacity="0.6" />
      </LogoContent>

      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-400 dark:to-blue-400">
          RepX
        </span>
      )}
    </div>
  );
}

// Compact version for small spaces
export function RepXLogoCompact({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="compactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>

      {/* Simplified hexagon */}
      <path
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        fill="url(#compactGradient)"
      />

      {/* White RX */}
      <text
        x="50"
        y="65"
        fontSize="40"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
      >
        RX
      </text>
    </svg>
  );
}

// Icon only version for favicons
export function RepXIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="50%" stopColor="#764ba2" />
          <stop offset="100%" stopColor="#f093fb" />
        </linearGradient>
      </defs>

      {/* Hexagon background */}
      <path
        d="M60 10 L100 32.5 L100 77.5 L60 100 L20 77.5 L20 32.5 Z"
        fill="url(#iconGradient)"
      />

      {/* White RX text */}
      <text
        x="35"
        y="75"
        fontSize="48"
        fontWeight="900"
        fill="white"
        fontFamily="Inter, system-ui, sans-serif"
      >
        RX
      </text>
    </svg>
  );
}
