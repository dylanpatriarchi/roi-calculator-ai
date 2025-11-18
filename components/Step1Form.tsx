'use client';

import React, { useEffect, useRef } from 'react';
import { InputField } from './InputField';
import { Button } from './Button';
import { fadeInUp, staggerFadeIn } from '@/lib/gsap-utils';

interface Step1FormProps {
  data: {
    teamSize: number;
    hoursPerDay: number;
    hourlyCost: number;
  };
  onChange: (field: string, value: number) => void;
  onNext: () => void;
  errors: { [key: string]: string };
}

/**
 * Step 1: Team Information
 * Collects data about team size, time spent, and hourly costs
 */
export const Step1Form: React.FC<Step1FormProps> = ({ data, onChange, onNext, errors }) => {
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
          Informazioni sul Tuo Team
        </h2>
        <p className="text-lg text-gray-600 mb-3">
          Iniziamo a capire quanto tempo il tuo team dedica ad attività ripetitive che potrebbero essere automatizzate.
        </p>
        <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <strong>Nota sulla metodologia:</strong> Il calcolo si basa su 240 giorni lavorativi annui (48 settimane × 5 giorni). 
          Assume che l'AI possa automatizzare circa il 40% delle attività ripetitive e migliorare le conversioni dell'8%. 
          I risultati sono stime approssimative che variano in base a molti fattori specifici.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div ref={fieldsRef} className="space-y-6">
          <div className="input-field opacity-0">
            <InputField
              label="Quante persone nel tuo team si occupano di rispondere a email/chat o inserire dati?"
              type="number"
              min="1"
              value={data.teamSize || ''}
              onChange={(e) => onChange('teamSize', parseFloat(e.target.value))}
              error={errors.teamSize}
              placeholder="es. 5"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Quante ore al giorno stimi che perdano in queste attività ripetitive?"
              type="number"
              min="0.5"
              max="24"
              step="0.5"
              value={data.hoursPerDay || ''}
              onChange={(e) => onChange('hoursPerDay', parseFloat(e.target.value))}
              error={errors.hoursPerDay}
              helperText="Inserisci un valore approssimativo (es. 2.5 per 2 ore e mezza)"
              placeholder="es. 3"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Qual è il costo orario medio lordo di un dipendente? (€)"
              type="number"
              min="1"
              step="0.01"
              value={data.hourlyCost || ''}
              onChange={(e) => onChange('hourlyCost', parseFloat(e.target.value))}
              error={errors.hourlyCost}
              helperText="Considera lo stipendio lordo + contributi, diviso per le ore lavorative mensili"
              placeholder="es. 25"
              required
            />
          </div>

          <div className="input-field opacity-0 pt-4">
            <Button
              type="submit"
              size="lg"
              fullWidth
            >
              Continua
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

