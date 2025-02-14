"use client"

import { useState } from 'react'
import { useContract, useContractWrite } from "@thirdweb-dev/react"

interface TokenContractProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const TokenContract = ({ onSuccess, onError }: TokenContractProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const { contract } = useContract("your-contract-address")
  const { mutateAsync: deployToken } = useContractWrite(contract, "deployToken")

  const handleDeploy = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      await deployToken({
        args: [
          "GUAPX", // token name
          "GX", // token symbol
          "1000000000000000000000", // 1000 tokens with 18 decimals
          {
            transferable: false,
            metadata: {
              standard: "ISO20022",
              version: "1.0",
              issuer: "GUAPX DAO",
            }
          }
        ]
      })
      
      onSuccess?.()
    } catch (err) {
      const error = err as Error
      setError(error.message)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Deploy GUAPX Token</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="font-medium">Token Details:</span>
          <ul className="list-disc list-inside pl-4 text-gray-600">
            <li>Name: GUAPX</li>
            <li>Symbol: GX</li>
            <li>Supply: 1,000</li>
            <li>Non-transferable</li>
            <li>ISO20022 compliant</li>
          </ul>
        </div>

        <button
          onClick={handleDeploy}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isLoading ? 'Deploying...' : 'Deploy Token'}
        </button>
      </div>
    </div>
  )
} 