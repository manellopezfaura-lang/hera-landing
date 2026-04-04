import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  MessageSquare,
  Target,
  LayoutDashboard,
  Workflow,
  CheckCircle2,
  Circle,
  ChevronDown,
  Bot,
  Zap,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
  ArrowRight,
  Globe,
} from 'lucide-react'
import { useTranslation } from '../../../i18n/LanguageContext'
import type { TranslationKey } from '../../../i18n/translations'

const TABS = [
  { id: 'chatbots', labelKey: 'showcase.tab.chatbots' as TranslationKey, icon: MessageSquare },
  { id: 'leads', labelKey: 'showcase.tab.leads' as TranslationKey, icon: Target },
  { id: 'dashboards', labelKey: 'showcase.tab.dashboards' as TranslationKey, icon: LayoutDashboard },
  { id: 'workflows', labelKey: 'showcase.tab.workflows' as TranslationKey, icon: Workflow },
] as const

type TabId = (typeof TABS)[number]['id']

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4'

function ChatbotsOverlay() {
  const { t } = useTranslation()
  const steps = [
    { key: 'showcase.chatbots.step1' as TranslationKey, active: true },
    { key: 'showcase.chatbots.step2' as TranslationKey, active: true },
    { key: 'showcase.chatbots.step3' as TranslationKey, active: true },
    { key: 'showcase.chatbots.step4' as TranslationKey, active: false, hasChevron: true },
  ]

  return (
    <div className="w-[340px] rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          {t('showcase.chatbots.title')}
        </h3>
        <Bot className="h-4 w-4 text-gray-400" />
      </div>

      <div className="mb-5 flex items-center gap-2">
        <Zap className="h-4 w-4 text-saas-accent" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-saas-accent"
            style={{ width: '75%' }}
          />
        </div>
        <span className="text-xs font-medium text-saas-accent">75%</span>
      </div>

      <div className="space-y-3">
        {steps.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.active ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-saas-accent">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center">
                <Circle className="h-4 w-4 text-gray-300" />
              </div>
            )}
            <span
              className={`text-sm ${item.active ? 'font-medium text-gray-900' : 'text-gray-400'}`}
            >
              {t(item.key)}
            </span>
            {item.hasChevron && (
              <ChevronDown className="ml-auto h-4 w-4 text-gray-300" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-xl bg-saas-accent/5 px-3 py-2.5">
        <Globe className="h-4 w-4 text-saas-accent" />
        <span className="text-xs font-medium text-saas-accent">
          {t('showcase.chatbots.channels')}
        </span>
      </div>
    </div>
  )
}

function LeadsOverlay() {
  const { t } = useTranslation()
  const stats = [
    { labelKey: 'showcase.leads.captured' as TranslationKey, value: '2.4k', color: 'text-saas-accent' },
    { labelKey: 'showcase.leads.qualified' as TranslationKey, value: '68%', color: 'text-amber-600' },
    { labelKey: 'showcase.leads.converted' as TranslationKey, value: '312', color: 'text-green-600' },
  ]
  const metrics = [
    { labelKey: 'showcase.leads.responseTime' as TranslationKey, value: '< 30s', icon: Clock },
    { labelKey: 'showcase.leads.activeConvos' as TranslationKey, value: '47', icon: Users },
    { labelKey: 'showcase.leads.aiResolution' as TranslationKey, value: '82%', icon: Bot },
  ]

  return (
    <div className="w-[340px] rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          {t('showcase.leads.title')}
        </h3>
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1">
          <TrendingUp className="h-3.5 w-3.5 text-green-500" />
          <span className="text-xs font-medium text-green-600">+34%</span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.labelKey} className="rounded-lg bg-gray-50 p-2.5 text-center">
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-gray-500">{t(stat.labelKey)}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {metrics.map((metric) => (
          <div
            key={metric.labelKey}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <metric.icon className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">{t(metric.labelKey)}</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardsOverlay() {
  const { t } = useTranslation()
  const rows = [
    { labelKey: 'showcase.dashboards.convosToday' as TranslationKey, value: '342', change: '+12%' },
    { labelKey: 'showcase.dashboards.satisfaction' as TranslationKey, value: '4.8/5', change: '+0.3' },
    { labelKey: 'showcase.dashboards.automationRate' as TranslationKey, value: '91%', change: '+5%' },
  ]

  return (
    <div className="w-[340px] rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          {t('showcase.dashboards.title')}
        </h3>
        <BarChart3 className="h-4 w-4 text-gray-400" />
      </div>

      <div className="mb-4 rounded-xl bg-saas-accent/5 p-4 text-center">
        <p className="text-3xl font-bold text-saas-accent">$124k</p>
        <p className="mt-1 text-xs text-saas-accent/70">{t('showcase.dashboards.pipeline')}</p>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.labelKey}
            className="flex items-center justify-between px-1"
          >
            <span className="text-xs text-gray-500">{t(row.labelKey)}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-900">{row.value}</span>
              <span className="text-[10px] font-medium text-green-500">{row.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkflowsOverlay() {
  const { t } = useTranslation()
  const workflows = [
    { key: 'showcase.workflows.1' as TranslationKey, active: true },
    { key: 'showcase.workflows.2' as TranslationKey, active: true },
    { key: 'showcase.workflows.3' as TranslationKey, active: true },
    { key: 'showcase.workflows.4' as TranslationKey, active: false },
  ]

  return (
    <div className="w-[340px] rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">
          {t('showcase.workflows.title')}
        </h3>
        <div className="flex items-center gap-1.5 rounded-full bg-saas-accent/10 px-2.5 py-1">
          <Zap className="h-3.5 w-3.5 text-saas-accent" />
          <span className="text-xs font-medium text-saas-accent">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {workflows.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            {item.active ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 text-gray-300" />
            )}
            <span className={`text-sm ${item.active ? 'text-gray-700' : 'text-gray-400'}`}>
              {t(item.key)}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-saas-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:brightness-110">
        <ArrowRight className="h-4 w-4" />
        {t('showcase.workflows.cta')}
      </button>
    </div>
  )
}

const OVERLAY_MAP: Record<TabId, () => React.ReactElement> = {
  chatbots: ChatbotsOverlay,
  leads: LeadsOverlay,
  dashboards: DashboardsOverlay,
  workflows: WorkflowsOverlay,
}

export function AnimatedShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('chatbots')
  const [isPaused, setIsPaused] = useState(false)
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: "100px" })

  const cycleTab = useCallback(() => {
    setActiveTab((prev) => {
      const idx = TABS.findIndex((tab) => tab.id === prev)
      return TABS[(idx + 1) % TABS.length].id
    })
  }, [])

  useEffect(() => {
    if (isPaused || !isInView) return
    const interval = setInterval(cycleTab, 4000)
    return () => clearInterval(interval)
  }, [cycleTab, isPaused, isInView])

  const handleTabClick = (id: TabId) => {
    setActiveTab(id)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 8000)
  }

  const ActiveOverlay = OVERLAY_MAP[activeTab]

  return (
    <section ref={sectionRef} className="w-full">
      {/* Tab Bar */}
      <div className="mb-4 flex justify-center px-6 pt-6">
        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-secondary p-1 md:hidden">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(tab.labelKey)}
              </button>
            )
          })}
        </div>

        {/* Desktop: row with dividers */}
        <div className="hidden items-center rounded-lg bg-secondary p-1 md:flex">
          {TABS.map((tab, i) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <div key={tab.id} className="flex items-center">
                {i > 0 && <div className="mx-0.5 h-5 w-px bg-border" />}
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(tab.labelKey)}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Video + Overlay — full bleed */}
      <div className="relative h-[400px] overflow-hidden md:h-[500px]">
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />

        {/* Centered overlay card */}
        <div
          key={`card-${activeTab}`}
          className="animate-slide-up-overlay absolute left-1/2 top-1/2"
        >
          <ActiveOverlay />
        </div>
      </div>
    </section>
  )
}
