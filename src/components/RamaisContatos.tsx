import React, { useState } from 'react';
import { ramaisInternosData } from '../data/contatosEmpresas';
import { 
  PhoneForwarded, 
  Search, 
  Copy, 
  Check, 
  Building2, 
  PhoneCall, 
  ShieldAlert 
} from 'lucide-react';

export const RamaisContatos: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [copiedRamal, setCopiedRamal] = useState<string | null>(null);

  const filtered = ramaisInternosData.filter(r => 
    r.setor.toLowerCase().includes(search.toLowerCase()) ||
    r.ramal.includes(search) ||
    (r.descricao && r.descricao.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopy = (ramal: string, id: string) => {
    navigator.clipboard.writeText(ramal);
    setCopiedRamal(id);
    setTimeout(() => setCopiedRamal(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <PhoneForwarded className="w-5 h-5 text-[#1D787A]" />
              Ramais Internos — Hospital Palmas Medical
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Lista telefônica interna para comunicação rápida entre postos de enfermagem, UTIs e regulação.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            {filtered.length} ramais encontrados
          </div>
        </div>

        {/* Search */}
        <div className="relative pt-2 border-t border-slate-100">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por setor (ex: UTI, PS, Recepção, CC, Farmácia, Hemodinâmica) ou número..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D787A]"
          />
        </div>
      </div>

      {/* Ramais Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {filtered.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#9E1B4F]/40 p-4 shadow-2xs transition-all flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                {item.prioridade === 'urgencia' && (
                  <span className="w-2 h-2 rounded-full bg-[#9E1B4F] flex-shrink-0" />
                )}
                <h3 className="text-xs font-extrabold text-slate-900 truncate">
                  {item.setor}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {item.descricao || item.unidade}
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="font-mono font-black text-sm text-[#1D787A] bg-[#EBF5F5] px-2.5 py-1 rounded-xl border border-[#C8E4E3]">
                {item.ramal}
              </span>
              <button
                onClick={() => handleCopy(item.ramal, `ramal-${idx}`)}
                className="p-1.5 text-slate-400 hover:text-[#9E1B4F] rounded-lg hover:bg-slate-100"
                title="Copiar ramal"
              >
                {copiedRamal === `ramal-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
