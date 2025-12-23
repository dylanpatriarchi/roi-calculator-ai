import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs text-gray-500 font-medium">
        
        {/* Company Info */}
        <div className="space-y-1">
          <p className="text-black font-semibold">Rayo Consulting di Patriarchi Dylan</p>
          <p>P.IVA: 03988190546</p>
        </div>

        {/* Address */}
        <div className="space-y-1 md:text-center">
          <p>Vocabolo Marcheggiane 56/C</p>
          <p>Breccione Zona Industriale, Città di Castello (PG)</p>
        </div>

        {/* Contact & Links */}
        <div className="flex flex-col md:items-end gap-1">
          <a 
            href="mailto:info@rayo.consulting" 
            className="hover:text-primary transition-colors duration-200"
          >
            info@rayo.consulting
          </a>
          <div className="flex gap-4 mt-1">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-primary transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
