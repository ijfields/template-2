import { useCallback, useState } from 'react';
import { SmartContract } from "@thirdweb-dev/sdk";

const GUAPX_PARAMS = {
  name: "GUAPX Beta DAO Token",
  symbol: "BGVOTE",
  maxSupply: 1000,
  transferability: "NONE",
  assetClass: "VOTE-001"
};

export const useTokenVerification = (contract: SmartContract) => {
  const [verifying, setVerifying] = useState(false);
  
  const verifyToken = useCallback(async () => {
    setVerifying(true);
    
    try {
      const name = await contract.call("name");
      const symbol = await contract.call("symbol");
      const maxSupply = await contract.call("maxTotalSupply");
      
      const isValid = 
        name === GUAPX_PARAMS.name &&
        symbol === GUAPX_PARAMS.symbol &&
        maxSupply.toString() === GUAPX_PARAMS.maxSupply.toString();

      return {
        status: isValid ? 'success' : 'error',
        explorerUrl: `https://explorer.guapx.io/token/${await contract.getAddress()}`,
        message: isValid ? 'Token verified successfully' : 'Token parameters mismatch'
      };

    } catch (error) {
      return {
        status: 'error',
        message: 'Verification failed: ' + (error instanceof Error ? error.message : 'Unknown error')
      };
    } finally {
      setVerifying(false);
    }
  }, [contract]);

  return { verifyToken, verifying };
};
