import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const testimonials = [
  {
    initials: "SM",
    name: "Sara M.",
    roleKey: "testimonials.1.role" as TranslationKey,
    quoteKey: "testimonials.1.quote" as TranslationKey,
  },
  {
    initials: "DK",
    name: "David K.",
    roleKey: "testimonials.2.role" as TranslationKey,
    quoteKey: "testimonials.2.quote" as TranslationKey,
  },
  {
    initials: "LP",
    name: "Laura P.",
    roleKey: "testimonials.3.role" as TranslationKey,
    quoteKey: "testimonials.3.quote" as TranslationKey,
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useTranslation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease }}
      className="card-glow-hover relative flex flex-col rounded-2xl border border-border bg-background p-6 transition-[border-color] duration-300 hover:border-saas-accent/30"
    >
      {/* Decorative quote */}
      <span className="absolute top-4 right-5 text-5xl font-display leading-none text-saas-accent/10 select-none">
        &ldquo;
      </span>

      <p className="relative text-sm leading-relaxed text-foreground">
        &ldquo;{t(testimonial.quoteKey)}&rdquo;
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-saas-accent/10 text-xs font-semibold text-saas-accent">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{t(testimonial.roleKey)}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20 bg-dot-grid">
      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="badge-shimmer mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="text-saas-accent text-[10px]">✦</span>
            {t("testimonials.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("testimonials.headline")}{" "}
            <span className="font-display italic text-saas-accent">{t("testimonials.headlineAccent")}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.initials} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
