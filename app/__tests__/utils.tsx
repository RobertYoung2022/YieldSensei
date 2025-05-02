import { SenseiResponse } from '../api/tools/types';

export const mockSenseiResponse: SenseiResponse = {
  analysis: "I've analyzed the current DeFi landscape for USDC:\n- Best Rate: 8.45% on Aerodrome Finance (Base)\n- Gas Cost: $0.28 (Low congestion)\n- Risk Level: Low (Certik, Hacken audited)",
  recommendation: "Based on your requirements, I recommend using Aerodrome Finance on Base. \nThe combination of 8.45% APY, $0.28 gas fees, and low risk profile makes this an optimal choice.",
  yieldData: {
    protocol: 'Aerodrome Finance',
    chain: 'Base',
    token: 'USDC',
    apy: '8.45%',
    tvl: '$245M',
    minimumDeposit: '1 USDC'
  },
  gasData: {
    chain: 'Base',
    currentGasPrice: '0.0001 ETH',
    usdEquivalent: '$0.28',
    congestion: 'Low',
    estimatedTime: '15 seconds'
  },
  riskData: {
    protocol: 'Aerodrome Finance',
    riskScore: 'Low',
    details: {
      audits: ['Certik', 'Hacken'],
      tvlStability: 'Stable for 6 months',
      insuranceCoverage: 'Available via Nexus Mutual',
      smartContractAge: '1 year',
      incidentHistory: 'No major incidents'
    }
  }
};

export const mockErrorResponse = {
  error: 'Failed to process request'
};

describe('Mock Data', () => {
  it('should have valid mock Sensei response structure', () => {
    expect(mockSenseiResponse).toHaveProperty('analysis');
    expect(mockSenseiResponse).toHaveProperty('recommendation');
    expect(mockSenseiResponse).toHaveProperty('yieldData');
    expect(mockSenseiResponse).toHaveProperty('gasData');
    expect(mockSenseiResponse).toHaveProperty('riskData');
  });

  it('should have valid yield data structure', () => {
    expect(mockSenseiResponse.yieldData).toHaveProperty('protocol');
    expect(mockSenseiResponse.yieldData).toHaveProperty('chain');
    expect(mockSenseiResponse.yieldData).toHaveProperty('token');
    expect(mockSenseiResponse.yieldData).toHaveProperty('apy');
    expect(mockSenseiResponse.yieldData).toHaveProperty('tvl');
  });

  it('should have valid error response structure', () => {
    expect(mockErrorResponse).toHaveProperty('error');
    expect(typeof mockErrorResponse.error).toBe('string');
  });
}); 