import '@testing-library/jest-dom';
import { findBestYield } from '../api/tools/yieldFinder';
import { estimateGas } from '../api/tools/gasEstimator';
import { analyzeProtocol } from '../api/tools/riskAnalyzer';

describe('YieldFinder', () => {
  it('should find yield data for USDC', async () => {
    const result = await findBestYield('USDC');
    expect(result).toEqual({
      protocol: 'Aerodrome Finance',
      chain: 'Base',
      token: 'USDC',
      apy: '8.45%',
      tvl: '$245M',
      minimumDeposit: '1 USDC'
    });
  });

  it('should find yield data for ETH', async () => {
    const result = await findBestYield('ETH');
    expect(result).toEqual({
      protocol: 'Velodrome',
      chain: 'Optimism',
      token: 'ETH',
      apy: '12.3%',
      tvl: '$180M',
      minimumDeposit: '0.1 ETH'
    });
  });

  it('should handle case-insensitive token symbols', async () => {
    const result = await findBestYield('usdc');
    expect(result.token).toBe('USDC');
  });

  it('should throw error for unsupported token', async () => {
    await expect(findBestYield('DOGE')).rejects.toThrow('No yield data available for token: DOGE');
  });
});

describe('GasEstimator', () => {
  it('should estimate gas for Base', async () => {
    const result = await estimateGas('Base');
    expect(result).toEqual({
      chain: 'Base',
      currentGasPrice: '0.0001 ETH',
      usdEquivalent: '$0.28',
      congestion: 'Low',
      estimatedTime: '15 seconds'
    });
  });

  it('should handle case-insensitive chain names', async () => {
    const result = await estimateGas('base');
    expect(result.chain).toBe('Base');
  });

  it('should throw error for unsupported chain', async () => {
    await expect(estimateGas('Solana')).rejects.toThrow('No gas data available for chain: Solana');
  });
});

describe('RiskAnalyzer', () => {
  it('should analyze Aerodrome Finance', async () => {
    const result = await analyzeProtocol('Aerodrome Finance');
    expect(result).toEqual({
      protocol: 'Aerodrome Finance',
      riskScore: 'Low',
      details: {
        audits: ['Certik', 'Hacken'],
        tvlStability: 'Stable for 6 months',
        insuranceCoverage: 'Available via Nexus Mutual',
        smartContractAge: '1 year',
        incidentHistory: 'No major incidents'
      }
    });
  });

  it('should throw error for unknown protocol', async () => {
    await expect(analyzeProtocol('Unknown DEX')).rejects.toThrow('No risk data available for protocol: Unknown DEX');
  });
}); 