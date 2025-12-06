interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 36 }: LogoProps) => {
  const gradientId = `focusGradient-${size}`;
  const gradientInnerId = `focusGradientInner-${size}`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
          <stop offset="100%" stopColor="hsl(199, 100%, 60%)" />
        </linearGradient>
        <linearGradient id={gradientInnerId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(199, 100%, 60%)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      
      {/* Outer glow circle */}
      <circle cx="20" cy="20" r="18" fill={`url(#${gradientId})`} opacity="0.08" />
      
      {/* Concentric circles - focus rings */}
      <circle cx="20" cy="20" r="16" stroke={`url(#${gradientId})`} strokeWidth="1.5" opacity="0.3" />
      <circle cx="20" cy="20" r="12" stroke={`url(#${gradientId})`} strokeWidth="1.5" opacity="0.4" />
      <circle cx="20" cy="20" r="8" stroke={`url(#${gradientId})`} strokeWidth="1.5" opacity="0.5" />
      
      {/* Focus rays converging to center */}
      <g stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="20" y1="4" x2="20" y2="12" />
        <line x1="20" y1="28" x2="20" y2="36" />
        <line x1="4" y1="20" x2="12" y2="20" />
        <line x1="28" y1="20" x2="36" y2="20" />
        <line x1="8.34" y1="8.34" x2="13.17" y2="13.17" />
        <line x1="26.83" y1="26.83" x2="31.66" y2="31.66" />
        <line x1="31.66" y1="8.34" x2="26.83" y2="13.17" />
        <line x1="13.17" y1="26.83" x2="8.34" y2="31.66" />
      </g>
      
      {/* Center focus dot */}
      <circle cx="20" cy="20" r="4" fill={`url(#${gradientId})`} />
      <circle cx="20" cy="20" r="2" fill="white" opacity="0.9" />
    </svg>
  );
};

export default Logo;

