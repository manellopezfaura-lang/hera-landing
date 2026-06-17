import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Headset, CalendarCheck, Bot } from "lucide-react"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const benefits = [
  {
    icon: Headset,
    titleKey: "benefits.1.title" as TranslationKey,
    descKey: "benefits.1.desc" as TranslationKey,
  },
  {
    icon: CalendarCheck,
    titleKey: "benefits.2.title" as TranslationKey,
    descKey: "benefits.2.desc" as TranslationKey,
  },
  {
    icon: Bot,
    titleKey: "benefits.3.title" as TranslationKey,
    descKey: "benefits.3.desc" as TranslationKey,
  },
]

function BenefitCard({ benefit, index }: { benefit: typeof benefits[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useTranslation()
  const Icon = benefit.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="card-glow-hover group relative rounded-2xl border border-border bg-background p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-saas-accent/40"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-saas-accent transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {t(benefit.titleKey)}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t(benefit.descKey)}
      </p>
    </motion.div>
  )
}

export function BenefitsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { t } = useTranslation()

  return (
    <section id="benefits" className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20 scroll-mt-16">
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
            {t("benefits.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("benefits.headline")}{" "}
            <span className="font-display italic text-saas-accent">{t("benefits.headlineAccent")}</span>
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t("benefits.sub")}
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.titleKey} benefit={benefit} index={i} />
          ))}
        </div>

        {/* CTA — matches the Google Ads promise */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium font-body text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("benefits.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
