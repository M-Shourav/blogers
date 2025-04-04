import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function Container({ className, children }: Props) {
  return (
    <div className={cn("max-w-screen-lg mx-auto px-4 md:px-8", className)}>
      {children}
    </div>
  );
}
