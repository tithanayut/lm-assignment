import { type ReactNode } from "react";

import { cn } from "@/common/utils/cn";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer(props: PageContainerProps) {
  const { children, className } = props;

  return <div className={cn("w-[90%] lg:w-[70%] max-w-[1140px] mx-auto", className)}>{children}</div>;
}
