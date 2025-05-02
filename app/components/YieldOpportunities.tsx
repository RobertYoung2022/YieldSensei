import React from 'react'
import Image from 'next/image'

interface YieldOpportunity {
  apy: number
  pair: string
  protocol: string
  risk: 'Low' | 'Medium' | 'High'
  icon: string
}

const opportunities: YieldOpportunity[] = [
  {
    apy: 5.8,
    pair: 'ETH/USDC',
    protocol: 'Uniswap',
    risk: 'Low',
    icon: '/eth.svg'
  },
  {
    apy: 7.2,
    pair: 'DAI/USDT',
    protocol: 'Compound',
    risk: 'Medium',
    icon: '/dai.svg'
  },
  {
    apy: 9.4,
    pair: 'BTC/DAI',
    protocol: 'Aave',
    risk: 'High',
    icon: '/btc.svg'
  }
]

export function YieldOpportunities() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Top Yield Opportunities Today</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.pair} className="bg-white/5 rounded-xl p-6">
            <div className="w-8 h-8 mb-4">
              <Image
                src={opp.icon}
                alt={opp.pair}
                width={32}
                height={32}
              />
            </div>
            
            <div className="text-4xl font-bold mb-2">
              {opp.apy}%
            </div>
            
            <div className="text-gray-400 mb-4">
              {opp.pair}
            </div>
            
            <div className="text-gray-400 mb-4">
              {opp.protocol}
            </div>
            
            <div className={`
              inline-block px-3 py-1 rounded-full text-sm
              ${opp.risk === 'Low' ? 'bg-green-900/20 text-green-400' : ''}
              ${opp.risk === 'Medium' ? 'bg-yellow-900/20 text-yellow-400' : ''}
              ${opp.risk === 'High' ? 'bg-red-900/20 text-red-400' : ''}
            `}>
              {opp.risk}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 