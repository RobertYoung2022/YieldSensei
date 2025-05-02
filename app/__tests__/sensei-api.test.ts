import { NextRequest } from 'next/server';
import { POST } from '../api/sensei/route';
import { findBestYield } from '../api/tools/yieldFinder';
import { estimateGas } from '../api/tools/gasEstimator';
import { analyzeProtocol } from '../api/tools/riskAnalyzer';

// Mock the tools
jest.mock('../api/tools/yieldFinder', () => ({
  findBestYield: jest.fn().mockImplementation(async (token: string) => ({
    protocol: 'Aerodrome Finance',
    chain: 'Base',
    token: token,
    apy: '8.45%',
    tvl: '$245M',
    minimumDeposit: '1 ' + token
  }))
}));

jest.mock('../api/tools/gasEstimator', () => ({
  estimateGas: jest.fn().mockImplementation(async (chain: string) => ({
    chain: chain,
    currentGasPrice: '0.0001 ETH',
    usdEquivalent: '$0.28',
    congestion: 'Low',
    estimatedTime: '15 seconds'
  }))
}));

jest.mock('../api/tools/riskAnalyzer', () => ({
  analyzeProtocol: jest.fn().mockImplementation(async (protocol: string) => ({
    protocol: protocol,
    riskScore: 'Low',
    details: {
      audits: ['Certik', 'Hacken'],
      tvlStability: 'Stable for 6 months',
      insuranceCoverage: 'Available via Nexus Mutual',
      smartContractAge: '1 year',
      incidentHistory: 'No major incidents'
    }
  }))
}));

describe('Sensei API Endpoint', () => {
  it('processes USDC query correctly', async () => {
    const request = new Request('http://localhost:3000/api/sensei', {
      method: 'POST',
      body: JSON.stringify({ query: 'Where should I stake 1000 USDC?' })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('analysis');
    expect(data).toHaveProperty('recommendation');
    expect(data.yieldData.token).toBe('USDC');
    expect(data.gasData.chain).toBe('Base');
    expect(data.riskData.protocol).toBe('Aerodrome Finance');
  });

  it('defaults to ETH for unspecified token', async () => {
    const request = new Request('http://localhost:3000/api/sensei', {
      method: 'POST',
      body: JSON.stringify({ query: 'Where should I stake?' })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.yieldData.token).toBe('ETH');
  });

  it('handles invalid JSON', async () => {
    const request = new Request('http://localhost:3000/api/sensei', {
      method: 'POST',
      body: 'invalid json'
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });

  it('handles missing query parameter', async () => {
    const request = new Request('http://localhost:3000/api/sensei', {
      method: 'POST',
      body: JSON.stringify({})
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });
}); 