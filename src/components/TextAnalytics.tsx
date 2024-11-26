interface AnalyticsProps {
  stats: {
    readability: string;
    adverbs: number;
    passiveVoices: number;
    complexWords: number;
  };
}

export default function TextAnalytics({ stats }: AnalyticsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Writing Analysis</h2>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-medium text-gray-700 mb-2">Readability</h3>
          <div className={`text-2xl font-bold ${
            stats.readability === 'Very Easy' || stats.readability === 'Easy' 
              ? 'text-green-500' 
              : stats.readability === 'Fairly Easy' || stats.readability === 'Standard'
              ? 'text-yellow-500'
              : 'text-red-500'
          }`}>
            {stats.readability}
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-medium text-gray-700 mb-2">Adverbs</h3>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl font-bold ${
              stats.adverbs <= 2 ? 'text-green-500' : 
              stats.adverbs <= 5 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>
              {stats.adverbs}
            </div>
            <span className="text-sm text-gray-500">Highlighted in purple</span>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-medium text-gray-700 mb-2">Passive Voice</h3>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl font-bold ${
              stats.passiveVoices === 0 ? 'text-green-500' : 
              stats.passiveVoices <= 2 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>
              {stats.passiveVoices}
            </div>
            <span className="text-sm text-gray-500">Highlighted in yellow</span>
          </div>
        </div>

        <div className="pb-4">
          <h3 className="font-medium text-gray-700 mb-2">Complex Words</h3>
          <div className="flex items-baseline justify-between">
            <div className={`text-2xl font-bold ${
              stats.complexWords <= 3 ? 'text-green-500' : 
              stats.complexWords <= 6 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>
              {stats.complexWords}
            </div>
            <span className="text-sm text-gray-500">Highlighted in blue</span>
          </div>
        </div>
      </div>
    </div>
  );
}