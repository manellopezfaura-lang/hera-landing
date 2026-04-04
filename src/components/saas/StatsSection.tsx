import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect } from "react"

const ease = [0.25, 0.46, 0.45, 0.94] as const

const stats = [
  { value: 10, suffix: "M+", label: "Messages processed" },
  { value: 500, suffix: "+", label: "Teams worldwide" },
  { value: 99.9, suffix: "%", label: "Uptime guaranteed" },
  { value: 30, suffix: "+", label: "Languages supported" },
]

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) =>
    value % 1 !== 0 ? v.toFixed(1) : Math.round(v).toString()
  )

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      })
      return controls.stop
    }
  }, [inView, motionValue, value])

  return (
    <span className="flex items-baseline gap-0.5">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  )
}

function StatCard({ stat, index, inView }: { stat: typeof stats[number]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
      </span>
      <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
    </motion.div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="px-6 py-14 md:px-12 md:py-20 lg:px-20 border-y border-border">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
