
import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircleIcon, ExclamationCircleIcon, LightbulbIcon, DocumentTextIcon } from './icons';
import Spinner from './Spinner';

interface FeedbackPanelProps {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ isLoading, error, result }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-6 rounded-[1.3rem] shadow-lg">
        <Spinner />
        <p className="mt-4 text-slate-600 font-semibold">Generating AI Feedback...</p>
        <p className="mt-2 text-sm text-slate-500 text-center">Our AI coach is analyzing your technique. This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-[1.3rem] shadow-lg">
        <h3 className="font-bold text-lg mb-2">Analysis Failed</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full bg-white p-6 rounded-[1.3rem] shadow-lg">
        <DocumentTextIcon className="h-16 w-16 text-slate-300 mb-4" />
        <h3 className="font-semibold text-slate-700 text-lg">Awaiting Analysis</h3>
        <p className="text-slate-500 mt-1">Your AI-powered feedback report will appear here once you analyze a frame from your video.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[1.3rem] shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-3">Overall Summary</h3>
        <p className="text-slate-600">{result.overallSummary}</p>
      </div>

      <div className="bg-white p-6 rounded-[1.3rem] shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Key Observations</h3>
        <ul className="space-y-4">
          {result.keyObservations.map((obs, index) => (
            <li key={index} className="flex gap-4 items-start">
              <div>
                {obs.isPositive ? (
                  <CheckCircleIcon className="h-6 w-6 text-[#18b569]" />
                ) : (
                  <ExclamationCircleIcon className="h-6 w-6 text-[#f4b829]" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">{obs.area}</h4>
                <p className="text-slate-600">{obs.feedback}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-[1.3rem] shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Improvement Drills</h3>
        <ul className="space-y-4">
          {result.improvementTips.map((tip, index) => (
            <li key={index} className="flex gap-4 items-start">
              <div>
                <LightbulbIcon className="h-6 w-6 text-[#2094e8]" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">{tip.title}</h4>
                <p className="text-slate-600">{tip.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackPanel;
