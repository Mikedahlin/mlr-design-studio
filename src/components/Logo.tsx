export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-8 h-8 rounded-full bg-ink flex items-center justify-center text-background font-bold text-sm ${className}`}
    >
      M
    </div>
  );
}
