export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="h-px w-full"
      style={{
        background: flip
          ? "linear-gradient(to left, transparent, hsl(var(--border)) 50%, transparent)"
          : "linear-gradient(to right, transparent, hsl(var(--border)) 50%, transparent)",
      }}
    />
  )
}
