// An abstract patchwork motif representing every print in the collection.
export function EverythingIcon() {
  return (
    <span className="flex h-full items-center justify-center bg-cream">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="size-14 transition-transform group-hover:scale-105">
        <rect x="10" y="10" width="20" height="20" rx="4" fill="currentColor" className="text-emerald" />
        <circle cx="44" cy="20" r="10" fill="currentColor" className="text-gold" />
        <path d="M10 44 20 34 30 44 20 54Z" fill="currentColor" className="text-gold" />
        <path d="M34 34h20v20H34z" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald" />
        <path d="m38 50 12-12M38 42l4-4m4 12 4-4" stroke="currentColor" strokeWidth="2" className="text-emerald" />
      </svg>
    </span>
  );
}
