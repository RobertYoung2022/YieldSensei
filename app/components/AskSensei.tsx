'use client';
import { useState } from 'react';
import type { SenseiResponse } from '../api/tools/types';

export function AskSensei() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<SenseiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/sensei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (!res.ok) throw new Error('Failed to get response');
      
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about yield opportunities (e.g., 'Where should I stake 1000 USDC?')"
            className="w-full bg-white/10 rounded-lg p-4 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Analysis</h3>
            <p className="whitespace-pre-line text-gray-300">{response.analysis}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Recommendation</h3>
            <p className="whitespace-pre-line text-gray-300">{response.recommendation}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {response.yieldData && (
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Yield Details</h4>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">APY</dt>
                    <dd>{response.yieldData.apy}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Protocol</dt>
                    <dd>{response.yieldData.protocol}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Chain</dt>
                    <dd>{response.yieldData.chain}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">TVL</dt>
                    <dd>{response.yieldData.tvl}</dd>
                  </div>
                </dl>
              </div>
            )}

            {response.gasData && (
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Gas Details</h4>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Cost</dt>
                    <dd>{response.gasData.usdEquivalent}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Network</dt>
                    <dd>{response.gasData.chain}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Congestion</dt>
                    <dd>{response.gasData.congestion}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Est. Time</dt>
                    <dd>{response.gasData.estimatedTime}</dd>
                  </div>
                </dl>
              </div>
            )}

            {response.riskData && (
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="font-semibold mb-2">Risk Assessment</h4>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Risk Score</dt>
                    <dd>{response.riskData.riskScore}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Audits</dt>
                    <dd>{response.riskData.details.audits.join(', ')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Age</dt>
                    <dd>{response.riskData.details.smartContractAge}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Insurance</dt>
                    <dd>Available</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 