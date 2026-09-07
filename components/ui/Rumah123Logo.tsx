import React from "react";

interface Rumah123LogoProps {
  className?: string;
  variant?: "full" | "compact" | "white" | "pdf" | "icon-only";
  withTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Rumah123Logo({
  className = "",
  variant = "full",
  withTagline = true,
  size = "md",
}: Rumah123LogoProps) {
  const isWhite = variant === "white";

  // Heights based on size
  const logoHeight =
    size === "sm" ? "h-6 sm:h-7" : size === "lg" ? "h-10 sm:h-11" : "h-8 sm:h-9";

  const textSize =
    size === "sm" ? "text-[11px]" : size === "lg" ? "text-sm" : "text-xs";

  const logoSrc = isWhite
    ? "/rumah123-official-white.png"
    : "/rumah123-official-cropped.png";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official Rumah123 Logo Image */}
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt="Rumah123.com"
          className={`${logoHeight} w-auto object-contain shrink-0`}
        />
      </div>

      {/* Clean by Mortgage Branding without orange badge */}
      {withTagline && (
        <div
          className={`flex items-center border-l pl-2.5 ${
            isWhite ? "border-white/30" : "border-slate-300"
          }`}
        >
          <span
            className={`${textSize} font-medium tracking-tight whitespace-nowrap ${
              isWhite ? "text-blue-100" : "text-slate-600"
            }`}
          >
            by{" "}
            <strong
              className={`font-black tracking-normal ${
                isWhite ? "text-white" : "text-[#00438F]"
              }`}
            >
              Mortgage
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
