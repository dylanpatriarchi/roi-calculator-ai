/**
 * ROI Calculation Logic
 * All business logic for calculating ROI estimates - Italian Market Specific
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

// Italian Market Constants
const WORKING_WEEKS_PER_YEAR = 44; // Considered holidays, sickness, permits (standard working year ~220 days)
const WORKING_DAYS_PER_WEEK = 5;
const WORKING_DAYS_PER_YEAR = WORKING_WEEKS_PER_YEAR * WORKING_DAYS_PER_WEEK; // 220 days
const EMPLOYER_COST_MULTIPLIER = 1.0; // Input is already "Grosso Cost", but we ensure logic treats it as full cost.
const AI_EFFICIENCY_GAIN = 0.40; // 40% automation potential
const CONVERSION_IMPROVEMENT = 0.08; // 8% uplift

/**
 * Calculate ROI based on user input
 */
export function calculateROI(input: CalculationInput): CalculationResult {
  // 1. Efficiency / Salary Savings
  // We assume 'hourlyCost' provided by user includes RAL + contributions (Costo Azienda)
  const hoursPerPersonPerYear = input.hoursPerDay * WORKING_DAYS_PER_YEAR;
  const totalHoursAllTeamPerYear = hoursPerPersonPerYear * input.teamSize;
  
  // Total hours that can be automated
  const hoursAutomatablePerYear = totalHoursAllTeamPerYear * AI_EFFICIENCY_GAIN;

  // Monetary saving
  const salaryCost = hoursAutomatablePerYear * input.hourlyCost * EMPLOYER_COST_MULTIPLIER;

  // 2. Missed Revenue Opportunity
  let missedRevenue = 0;
  let leadsLost = 0;
  
  if (input.agreeWith20PercentIncrease) {
    const currentRate = input.currentClosingRate / 100;
    
    // Improvement calc
    // If current is 10%, new is 10.8%
    const improvedRate = Math.min(currentRate * (1 + CONVERSION_IMPROVEMENT), 0.95);
    const rateDifference = improvedRate - currentRate;
    
    const leadsPerYear = input.leadsPerMonth * 12;
    leadsLost = leadsPerYear * rateDifference;
    
    missedRevenue = leadsLost * input.customerLifetimeValue;
  }

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
 * Explanation text
 */
export function getCalculationExplanation(): string {
  return `
Base di calcolo (Mercato Italia):
- Giorni lavorativi annui: ${WORKING_DAYS_PER_YEAR} (netto ferie/permessi)
- Automazione stimata: ${AI_EFFICIENCY_GAIN * 100}% su task ripetitivi
- Uplift conversioni: +${CONVERSION_IMPROVEMENT * 100}% (risposta istantanea)
  `.trim();
}

