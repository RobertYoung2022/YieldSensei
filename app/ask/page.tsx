import { AskSensei } from '../components/AskSensei';

export default function AskPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-8">Ask YieldSensei</h1>
        <AskSensei />
      </div>
    </main>
  );
} 