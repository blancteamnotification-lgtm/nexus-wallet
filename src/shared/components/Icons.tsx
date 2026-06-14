import Image from "next/image";

type ChainIconProps = {
  src: string;
  size?: number;
  alt?: string;
};

export function ChainIcon({ src, size = 40, alt = "" }: ChainIconProps) {
  return (
    <Image
      alt={alt}
      className="rounded-full"
      height={size}
      src={src}
      width={size}
    />
  );
}

export function ChevronDownIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M4 6L8 10L12 6"
        stroke="rgba(255,255,255,0.7)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <rect
        height="12"
        rx="2"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        width="12"
        x="8"
        y="8"
      />
      <path
        d="M6 16H5C3.89543 16 3 15.1046 3 14V5C3 3.89543 3.89543 3 5 3H14C15.1046 3 16 3.89543 16 5V6"
        stroke="rgba(255,255,255,0.7)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function QrIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
      <rect
        height="6"
        stroke="#007aff"
        strokeWidth="1.5"
        width="6"
        x="2"
        y="2"
      />
      <rect
        height="6"
        stroke="#007aff"
        strokeWidth="1.5"
        width="6"
        x="12"
        y="2"
      />
      <rect
        height="6"
        stroke="#007aff"
        strokeWidth="1.5"
        width="6"
        x="2"
        y="12"
      />
      <path d="M14 12H16V14H14V12Z" fill="#007aff" />
      <path d="M12 16H16V18H12V16Z" fill="#007aff" />
      <path d="M16 16H18V18H16V16Z" fill="#007aff" />
    </svg>
  );
}

export function TrendUpIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M2 11L6 7L9 10L14 5"
        stroke="#2cb44e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 5H14V9"
        stroke="#2cb44e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function PersonAddIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
      <circle cx="8" cy="6" r="3" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
      <path
        d="M2 17C2 13.6863 4.68629 11 8 11C10.2 11 12.1 12.2 13.1 14"
        stroke="rgba(255,255,255,0.95)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M15 8V14M12 11H18"
        stroke="rgba(255,255,255,0.95)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StarburstDecoration() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[417px] overflow-hidden">
      <Image
        alt=""
        className="pointer-events-none absolute left-[-56%] top-[-23%] h-[201%] w-[219%] max-w-none"
        height={417}
        priority
        src="/images/starburst.png"
        unoptimized
        width={375}
      />
    </div>
  );
}
