import { ReactNode } from "react";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  icon?: ReactNode;
}

export default function PricingCard({
  name,
  price,
  period = "",
  description,
  features,
  cta,
  highlighted = false,
  icon,
}: PricingCardProps) {
  return (
    <div
      className={`glass-card p-6 md:p-8 flex flex-col ${
        highlighted ? "border-primary" : ""
      }`}
    >
      {highlighted && (
        <div className="mono-label text-xs text-primary mb-4">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="w-10 h-10 border border-border flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-text">{name}</h3>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl md:text-4xl font-bold text-text">
          {price}
        </span>
        {period && (
          <span className="text-sm text-text-muted">{period}</span>
        )}
      </div>
      <p className="text-sm text-text-secondary mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className="w-5 h-5 text-primary shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 ${highlighted ? "btn-primary" : "btn-secondary"}`}
      >
        {cta}
      </button>
    </div>
  );
}
