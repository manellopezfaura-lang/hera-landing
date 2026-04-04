import { motion, useInView } from "framer-motion"
import { useRef, type ComponentType } from "react"
import { useTranslation } from "../../i18n/LanguageContext"
import {
  OpenAILogo,
  WhatsAppLogo,
  SlackLogo,
  SalesforceLogo,
  HubSpotLogo,
  ZapierLogo,
  GoogleSheetsLogo,
  StripeLogo,
  TwilioLogo,
  CustomAPILogo,
} from "./BrandLogos"

const ease = [0.25, 0.46, 0.45, 0.94] as const

interface Integration {
  name: string
  Logo: ComponentType<{ className?: string }>
  brandColor: string
}

const integrations: Integration[] = [
  { name: "OpenAI", Logo: OpenAILogo, brandColor: "#10a37f" },
  { name: "WhatsApp", Logo: WhatsAppLogo, brandColor: "#25D366" },
  { name: "Slack", Logo: SlackLogo, brandColor: "#4A154B" },
  { name: "Salesforce", Logo: SalesforceLogo, brandColor: "#00A1E0" },
  { name: "HubSpot", Logo: HubSpotLogo, brandColor: "#FF7A59" },
  { name: "Zapier", Logo: ZapierLogo, brandColor: "#FF4A00" },
  { name: "Sheets", Logo: GoogleSheetsLogo, brandColor: "#0F9D58" },
  { name: "Stripe", Logo: StripeLogo, brandColor: "#635BFF" },
  { name: "Twilio", Logo: TwilioLogo, brandColor: "#F22F46" },
  { name: "Custom API", Logo: CustomAPILogo, brandColor: "hsl(239 84% 67%)" },
]

function IntegrationCard({ item, index }: { item: Integration; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease }}
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:[border-color:color-mix(in_srgb,var(--brand)_40%,transparent)]"
      style={{ "--brand": item.brandColor } as React.CSSProperties}
    >
      <div
        className="flex h-10 w-10 items-center justify-center text-muted-foreground/50 transition-colors duration-300 group-hover:[color:var(--brand)]"
      >
        <item.Logo className="h-7 w-7" />
      </div>
      <span className="text-[11px] font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {item.name}
      </span>
    </motion.div>
  )
}

export function TechStackSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { t } = useTranslation()

  return (
    <section id="integrations" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 bg-secondary/30 scroll-mt-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="badge-shimmer mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="text-saas-accent text-[10px]">✦</span>
            {t("techStack.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("techStack.headline")}{" "}
            <span className="font-display italic text-saas-accent">{t("techStack.headlineAccent")}</span>
          </h2>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {t("techStack.sub")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {integrations.map((item, i) => (
            <IntegrationCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
