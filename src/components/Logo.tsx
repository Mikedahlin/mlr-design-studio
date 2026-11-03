export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-8 h-8 rounded-lg bg-[#03070e] border border-[#38bdf8]/60 flex items-center justify-center text-[#f8fafc] font-bold text-[11px] tracking-tighter ${className}`}
    >
      -60°
    </div>
  );
}
