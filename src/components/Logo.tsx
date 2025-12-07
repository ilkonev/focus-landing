import {id} from "zod/v4/locales";

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 36 }: LogoProps) => {
  const gradientId = `focusGradient-${size}`;
  const gradientInnerId = `focusGradientInner-${size}`;
  
  return (
    <div>
      <img src="public/favicon.png" height={size} width={size} />
    </div>
  );
};

export default Logo;

