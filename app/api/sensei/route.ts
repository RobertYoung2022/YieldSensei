import { NextResponse } from 'next/server';
import { findBestYield } from '../tools/yieldFinder';
import { estimateGas } from '../tools/gasEstimator';
import { analyzeProtocol } from '../tools/riskAnalyzer';
import type { SenseiResponse, YieldResponse, GasResponse, RiskResponse } from '../tools/types';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Simple query analysis - in a real app, this would use LangChain or similar
    const tokenMatch = query.match(/(?:stake|invest|deposit|move)\s+(?:my\s+)?(\d*\.?\d*)\s*(ETH|USDC|WBTC)/i);
    const token = tokenMatch ? tokenMatch[2] : 'ETH';
    
    // Get yield data first
    const yieldData: YieldResponse = await findBestYield(token);
    
    // Then get gas and risk data based on yield data
    const [gasData, riskData]: [GasResponse, RiskResponse] = await Promise.all([
      estimateGas(yieldData.chain),
      analyzeProtocol(yieldData.protocol)
    ]);
    
    // Format response
    const response: SenseiResponse = {
      analysis: `I've analyzed the current DeFi landscape for ${token}:
- Best Rate: ${yieldData.apy} on ${yieldData.protocol} (${yieldData.chain})
- Gas Cost: ${gasData.usdEquivalent} (${gasData.congestion} congestion)
- Risk Level: ${riskData.riskScore} (${riskData.details.audits.join(', ')} audited)`,
      recommendation: `Based on your requirements, I recommend using ${yieldData.protocol} on ${yieldData.chain}. 
The combination of ${yieldData.apy} APY, ${gasData.usdEquivalent} gas fees, and ${riskData.riskScore.toLowerCase()} risk profile makes this an optimal choice.`,
      yieldData,
      gasData,
      riskData
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 