interface BGVoteTokenConfig {
  name: "BGVOTE";
  symbol: "BGVOTE";
  maxTotalSupply: 1000;
  transferability: "NONE";
  metadata: {
    assetClassification: "VOTE-001";
    regulatoryStatus: "CommunityUtility";
    nativeChain: "GUAPX";  // Important: Specifies this runs on GUAPX chain
  };
}

// Distribution rules
interface DistributionRules {
  telegramMember: 1.0;    // 1 BGVOTE per verified TG member
  slackMember: 1.0;       // 1 BGVOTE per verified Slack member
  referralBonus: 0.5;     // 0.5 BGVOTE per successful referral
  maxPerAddress: 2.0;     // Cap to prevent concentration
} 