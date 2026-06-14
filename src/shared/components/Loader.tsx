"use client";

export function Loader() {
  return (
    <div className="relative flex size-[120px] items-center justify-center">
      <svg
        className="loader-spin absolute inset-0"
        fill="none"
        height="120"
        viewBox="0 0 120 120"
        width="120"
      >
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="rgba(255,255,255,0.9)"
          strokeDasharray="82 245"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
    </div>
  );
}
