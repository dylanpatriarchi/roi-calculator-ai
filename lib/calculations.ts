/**
 * ROI Calculation Logic
 * All business logic for calculating ROI estimates
 */

export interface CalculationInput {
  teamSize: number;
  hoursPerDay: number;
  hourlyCost: number;
  leadsPerMonth: number;
  customerLifetimeValue: number;
  currentClosingRate: number;
  agreeWith20PercentIncrease: boolean;
}

export interface CalculationResult {
  totalLoss: number;
  salaryCost: number;
  missedRevenue: number;
  hoursWasted: number;
  leadsLost: number;
}

// Constants based on realistic work year
const WORKING_DAYS_PER_WEEK = 5;
const WORKING_WEEKS_PER_YEAR = 48; // 52 weeks - 4 weeks vacation/holidays
const WORKING_DAYS_PER_YEAR = WORKING_DAYS_PER_WEEK * WORKING_WEEKS_PER_YEAR; // 240 days
const AI_EFFICIENCY_GAIN = 0.40; // AI can automate 40% of repetitive tasks (conservative estimate)
const CONVERSION_IMPROVEMENT = 0.08; // 8% improvement in conversion rate (realistic based on industry data)

/**
 * Calculate ROI based on user input
 * 
 * Formula breakdown:
 * 1. Salary Cost = (hours per person per day × 240 working days × team size × 40% AI efficiency) × hourly cost
 * 2. Missed Revenue = (leads per year × conversion improvement × customer lifetime value)
 * 3. Total Loss = Salary Cost + Missed Revenue
 * 
 * @param input - User provided data from the form
 * @returns Calculation results with breakdown
 */
export function calculateROI(input: CalculationInput): CalculationResult {
  // Calculate hours that could be automated per year
  // hoursPerDay is the time ONE person spends on repetitive tasks daily
  const hoursPerPersonPerYear = input.hoursPerDay * WORKING_DAYS_PER_YEAR;
  const totalHoursAllTeamPerYear = hoursPerPersonPerYear * input.teamSize;
  const hoursAutomatablePerYear = totalHoursAllTeamPerYear * AI_EFFICIENCY_GAIN;

  // Calculate salary cost savings (what you spend on repetitive work that AI could do)
  const salaryCost = hoursAutomatablePerYear * input.hourlyCost;

  // Calculate missed revenue (conservative approach)
  let missedRevenue = 0;
  let leadsLost = 0;
  
  if (input.agreeWith20PercentIncrease) {
    const currentClosingRateDecimal = input.currentClosingRate / 100;
    
    // Multiplicative improvement (more realistic than additive)
    // Example: 10% conversion becomes 10.8% (10% × 1.08)
    const improvedClosingRate = Math.min(
      currentClosingRateDecimal * (1 + CONVERSION_IMPROVEMENT),
      0.90 // Cap at 90% to be realistic - no one has perfect conversion
    );
    
    const conversionIncrease = improvedClosingRate - currentClosingRateDecimal;
    const leadsPerYear = input.leadsPerMonth * 12;
    leadsLost = leadsPerYear * conversionIncrease;
    
    // Missed revenue from lost conversions
    missedRevenue = leadsLost * input.customerLifetimeValue;
  }

  // Calculate total loss
  const totalLoss = salaryCost + missedRevenue;

  return {
    totalLoss: Math.round(totalLoss),
    salaryCost: Math.round(salaryCost),
    missedRevenue: Math.round(missedRevenue),
    hoursWasted: Math.round(hoursAutomatablePerYear),
    leadsLost: Math.round(leadsLost),
  };
}

/**
 * Get a human-readable explanation of the calculation methodology
 */
export function getCalculationExplanation(): string {
  return `
Metodologia di calcolo:
- Anno lavorativo: ${WORKING_WEEKS_PER_YEAR} settimane × ${WORKING_DAYS_PER_WEEK} giorni = ${WORKING_DAYS_PER_YEAR} giorni
- Efficienza AI: ${AI_EFFICIENCY_GAIN * 100}% delle attività ripetitive possono essere automatizzate
- Miglioramento conversioni: ${CONVERSION_IMPROVEMENT * 100}% con risposta rapida AI
  `.trim();
}

