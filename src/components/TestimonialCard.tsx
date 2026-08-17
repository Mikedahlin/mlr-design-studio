interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <div className="glass-card p-6 md:p-8">
      <svg
        className="w-8 h-8 text-primary/30 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-text-secondary leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="text-sm font-semibold text-text">{author}</p>
        <p className="text-xs text-text-muted">
          {role}, {company}
        </p>
      </div>
    </div>
  );
}
