
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisType, AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    // This is a placeholder for development. The build environment should handle the API key.
    // In a real scenario, you'd want a more robust way to handle this,
    // but per instructions, we assume process.env.API_KEY is available.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallSummary: {
      type: Type.STRING,
      description: "A brief, overall summary of the cricket technique shown.",
    },
    keyObservations: {
      type: Type.ARRAY,
      description: "A list of specific technical observations.",
      items: {
        type: Type.OBJECT,
        properties: {
          area: {
            type: Type.STRING,
            description: "The technical area being analyzed (e.g., Stance, Backlift, Head Position, Arm Action).",
          },
          feedback: {
            type: Type.STRING,
            description: "Detailed feedback on this specific area.",
          },
          isPositive: {
            type: Type.BOOLEAN,
            description: "True if the feedback is positive or a strength, false if it's an area for improvement.",
          },
        },
        required: ["area", "feedback", "isPositive"],
      },
    },
    improvementTips: {
      type: Type.ARRAY,
      description: "A list of actionable drills or tips for improvement.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A short, descriptive title for the drill.",
          },
          description: {
            type: Type.STRING,
            description: "A step-by-step description of how to perform the drill.",
          },
        },
        required: ["title", "description"],
      },
    },
  },
  required: ["overallSummary", "keyObservations", "improvementTips"],
};

const getPrompt = (analysisType: AnalysisType): string => {
  if (analysisType === AnalysisType.Batting) {
    return "Analyze the batting technique in this frame. Focus on stance, grip, backlift, head position, and balance. Identify technical flaws and strengths. Provide specific, actionable drills for improvement. Be encouraging but clear.";
  } else {
    return "Analyze the bowling action in this frame. Focus on the run-up context (if visible), bound, load-up, arm position at release, and follow-through posture. Identify technical flaws and strengths. Provide specific, actionable drills for improvement. Be encouraging but clear.";
  }
};

export const analyzeCricketTechnique = async (
  base64ImageData: string,
  analysisType: AnalysisType
): Promise<AnalysisResult> => {
  try {
    const prompt = getPrompt(analysisType);
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64ImageData,
      },
    };
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      }
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Error analyzing technique with Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
};
