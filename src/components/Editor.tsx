import { useState } from 'react';
import Header from './Header';
import TextEditor from './TextEditor';
import TextAnalytics from './TextAnalytics';

interface TextStats {
  readability: string;
  adverbs: number;
  passiveVoices: number;
  complexWords: number;
}

export default function Editor() {
  const [stats, setStats] = useState<TextStats>({
    readability: 'Add content',
    adverbs: 0,
    passiveVoices: 0,
    complexWords: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TextEditor onStatsUpdate={setStats} />
          </div>
          <div className="lg:col-span-1">
            <TextAnalytics stats={stats} />
          </div>
        </div>
      </main>
    </div>
  );
}