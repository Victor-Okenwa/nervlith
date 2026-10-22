import { HomeGate } from "@/components/home/home-gate"
import { MarketingHome } from "@/components/home/marketing-home"
import { AppShell } from "@/components/shell/app-shell"
import { DashboardHome } from "@/components/shell/dashboard-home"

export default function Home() {
  return (
    <HomeGate
      marketing={<MarketingHome />}
      dashboard={
        <AppShell>
          <DashboardHome />
        </AppShell>
      }
    />
  )
}
