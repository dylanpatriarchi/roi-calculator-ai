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
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      {/* Main Result Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
            Perdita Annuale Stimata
          </div>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-light text-dark mb-4">
          <span ref={totalLossRef}>€0</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          Questa è la cifra che la tua azienda sta perdendo ogni anno senza l'automazione AI.
        </p>
        <p className="text-sm text-gray-500 max-w-xl mx-auto italic">
          * Stima approssimativa basata sui dati forniti e su medie di settore
        </p>
      </div>

      {/* Breakdown Cards */}
      <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Salary Waste Card */}
        <div className="result-card opacity-0 bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-dark mb-2">Spreco Stipendi</h3>
          <p ref={salaryCostRef} className="text-3xl font-bold text-primary mb-2">€0</p>
          <p className="text-sm text-gray-600">
            Costo annuale delle ore perse dal team in attività ripetitive che potrebbero essere automatizzate.
          </p>
        </div>

        {/* Missed Revenue Card */}
        <div className="result-card opacity-0 bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-dark mb-2">Mancato Guadagno</h3>
          <p ref={missedRevenueRef} className="text-3xl font-bold text-red-600 mb-2">€0</p>
          <p className="text-sm text-gray-600">
            Ricavi potenziali persi per mancata conversione di lead che avresti potuto chiudere con risposte rapide.
          </p>
        </div>

        {/* Time Wasted Card */}
        <div className="result-card opacity-0 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-dark mb-2">Ore Automatizzabili</h3>
          <p ref={hoursWastedRef} className="text-3xl font-bold text-blue-600 mb-2">0 ore</p>
          <p className="text-sm text-gray-600">
            Tempo totale che il tuo team spreca annualmente in attività che l'AI potrebbe gestire automaticamente.
          </p>
        </div>

        {/* Leads Lost Card */}
        <div className="result-card opacity-0 bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-dark mb-2">Lead Persi</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">
            {Math.round(result.leadsLost).toLocaleString('it-IT')}
          </p>
          <p className="text-sm text-gray-600">
            Numero stimato di lead che non si convertono in clienti a causa di tempi di risposta lenti.
          </p>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white mb-8">
        <h3 className="text-2xl font-serif font-light mb-4">
          Come l'AI Potrebbe Trasformare il Tuo Business
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <ArrowRight size={20} className="mt-1 flex-shrink-0" />
            <p className="text-white/90">
              <strong>Risposta Istantanea:</strong> L'AI può rispondere ai lead in tempi molto rapidi, potenzialmente migliorando il tasso di conversione.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight size={20} className="mt-1 flex-shrink-0" />
            <p className="text-white/90">
              <strong>Automazione Intelligente:</strong> Libera il tuo team dalle attività ripetitive, permettendogli di concentrarsi su compiti ad alto valore.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight size={20} className="mt-1 flex-shrink-0" />
            <p className="text-white/90">
              <strong>ROI Potenziale:</strong> L'automazione AI potrebbe ripagarsi nel tempo grazie ai risparmi e ai ricavi aggiuntivi, ma i risultati variano caso per caso.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-serif font-light text-dark mb-4">
          Pronto a Recuperare Questi Soldi?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => window.open('https://calendly.com/rayo-info/30min', '_blank')}
            className="text-lg"
          >
            Prenota Consulenza Gratuita
            <ArrowRight size={20} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onReset}
            className="text-lg"
          >
            <RotateCcw size={20} />
            Calcola di Nuovo
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Nessun impegno. Ti mostreremo esattamente come l'AI può risolvere i tuoi problemi specifici.
        </p>
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-dark mb-2">Disclaimer Importante</h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          I risultati mostrati sono <strong>stime approssimative</strong> calcolate in base ai dati da te forniti e a statistiche medie di settore. 
          Non costituiscono una garanzia di risultati futuri né una consulenza finanziaria o professionale. 
          I risultati effettivi possono variare significativamente in base a numerosi fattori specifici della tua azienda, 
          del settore, del mercato e dell'implementazione tecnologica. Questo strumento è fornito esclusivamente a scopo informativo 
          e non deve essere utilizzato come unico criterio per decisioni aziendali o investimenti. 
          Per una valutazione accurata e personalizzata, ti consigliamo di richiedere una consulenza professionale specifica.
        </p>
      </div>
    </div>
  );
};

