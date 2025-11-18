'use client';

import React, { useState } from 'react';
import { Step1Form } from '@/components/Step1Form';
import { Step2Form } from '@/components/Step2Form';
import { ResultDisplay } from '@/components/ResultDisplay';
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
    <main className="min-h-screen bg-white">
      {/* Progress Bar */}
      {currentStep !== 'intro' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
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
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Intro Screen */}
        {currentStep === 'intro' && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles size={18} />
              Strumento di Analisi Gratuito
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-light text-dark mb-6">
              Quanto Sta <span className="text-primary">Perdendo</span> la Tua Azienda?
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Scopri in meno di 2 minuti quanto denaro la tua azienda perde ogni anno senza l&apos;utilizzo dell&apos;AI.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-accent rounded-xl p-6">
                <div className="text-4xl font-bold text-primary mb-2">2 min</div>
                <div className="text-sm text-gray-600">Tempo richiesto</div>
              </div>
              <div className="bg-accent rounded-xl p-6">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-gray-600">Gratuito e senza impegno</div>
              </div>
              <div className="bg-accent rounded-xl p-6">
                <div className="text-4xl font-bold text-primary mb-2">ROI</div>
                <div className="text-sm text-gray-600">Risultato personalizzato</div>
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="bg-gradient-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Inizia il Calcolo
              <ChevronRight size={24} />
            </button>

            <p className="text-xs text-gray-500 mt-6 max-w-2xl mx-auto">
              <strong>Nota:</strong> I risultati forniti da questo calcolatore sono stime approssimative basate su dati generici di settore e non costituiscono una consulenza professionale. I risultati effettivi possono variare significativamente in base al contesto specifico della tua azienda.
            </p>
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

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm mb-2">
            © {new Date().getFullYear()} Rayo Consulting di Patriarchi Dylan. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-gray-500 max-w-3xl mx-auto">
            I calcoli ROI forniti sono stime approssimative a scopo puramente informativo e non costituiscono consulenza finanziaria o professionale. 
            I risultati effettivi possono variare. Consultare sempre un professionista per decisioni aziendali importanti.
          </p>
        </div>
      </footer>
    </main>
  );
}

