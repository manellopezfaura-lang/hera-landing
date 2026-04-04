import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const faqs = [
  { qKey: "faq.1.q" as TranslationKey, aKey: "faq.1.a" as TranslationKey },
  { qKey: "faq.2.q" as TranslationKey, aKey: "faq.2.a" as TranslationKey },
  { qKey: "faq.3.q" as TranslationKey, aKey: "faq.3.a" as TranslationKey },
  { qKey: "faq.4.q" as TranslationKey, aKey: "faq.4.a" as TranslationKey },
  { qKey: "faq.5.q" as TranslationKey, aKey: "faq.5.a" as TranslationKey },
  { qKey: "faq.6.q" as TranslationKey, aKey: "faq.6.a" as TranslationKey },
]

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useTranslation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease }}
      className="border-b border-border"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-foreground pr-4">{t(faq.qKey)}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {t(faq.aKey)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { t } = useTranslation()

  return (
    <section id="faq" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 bg-secondary/30 scroll-mt-16">
      <div className="mx-auto max-w-[700px]">
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
            {t("faq.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t("faq.headline")}{" "}
            <span className="font-display italic text-saas-accent">{t("faq.headlineAccent")}</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="rounded-2xl border border-border bg-background px-6">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.qKey}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
