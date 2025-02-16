
import { useCallback, useState } from 'react';
import { SmartContract } from "@thirdweb-dev/sdk";

interface BGVoteTokenVerifierProps {
  contract: SmartContract;
  onVerificationComplete?: (result: VerificationResult) => void;
}

interface VerificationResult {
  status: 'success' | 'error';
  explorerUrl?: string;
  message: string;
}

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
      // 1. Verify token parameters
      const name = await contract.call("name");
      const symbol = await contract.call("symbol");
      const maxSupply = await contract.call("maxTotalSupply");
      
      // 2. Check against expected values
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
  import { FC } from 'react';

  import { useTokenVerification } from './useTokenVerification';
  export const BGVoteTokenVerifier: FC<BGVoteTokenVerifierProps> = ({ contract }) => {
    const { verifyToken, verifying } = useTokenVerification(contract);
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleVerification = async () => {
      setError(null);
      try {
        const verificationResult = await verifyToken();
        setResult(verificationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed');
      }
    };

    return (
      <div className="rounded-lg shadow-md p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">BGVOTE Token Verification</h2>
          <div className="flex items-center gap-2">
            {verifying && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
            )}
            <button 
              onClick={handleVerification}
              disabled={verifying}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Verify Token'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 p-4 rounded">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && !error && (
          <div className={`p-4 rounded ${result.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-medium">{result.message}</p>
            {result.explorerUrl && (
              <a href={result.explorerUrl} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-blue-500 hover:underline mt-2 block">
                View on Explorer
              </a>
            )}
          </div>
        )}
      </div>
    );
  };
};