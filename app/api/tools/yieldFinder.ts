import { YieldResponse } from './types';

// In a real implementation, this would fetch from various DeFi protocols
// For now, we'll use mock data that simulates real responses
const mockYieldData: Record<string, YieldResponse> = {
  'USDC': {
    protocol: 'Aerodrome Finance',
    chain: 'Base',
    token: 'USDC',
    apy: '8.45%',
    tvl: '$245M',
    minimumDeposit: '1 USDC'
  },
  'ETH': {
    protocol: 'Velodrome',
    chain: 'Optimism',
    token: 'ETH',
    apy: '12.3%',
    tvl: '$180M',
    minimumDeposit: '0.1 ETH'
  },
  'WBTC': {
    protocol: 'Balancer',
    chain: 'Arbitrum',
    token: 'WBTC',
    apy: '5.8%',
    tvl: '$320M',
    minimumDeposit: '0.01 WBTC'
  }
};

export async function findBestYield(token: string): Promise<YieldResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const normalizedToken = token.toUpperCase();
  if (normalizedToken in mockYieldData) {
    return mockYieldData[normalizedToken];
  }
  
  throw new Error(`No yield data available for token: ${token}`);
} 