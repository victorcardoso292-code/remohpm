import React, { useState } from 'react';
import { codigosTussGerais } from '../data/tabelasTuss';
import { CodigoTussGeral } from '../types/remocao';
import { 
  FileCode2, 
  Search, 
  Copy, 
  Check, 
  Info, 
  ShieldCheck, 
  Truck, 
  Plane, 
  Layers 
} from 'lucide-react';

export const TabelaCodigosTuss: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');

  const filtered = codigosTussGerais.filter(c => {
    const matchesSearch = 
      c.codigo.toLowerCase().includes(search.toLowerCase()) ||
      c.termo.toLowerCase().includes(search.toLowerCase()) ||
      c.descricaoDetalhada.toLowerCase().includes(search.toLowerCase()) ||
      c.indicacoes.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCategoria === 'todos' || c.categoria === selectedCategoria;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const categorias = ['todos', 'Urbana UTI', 'Urbana Básica', 'Intermunicipal', 'Aérea', 'Equipe/Taxas', 'Pacote Próprio'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-purple-600" />
              Tabela Geral de Códigos TUSS de Remoção
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Codificação oficial para emissão de guias SP/SADT, pacotes de ambulância e regulação médica.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            {filtered.length} códigos listados
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por código (ex: 60501002), descrição ou indicação clínica..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="sm:col-span-5">
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-semibold text-slate-900"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'todos' ? 'Todas as Categorias' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Code Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 p-5 shadow-xs transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-lg text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                  {item.codigo}
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {item.termo}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.categoria}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      {item.suporte}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(item.codigo, idx)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors self-start sm:self-center"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wide">Descrição e Tripulação</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {item.descricaoDetalhada}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wide">Indicações Clínicas</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {item.indicacoes}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl text-xs text-slate-700 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span><strong>Regra de Autorização:</strong> {item.regrasAutorizacao}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
