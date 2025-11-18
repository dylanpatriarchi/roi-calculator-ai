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
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-dark mb-4">
          Opportunità di Guadagno
        </h2>
        <p className="text-lg text-gray-600">
          Ora valutiamo il potenziale di crescita del tuo business con l&apos;utilizzo dell&apos;AI.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div ref={fieldsRef} className="space-y-6">
          <div className="input-field opacity-0">
            <InputField
              label="Quanti lead/contatti ricevi al mese?"
              type="number"
              min="1"
              value={data.leadsPerMonth || ''}
              onChange={(e) => onChange('leadsPerMonth', parseFloat(e.target.value))}
              error={errors.leadsPerMonth}
              placeholder="es. 100"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Qual è il valore medio di un cliente per te (Lifetime Value)? (€)"
              type="number"
              min="1"
              step="0.01"
              value={data.customerLifetimeValue || ''}
              onChange={(e) => onChange('customerLifetimeValue', parseFloat(e.target.value))}
              error={errors.customerLifetimeValue}
              helperText="Il valore totale che un cliente genera nel tempo"
              placeholder="es. 5000"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Qual è la tua attuale percentuale di chiusura contratti? (%)"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.currentClosingRate || ''}
              onChange={(e) => onChange('currentClosingRate', parseFloat(e.target.value))}
              error={errors.currentClosingRate}
              helperText="Percentuale di lead che si trasformano in clienti paganti"
              placeholder="es. 15"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <div className="bg-gradient-primary p-6 rounded-lg text-white">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Potenziale di Crescita con l&apos;AI
                </h3>
                <p className="text-white/90 mb-4">
                  Se rispondessi entro 1 minuto (grazie all&apos;AI), le statistiche dicono che potresti migliorare le conversioni dell&apos;<strong>8%</strong>. Siamo d&apos;accordo?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="agreeWith20PercentIncrease"
                      checked={data.agreeWith20PercentIncrease === true}
                      onChange={() => onChange('agreeWith20PercentIncrease', true)}
                      className="w-5 h-5 accent-white"
                    />
                    <span className="text-lg font-medium">Sì, sono d&apos;accordo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="agreeWith20PercentIncrease"
                      checked={data.agreeWith20PercentIncrease === false}
                      onChange={() => onChange('agreeWith20PercentIncrease', false)}
                      className="w-5 h-5 accent-white"
                    />
                    <span className="text-lg font-medium">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="input-field opacity-0 flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1"
            >
              Indietro
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
            >
              Calcola il ROI
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

