/**
 * Subtle background decorations — gradient blobs and glow orbs.
 * Place inside a `relative overflow-hidden` section.
 */

export function GradientBlob({
  position = "top-right",
  color = "saas-accent",
  size = "lg",
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"
  color?: "saas-accent" | "purple" | "blue"
  size?: "sm" | "md" | "lg"
}) {
  const positionClasses: Record<string, string> = {
    "top-right": "-top-24 -right-24",
    "top-left": "-top-24 -left-24",
    "bottom-right": "-bottom-24 -right-24",
    "bottom-left": "-bottom-24 -left-24",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  const colorMap: Record<string, string> = {
    "saas-accent": "hsl(239 84% 67% / 0.18)",
    purple: "hsl(262 83% 58% / 0.14)",
    blue: "hsl(210 100% 60% / 0.14)",
  }

  const sizeMap: Record<string, string> = {
    sm: "h-48 w-48 md:h-64 md:w-64",
    md: "h-72 w-72 md:h-96 md:w-96",
    lg: "h-96 w-96 md:h-[500px] md:w-[500px]",
  }

  return (
    <div
      className={`pointer-events-none absolute ${positionClasses[position]} ${sizeMap[size]} rounded-full blur-[80px]`}
      style={{ background: `radial-gradient(circle, ${colorMap[color]}, transparent 70%)` }}
      aria-hidden="true"
    />
  )
}

export function GlowOrb({
  position = "center",
  size = "md",
}: {
  position?: "top-right" | "top-left" | "bottom-center" | "center"
  size?: "sm" | "md" | "lg"
}) {
  const positionClasses: Record<string, string> = {
    "top-right": "top-0 right-[10%]",
    "top-left": "top-0 left-[10%]",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  const sizeMap: Record<string, string> = {
    sm: "h-40 w-40",
    md: "h-64 w-64 md:h-80 md:w-80",
    lg: "h-80 w-80 md:h-[450px] md:w-[450px]",
  }

  return (
    <div
      className={`pointer-events-none absolute ${positionClasses[position]} ${sizeMap[size]} rounded-full blur-[80px]`}
      style={{ background: "hsl(239 84% 67% / 0.15)" }}
      aria-hidden="true"
    />
  )
}
