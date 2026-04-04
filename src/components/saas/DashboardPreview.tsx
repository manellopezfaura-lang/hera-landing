import {
  ChevronDown,
  Search,
  Bell,
  Home,
  ListTodo,
  ArrowLeftRight,
  CreditCard,
  Landmark,
  Building2,
  ChevronRight,
  Route,
  BellDot,
  Settings,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Send,
  Download,
  Receipt,
  FileText,
  Banknote,
} from "lucide-react"

function TopBar() {
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
        <span>Search...</span>
        <span className="ml-auto text-[9px] border border-border rounded px-1 py-0.5">⌘K</span>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-[10px] font-medium text-foreground">Move Money</span>
        <Bell className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="h-6 w-6 rounded-full bg-saas-accent text-accent-foreground flex items-center justify-center text-[9px] font-semibold">
          JB
        </div>
      </div>
    </div>
  )
}

function Sidebar() {
  const mainItems = [
    { icon: Home, label: "Home", active: true },
    { icon: ListTodo, label: "Tasks", badge: "10" },
    { icon: ArrowLeftRight, label: "Transactions" },
    { icon: Banknote, label: "Payments", chevron: true },
    { icon: CreditCard, label: "Cards" },
    { icon: Landmark, label: "Capital" },
    { icon: Building2, label: "Accounts", chevron: true },
  ]

  const workflowItems = [
    { icon: Route, label: "Trade routes" },
    { icon: Banknote, label: "Payments" },
    { icon: BellDot, label: "Notifications" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-40 border-r border-border py-2 px-2 flex flex-col gap-0.5 shrink-0">
      {mainItems.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
            item.active
              ? "bg-secondary text-foreground font-medium"
              : "text-muted-foreground"
          }`}
        >
          <item.icon className="h-3.5 w-3.5" />
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto text-[9px] bg-saas-accent text-accent-foreground rounded-full px-1.5 py-0.5 leading-none">
              {item.badge}
            </span>
          )}
          {item.chevron && (
            <ChevronRight className="ml-auto h-3 w-3" />
          )}
        </div>
      ))}

      <div className="mt-3 mb-1 px-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Workflows
      </div>
      {workflowItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground"
        >
          <item.icon className="h-3.5 w-3.5" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function ActionButtons() {
  const actions = [
    { label: "Send", icon: Send, primary: true },
    { label: "Request", icon: Download },
    { label: "Transfer", icon: ArrowLeftRight },
    { label: "Deposit", icon: Landmark },
    { label: "Pay Bill", icon: Receipt },
    { label: "Create Invoice", icon: FileText },
  ]

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {actions.map((action) => (
        <div
          key={action.label}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
            action.primary
              ? "bg-saas-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <action.icon className="h-3 w-3" />
          {action.label}
        </div>
      ))}
      <span className="text-[10px] text-saas-accent font-medium ml-1">Customize</span>
    </div>
  )
}

function BalanceCard() {
  return (
    <div className="flex-1 basis-0 rounded-xl bg-background border border-border p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[11px] font-medium text-foreground">Mercury Balance</span>
        <CheckCircle2 className="h-3 w-3 text-saas-accent" />
      </div>

      <div className="flex items-baseline gap-0.5">
        <span className="text-lg font-semibold text-foreground tracking-tight">$8,450,190</span>
        <span className="text-xs text-muted-foreground">.32</span>
      </div>

      <div className="flex items-center gap-3 mt-1.5 text-[10px]">
        <span className="text-muted-foreground">Last 30 Days</span>
        <span className="text-green-600">+$1.8M</span>
        <span className="text-red-500">-$900K</span>
      </div>

      <svg viewBox="0 0 480 80" className="w-full h-20 mt-2" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(239 84% 67%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(239 84% 67%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 60 C 40 55, 80 40, 120 45 C 160 50, 200 20, 240 25 C 280 30, 320 10, 360 15 C 400 20, 440 35, 480 30"
          fill="none"
          stroke="hsl(239 84% 67%)"
          strokeWidth="1.5"
        />
        <path
          d="M 0 60 C 40 55, 80 40, 120 45 C 160 50, 200 20, 240 25 C 280 30, 320 10, 360 15 C 400 20, 440 35, 480 30 L 480 80 L 0 80 Z"
          fill="url(#chartGradient)"
        />
      </svg>
    </div>
  )
}

function AccountsCard() {
  const accounts = [
    { name: "Credit", amount: "$98,125.50" },
    { name: "Treasury", amount: "$6,750,200.00" },
    { name: "Operations", amount: "$1,592,864.82" },
  ]

  return (
    <div className="flex-1 basis-0 rounded-xl bg-background border border-border p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-medium text-foreground">Accounts</span>
        <div className="flex items-center gap-1.5">
          <Plus className="h-3 w-3 text-muted-foreground" />
          <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>

      {accounts.map((account) => (
        <div
          key={account.name}
          className="flex items-center justify-between py-3 text-xs"
        >
          <span className="text-foreground">{account.name}</span>
          <span className="text-foreground font-medium">{account.amount}</span>
        </div>
      ))}
    </div>
  )
}

function TransactionsTable() {
  const transactions = [
    { date: "Mar 15", description: "AWS", amount: "-$5,200", status: "Pending", statusColor: "text-amber-500" },
    { date: "Mar 14", description: "Client Payment", amount: "+$125,000", status: "Completed", statusColor: "text-green-600" },
    { date: "Mar 13", description: "Payroll", amount: "-$85,450", status: "Completed", statusColor: "text-green-600" },
    { date: "Mar 12", description: "Office Supplies", amount: "-$1,200", status: "Completed", statusColor: "text-green-600" },
  ]

  return (
    <div className="rounded-xl bg-background border border-border p-3 mt-2">
      <span className="text-[11px] font-medium text-foreground">Recent Transactions</span>

      <table className="w-full mt-2">
        <thead>
          <tr className="text-[9px] text-muted-foreground uppercase tracking-wider">
            <th className="text-left font-medium pb-1.5">Date</th>
            <th className="text-left font-medium pb-1.5">Description</th>
            <th className="text-right font-medium pb-1.5">Amount</th>
            <th className="text-right font-medium pb-1.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.description} className="text-[10px]">
              <td className="py-1.5 text-muted-foreground">{tx.date}</td>
              <td className="py-1.5 text-foreground">{tx.description}</td>
              <td className="py-1.5 text-right text-foreground font-medium">{tx.amount}</td>
              <td className={`py-1.5 text-right ${tx.statusColor}`}>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DashboardPreview() {
  return (
    <div className="w-full max-w-5xl">
      <div
        className="rounded-2xl overflow-hidden p-3 md:p-4"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "var(--shadow-dashboard)",
        }}
      >
        <div className="rounded-xl bg-background border border-border overflow-hidden text-[11px] select-none pointer-events-none">
          <TopBar />

          <div className="flex">
            <Sidebar />

            <div className="flex-1 bg-secondary/30 p-3">
              <p className="text-sm font-semibold text-foreground mb-3">Welcome, Jane</p>

              <ActionButtons />

              <div className="flex gap-2 mt-3">
                <BalanceCard />
                <AccountsCard />
              </div>

              <TransactionsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
