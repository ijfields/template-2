interface TokenDetails {
  name: string;
  symbol: string;
  supply: number;
  transferability: 'NONE';
  metadata: {
    assetClassification: string;
    regulatoryStatus: string;
    nativeChain: string;
  }
}

interface BGVoteTokenProps {
  tokenDetails?: TokenDetails;
  loading?: boolean;
  error?: string;
  status?: 'pending' | 'deployed';
  deployedAddress?: string;
}

export const BGVoteToken = ({
  tokenDetails,
  loading,
  error,
  status,
  deployedAddress
}: BGVoteTokenProps) => {
  return (
    <div className="rounded-lg p-4 border">
      {/* Temporary basic display */}
      {tokenDetails && (
        <div>
          <h3>{tokenDetails.name}</h3>
          <p>Symbol: {tokenDetails.symbol}</p>
          <p>Supply: {tokenDetails.supply}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {status === 'deployed' && <p>Deployed at: {deployedAddress}</p>}
    </div>
  );
}; 