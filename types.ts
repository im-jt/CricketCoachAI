
export enum AnalysisType {
  Batting = 'batting',
  Bowling = 'bowling',
}

export interface KeyObservation {
  area: string;
  feedback: string;
  isPositive: boolean;
}

export interface ImprovementTip {
  title: string;
  description: string;
}

export interface AnalysisResult {
  overallSummary: string;
  keyObservations: KeyObservation[];
  improvementTips: ImprovementTip[];
}
