import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
}

export default function LucideIcon({ name, className }: LucideIconProps) {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    const Fallback = Icons.HelpCircle;
    return <Fallback className={className} />;
  }

  return <IconComponent className={className} />;
}