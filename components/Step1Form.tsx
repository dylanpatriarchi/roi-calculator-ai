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
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
          Il tuo Team
        </h2>
        <p className="text-lg text-secondaryGray">
          Analizziamo i costi operativi delle attività manuali.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div ref={fieldsRef} className="space-y-8">
          <div className="input-field opacity-0">
            <InputField
              label="Membri del team operativi"
              type="number"
              min="1"
              value={data.teamSize || ''}
              onChange={(e) => onChange('teamSize', parseFloat(e.target.value))}
              error={errors.teamSize}
              placeholder="0"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Ore giornaliere perse in attività ripetitive/manuali"
              type="number"
              min="0.5"
              max="24"
              step="0.5"
              value={data.hoursPerDay || ''}
              onChange={(e) => onChange('hoursPerDay', parseFloat(e.target.value))}
              error={errors.hoursPerDay}
              helperText="Per persona (es. data entry, email, ricerca)"
              placeholder="0.0"
              required
            />
          </div>

          <div className="input-field opacity-0">
            <InputField
              label="Costo orario medio lordo (€)"
              type="number"
              min="1"
              step="0.01"
              value={data.hourlyCost || ''}
              onChange={(e) => onChange('hourlyCost', parseFloat(e.target.value))}
              error={errors.hourlyCost}
              helperText="RAL + Contributi / Ore lavorate"
              placeholder="0.00"
              required
            />
          </div>

          <div className="input-field opacity-0 pt-8">
            <Button
              type="submit"
              size="lg"
              fullWidth
              className="bg-primary hover:opacity-90 active:scale-95 text-white rounded-lg py-4 text-lg font-medium transition-all"
            >
              Continua
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

