export default function Loading() {
  // This is a lightweight, instant server fallback
  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  );
}
