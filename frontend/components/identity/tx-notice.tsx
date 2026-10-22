import { transactionUrl } from "@/lib/ckb/transaction-url"

export function TxNotice({
  label,
  txHash,
}: {
  label: string
  txHash: string | null
}) {
  if (!txHash) return null

  return (
    <p className="text-sm text-muted-foreground">
      {label}{" "}
      <a
        href={transactionUrl(txHash)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        {txHash.slice(0, 10)}…
      </a>
    </p>
  )
}
