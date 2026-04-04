import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Ind.",
  "Wayne Ent.",
  "Hooli",
  "Pied Piper",
]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-6 md:py-8 overflow-hidden">
      {/* Marquee with fade masks */}
      <div className="relative">
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex animate-marquee whitespace-nowrap will-change-transform"
        >
          {/* Duplicate the set twice for seamless loop */}
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center gap-12 px-6 md:gap-16">
              {logos.map((name) => (
                <span
                  key={`${set}-${name}`}
                  className="text-base font-semibold tracking-tight text-muted-foreground/40 select-none md:text-lg"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
