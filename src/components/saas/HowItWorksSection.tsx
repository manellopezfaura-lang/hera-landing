import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MessageSquare, Tag, Filter, Route, Bell } from "lucide-react"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const steps = [
  {
    icon: MessageSquare,
    titleKey: "howItWorks.capture.title" as TranslationKey,
    descriptionKey: "howItWorks.capture.description" as TranslationKey,
  },
  {
    icon: Tag,
    titleKey: "howItWorks.classify.title" as TranslationKey,
    descriptionKey: "howItWorks.classify.description" as TranslationKey,
  },
  {
    icon: Filter,
    titleKey: "howItWorks.qualify.title" as TranslationKey,
    descriptionKey: "howItWorks.qualify.description" as TranslationKey,
  },
  {
    icon: Route,
    titleKey: "howItWorks.route.title" as TranslationKey,
    descriptionKey: "howItWorks.route.description" as TranslationKey,
  },
  {
    icon: Bell,
    titleKey: "howItWorks.notify.title" as TranslationKey,
    descriptionKey: "howItWorks.notify.description" as TranslationKey,
  },
]

function AnimatedConnector({ index, inView }: { index: number; inView: boolean }) {
  const baseDelay = index * 0.4 + 0.3

  return (
    <div className="hidden lg:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-16px)]">
      <svg className="h-[2px] w-full overflow-visible" preserveAspectRatio="none">
        {/* Static dashed track */}
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        {/* Animated solid line drawing over */}
        <motion.line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="hsl(var(--saas-accent))"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: baseDelay, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}

function StepNode({
  step,
  index,
  total,
  sectionInView,
}: {
  step: (typeof steps)[number]
  index: number
  total: number
  sectionInView: boolean
}) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center relative w-[calc(33%-1.5rem)] sm:w-[calc(33%-1.5rem)] lg:w-[calc(20%-1rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.12, ease }}
        className="flex flex-col items-center text-center"
      >
        {/* Number + Icon */}
        <div className="relative mb-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            initial={{ scale: 0.8 }}
            animate={sectionInView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.4 + 0.3, ease }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <step.icon className="h-5 w-5 text-foreground" />
          </div>
          <motion.span
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-saas-accent text-[10px] font-semibold text-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={sectionInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.4 + 0.45, type: "spring", stiffness: 300, damping: 15 }}
          >
            {index + 1}
          </motion.span>
        </div>

        <h3 className="text-sm font-semibold text-foreground">{t(step.titleKey)}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground max-w-[160px]">
          {t(step.descriptionKey)}
        </p>
      </motion.div>

      {/* Animated connector line */}
      {index < total - 1 && (
        <AnimatedConnector index={index} inView={sectionInView} />
      )}
    </div>
  )
}

export function HowItWorksSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" })
  const stepsRef = useRef<HTMLDivElement>(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: "-50px" })
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20 scroll-mt-16 bg-dot-grid">
      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="badge-shimmer mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="text-saas-accent text-[10px]">✦</span>
            {t("howItWorks.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("howItWorks.headline")}{" "}
            <span className="font-display italic text-saas-accent">{t("howItWorks.headlineAccent")}</span>
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t("howItWorks.sub")}
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical grid on mobile */}
        <div ref={stepsRef} className="flex flex-wrap justify-center gap-8 lg:gap-4">
          {steps.map((step, i) => (
            <StepNode key={step.titleKey} step={step} index={i} total={steps.length} sectionInView={stepsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
