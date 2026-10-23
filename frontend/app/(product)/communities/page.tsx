import { CommunitiesHome } from "@/components/shell/communities-home"

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>
}) {
  const { tab } = await searchParams
  const initialTab = typeof tab === "string" ? tab : undefined
  return <CommunitiesHome initialTab={initialTab} />
}
