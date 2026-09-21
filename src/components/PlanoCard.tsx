import React from 'react';
import { 
  PlanoRemocao 
} from '../types/remocao';
import { ChevronRight } from 'lucide-react';

interface PlanoCardProps {
  plano: PlanoRemocao;
  onSelect: (plano: PlanoRemocao) => void;
}

export const PlanoCard: React.FC<PlanoCardProps> = ({ plano, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(plano)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-[#9E1B4F]/40 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-12 h-12 rounded-xl bg-[#1D787A] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#9E1B4F] transition-colors shadow-2xs">
          {plano.badge}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-900 leading-snug break-words group-hover:text-[#9E1B4F] transition-colors">
            {plano.nome}
          </h3>
          <p className="text-xs text-slate-500 capitalize tracking-wide mt-1">
            {plano.categoria.replace('_', ' ')}
          </p>
        </div>
      </div>

      <div className="text-slate-300 group-hover:text-[#9E1B4F] group-hover:translate-x-1 transition-all flex-shrink-0">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};



