import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ScoreDisplay from './components/ScoreDisplay';
import StatsBreakdown from './components/StatsBreakdown';
import DownloadReport from './components/DownloadReport';
import Explanation from './components/Explanation';
import Suggestions from './components/Suggestions';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');

  const handleCheck = async (text) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setInputText(text);

    // Use environment variable for API URL in production, fallback to local for dev
    const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    try {
      const response = await fetch(`${API_BASE}/api/check/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze text');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 mt-8">
        {!result ? (
          <InputForm onCheck={handleCheck} loading={loading} error={error} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => { setResult(null); setInputText(''); }}
                className="text-ethicLight/60 hover:text-ethicLight font-semibold flex items-center transition-colors"
              >
                &larr; Check another
              </button>
              
              <DownloadReport result={result} promptText={inputText} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-6">
                <ScoreDisplay 
                  score={result.ethical_score} 
                  percentage={result.ethical_percentage} 
                  message={result.judging_message}
                />
                <Explanation explanation={result.explanation} />
              </div>
              
              <div className="space-y-6">
                <StatsBreakdown 
                  internet={result.internet_similarity}
                  internetReason={result.internet_similarity_reason}
                  availability={result.result_availability}
                  availabilityReason={result.result_availability_reason}
                  bias={result.bias_risk}
                  biasReason={result.bias_risk_reason}
                  harmful={result.harmful_intent}
                  harmfulReason={result.harmful_intent_reason}
                  originality={result.originality_score}
                  originalityReason={result.originality_score_reason}
                  safety={result.safety_score}
                  safetyReason={result.safety_score_reason}
                />
                <Suggestions suggestions={result.suggestions} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
