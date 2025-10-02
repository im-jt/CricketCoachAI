
import React, { useState, useRef, useEffect } from 'react';
import { AnalysisType, AnalysisResult } from '../types';
import { analyzeCricketTechnique } from '../services/geminiService';
import FeedbackPanel from './FeedbackPanel';
import Spinner from './Spinner';
import { AnalyzeIcon, BackIcon } from './icons';

interface AnalysisViewProps {
  videoFile: File;
  analysisType: AnalysisType;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  onReset: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ videoFile, analysisType, analysisResult, setAnalysisResult, onReset }) => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(videoFile);
    setVideoSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const captureFrameAsBase64 = (): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        return dataUrl.split(',')[1];
      }
    }
    return null;
  };

  const handleAnalyzeClick = async () => {
    const base64Frame = captureFrameAsBase64();
    if (!base64Frame) {
      setError('Could not capture frame from video.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisResult(null);

    try {
      const result = await analyzeCricketTechnique(base64Frame, analysisType);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold capitalize text-slate-800">{analysisType} Analysis</h2>
        <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
            <BackIcon className="h-4 w-4" />
            Start Over
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-4 rounded-[1.3rem] shadow-lg">
          <div className="relative aspect-video">
            {videoSrc && (
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                className="w-full h-full rounded-xl bg-black"
                crossOrigin="anonymous"
              />
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
             <button
              onClick={handleAnalyzeClick}
              disabled={isLoading}
              className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 px-6 py-3 bg-[#2094e8] text-white font-semibold rounded-xl hover:bg-[#1a7ac4] transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Analyzing...
                </>
              ) : (
                <>
                  <AnalyzeIcon className="h-5 w-5" />
                  Analyze Current Frame
                </>
              )}
            </button>
             <p className="text-sm text-slate-500 text-center sm:text-left">Pause the video at a key moment (e.g., ball release or impact) for the best analysis.</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <FeedbackPanel isLoading={isLoading} error={error} result={analysisResult} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
