import { motion } from "framer-motion"
import { Inbox, Tag, Zap, Bell, Database, GitBranch, RefreshCw } from "lucide-react"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

const ease = [0.25, 0.46, 0.45, 0.94] as const

/* ─── Chatbot Visual ─── */

const bubbles = [
  { align: "left" as const, key: "visual.chat1" as TranslationKey },
  { align: "right" as const, key: "visual.chat2" as TranslationKey },
  { align: "right" as const, key: "visual.chat3" as TranslationKey },
]

export function ChatbotVisual() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-2 pt-2">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease }}
          className={`flex ${b.align === "right" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[11px] leading-relaxed ${
              b.align === "left"
                ? "bg-secondary text-foreground rounded-bl-sm"
                : "bg-saas-accent/10 text-foreground rounded-br-sm"
            }`}
          >
            {t(b.key)}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.9 }}
        className="flex justify-end"
      >
        <div className="flex gap-1 rounded-2xl bg-saas-accent/10 px-3.5 py-2.5 rounded-br-sm">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-saas-accent/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-saas-accent/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-saas-accent/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Agent Flow Visual ─── */

const nodes = [
  { icon: Inbox, label: "Inbound" },
  { icon: Tag, label: "Classify" },
  { icon: Zap, label: "Execute" },
]

export function AgentFlowVisual() {
  return (
    <div className="flex items-center gap-1 pt-4">
      {nodes.map((node, i) => (
        <div key={node.label} className="contents">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.15, ease }}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background">
              <node.icon className="h-3.5 w-3.5 text-foreground" />
            </div>
            <span className="text-[9px] text-muted-foreground font-medium">{node.label}</span>
          </motion.div>

          {i < nodes.length - 1 && (
            <svg className="h-3 flex-1 min-w-6" viewBox="0 0 60 12" preserveAspectRatio="none">
              <line x1="0" y1="6" x2="60" y2="6" stroke="hsl(var(--border))" strokeWidth="1" />
              <motion.circle
                r="3"
                cy="6"
                fill="hsl(var(--saas-accent))"
                animate={{ cx: [0, 60] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Dashboard Visual ─── */

const stats = [
  { label: "Leads", value: "2.4k" },
  { label: "Qualified", value: "68%" },
  { label: "Pipeline", value: "$124k" },
]

export function DashboardVisual() {
  return (
    <div className="pt-2">
      <div className="flex gap-2 mb-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.1, ease }}
            className="flex-1 rounded-lg border border-border bg-background px-2.5 py-2"
          >
            <span className="text-[10px] text-muted-foreground">{s.label}</span>
            <p className="text-sm font-semibold tracking-tight text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <svg viewBox="0 0 320 64" className="w-full h-16" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--saas-accent))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--saas-accent))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 52 C 30 48, 60 38, 90 42 C 120 46, 150 24, 180 20 C 210 16, 240 28, 270 18 C 290 12, 310 8, 320 10"
          fill="none"
          stroke="hsl(var(--saas-accent))"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
        />
        <path
          d="M 0 52 C 30 48, 60 38, 90 42 C 120 46, 150 24, 180 20 C 210 16, 240 28, 270 18 C 290 12, 310 8, 320 10 L 320 64 L 0 64 Z"
          fill="url(#sparkGrad)"
        />
      </svg>
    </div>
  )
}

/* ─── Workflow Visual ─── */

const steps = [
  { icon: Bell, label: "Notify" },
  { icon: Database, label: "Capture" },
  { icon: GitBranch, label: "Route" },
  { icon: RefreshCw, label: "Repeat" },
]

export function WorkflowVisual() {
  return (
    <div className="flex flex-col items-center gap-0 pt-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background">
              <step.icon className="h-3.5 w-3.5 text-foreground" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground w-12">{step.label}</span>
          </motion.div>

          {i < steps.length - 1 && (
            <div className="h-4 w-px border-l border-dashed border-border" />
          )}
        </div>
      ))}
    </div>
  )
}
