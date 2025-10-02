
import React, { useState, useRef } from 'react';
import { AnalysisType } from '../types';
import { BatIcon, BallIcon, UploadIcon } from './icons';

interface UploadViewProps {
  onUpload: (file: File, type: AnalysisType) => void;
}

const UploadView: React.FC<UploadViewProps> = ({ onUpload }) => {
  const [selectedType, setSelectedType] = useState<AnalysisType | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeSelect = (type: AnalysisType) => {
    setSelectedType(type);
    setError('');
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedType) {
      if (file.type.startsWith('video/')) {
        onUpload(file, selectedType);
      } else {
        setError('Please upload a valid video file.');
      }
    }
    // Reset file input to allow uploading the same file again
    event.target.value = '';
  };

  return (
    <div className="text-center max-w-4xl mx-auto p-8 bg-white rounded-[1.3rem] shadow-lg">
      <h2 className="text-3xl font-bold mb-2 text-slate-800">Analyze Your Technique</h2>
      <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
        Choose your skill, upload a video of your performance, and get instant, AI-powered feedback to elevate your game.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <TechniqueCard
          icon={<BatIcon className="h-12 w-12 mx-auto mb-4" />}
          title="Batting Technique"
          description="Analyze your stance, backlift, and shot execution."
          onSelect={() => handleTypeSelect(AnalysisType.Batting)}
        />
        <TechniqueCard
          icon={<BallIcon className="h-12 w-12 mx-auto mb-4" />}
          title="Bowling Action"
          description="Break down your run-up, load-up, and release."
          onSelect={() => handleTypeSelect(AnalysisType.Bowling)}
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="video/*"
      />
      
      {error && <p className="mt-4 text-red-500">{error}</p>}
      
      <div className="mt-8 text-sm text-slate-500 flex items-center justify-center gap-2">
        <UploadIcon className="h-4 w-4" />
        <span>Click a card to select and upload your video.</span>
      </div>
    </div>
  );
};

interface TechniqueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onSelect: () => void;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ icon, title, description, onSelect }) => (
  <button
    onClick={onSelect}
    className="group text-center p-8 border-2 border-dashed border-slate-300 rounded-[1.3rem] hover:border-[#2094e8] hover:bg-blue-50 transition-all duration-300"
  >
    <div className="text-[#2094e8] group-hover:text-white transition-colors duration-300">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-800 group-hover:text-white mb-2 transition-colors duration-300">{title}</h3>
    <p className="text-slate-500 group-hover:text-blue-100 transition-colors duration-300">{description}</p>
  </button>
);


export default UploadView;
