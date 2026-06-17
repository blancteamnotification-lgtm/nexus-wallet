import type { ReactNode } from "react";

type ScreenLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function ScreenLayout({ children, className = "" }: ScreenLayoutProps) {
  return (
    <div
      className={`nx-layout relative mx-auto flex h-dvh max-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[#08040d] pt-[env(safe-area-inset-top)] ${className}`}
    >
      <div className="nx-layout-body flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
      <HomeIndicator />
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="nx-home-indicator pointer-events-none flex h-[max(34px,env(safe-area-inset-bottom))] w-full shrink-0 items-end justify-center pb-[max(8px,env(safe-area-inset-bottom))]">
      <div className="nx-home-indicator-bar pointer-events-none h-[5px] w-[min(139px,37vw)] rounded-full bg-white/90" />
    </div>
  );
}
