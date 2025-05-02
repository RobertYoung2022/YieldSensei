export interface YieldResponse {
  protocol: string;
  chain: string;
  token: string;
  apy: string;
  tvl: string;
  minimumDeposit: string;
}

export interface GasResponse {
  chain: string;
  currentGasPrice: string;
  usdEquivalent: string;
  congestion: 'Low' | 'Medium' | 'High';
  estimatedTime: string;
}

export interface RiskResponse {
  protocol: string;
  riskScore: 'Low' | 'Medium' | 'High';
  details: {
    audits: string[];
    tvlStability: string;
    insuranceCoverage: string;
    smartContractAge: string;
    incidentHistory: string;
  }
}

export interface SenseiResponse {
  analysis: string;
  recommendation: string;
  yieldData?: YieldResponse;
  gasData?: GasResponse;
  riskData?: RiskResponse;
} 