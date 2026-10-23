"use client"

import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type CommunityTab = "communities" | "memberships" | "created"

export function communityTab(value: string | null | undefined): CommunityTab {
  if (value === "memberships" || value === "created") return value
  return "communities"
}

const triggerClass =
  "px-3 data-active:text-primary data-active:after:bg-primary"

export function CommunityTabs({
  tab,
  onChange,
  labels,
  communities,
  memberships,
  created,
}: {
  tab: CommunityTab
  onChange: (tab: CommunityTab) => void
  labels: { communities: string; memberships: string; created: string }
  communities: ReactNode
  memberships: ReactNode
  created: ReactNode
}) {
  return (
    <Tabs
      className="mt-6"
      value={tab}
      onValueChange={(value) => onChange(communityTab(String(value)))}
    >
      <TabsList variant="line" className="h-auto w-full flex-wrap justify-start">
        <TabsTrigger className={triggerClass} value="communities">
          {labels.communities}
        </TabsTrigger>
        <TabsTrigger className={triggerClass} value="memberships">
          {labels.memberships}
        </TabsTrigger>
        <TabsTrigger className={triggerClass} value="created">
          {labels.created}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="communities">{communities}</TabsContent>
      <TabsContent value="memberships">{memberships}</TabsContent>
      <TabsContent value="created">{created}</TabsContent>
    </Tabs>
  )
}
