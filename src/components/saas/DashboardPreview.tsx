import { useEffect, useState, useRef, useCallback } from "react"
import {
  ChevronDown,
  Search,
  Bell,
  Home,
  MessageSquare,
  Users,
  Bot,
  BarChart3,
  Workflow,
  Settings,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Zap,
  Globe,
  Send,
  Filter,
  Download,
  X,
} from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useTranslation } from "../../i18n/LanguageContext"
import type { TranslationKey } from "../../i18n/translations"

/* ─── Animated counter ─── */

function useAnimatedCounter(target: number, duration = 2800, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, inView])
  return count
}

/* ─── Sidebar tabs ─── */

const SIDEBAR_TABS = ["dash.sidebar.dashboard", "dash.sidebar.conversations", "dash.sidebar.leads"] as const
type SidebarTab = (typeof SIDEBAR_TABS)[number]

const sidebarItemKeys = [
  { icon: Home, key: "dash.sidebar.dashboard" as TranslationKey },
  { icon: MessageSquare, key: "dash.sidebar.conversations" as TranslationKey, badge: "24" },
  { icon: Users, key: "dash.sidebar.leads" as TranslationKey },
  { icon: Bot, key: "dash.sidebar.agents" as TranslationKey, chevron: true },
  { icon: Workflow, key: "dash.sidebar.workflows" as TranslationKey },
  { icon: BarChart3, key: "dash.sidebar.analytics" as TranslationKey },
  { icon: Globe, key: "dash.sidebar.channels" as TranslationKey, chevron: true },
]

const settingsItemKeys = [
  { icon: Zap, key: "dash.sidebar.automations" as TranslationKey },
  { icon: Settings, key: "dash.sidebar.settings" as TranslationKey },
]

/* ─── Top Bar ─── */

function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-foreground text-primary-foreground flex items-center justify-center text-[10px] font-semibold">
          H
        </div>
        <span className="text-[11px] font-semibold text-foreground">Hera</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-[10px] text-muted-foreground flex-1 max-w-[200px] mx-4">
        <Search className="h-3 w-3" />
        <span>{t("dash.search")}</span>
        <span className="ml-auto text-[9px] border border-border rounded px-1 py-0.5">⌘K</span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-[10px] font-medium text-foreground">{t("dash.newAgent")}</span>
        <Bell className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="h-6 w-6 rounded-full bg-saas-accent text-accent-foreground flex items-center justify-center text-[9px] font-semibold">
          JB
        </div>
      </div>
    </div>
  )
}

/* ─── Sidebar ─── */

function Sidebar({ activeTab }: { activeTab: SidebarTab }) {
  const { t } = useTranslation()
  return (
    <div className="w-40 border-r border-border py-2 px-2 flex flex-col gap-0.5 shrink-0">
      {sidebarItemKeys.map((item) => {
        const isActive = item.key === activeTab
        return (
          <div
            key={item.key}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors duration-300 ${
              isActive
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-3.5 w-3.5" />
            <span>{t(item.key)}</span>
            {item.badge && (
              <span className="ml-auto text-[9px] bg-saas-accent text-accent-foreground rounded-full px-1.5 py-0.5 leading-none">
                {item.badge}
              </span>
            )}
            {item.chevron && (
              <ChevronRight className="ml-auto h-3 w-3" />
            )}
          </div>
        )
      })}

      <div className="mt-3 mb-1 px-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {t("dash.sidebar.config")}
      </div>
      {settingsItemKeys.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground"
        >
          <item.icon className="h-3.5 w-3.5" />
          <span>{t(item.key)}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Toast Notification ─── */

function NotificationToast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, x: 8 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="absolute top-12 right-3 z-10 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-lg"
    >
      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      <span className="text-[10px] text-foreground">{message}</span>
      <X className="h-3 w-3 text-muted-foreground" />
    </motion.div>
  )
}

/* ─── Panel: Dashboard ─── */

function DashboardPanel({ inView }: { inView: boolean }) {
  const { t } = useTranslation()
  const leadsCount = useAnimatedCounter(1847, 2800, inView)
  const qualified = useAnimatedCounter(68, 2200, inView)

  const actions = [
    { key: "dash.action.newChat" as TranslationKey, icon: Send, primary: true },
    { key: "dash.action.createAgent" as TranslationKey, icon: Bot },
    { key: "dash.action.importLeads" as TranslationKey, icon: Download },
    { key: "dash.action.filters" as TranslationKey, icon: Filter },
  ]

  const agents = [
    { nameKey: "dash.agents.salesBot" as TranslationKey, statusKey: "dash.agents.active" as TranslationKey, color: "text-green-600" },
    { nameKey: "dash.agents.supportAgent" as TranslationKey, statusKey: "dash.agents.active" as TranslationKey, color: "text-green-600" },
    { nameKey: "dash.agents.leadQualifier" as TranslationKey, statusKey: "dash.agents.training" as TranslationKey, color: "text-amber-500" },
  ]

  const activities = [1, 2, 3, 4].map((n) => ({
    timeKey: `dash.activity.${n}.time` as TranslationKey,
    eventKey: `dash.activity.${n}.event` as TranslationKey,
    channelKey: `dash.activity.${n}.channel` as TranslationKey,
    statusKey: `dash.activity.${n}.status` as TranslationKey,
    color: n === 2 ? "text-amber-500" : "text-green-600",
  }))

  return (
    <>
      <p className="text-sm font-semibold text-foreground mb-3">{t("dash.overview")}</p>

      <div className="flex items-center gap-1.5 flex-wrap">
        {actions.map((action, i) => (
          <motion.div
            key={action.key}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 + i * 0.12 }}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
              action.primary
                ? "bg-saas-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <action.icon className="h-3 w-3" />
            {t(action.key)}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        {/* Pipeline card */}
        <div className="flex-1 basis-0 rounded-xl bg-background border border-border p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] font-medium text-foreground">{t("dash.pipeline.title")}</span>
            <span className="text-[9px] text-green-600 font-medium">+34%</span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-semibold text-foreground tracking-tight">
              {leadsCount.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">{t("dash.pipeline.leads")}</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-[10px]">
            <span className="text-muted-foreground">{t("dash.pipeline.thisMonth")}</span>
            <span className="text-saas-accent font-medium">{qualified}% {t("dash.pipeline.qualified")}</span>
            <span className="text-green-600">312 {t("dash.pipeline.converted")}</span>
          </div>
          <svg viewBox="0 0 480 80" className="w-full h-20 mt-2" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--saas-accent))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(var(--saas-accent))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 60 C 40 55, 80 40, 120 45 C 160 50, 200 20, 240 25 C 280 30, 320 10, 360 15 C 400 20, 440 35, 480 30"
              fill="none"
              stroke="hsl(var(--saas-accent))"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            />
            <path
              d="M 0 60 C 40 55, 80 40, 120 45 C 160 50, 200 20, 240 25 C 280 30, 320 10, 360 15 C 400 20, 440 35, 480 30 L 480 80 L 0 80 Z"
              fill="url(#chartGrad)"
            />
          </svg>
        </div>

        {/* Agents card */}
        <div className="flex-1 basis-0 rounded-xl bg-background border border-border p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-foreground">{t("dash.agents.title")}</span>
            <div className="flex items-center gap-1.5">
              <Plus className="h-3 w-3 text-muted-foreground" />
              <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          {agents.map((agent, i) => (
            <motion.div
              key={agent.nameKey}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.8 + i * 0.15 }}
              className="flex items-center justify-between py-3 text-xs"
            >
              <span className="text-foreground">{t(agent.nameKey)}</span>
              <span className={`font-medium ${agent.color}`}>{t(agent.statusKey)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity table */}
      <div className="rounded-xl bg-background border border-border p-3 mt-2">
        <span className="text-[11px] font-medium text-foreground">{t("dash.activity.title")}</span>
        <table className="w-full mt-2">
          <thead>
            <tr className="text-[9px] text-muted-foreground uppercase tracking-wider">
              <th className="text-left font-medium pb-1.5">{t("dash.activity.time")}</th>
              <th className="text-left font-medium pb-1.5">{t("dash.activity.event")}</th>
              <th className="text-right font-medium pb-1.5">{t("dash.activity.channel")}</th>
              <th className="text-right font-medium pb-1.5">{t("dash.activity.status")}</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((row, i) => (
              <motion.tr
                key={row.eventKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.2 + i * 0.15 }}
                className="text-[10px]"
              >
                <td className="py-1.5 text-muted-foreground">{t(row.timeKey)}</td>
                <td className="py-1.5 text-foreground">{t(row.eventKey)}</td>
                <td className="py-1.5 text-right text-muted-foreground">{t(row.channelKey)}</td>
                <td className={`py-1.5 text-right ${row.color}`}>{t(row.statusKey)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── Panel: Conversations ─── */

function ConversationsPanel() {
  const { t } = useTranslation()

  const chatMessages = [
    { from: "user", key: "dash.chat.1" as TranslationKey, delay: 0.3 },
    { from: "bot", key: "dash.chat.2" as TranslationKey, delay: 1.2 },
    { from: "user", key: "dash.chat.3" as TranslationKey, delay: 2.4 },
    { from: "bot", key: "dash.chat.4" as TranslationKey, delay: 3.6 },
  ]

  return (
    <>
      <p className="text-sm font-semibold text-foreground mb-3">{t("dash.conversations")}</p>

      <div className="rounded-xl bg-background border border-border p-3 space-y-2.5">
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: msg.delay }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${
                msg.from === "user"
                  ? "bg-saas-accent text-white rounded-br-sm"
                  : "bg-secondary text-foreground rounded-bl-sm"
              }`}
            >
              {t(msg.key)}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="flex items-center gap-1.5 pt-1"
        >
          <div className="h-1 w-1 rounded-full bg-muted-foreground/40 animate-pulse" />
          <div className="h-1 w-1 rounded-full bg-muted-foreground/40 animate-pulse [animation-delay:0.2s]" />
          <div className="h-1 w-1 rounded-full bg-muted-foreground/40 animate-pulse [animation-delay:0.4s]" />
          <span className="text-[9px] text-muted-foreground ml-1">{t("dash.typing")}</span>
        </motion.div>
      </div>
    </>
  )
}

/* ─── Panel: Leads ─── */

const leads = [
  { name: "María García", company: "Fintech Co", score: 92, statusKey: "dash.leads.hot" as TranslationKey, color: "text-red-500 bg-red-50" },
  { name: "Carlos López", company: "SaaS Inc", score: 78, statusKey: "dash.leads.warm" as TranslationKey, color: "text-amber-600 bg-amber-50" },
  { name: "Ana Ruiz", company: "E-commerce", score: 85, statusKey: "dash.leads.hot" as TranslationKey, color: "text-red-500 bg-red-50" },
  { name: "David Chen", company: "Agency", score: 45, statusKey: "dash.leads.cold" as TranslationKey, color: "text-blue-500 bg-blue-50" },
]

function LeadsPanel() {
  const { t } = useTranslation()

  return (
    <>
      <p className="text-sm font-semibold text-foreground mb-3">{t("dash.leads")}</p>

      <div className="rounded-xl bg-background border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[9px] text-muted-foreground uppercase tracking-wider border-b border-border">
              <th className="text-left font-medium px-3 py-2">{t("dash.leads.name")}</th>
              <th className="text-left font-medium px-3 py-2">{t("dash.leads.company")}</th>
              <th className="text-center font-medium px-3 py-2">{t("dash.leads.score")}</th>
              <th className="text-right font-medium px-3 py-2">{t("dash.leads.status")}</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <motion.tr
                key={lead.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                className="text-[10px] border-b border-border last:border-0"
              >
                <td className="px-3 py-2.5 text-foreground font-medium">{lead.name}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{lead.company}</td>
                <td className="px-3 py-2.5 text-center">
                  <div className="inline-flex items-center gap-1">
                    <div className="h-1 w-8 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-saas-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${lead.score}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
                      />
                    </div>
                    <span className="text-foreground">{lead.score}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-medium ${lead.color}`}>
                    {t(lead.statusKey)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── Notification keys ─── */

const NOTIF_KEYS: TranslationKey[] = [
  "dash.notif.1",
  "dash.notif.2",
  "dash.notif.3",
  "dash.notif.4",
]

/* ─── Main Component ─── */

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [activeTab, setActiveTab] = useState<SidebarTab>("dash.sidebar.dashboard")
  const [notification, setNotification] = useState<string | null>(null)
  const notifIndex = useRef(0)
  const { t } = useTranslation()

  const dismissNotif = useCallback(() => setNotification(null), [])

  // Auto-cycle sidebar tabs
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveTab((prev) => {
          const idx = SIDEBAR_TABS.indexOf(prev)
          return SIDEBAR_TABS[(idx + 1) % SIDEBAR_TABS.length]
        })
      }, 5000)
      return () => clearInterval(interval)
    }, 4000)
    return () => clearTimeout(timer)
  }, [inView])

  // Toast notifications
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const key = NOTIF_KEYS[notifIndex.current % NOTIF_KEYS.length]
        setNotification(t(key))
        notifIndex.current++
      }, 6000)
      return () => clearInterval(interval)
    }, 2000)
    return () => clearTimeout(timer)
  }, [inView, t])

  return (
    <div ref={ref} className="w-full max-w-5xl">
      <div
        className="rounded-2xl overflow-hidden p-3 md:p-4"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "var(--shadow-dashboard)",
        }}
      >
        <div className="relative rounded-xl bg-background border border-border overflow-hidden text-[11px] select-none pointer-events-none">
          <TopBar />

          {/* Toast */}
          <AnimatePresence>
            {notification && (
              <NotificationToast message={notification} onDone={dismissNotif} />
            )}
          </AnimatePresence>

          <div className="flex">
            <Sidebar activeTab={activeTab} />

            <div className="flex-1 bg-secondary/30 p-3 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === "dash.sidebar.dashboard" && <DashboardPanel inView={inView} />}
                  {activeTab === "dash.sidebar.conversations" && <ConversationsPanel />}
                  {activeTab === "dash.sidebar.leads" && <LeadsPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
