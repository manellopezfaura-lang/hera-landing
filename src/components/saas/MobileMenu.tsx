import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useTranslation } from "../../i18n/LanguageContext"

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language, setLanguage, t } = useTranslation()

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.integrations"), href: "#integrations" },
    { label: t("nav.faq"), href: "#faq" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              ✦ Hera
            </span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1 px-6 pt-4">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="py-3 text-lg font-medium text-foreground border-b border-border"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center gap-4 pt-6"
            >
              <a href="#contact" onClick={onClose} className="inline-flex flex-1 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 py-3.5 text-sm font-medium transition-colors">
                {t("nav.cta")}
              </a>
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                aria-label="Toggle language"
              >
                {language === "es" ? "EN" : "ES"}
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
