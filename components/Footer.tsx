import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-white py-12 px-6 border-t border-white/20 backdrop-blur-sm">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        
        <div className="flex flex-col gap-2">
           <h3 className="text-2xl font-black uppercase tracking-tighter">Logiprêt</h3>
           <p className="font-mono text-xs max-w-xs text-white/60">
             INFRASTRUCTURE MARKETING AVANCÉE POUR LES PROFESSIONNELS DE L'IMMOBILIER CANADIEN.
           </p>
        </div>

        <div className="font-mono text-xs text-white/40 text-left">
          &copy; 2025 LOGIPRÊT INC.<br/>
          MONTRÉAL, QC, CA
        </div>
      </div>
    </footer>
  );
};