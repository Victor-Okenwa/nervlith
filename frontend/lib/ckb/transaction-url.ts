export function transactionUrl(txHash: string) {
  const mainnet = process.env.NEXT_PUBLIC_IS_MAINNET === "true"
  const host = mainnet
    ? "https://explorer.nervos.org"
    : "https://pudge.explorer.nervos.org"
  return `${host}/transaction/${txHash}`
}
