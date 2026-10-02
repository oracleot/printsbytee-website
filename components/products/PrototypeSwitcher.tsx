"use client";
// Throwaway design comparison; remove after a design is selected.
import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function PrototypeSwitcher({ names }: { names: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = Math.max(0, ["A", "B", "C"].indexOf(params.get("variant") ?? "A"));
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    function key(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable]")) return;
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const next = new URLSearchParams(params.toString());
      next.set("variant", ["A", "B", "C"][(current + (event.key === "ArrowRight" ? 1 : 2)) % 3]);
      router.replace(`${pathname}?${next}`, { scroll: false });
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [current, params, pathname, router]);
  if (process.env.NODE_ENV === "production") return null;
  function cycle(direction: number) {
    const next = new URLSearchParams(params.toString());
    next.set("variant", ["A", "B", "C"][(current + direction + 3) % 3]);
    router.replace(`${pathname}?${next}`, { scroll: false });
  }
  return <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full bg-black text-white shadow-xl px-4 py-3 text-xs w-max max-w-[95vw]">
    <button aria-label="Previous design" onClick={() => cycle(-1)} className="p-2">←</button>
    <span className="truncate">PROTOTYPE · {["A", "B", "C"][current]} — {names[current]}</span>
    <button aria-label="Next design" onClick={() => cycle(1)} className="p-2">→</button>
  </div>;
}
