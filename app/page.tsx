'use client';

import React, { useState } from 'react';
import { Step1Form } from '@/components/Step1Form';
import { Step2Form } from '@/components/Step2Form';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Footer } from '@/components/Footer';
import { Sparkles, ChevronRight } from 'lucide-react';
import { calculateROI } from '@/lib/calculations';
import type { CalculationResult } from '@/lib/calculations';

interface FormData {
  // Step 1
  teamSize: number;
  hoursPerDay: number;
  hourlyCost: number;
  
  // Step 2
  leadsPerMonth: number;
  customerLifetimeValue: number;
  currentClosingRate: number;
  agreeWith20PercentIncrease: boolean;
}

type Step = 'intro' | 'step1' | 'step2' | 'result';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<FormData>({
    teamSize: 0,
    hoursPerDay: 0,
    hourlyCost: 0,
    leadsPerMonth: 0,
    customerLifetimeValue: 0,
    currentClosingRate: 0,
    agreeWith20PercentIncrease: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  /**
   * Update form data for a specific field
   */
  const updateFormData = (field: string, value: number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Validate Step 1 data
   */
  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.teamSize || formData.teamSize < 1) {
      newErrors.teamSize = 'Inserisci un numero valido di persone nel team';
    }
    if (!formData.hoursPerDay || formData.hoursPerDay < 0.5 || formData.hoursPerDay > 24) {
      newErrors.hoursPerDay = 'Inserisci un numero valido di ore (0.5 - 24)';
    }
    if (!formData.hourlyCost || formData.hourlyCost < 1) {
      newErrors.hourlyCost = 'Inserisci un costo orario valido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validate Step 2 data
   */
  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.leadsPerMonth || formData.leadsPerMonth < 1) {
      newErrors.leadsPerMonth = 'Inserisci un numero valido di lead al mese';
    }
    if (!formData.customerLifetimeValue || formData.customerLifetimeValue < 1) {
      newErrors.customerLifetimeValue = 'Inserisci un valore valido per il cliente';
    }
    if (formData.currentClosingRate < 0 || formData.currentClosingRate > 100) {
      newErrors.currentClosingRate = 'Inserisci una percentuale valida (0 - 100)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle ROI calculation
   */
  const handleCalculateROI = (): void => {
    const calculatedResult = calculateROI(formData);
    setResult(calculatedResult);
  };

  /**
   * Handle step navigation
   */
  const handleNextStep = () => {
    if (currentStep === 'intro') {
      setCurrentStep('step1');
    } else if (currentStep === 'step1') {
      if (validateStep1()) {
        setCurrentStep('step2');
      }
    } else if (currentStep === 'step2') {
      if (validateStep2()) {
        handleCalculateROI();
        setCurrentStep('result');
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'step2') {
      setCurrentStep('step1');
    } else if (currentStep === 'step1') {
      setCurrentStep('intro');
    }
  };

  const handleReset = () => {
    setCurrentStep('intro');
    setFormData({
      teamSize: 0,
      hoursPerDay: 0,
      hourlyCost: 0,
      leadsPerMonth: 0,
      customerLifetimeValue: 0,
      currentClosingRate: 0,
      agreeWith20PercentIncrease: true,
    });
    setErrors({});
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col font-sans">
      {/* Absolute Minimalist Header */}
      <nav className="w-full px-6 py-6 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-10 h-10 relative">
             {/* Using the requested 2.svg as logo */}
             <img src="/2.svg" alt="Rayo Consulting" className="w-full h-full object-contain" />
        </div>
        <div>
            {/* Optional minimalist nav items could go here */}
        </div>
      </nav>

      {/* Progress Bar - Minimalist Line */}
      {currentStep !== 'intro' && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 z-50">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width:
                currentStep === 'step1'
                  ? '33%'
                  : currentStep === 'step2'
                  ? '66%'
                  : '100%',
            }}
          />
        </div>
      )}

      {/* Content Container */}
      <div className="flex-grow container mx-auto px-4 py-20 md:py-32 max-w-3xl">
        {/* Intro Screen */}
        {currentStep === 'intro' && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-tight">
              Quanto perde <br className="hidden md:block"/> la tua azienda?
            </h1>
            
            <p className="text-xl md:text-2xl text-secondaryGray font-light max-w-2xl mx-auto leading-relaxed">
              In 2 minuti, calcola il costo nascosto delle inefficienze <br className="hidden md:block"/> e scopri il ROI dell&apos;automazione AI.
            </p>

            <div className="pt-8">
                <button
                onClick={handleNextStep}
                className="bg-primary text-white px-10 py-4 rounded-lg text-lg font-medium hover:opacity-90 active:scale-95 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                Inizia il Calcolo
                </button>
            </div>

            <div className="pt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-gray-100 mt-12">
               <div>
                   <span className="block text-2xl font-bold text-black">2 min</span>
                   <span className="text-xs text-secondaryGray uppercase tracking-wider">Tempo</span>
               </div>
               <div>
                   <span className="block text-2xl font-bold text-black">100%</span>
                   <span className="text-xs text-secondaryGray uppercase tracking-wider">Gratuito</span>
               </div>
               <div>
                   <span className="block text-2xl font-bold text-black">ROI</span>
                   <span className="text-xs text-secondaryGray uppercase tracking-wider">Analisi</span>
               </div>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {currentStep === 'step1' && (
          <Step1Form
            data={{
              teamSize: formData.teamSize,
              hoursPerDay: formData.hoursPerDay,
              hourlyCost: formData.hourlyCost,
            }}
            onChange={updateFormData}
            onNext={handleNextStep}
            errors={errors}
          />
        )}

        {/* Step 2 */}
        {currentStep === 'step2' && (
          <Step2Form
            data={{
              leadsPerMonth: formData.leadsPerMonth,
              customerLifetimeValue: formData.customerLifetimeValue,
              currentClosingRate: formData.currentClosingRate,
              agreeWith20PercentIncrease: formData.agreeWith20PercentIncrease,
            }}
            onChange={updateFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            errors={errors}
          />
        )}

        {/* Result */}
        {currentStep === 'result' && result && (
          <ResultDisplay result={result} onReset={handleReset} />
        )}
      </div>

      <Footer />
    </main>
  );
}

