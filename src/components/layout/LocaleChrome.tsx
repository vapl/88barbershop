"use client";

import { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

type LocaleChromeProps = {
  children: ReactNode;
  navbar: ReactNode;
  footer: ReactNode;
  mobileAction: ReactNode;
};

const COMING_SOON_SEGMENT = "coming-soon";

export default function LocaleChrome({
  children,
  navbar,
  footer,
  mobileAction,
}: LocaleChromeProps) {
  const segment = useSelectedLayoutSegment();
  const isComingSoon = segment === COMING_SOON_SEGMENT;

  if (isComingSoon) {
    return <div className="h-[100dvh] w-full overflow-hidden bg-black">{children}</div>;
  }

  return (
    <div id="preloader">
      {navbar}
      {children}
      {mobileAction}
      {footer}
    </div>
  );
}
