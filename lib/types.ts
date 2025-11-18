/**
 * Type definitions for the ROI Calculator application
 */

export interface FormData {
  // Step 1: Team Information
  teamSize: number;
  hoursPerDay: number;
  hourlyCost: number;
  
  // Step 2: Business Metrics
  leadsPerMonth: number;
  customerLifetimeValue: number;
  currentClosingRate: number;
  agreeWith20PercentIncrease: boolean;
}

export interface ResultData {
  totalLoss: number;
  salaryCost: number;
  missedRevenue: number;
  hoursWasted: number;
  leadsLost: number;
}

export type Step = 'intro' | 'step1' | 'step2' | 'result';

export interface FormErrors {
  [key: string]: string;
}

export interface StepFormProps {
  data: Partial<FormData>;
  onChange: (field: string, value: number | boolean) => void;
  onNext: () => void;
  errors: FormErrors;
}

export interface Step2FormProps extends StepFormProps {
  onBack: () => void;
}

