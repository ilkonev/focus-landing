import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className, size = 36 }: LogoProps) => {
  return (
    <img
      src="favicon.png"
      alt="Focus"
      width={size}
      height={size}
      className={cn("object-contain shrink-0", className)}
    />
  );
};

export default Logo;

