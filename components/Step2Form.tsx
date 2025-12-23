'use client';

import React, { useEffect, useRef } from 'react';
import { InputField } from './InputField';
import { Button } from './Button';
import { fadeInUp, staggerFadeIn } from '@/lib/gsap-utils';

interface Step2FormProps {
  data: {
    leadsPerMonth: number;
    customerLifetimeValue: number;
    currentClosingRate: number;
    agreeWith20PercentIncrease: boolean;
  };
  onChange: (field: string, value: number | boolean) => void;
  onNext: () => void;
  onBack: () => void;
  errors: { [key: string]: string };
}

/**
 * Step 2: Business Metrics & Opportunity
 * Collects data about leads, conversion rates, and revenue potential
 */
export const Step2Form: React.FC<Step2FormProps> = ({ data, onChange, onNext, onBack, errors }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      fadeInUp(containerRef.current, 0.6);
    }
    if (fieldsRef.current) {
      const fields = fieldsRef.current.querySelectorAll('.input-field');
      staggerFadeIn(Array.from(fields) as HTMLElement[], 0.15, 0.5);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
          Crescita Potenziali
        </h2>
        <p className="text-lg text-secondaryGray">
          Stimiamo l&apos;impatto dell&apos;automazione sui tuoi ricavi.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div ref={fieldsRef} className="space-y-8">
          <div className="input-field opacity-0">
            <InputField
              label="Lead / Contatti mensili"
              type="number"
              min="1"
              value={data.leadsPerMonth || ''}
              onChange={(e) => onChange('leadsPerMonth', parseFloat(e.target.value))}
              error={errors.leadsPerMonth}
              placeholder="0"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Valore medio cliente (LTV) (€)"
              type="number"
              min="1"
              step="0.01"
              value={data.customerLifetimeValue || ''}
              onChange={(e) => onChange('customerLifetimeValue', parseFloat(e.target.value))}
              error={errors.customerLifetimeValue}
              helperText="Fatturato totale generato da un singolo cliente"
              placeholder="0.00"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Tasso di conversione attuale (%)"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.currentClosingRate || ''}
              onChange={(e) => onChange('currentClosingRate', parseFloat(e.target.value))}
              error={errors.currentClosingRate}
              helperText="% di lead che diventano clienti"
              placeholder="0.0"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Impatto Velocità di Risposta
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Studi di settore indicano che rispondere entro 1 minuto aumenta le conversioni fino all&apos;<strong>8%</strong>. 
                  Rayo AI garantisce risposte istantanee 24/7. Sei d&apos;accordo nell&apos;includere questa stima?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${data.agreeWith20PercentIncrease === true ? 'border-primary' : 'border-gray-300'}`}>
                        {data.agreeWith20PercentIncrease === true && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <input
                      type="radio"
                      name="agreeWith20PercentIncrease"
                      checked={data.agreeWith20PercentIncrease === true}
                      onChange={() => onChange('agreeWith20PercentIncrease', true)}
                      className="hidden"
                    />
                    <span className={`text-sm font-medium transition-colors ${data.agreeWith20PercentIncrease === true ? 'text-black' : 'text-gray-500'}`}>Sì, includi stima</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${data.agreeWith20PercentIncrease === false ? 'border-primary' : 'border-gray-300'}`}>
                        {data.agreeWith20PercentIncrease === false && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <input
                      type="radio"
                      name="agreeWith20PercentIncrease"
                      checked={data.agreeWith20PercentIncrease === false}
                      onChange={() => onChange('agreeWith20PercentIncrease', false)}
                      className="hidden"
                    />
                    <span className={`text-sm font-medium transition-colors ${data.agreeWith20PercentIncrease === false ? 'text-black' : 'text-gray-500'}`}>No, sii conservativo</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="input-field opacity-0 flex gap-4 pt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1 border-gray-200 text-black hover:bg-gray-50"
            >
              Indietro
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1 bg-primary hover:opacity-90 active:scale-95 text-white"
            >
              Calcola ROI
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

