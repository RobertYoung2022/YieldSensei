import React from 'react'

interface GasFee {
  network: string
  fee: string
}

const gasFees: GasFee[] = [
  { network: 'Base', fee: '32 gwei' },
  { network: 'Aerodrome', fee: '25 gwei' }
]

export function GasFees() {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Gas Fees</h2>
      
      <div className="space-y-4">
        {gasFees.map((fee) => (
          <div key={fee.network} className="flex justify-between">
            <span className="text-gray-400">{fee.network}</span>
            <span>{fee.fee}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 