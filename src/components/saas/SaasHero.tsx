import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Button } from "../ui/button"
import { DashboardPreview } from "./DashboardPreview"
import { useTranslation } from "../../i18n/LanguageContext"

const fadeUp = (delay: number, y = 16, duration = 0.6) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: "easeOut" as const },
})

export function SaasHero() {
  const { t } = useTranslation()
  return (
    <section className="relative flex-1 flex flex-col items-center justify-start overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
      />

      <div className="relative z-10 flex flex-col items-center w-full pt-14 md:pt-24">
        {/* Badge */}
        <motion.div {...fadeUp(0, 10, 0.5)} className="mb-5 md:mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground font-body">
            {t("hero.badge")}
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-500/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1, 16, 0.6)}
          className="text-center font-display text-[2.5rem] md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-foreground max-w-xl px-4"
        >
          {t("hero.headline")}{" "}
          <em className="italic">{t("hero.headlineAccent")}</em>{" "}
          {t("hero.headline2")}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2, 16, 0.6)}
          className="mt-4 md:mt-5 text-center text-sm md:text-base text-muted-foreground max-w-[520px] leading-relaxed font-body px-8"
        >
          {t("hero.sub")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.3, 16, 0.6)} className="mt-6 flex items-center gap-3">
          <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-medium font-body transition-colors">
            {t("nav.cta")}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border-0 bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80"
          >
            <Play className="h-4 w-4 fill-foreground" />
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          {...fadeUp(0.5, 30, 0.8)}
          className="mt-8 md:mt-10 w-full max-w-5xl flex justify-center px-4"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  )
}
