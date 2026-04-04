import { LanguageProvider } from "../../i18n/LanguageContext"
import { SaasNavbar } from "./SaasNavbar"
import { SaasHero } from "./SaasHero"
import { TrustBar } from "./TrustBar"
import { ServicesSection } from "./ServicesSection"
import { HowItWorksSection } from "./HowItWorksSection"
import { TechStackSection } from "./TechStackSection"
import { TestimonialsSection } from "./TestimonialsSection"

import { FAQSection } from "./FAQSection"
import { CTASection } from "./CTASection"
import { Footer } from "./Footer"
import { ScrollToTop } from "./ScrollToTop"

export function SaasLanding() {
  return (
    <LanguageProvider>
    <div className="bg-background noise-overlay">
      <SaasNavbar />

      {/* Hero viewport — fills exactly 100vh, dashboard clips at bottom */}
      <div className="h-screen flex flex-col overflow-hidden">
        <SaasHero />
      </div>

      {/* Below the fold */}
      <ServicesSection />
      <TrustBar />
      <HowItWorksSection />
      <TechStackSection />
      <TestimonialsSection />

      <FAQSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
    </LanguageProvider>
  )
}
