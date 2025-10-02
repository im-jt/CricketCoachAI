
import React, { useState } from 'react';
import { AnalysisType, AnalysisResult } from './types';
import Header from './components/Header';
import UploadView from './components/UploadView';
import AnalysisView from './components/AnalysisView';

const App: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleVideoUpload = (file: File, type: AnalysisType) => {
    setVideoFile(file);
    setAnalysisType(type);
    setAnalysisResult(null); // Reset previous results
  };

  const handleReset = () => {
    setVideoFile(null);
    setAnalysisType(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-[#0f172a]">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!videoFile || !analysisType ? (
          <UploadView onUpload={handleVideoUpload} />
        ) : (
          <AnalysisView
            videoFile={videoFile}
            analysisType={analysisType}
            analysisResult={analysisResult}
            setAnalysisResult={setAnalysisResult}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;
