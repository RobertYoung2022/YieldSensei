import { GasResponse } from './types';

const mockGasData: Record<string, GasResponse> = {
  'Base': {
    chain: 'Base',
    currentGasPrice: '0.0001 ETH',
    usdEquivalent: '$0.28',
    congestion: 'Low',
    estimatedTime: '15 seconds'
  },
  'Optimism': {
    chain: 'Optimism',
    currentGasPrice: '0.0002 ETH',
    usdEquivalent: '$0.56',
    congestion: 'Medium',
    estimatedTime: '30 seconds'
  },
  'Arbitrum': {
    chain: 'Arbitrum',
    currentGasPrice: '0.00015 ETH',
    usdEquivalent: '$0.42',
    congestion: 'Low',
    estimatedTime: '12 seconds'
  }
};

export async function estimateGas(chain: string): Promise<GasResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const normalizedChain = chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase();
  if (normalizedChain in mockGasData) {
    return mockGasData[normalizedChain];
  }
  
  throw new Error(`No gas data available for chain: ${chain}`);
} 