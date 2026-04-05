# Hera — SaaS Landing Page

Landing page para **Hera**, plataforma de automatización inteligente con agentes IA.

## URLs

- **Producción**: https://saas-landing-eight-theta.vercel.app
- **GitHub**: https://github.com/manellopezfaura-lang/hera-landing.git
- **Vercel project**: saas-landing (scope: manellopezfauras-projects)

## Stack

- React 19 + TypeScript 5.9 + Vite 8
- Tailwind CSS 4.2 + tailwindcss-animate
- Framer Motion 12 (animaciones scroll-triggered, pathLength, counters)
- Lucide React (iconos)
- pnpm

## Scripts

```
pnpm dev       → servidor de desarrollo
pnpm build     → tsc -b && vite build
```

## i18n

- Sistema custom con React Context (`src/i18n/LanguageContext.tsx`)
- Traducciones en `src/i18n/translations.ts` (~430 líneas)
- Idiomas: **ES** (default) y **EN**
- Tipo `TranslationKey` para type-safety

## Secciones (orden en SaasLanding.tsx)

1. SaasNavbar
2. SaasHero (video de fondo + DashboardPreview animado)
3. ServicesSection (4 servicios: Chatbots, Agentes, Dashboards, Workflows)
4. TrustBar (logos de partners)
5. HowItWorksSection (5 pasos con conectores animados)
6. AnimatedShowcase (tabs con video overlay)
7. TechStackSection
8. TestimonialsSection
9. FAQSection
10. CTASection (formulario de contacto)
11. Footer
12. HeraChatWidget (iframe embed)

## Integraciones externas

- **Chatbot embed**: `https://www.107studio.es/embed/hera?inline` — iframe en HeraChatWidget.tsx
- **Video CDN**: CloudFront `d8j0ntlcm91z4.cloudfront.net`
- **Fuentes**: Google Fonts (Instrument Serif, Inter)

## Componentes clave

- **DashboardPreview.tsx** (~500 líneas) — Dashboard animado con counters, chart SVG, tabs auto-cycling, notificaciones toast, chat bubbles, lead scores
- **AnimatedShowcase.tsx** — Tabs con video de fondo, cards overlay animadas
- **HowItWorksSection.tsx** — 5 pasos con líneas SVG animadas (pathLength) entre nodos
- **HeraChatWidget.tsx** — Fullscreen en móvil, popover en desktop, botón X para cerrar

## Colores

- `--saas-accent` → HSL custom property (azul/violeta del brand)
- Verde para indicadores de estado (`bg-green-500`)
- No usar blue-500 default de Tailwind

## Deploy

```
npx vercel --yes --prod --scope manellopezfauras-projects
```
