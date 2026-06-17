import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Clock, Shield } from "lucide-react"
import { useTranslation } from "../../i18n/LanguageContext"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const perkIcons = [Clock, Shield] as const
const perkKeys = ["contact.perk1", "contact.perk2"] as const

// Mismo endpoint que usa el sitio 107 → Resend → hola@107studio.es.
const CONTACT_ENDPOINT = "https://www.107studio.es/api/contact"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useTranslation()
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    // Honeypot: si viene relleno es un bot — fingimos éxito sin enviar.
    if (fd.get("website")) {
      setStatus("success")
      form.reset()
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: String(fd.get("Name") || ""),
          "E-mail": String(fd.get("E-mail") || ""),
          Company: String(fd.get("Company") || ""),
          Message: String(fd.get("Message") || ""),
          source: "hera-landing",
        }),
      })
      if (!res.ok) throw new Error("failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-12 md:px-12 md:py-16 lg:px-20 scroll-mt-16 bg-dot-grid">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease }}
        className="relative mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — Copy */}
          <div className="flex flex-col justify-center">
            <span className="badge-shimmer mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="text-saas-accent text-[10px]">✦</span>
              {t("contact.badge")}
            </span>

            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("contact.headline")}{" "}
              <span className="font-display italic text-saas-accent">{t("contact.headlineAccent")}</span>?
            </h2>

            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              {t("contact.sub")}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {perkKeys.map((key, i) => {
                const Icon = perkIcons[i]
                return (
                  <div key={key} className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-saas-accent/10">
                      <Icon className="h-4 w-4 text-saas-accent" />
                    </div>
                    <span className="text-sm text-foreground">{t(key)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right — Form */}
          <div className="card-glow-static rounded-2xl border border-saas-accent/15 bg-background p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Honeypot — oculto para humanos */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px]"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-foreground">
                    {t("contact.name")}
                  </label>
                  <input
                    id="name"
                    name="Name"
                    type="text"
                    required
                    minLength={2}
                    placeholder={t("contact.namePlaceholder")}
                    className="rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 focus:border-saas-accent focus:ring-1 focus:ring-saas-accent/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-medium text-foreground">
                    {t("contact.company")}
                  </label>
                  <input
                    id="company"
                    name="Company"
                    type="text"
                    placeholder={t("contact.companyPlaceholder")}
                    className="rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 focus:border-saas-accent focus:ring-1 focus:ring-saas-accent/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-foreground">
                  {t("contact.email")}
                </label>
                <input
                  id="email"
                  name="E-mail"
                  type="email"
                  required
                  placeholder={t("contact.emailPlaceholder")}
                  className="rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 focus:border-saas-accent focus:ring-1 focus:ring-saas-accent/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-medium text-foreground">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="Message"
                  rows={4}
                  required
                  minLength={5}
                  placeholder={t("contact.messagePlaceholder")}
                  className="resize-none rounded-lg border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 focus:border-saas-accent focus:ring-1 focus:ring-saas-accent/20"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-glow mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-saas-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? t("contact.sending") : t("contact.submit")}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-saas-accent" role="status">
                  {t("contact.success")}
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-500" role="alert">
                  {t("contact.error")}
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
