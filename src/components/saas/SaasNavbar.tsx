import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

import { MobileMenu } from "./MobileMenu"
import { useTranslation } from "../../i18n/LanguageContext"

export function SaasNavbar() {
  const { language, setLanguage, t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 font-body transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="text-xl font-semibold tracking-tight text-foreground">
          ✦ Hera
        </a>

        <div className="hidden md:flex items-center gap-8">
          {([
            { label: t("nav.services"), href: "#services" },
            { label: t("nav.howItWorks"), href: "#how-it-works" },
            { label: t("nav.integrations"), href: "#integrations" },
            { label: t("nav.faq"), href: "#faq" },
          ] as const).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
            aria-label="Toggle language"
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 text-sm font-medium transition-colors">
            {t("nav.cta")}
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-border"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
