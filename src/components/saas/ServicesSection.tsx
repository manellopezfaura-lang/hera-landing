import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChatbotVisual, AgentFlowVisual, DashboardVisual, WorkflowVisual } from "./ServiceVisuals"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const services = [
  {
    tagKey: "services.chatbots.tag" as TranslationKey,
    headlineKey: "services.chatbots.headline" as TranslationKey,
    accentKey: "services.chatbots.accent" as TranslationKey,
    descriptionKey: "services.chatbots.description" as TranslationKey,
    visual: ChatbotVisual,
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    tagKey: "services.agents.tag" as TranslationKey,
    headlineKey: "services.agents.headline" as TranslationKey,
    accentKey: "services.agents.accent" as TranslationKey,
    descriptionKey: "services.agents.description" as TranslationKey,
    visual: AgentFlowVisual,
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    tagKey: "services.dashboards.tag" as TranslationKey,
    headlineKey: "services.dashboards.headline" as TranslationKey,
    accentKey: "services.dashboards.accent" as TranslationKey,
    descriptionKey: "services.dashboards.description" as TranslationKey,
    visual: DashboardVisual,
    className: "md:col-span-1 lg:col-span-3",
  },
  {
    tagKey: "services.workflows.tag" as TranslationKey,
    headlineKey: "services.workflows.headline" as TranslationKey,
    accentKey: "services.workflows.accent" as TranslationKey,
    descriptionKey: "services.workflows.description" as TranslationKey,
    visual: WorkflowVisual,
    className: "md:col-span-1 lg:col-span-1",
  },
]

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { t } = useTranslation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className={`card-glow-hover group relative rounded-2xl border border-border bg-background p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-saas-accent/40 ${service.className}`}
    >
      <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
        {t(service.tagKey)}
      </span>

      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {t(service.headlineKey)}{" "}
        <span className="font-display italic text-saas-accent">{t(service.accentKey)}</span>
      </h3>

      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {t(service.descriptionKey)}
      </p>

      <div className="mt-4 transition-transform duration-500 group-hover:scale-[1.02]">
        <service.visual />
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { t } = useTranslation()

  return (
    <section id="services" className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20 scroll-mt-16 bg-dot-grid">
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
            {t("services.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("services.headline")}{" "}
            <span className="font-display italic text-saas-accent">{t("services.headlineAccent")}</span>
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t("services.sub")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.tagKey} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
