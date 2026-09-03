import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DiamondTitleProps {
  title: string;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3";
}

export default function DiamondTitle({
  title,
  href,
  className = "my-4",
  size = "md",
  as: Component = "h2",
}: DiamondTitleProps) {
  const sizeClasses =
    size === "xl"
      ? "text-2xl sm:text-4xl"
      : size === "lg"
      ? "text-2xl sm:text-3xl"
      : size === "sm"
      ? "text-lg sm:text-xl"
      : "text-xl sm:text-2xl";

  const content = (
    <div className={`flex items-center justify-center gap-2.5 text-center ${className}`}>
      <span className="text-[#fcaa94] text-lg sm:text-2xl select-none">◆</span>
      <Component
        className={`${sizeClasses} font-black text-[#694231] tracking-tight ${
          href ? "group-hover:text-[#c38a76]" : ""
        } transition-colors flex items-center gap-2`}
      >
        <span>{title}</span>
        {href && (
          <ArrowRight className="w-4 h-4 text-[#c38a76] group-hover:translate-x-1.5 transition-transform" />
        )}
      </Component>
      <span className="text-[#fcaa94] text-lg sm:text-2xl select-none">◆</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {content}
      </Link>
    );
  }

  return content;
}
