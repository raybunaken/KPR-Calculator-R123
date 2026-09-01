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
  const badgeBg = isWhite
    ? "bg-[#FF5A00] text-white"
    : "bg-[#FF5A00] text-white shadow-2xs";

  // Heights based on size
  const logoHeight =
    size === "sm" ? "h-6 sm:h-7" : size === "lg" ? "h-10 sm:h-11" : "h-8 sm:h-9";

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

      {/* Mortgage & Tagline Badge */}
      <div className="flex flex-col border-l border-gray-200/80 pl-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded tracking-wider ${badgeBg}`}
          >
            MORTGAGE
          </span>
        </div>
        {withTagline && (
          <span
            className={`text-[9.5px] font-medium tracking-tight ${isWhite ? "text-blue-200" : "text-gray-500"} mt-0.5 whitespace-nowrap`}
          >
            by{" "}
            <strong className={isWhite ? "text-white" : "text-[#006EB9]"}>
              Mortgage Team
            </strong>
          </span>
        )}
      </div>
    </div>
  );
}
