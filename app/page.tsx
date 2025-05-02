import { Navigation } from './components/Navigation'
import { YieldOpportunities } from './components/YieldOpportunities'
import { GasFees } from './components/GasFees'
import { AskSensei } from './components/AskSensei'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Navigation />
      
      <div className="max-w-5xl mx-auto mt-16">
        <h1 className="text-5xl font-bold mb-12">Welcome back, Bobby!</h1>
        
        <div className="bg-white/5 rounded-xl p-6 mb-12">
          <AskSensei />
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <YieldOpportunities />
          </div>
          <div className="w-64">
            <GasFees />
          </div>
        </div>
      </div>
    </main>
  )
} 