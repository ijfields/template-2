"use client"

import { ThirdwebProvider as Provider } from "@thirdweb-dev/react"
import { Chain } from "@thirdweb-dev/chains"

const GUAPX_CHAIN: Chain = {
  chainId: 71111,
  rpc: ["https://rpc.guapx.io"],
  nativeCurrency: {
    name: "GUAPX",
    symbol: "GX",
    decimals: 18,
  },
  shortName: "guapx",
  slug: "guapx",
  testnet: true,
  chain: "GUAPX",
  name: "GUAPX Testnet"
}

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider 
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={GUAPX_CHAIN}
    >
      {children}
    </Provider>
  )
} 