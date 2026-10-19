import { BuildersSection } from "@/components/home/builders-section"
import { Hero } from "@/components/home/hero"
import { IntegrationsSection } from "@/components/home/integrations-section"
import { ProblemSection } from "@/components/home/problem-section"
import { ProtocolSection } from "@/components/home/protocol-section"
import { SiteFooter } from "@/components/home/site-footer"
import { SiteHeader } from "@/components/home/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <ProtocolSection />
        <IntegrationsSection />
        <BuildersSection />
      </main>
      <SiteFooter />
    </div>
  )
}
