import { useTranslation } from "../../i18n/LanguageContext"

export function Footer() {
  const { t } = useTranslation()

  const links = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.integrations"), href: "#integrations" },
    { label: t("nav.faq"), href: "#faq" },
    { label: t("nav.cta"), href: "#contact" },
  ]

  return (
    <footer className="border-t border-border px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-lg">✦</span>
            <span className="text-base font-semibold tracking-tight">Hera</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-6 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
