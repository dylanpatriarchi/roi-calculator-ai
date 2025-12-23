'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { fadeInUp, staggerFadeIn, countUp } from '@/lib/gsap-utils';

interface ResultData {
  totalLoss: number;
  salaryCost: number;
  missedRevenue: number;
  hoursWasted: number;
  leadsLost: number;
}

interface ResultDisplayProps {
  result: ResultData;
  onReset: () => void;
}

/**
 * Result Display Component
 * Shows the calculated ROI with detailed breakdown and call-to-action
 */
export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalLossRef = useRef<HTMLHeadingElement>(null);
  const salaryCostRef = useRef<HTMLParagraphElement>(null);
  const missedRevenueRef = useRef<HTMLParagraphElement>(null);
  const hoursWastedRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      fadeInUp(containerRef.current, 0.6);
    }

    // Animate the main number
    if (totalLossRef.current) {
      setTimeout(() => {
        countUp(totalLossRef.current!, result.totalLoss, 2.5, '€', '');
      }, 300);
    }

    // Animate secondary numbers
    if (salaryCostRef.current) {
      setTimeout(() => {
        countUp(salaryCostRef.current!, result.salaryCost, 2, '€', '');
      }, 800);
    }

    if (missedRevenueRef.current) {
      setTimeout(() => {
        countUp(missedRevenueRef.current!, result.missedRevenue, 2, '€', '');
      }, 1000);
    }

    if (hoursWastedRef.current) {
      setTimeout(() => {
        countUp(hoursWastedRef.current!, result.hoursWasted, 2, '', ' ore');
      }, 1200);
    }

    // Stagger animate cards
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.result-card');
      setTimeout(() => {
        staggerFadeIn(Array.from(cards) as HTMLElement[], 0.2, 0.6);
      }, 1400);
    }
  }, [result]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto text-black">
      {/* Main Result Header */}
      <div className="text-center mb-16 pt-8">
        <p className="text-sm font-medium tracking-widest text-primary uppercase mb-4">
          Risultato Analisi
        </p>
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-black mb-6">
          <span ref={totalLossRef}>€0</span>
        </h2>
        <p className="text-xl text-secondaryGray max-w-xl mx-auto font-light">
          Denaro stimato che la tua azienda &quot;lascia sul tavolo&quot; ogni anno.
        </p>
      </div>

      {/* Breakdown Grid - Minimalist typography based */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-20">
        {/* Salary Waste */}
        <div className="result-card opacity-0 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Efficienza Operativa</p>
          <div className="flex items-baseline justify-between mb-2">
             <h3 className="text-lg font-medium text-black">Spreco Stipendi</h3>
             <p ref={salaryCostRef} className="text-2xl font-bold text-black">€0</p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Costo delle ore perse in task manuali automatizzabili.
          </p>
        </div>

        {/* Missed Revenue */}
        <div className="result-card opacity-0 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Opportunità Commerciale</p>
          <div className="flex items-baseline justify-between mb-2">
             <h3 className="text-lg font-medium text-black">Mancato Fatturato</h3>
             <p ref={missedRevenueRef} className="text-2xl font-bold text-black">€0</p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Ricavi persi a causa dei tempi di risposta lenti.
          </p>
        </div>

        {/* Time Wasted */}
        <div className="result-card opacity-0 border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tempo Recuperabile</p>
            <div className="flex items-baseline justify-between mb-2">
                 <h3 className="text-lg font-medium text-black">Ore/Anno</h3>
                 <p ref={hoursWastedRef} className="text-2xl font-bold text-black">0 h</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
                Ore di lavoro annuali che potresti reinvestire.
            </p>
        </div>

        {/* Leads Lost */}
        <div className="result-card opacity-0 border-t border-gray-100 pt-6">
             <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Pipeline</p>
             <div className="flex items-baseline justify-between mb-2">
                 <h3 className="text-lg font-medium text-black">Lead Persi</h3>
                 <p className="text-2xl font-bold text-black">
                    {Math.round(result.leadsLost).toLocaleString('it-IT')}
                 </p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
                Potenziali clienti persi ogni anno.
            </p>
        </div>
      </div>

      {/* Insight Section - Clean Text */}
      <div className="bg-gray-50 rounded-2xl p-10 mb-12">
        <h3 className="text-2xl font-bold text-black mb-6">
          Il vantaggio Rayo
        </h3>
        <ul className="space-y-4">
          <li className="flex gap-4">
             <span className="text-primary font-bold">•</span>
             <p className="text-gray-700"><strong>Risposta 24/7:</strong> L&apos;AI qualifica e converte i lead istantaneamente, a qualsiasi ora.</p>
          </li>
          <li className="flex gap-4">
             <span className="text-primary font-bold">•</span>
             <p className="text-gray-700"><strong>Zero Sprechi:</strong> Elimina il data entry manuale e riduci i costi operativi.</p>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => window.open('https://calendly.com/rayo-info/30min', '_blank')}
            className="text-lg bg-primary hover:opacity-90 active:scale-95 text-white px-8"
          >
            Prenota Consulenza Gratuita
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="text-lg border-gray-200 text-black hover:bg-gray-50"
          >
            <RotateCcw size={18} className="mr-2" />
            Ricalcola
          </Button>
        </div>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed pt-8">
          Disclaimer: I risultati sono stime basate su benchmark di settore. I risultati effettivi possono variare.
        </p>
      </div>
    </div>
  );
};

