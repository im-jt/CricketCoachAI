import { AnalysisType, AnalysisResult } from '../types';

const BACKEND_URL = 'http://localhost:5001';

export const analyzeCricketTechnique = async (
  base64ImageData: string,
  analysisType: AnalysisType
): Promise<AnalysisResult> => {
  try {
    const response = await fetch(`${BACKEND_URL}/analyse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64ImageData,
        type: analysisType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing technique with backend:", error);
    throw new Error("Failed to get analysis from the backend. Is the backend server running?");
  }
};