import { RiskResponse } from './types';

const mockRiskData: Record<string, RiskResponse> = {
  'Aerodrome Finance': {
    protocol: 'Aerodrome Finance',
    riskScore: 'Low',
    details: {
      audits: ['Certik', 'Hacken'],
      tvlStability: 'Stable for 6 months',
      insuranceCoverage: 'Available via Nexus Mutual',
      smartContractAge: '1 year',
      incidentHistory: 'No major incidents'
    }
  },
  'Velodrome': {
    protocol: 'Velodrome',
    riskScore: 'Low',
    details: {
      audits: ['OpenZeppelin', 'Trail of Bits'],
      tvlStability: 'Stable for 1 year',
      insuranceCoverage: 'Available via InsurAce',
      smartContractAge: '2 years',
      incidentHistory: 'Minor incident resolved in 2023'
    }
  },
  'Balancer': {
    protocol: 'Balancer',
    riskScore: 'Low',
    details: {
      audits: ['Trail of Bits', 'Consensys Diligence'],
      tvlStability: 'Very stable for 3 years',
      insuranceCoverage: 'Multiple options available',
      smartContractAge: '3 years',
      incidentHistory: 'No major incidents'
    }
  }
};

export async function analyzeProtocol(protocol: string): Promise<RiskResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (protocol in mockRiskData) {
    return mockRiskData[protocol];
  }
  
  throw new Error(`No risk data available for protocol: ${protocol}`);
} 