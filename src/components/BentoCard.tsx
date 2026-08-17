import { ReactNode } from "react";

interface BentoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function BentoCard({
  icon,
  title,
  description,
  className = "",
}: BentoCardProps) {
  return (
    <div
      className={`glass-card glass-card-hover p-6 md:p-8 ${className}`}
    >
      <div className="w-12 h-12 border border-border flex items-center justify-center text-primary mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
