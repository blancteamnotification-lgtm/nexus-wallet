import type { ReactNode } from "react";

type ScreenLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function ScreenLayout({ children, className = "" }: ScreenLayoutProps) {
  return (
    <div
      className={`nx-layout relative mx-auto flex min-h-dvh w-full max-w-[375px] flex-col overflow-hidden bg-[#08040d] ${className}`}
    >
      <div className="nx-layout-body flex min-h-0 flex-1 flex-col">{children}</div>
      <HomeIndicator />
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="nx-home-indicator pointer-events-none flex h-[34px] w-full shrink-0 items-end justify-center pb-2">
      <div className="nx-home-indicator-bar h-[5px] w-[139px] rounded-full bg-white/90" />
    </div>
  );
}
